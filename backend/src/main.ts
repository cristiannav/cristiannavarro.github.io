import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';

// 1. Crea una instancia de Express
const server = express();

export async function createNestServer(expressInstance: express.Express) {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  
  app.enableCors(); // Habilita CORS si lo necesitas
  await app.init();
  return app;
}

// 2. Ejecuta el servidor localmente como siempre
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();