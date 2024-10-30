import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategorieService as Service } from './categorie.service';
import { CategorieCreateDto, CategorieUpdateDto } from './categorie.dto';
import {
  fromCategorieDtoToCategoriePrisma,
  fromPrismaCategorieToCategorieDto,
} from 'src/common/mappers';
import { OptionalIntPipe } from 'src/pipes/optional-int.pipe';
import { OrderByPipe } from 'src/pipes/order-by.pipe';

@Controller('categories')
export class CategorieController {
  constructor(public service: Service) {}

  @Get()
  async list(
    @Query('take', OptionalIntPipe) take: number,
    @Query('skip', OptionalIntPipe) skip: number,
    @Query('orderBy', OrderByPipe) orderBy?: string,
    @Query('libelle') whereLibelle?: string,
  ): Promise<CategorieCreateDto[]> {
    const result = await this.service.list({
      where:{
        libelle: {
          mode: 'insensitive',
          contains: whereLibelle
        }
      },
      skip,
      take,
      orderBy: orderBy ? JSON.parse(orderBy) : { libelle: 'asc' },
    })
    return result.map(fromPrismaCategorieToCategorieDto);
  }

  @Post()
  async create(@Body() data: CategorieCreateDto): Promise<CategorieCreateDto> {
    const result = await this.service.create(
      fromCategorieDtoToCategoriePrisma(data),
    );
    return fromPrismaCategorieToCategorieDto(result);
  }

  @Patch(':id')
  async update(
    @Body() data: CategorieUpdateDto,
    @Param('id', OptionalIntPipe) id: number,
  ): Promise<CategorieUpdateDto> {
    const result = await this.service.update(
      Number(id),
      fromCategorieDtoToCategoriePrisma(data),
    );

    return fromPrismaCategorieToCategorieDto(result);
  }
}
