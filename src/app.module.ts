import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, {
    provide: "MAILER",
    
    useFactory(...args) {
      const key = process.env.SENDGRID_KEY;
      console.log(key);
      if (!key) throw new Error("No Sendgrid Key provided")
      const Mailer = require('@sendgrid/mail')
      Mailer.setApiKey(key);
      return Mailer;
    },
  }],
})
export class AppModule {}
