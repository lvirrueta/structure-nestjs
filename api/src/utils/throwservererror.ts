import { HttpException } from '@nestjs/common';
import { ErrorResponse } from 'src/common/domain/interface/error-interface';
// import { RpcException } from '@nestjs/microservices';

export class ThrowError {
  static httpException(error: ErrorResponse, params?: string[]): never {
    let messageParams = error.message;
    for (let i = 0; i < error.message.split('$param$').length - 1; i++) {
      messageParams = messageParams.replace('$param$', params[i] || '');
    }

    throw new HttpException(
      {
        message: messageParams,
        code: error.errorCode,
      },
      error.httpStatus,
    );
  }

  // static rpcException(error: ErrorResponse): void {
  //   throw new RpcException(
  //     new HttpException(
  //       {
  //         message: `${error.errorCode}-${error.message}`,
  //       },
  //       error.httpStatus,
  //     ),
  //   );
  // }
}
