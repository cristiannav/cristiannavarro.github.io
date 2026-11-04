import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';
import helmet from 'helmet';

// 1. Crea una instancia de Express
const server = express();

// Orígenes permitidos para CORS: el sitio publicado y desarrollo local, más
// los que se agreguen en FRONTEND_ORIGIN (lista separada por comas).
function allowedOrigins(): string[] {
  const fromEnv = (process.env.FRONTEND_ORIGIN ?? '')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean);
  return [
    'https://cristiannavarro.vercel.app',
    'http://localhost:5173',
    'http://localhost:4173',
    ...fromEnv,
  ];
}

// Configuración común para el servidor local y para el handler serverless
function configureApp(app: NestExpressApplication) {
  app.use(helmet());
  app.setGlobalPrefix('api'); // todas las rutas quedan bajo /api (p. ej. /api/contact)
  app.enableCors({ origin: allowedOrigins() });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}

export async function createNestServer(expressInstance: express.Express) {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  configureApp(app);
  await app.init();
  return app;
}

// 2. Ejecuta el servidor localmente como siempre
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  configureApp(app);
  await app.listen(process.env.PORT ?? 3000);
}

// Solo arranca el servidor HTTP fuera del entorno serverless de Vercel
if (!process.env.VERCEL) {
  void bootstrap();
}
