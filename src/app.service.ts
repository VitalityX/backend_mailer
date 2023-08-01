import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { templateIds } from './template-ids';
import Mailer from '@sendgrid/mail'
@Injectable()
export class AppService implements OnModuleInit {

  
  constructor(@Inject("MAILER") readonly mailer) {}

  onModuleInit() {
    console.log("sending mail in 15 seconds")
    setTimeout(() => {
      this.sendVerificationEmail()
    }, 15000);
  }

  sendVerificationEmail() {
    const mail = this.createMail("admin@vitalitycheats.net",templateIds.VERIFY_EMAIL, {
      username: "Test",
      code: "123456"
    })
    try {
      this.mailer.send(mail).then((res) => {
        console.log("success", res)
      })
      
    } catch(e) {
      console.log(e)
    }
    
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
