import { Injectable, OnModuleInit } from '@nestjs/common';
import { templateIds } from './template-ids';
import Mailer from '@sendgrid/mail'
@Injectable()
export class AppService implements OnModuleInit {

  
  constructor(readonly mailer = Mailer) {}

  async onModuleInit() {
    this.mailer.setApiKey(process.env.SENDGRID_API_KEY);
  }

  sendVerificationEmail() {
    const mail = this.createMail("email@mail.de",templateIds.VERIFY_EMAIL, {
      username: "",
      code: ""
    })
    this.mailer.send(mail)
  }

  sendWelcomeEmail() {
    // On Purchase
  }

  sendUpdateEmail() {
    //
  }

  sendNewsletter() {
    //
  }

  sendPasswordReset() {
    //
  }

  sendPasswordChanged() {
    //
  }

  sendPasswordChangedNotification() {
    //
  }

  sendOrderConfirmation() {
    //
  }

  sendOrderShipped() {
    //
  }

  createMail(target: string, templateID: string, templateData: {[key:string]: string} ): Mailer.MailDataRequired {
    return {
      from: "noreply@vitalitycheats.net",
      to: target,
      replyTo: "support@vitalitycheats.net",
      templateId: templateID,
      dynamicTemplateData: templateData
    }
  }
}
