import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { Server } from 'node:http';
import { AppModule } from '../src/app.module';
import { MailService } from '../src/mail/mail.service';

describe('Contact (e2e)', () => {
  let app: INestApplication;
  let httpServer: Server;
  const mailMock = { sendContactEmail: jest.fn().mockResolvedValue(undefined) };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MailService)
      .useValue(mailMock)
      .compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
    httpServer = app.getHttpServer() as Server;
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /api/contact with valid body returns 201', () => {
    return request(httpServer)
      .post('/api/contact')
      .send({
        name: 'Ada',
        email: 'ada@x.com',
        message: 'Mensaje de prueba valido',
      })
      .expect(201)
      .expect({ success: true });
  });

  it('POST /api/contact with invalid email returns 400', () => {
    return request(httpServer)
      .post('/api/contact')
      .send({
        name: 'Ada',
        email: 'no-es-email',
        message: 'Mensaje de prueba valido',
      })
      .expect(400);
  });
});
