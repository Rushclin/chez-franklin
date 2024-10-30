import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class NumbersArrayPipe implements PipeTransform<string, number[]> {
  transform(value: string): number[] {
    const numbers = value.split(',').map(Number);

    if (numbers.some(isNaN)) {
      throw new BadRequestException('Invalid array format');
    }

    return numbers;
  }
}
