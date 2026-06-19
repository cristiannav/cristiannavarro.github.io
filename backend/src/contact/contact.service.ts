import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly mailService: MailService) {}

  async handleContact(dto: CreateContactDto): Promise<{ success: true }> {
    await this.mailService.sendContactEmail(dto);
    return { success: true };
  }
}
