import { createNestServer } from './src/main'; // Ajusta la ruta a tu main.ts
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

let cachedServer: any;

export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    const nestApp = await createNestServer(server);
    cachedServer = nestApp.getHttpAdapter().getInstance();
  }
  return cachedServer(req, res);
}
