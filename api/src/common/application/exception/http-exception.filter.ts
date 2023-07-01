import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpAdapterHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { JsonResponse } from '../model/json-response.class';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const eResponse = exception.getResponse() as any;
    const eMessage = eResponse.message;
    const eCode = eResponse.code;
    const responseP = status !== 500 ? new JsonResponse({ succeed: false, code: eCode, message: eMessage, data: undefined }) : eResponse;

    response.status(status).json(responseP);
  }
}
