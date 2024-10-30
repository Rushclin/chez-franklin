import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

export function handlerCatchError(error: any, errorType?: string) {
  if (error instanceof Prisma.PrismaClientKnownRequestError)
    if (error.code === 'P2002') throw new ConflictException(errorType);
  throw new InternalServerErrorException('Intersal server error', error);
}
