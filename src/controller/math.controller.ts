import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {Observable} from 'rxjs/Observable';

@Controller()
export class MathController {
    // @MessagePattern({ cmd: 'sum' })
    // sum(data: number[]): number {
    //     return (data || []).reduce((a, b) => a + b);
    // }

    @MessagePattern({ cmd: 'sum' })
    sum(data: number[]): Observable<number> {
        // return Observable.from([1, 2, 3]);
        return Observable.from(data || []).reduce((a, b) => a + b);
    }
}