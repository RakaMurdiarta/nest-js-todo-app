import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TransformPasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();

    req.body.password = bcrypt.hashSync(req.body.password, 12);

    return next.handle();
  }
}
