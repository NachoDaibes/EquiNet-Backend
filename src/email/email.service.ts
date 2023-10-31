// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {MailerService} from '@nestjs-modules/mailer'

@Injectable()
export class EmailService {
  private transporter;
  // constructor( private readonly mailerService: MailerService){}
  
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'sheldonisthebest25@gmail.com',
        pass: 'vnlyzeazjrjzkzex',
      },
    });
  }

  // async sendEmaill(){
  //   this.mailerService.sendMail({
  //     to: 'nachodaibes25@gmail.com',
  //     from: 'sheldonisthebest25@gmail.com',
  //     subject: 'hola',
  //     text: 'hola',
  //   })
  // }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'sheldonisthebest25@gmail.com',
      to: to,
      subject: subject,
      text: text,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
