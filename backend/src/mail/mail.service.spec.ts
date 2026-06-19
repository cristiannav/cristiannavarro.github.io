import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException } from '@nestjs/common';
import { MailService } from './mail.service';

describe('MailService', () => {
  let service: MailService;
  const fetchMock = jest.fn();

  beforeEach(async () => {
    fetchMock.mockReset();
    global.fetch = fetchMock;
    const configValues: Record<string, string> = {
      RESEND_API_KEY: 'test-key',
      CONTACT_TO: 'to@test',
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: ConfigService,
          useValue: { get: (k: string) => configValues[k] },
        },
      ],
    }).compile();
    service = module.get<MailService>(MailService);
  });

  it('posts the contact data to Resend with auth and reply-to', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 'email-123' }),
    });

    await service.sendContactEmail({
      name: 'Ada',
      email: 'ada@x.com',
      message: 'Hola mundo test',
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0] as [
      string,
      { headers: Record<string, string>; body: string },
    ];
    expect(url).toBe('https://api.resend.com/emails');
    expect(options.headers.Authorization).toBe('Bearer test-key');
    const body = JSON.parse(options.body) as {
      to: string[];
      reply_to: string;
      subject: string;
      text: string;
    };
    expect(body.to).toEqual(['to@test']);
    expect(body.reply_to).toBe('ada@x.com');
    expect(body.subject).toContain('Ada');
    expect(body.text).toContain('Hola mundo test');
  });

  it('throws when Resend returns an error', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 422,
      json: () => Promise.resolve({ message: 'invalid' }),
    });

    await expect(
      service.sendContactEmail({
        name: 'Ada',
        email: 'ada@x.com',
        message: 'Hola mundo test',
      }),
    ).rejects.toBeInstanceOf(InternalServerErrorException);
  });
});
