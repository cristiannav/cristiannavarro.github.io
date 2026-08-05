import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';
import helmet from 'helmet';

// 1. Crea una instancia de Express
const server = express();

// Orígenes permitidos para CORS. En producción se setea FRONTEND_ORIGIN
// (lista separada por comas) en las variables de entorno de Vercel.
function allowedOrigins(): string[] {
  const fromEnv = process.env.FRONTEND_ORIGIN;
  if (fromEnv) return fromEnv.split(',').map((o) => o.trim()).filter(Boolean);
  return [
    'https://cristiannavarro-github-io.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174',
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
