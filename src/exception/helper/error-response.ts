import { HttpException, HttpStatus } from '@nestjs/common';

export const errorResponse = (error: any) => {
  if (error instanceof HttpException) {
    throw new HttpException(error.message, error.getStatus());
  }

  throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
};
