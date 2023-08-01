import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, RpcException } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern("sendVerificationEmail")
  sendVerificationEmail(payload: any) {
    if (!payload) {
      throw new RpcException("No payload provided")
    }
    this.appService.sendNewsletter()
  }
}
