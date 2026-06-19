import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { json } from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  // Se desactiva el body parser por defecto para imponer un límite de tamaño propio.
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  const config = app.get(ConfigService);

  // Cabeceras HTTP de seguridad (CSP, HSTS, X-Frame-Options, nosniff, etc.).
  app.use(helmet());

  // Limita el tamaño del cuerpo JSON: el formulario de contacto no necesita más
  // (el DTO ya acota el mensaje a 2000 caracteres). Mitiga payloads abusivos.
  app.use(json({ limit: '16kb' }));

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: config.get<string>('FRONTEND_ORIGIN', 'http://localhost:5173'),
    methods: ['POST'],
  });

  const port = config.get<number>('PORT', 3000);
  await app.listen(port);
}
void bootstrap();
