import {ClientMetadata, Transport} from '@nestjs/microservices';
import {RabbitMQServer} from '../rabbit/rabbitmq-server';

export const RabbitMQMicroservice = {
    // transport: Transport.TCP,
    strategy: new RabbitMQServer('amqp://admin:admin@portaleagenti.lxc', 'channel'),
};