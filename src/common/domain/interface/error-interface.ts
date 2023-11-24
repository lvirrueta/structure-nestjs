import { HttpStatus } from '@nestjs/common';

export interface ErrorResponse {
  message: string;
  errorCode: string;
  httpStatus: HttpStatus | number;
}
