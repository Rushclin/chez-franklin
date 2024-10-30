import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProduitService as Service } from './produit.service';
import { ProduitCreateDto, ProduitUpdateDto } from './produit.dto';
import {
  fromPrismaProduitToProduitDto,
  fromProduitDtoToPrismaproduit,
} from 'src/common/mappers';
import { OptionalIntPipe } from 'src/pipes/optional-int.pipe';
import { OrderByPipe } from 'src/pipes/order-by.pipe';

@Controller('produits')
export class ProduitController {
  constructor(public service: Service) {}

  @Get()
  async list(
    @Query('take', OptionalIntPipe) take: number,
    @Query('skip', OptionalIntPipe) skip: number,
    @Query('orderBy', OrderByPipe) orderBy?: string,
    @Query('libelle') whereLibelle?: string,
  ): Promise<ProduitCreateDto[]> {
    const result = await this.service.list({
      where: {
        libelle: {
          mode: 'insensitive',
          contains: whereLibelle,
        },
      },
      skip,
      take,
      orderBy: orderBy ? JSON.parse(orderBy) : { libelle: 'asc' },
    });
    return result.map(fromPrismaProduitToProduitDto);
  }

  @Post()
  async create(
    @Body() data: ProduitCreateDto,
    @Param('categoriId', OptionalIntPipe) categorieId: number,
  ): Promise<ProduitCreateDto> {
    const result = await this.service.create(
      fromProduitDtoToPrismaproduit(data),
      categorieId,
    );
    return fromPrismaProduitToProduitDto(result);
  }

  @Patch(':id')
  async update(
    @Body() data: ProduitUpdateDto,
    @Param('id', OptionalIntPipe) id: number,
  ): Promise<ProduitCreateDto> {
    const result = await this.service.update(
      Number(id),
      fromProduitDtoToPrismaproduit(data),
    );

    return fromPrismaProduitToProduitDto(result);
  }
}
