import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        console.log(data);

        // 如果返回值已经包含 status 和 message，则直接使用
        if (data && data.status !== undefined && data.message !== undefined) {
          return {
            ...data,
            data: data.data,
            status: data.status,
            success: true,
            message: data.message,
          };
        }

        // 默认值
        return {
          ...data,
          data: data.data,
          status: 200,
          success: true,
          message: '操作成功',
        };
      }),
    );
  }
}
