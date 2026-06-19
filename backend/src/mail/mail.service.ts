import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly config: ConfigService) {}

  async sendContactEmail(payload: ContactPayload): Promise<void> {
    const apiKey = this.config.get<string>('RESEND_API_KEY');
    const to = this.config.get<string>('CONTACT_TO');
    const from =
      this.config.get<string>('RESEND_FROM') ?? 'onboarding@resend.dev';

    if (!apiKey || !to) {
      this.logger.error('RESEND_API_KEY o CONTACT_TO no están configurados');
      throw new InternalServerErrorException('No se pudo enviar el mensaje');
    }

    try {
      const res = await fetch(RESEND_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: `Portfolio <${from}>`,
          to: [to],
          reply_to: payload.email,
          subject: `Nuevo mensaje de ${payload.name}`,
          text: `Nombre: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
        }),
      });

      const data = (await res.json()) as { id?: string; message?: string };
      if (!res.ok || !data.id) {
        throw new Error(data.message ?? `Resend respondió ${res.status}`);
      }
    } catch (err) {
      this.logger.error('Error enviando email de contacto', err as Error);
      throw new InternalServerErrorException('No se pudo enviar el mensaje');
    }
  }
}
