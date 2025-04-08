import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

interface ErrorResponse {
  error?: string;
  details?: string | string[];
  sqlMessage?: string;
  stack?: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '服务器内部错误';
    let code = 500;
    let data: ErrorResponse | null = null;

    // 处理HTTP异常
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      // 处理验证错误
      if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
        const response = exceptionResponse as any;
        
        if (Array.isArray(response.message)) {
          message = response.message.join('; ');
        } else {
          message = response.message;
        }
        
        if ('error' in response) {
          data = {
            error: response.error,
            details: response.message
          };
        }
      } else {
        message = typeof exceptionResponse === 'string' 
          ? exceptionResponse 
          : exception.message;
      }
      code = status;
    } 
    // 处理TypeORM的查询错误
    else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      code = (exception as any).errno || 400;
      
      switch ((exception as any).code) {
        case 'ER_NO_DEFAULT_FOR_FIELD':
          message = '请填写必要的字段信息';
          data = {
            error: 'Missing Required Fields',
            sqlMessage: (exception as any).sqlMessage
          };
          break;
        case 'ER_DUP_ENTRY':
          message = '数据已存在，请勿重复创建';
          break;
        case 'ER_NO_REFERENCED_ROW':
          message = '关联的数据不存在';
          break;
        default:
          message = '数据操作失败，请检查输入';
      }
    }
    // 处理其他未知错误
    else if (exception instanceof Error) {
      message = exception.message;
      data = {
        error: exception.name,
        stack: process.env.NODE_ENV === 'development' ? exception.stack : undefined
      };
    }

    response.status(status).json({
      code,
      message,
      data,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
