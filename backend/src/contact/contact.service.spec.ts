import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { MailService } from '../mail/mail.service';

describe('ContactService', () => {
  let service: ContactService;
  const mailMock = { sendContactEmail: jest.fn() };

  beforeEach(async () => {
    mailMock.sendContactEmail.mockReset();
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactService, { provide: MailService, useValue: mailMock }],
    }).compile();
    service = module.get<ContactService>(ContactService);
  });

  it('delegates to MailService and returns success', async () => {
    mailMock.sendContactEmail.mockResolvedValue(undefined);
    const dto = { name: 'Ada', email: 'ada@x.com', message: 'Hola mundo test' };
    const result = await service.handleContact(dto);
    expect(mailMock.sendContactEmail).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ success: true });
  });
});
