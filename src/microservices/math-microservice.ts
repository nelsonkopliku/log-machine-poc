import {ClientMetadata, Transport} from '@nestjs/microservices';

export const MathMicroservice: ClientMetadata = {
    transport: Transport.TCP,
    port: 5667,
};