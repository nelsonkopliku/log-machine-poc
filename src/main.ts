import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { config } from 'dotenv';
import {RabbitMQServer} from './rabbit/rabbitmq-server';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
      strategy: new RabbitMQServer(process.env.RABBIT_URL, process.env.QUEUE_PREFIX),
  });

  // await app.startAllMicroservicesAsync();
  app.startAllMicroservices();
  await app.listen(3001, () => console.log('app listening 3001'));

    // const app = await NestFactory.createMicroservice(AppModule, {
    //     transport: Transport.TCP,
    // });
    // app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
