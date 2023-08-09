import { HttpStatus } from '@nestjs/common';
import { AppException } from './AppException';

export class WrongLocationTypeException extends AppException {
  constructor(message: string, construction?: any) {
    super(
      HttpStatus.NOT_FOUND,
      'WrongLocationTypeException',
      message,
      construction,
    );
  }
}
