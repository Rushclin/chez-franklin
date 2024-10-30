import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isBoolean } from 'class-validator';
/** Convert a string like "1" to a number, but without NaN */
@Injectable()
export class BoolPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): boolean {
    if (value === undefined) return undefined;
    if (value === null) return false;
    const result = this.getBoolean(value);
    if (!isBoolean(result))
      throw new BadRequestException("OPTIONAL_BOOL_PIPE_NUMBER");
    return result;
  }
  private getBoolean(value) {
    switch (value) {
      case true:
      case 'true':
      case 1:
      case '1':
      case 'on':
      case 'yes':
        return true;
      default:
        return false;
    }
  }
}
