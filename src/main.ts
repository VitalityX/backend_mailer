import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ExceptionFilter } from './error.interceptor';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      
      options: {
        producer: {
          createPartitioner: Partitioners.DefaultPartitioner
        },
        client: {
          clientId: 'mailer',
          brokers: (process.env.KAFKA_BROKERS || '').split(','),  
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
bootstrap().then(() => {
  console.log("Mailer is listening")
});
