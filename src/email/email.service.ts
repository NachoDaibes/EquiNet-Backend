// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'sheldonisthebest25@gmail.com',
        pass: 'Thebigbangtheory25',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'sheldonisthebest25@gmail.com',
      to,
      subject,
      text,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
