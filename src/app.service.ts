import { Inject, Injectable, Logger } from '@nestjs/common';
import { templateIds } from './template-ids';
import Mailer from '@sendgrid/mail'
import { MailerPayloads } from './dto/MailerPayloads.dto';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class AppService  {

  private readonly logger = new Logger("MAILER_SERVICE")
  constructor(@Inject("MAILER") readonly mailer) {}

  sendVerificationEmail(payload: MailerPayloads.EmailVerificationPayload) {
    const mail = this.createMail(payload.email, templateIds.VERIFY_EMAIL, {
      username: payload.username,
      code: payload.code.toString()
    })
    try {
      this.mailer.send(mail).then((res) => {
        this.logger.log(`Sent Verification Email to ${payload.email}  (${payload.username})`)
      })
      
    } catch(e) {
      this.logger.error("Could not send Verification Email", e);
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
