import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ExceptionFilter } from './error.interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'mailer',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'mailer-consumer',
        },
      },
    },
  );
  
  app.useGlobalFilters(new ExceptionFilter())
  await app.listen();
}
bootstrap();
