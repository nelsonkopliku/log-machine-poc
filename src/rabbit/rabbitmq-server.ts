import { Server, CustomTransportStrategy } from '@nestjs/microservices';
import { Observable } from 'rxjs/Observable';
import {Channel, connect, Connection} from 'amqplib';

export class RabbitMQServer extends Server implements CustomTransportStrategy {
    private server: Connection = null;
    private channel: Channel = null;

    constructor(
        private readonly host: string,
        private readonly queue: string) {
        super();
    }

    public async listen(callback: () => void) {
        await this.init();
        this.channel.consume(`${this.queue}_sub`, this.handleMessage.bind(this), {
            noAck: true,
        });
    }

    public close() {
        this.channel && this.channel.close();
        this.server && this.server.close();
    }

    private async handleMessage(message) {
        const { content } = message;
        const messageObj = JSON.parse(content.toString());

        console.log('message: ' + content.toString());

        // const handlers = this.getHandlers();
        const pattern = JSON.stringify(messageObj.pattern);
        if (!this.messageHandlers[pattern]) {
            return;
        }

        const handler = this.messageHandlers[pattern];
        const response$ = this.transformToObservable(await handler(messageObj.data)) as Observable<any>;
        response$ && this.send(response$, (data) => this.sendMessage(data));
    }

    private sendMessage(message) {
        const buffer = Buffer.from(JSON.stringify(message));
        this.channel.sendToQueue(`${this.queue}_pub`, buffer);
    }

    private async init() {
        this.server = await connect(this.host);
        this.channel = await this.server.createChannel();
        this.channel.assertQueue(`${this.queue}_sub`, { durable: false });
        this.channel.assertQueue(`${this.queue}_pub`, { durable: false });
    }
}