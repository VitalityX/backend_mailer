import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, RpcException } from '@nestjs/microservices';
import { MailerPayloads } from './dto/MailerPayloads.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern("sendVerificationEmail")
  sendVerificationEmail(payload: MailerPayloads.EmailVerificationPayload) {
    if (!payload) {
      throw new RpcException("No payload provided")
    }
    this.appService.sendVerificationEmail(payload)
  }
}
