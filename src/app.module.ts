import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MathController } from './controller/math.controller';
// import {RabbitMQClient} from './rabbit/rabbitmq-client';

@Module({
  imports: [],
  controllers: [
      AppController,
      MathController,
  ],
  // components: [RabbitMQClient],
})
export class AppModule {}
