import { Get, Controller } from '@nestjs/common';
import {Client, ClientProxy, Transport} from '@nestjs/microservices';
import {Observable} from 'rxjs/Rx';
import {MathMicroservice} from './microservices/math-microservice';
import {RabbitMQClient} from './rabbit/rabbitmq-client';
import {RabbitMQMicroservice} from './microservices/rabbitmq-microservice';

@Controller()
export class AppController {
  // @Client(RabbitMQMicroservice)
  // client: ClientProxy;

  constructor(private readonly client: RabbitMQClient) {}

  @Get()
  root(): Observable<number> {
      const pattern = { cmd: 'sum' };
      const data = [1, 2, 3, 4, 5];

      // console.log(process.env);

      return this.client.send<number>(pattern, data);

      // const socket = this.client.send<number>(pattern, data);
      // const rabbit = this.rabbitClient.send(pattern, data);

      // return socket;

      // return rabbit;
    // return 'Hello World!';
  }
}
