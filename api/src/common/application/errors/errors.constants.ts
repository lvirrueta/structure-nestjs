import { HttpStatus } from '@nestjs/common';

export const Errors = {
  /** Generic Repository Errors */
  GenericRepository: {
    EntityNotFound: {
      errorCode: `GRENF-0`,
      message: `Entity with id '$param$' not found`,
      httpStatus: HttpStatus.BAD_REQUEST,
    },
    ConstraintError: {
      errorCode: `GRNEF-1`,
      message: `entity '$param$' not found`,
      httpStatus: HttpStatus.BAD_REQUEST,
    },
    UniqueCodeError: {
      errorCode: `GRUQ-2`,
      message: `value '$param$' already exists`,
      httpStatus: HttpStatus.BAD_REQUEST,
    },
    NotNullValues: {
      errorCode: `GRNNV-3`,
      message: `not null values`,
      httpStatus: HttpStatus.BAD_REQUEST,
    },
  },

  /** Auth Errors */
  Auth: {
    InvalidCredentials: {
      errorCode: `AUIC-0`,
      message: `Invalid Credentials`,
      httpStatus: HttpStatus.BAD_REQUEST,
    },
  },
};
