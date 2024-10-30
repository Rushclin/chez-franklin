import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Categorie, Prisma } from '@prisma/client';
import { handlerCatchError } from 'src/interceptors/handler-catch-exception-filter';
import { PrismaService } from 'src/provider/prisma/prisma.service';

@Injectable()
export class CategorieService {
  logger: Logger = new Logger(CategorieService.name);
  constructor(public prisma: PrismaService) {}

  async list(params?: {
    where?: Prisma.CategorieWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.Enumerable<Prisma.CategorieOrderByWithAggregationInput>;
    cursor?: Prisma.CategorieWhereUniqueInput;
  }): Promise<Categorie[]> {
    try {
      const { where, skip, take, orderBy, cursor } = params;
      const result = await this.prisma.categorie.findMany({
        where,
        skip,
        take,
        orderBy,
        cursor,
      });
      this.logger.log('Recuperation des categories');
      return result;
    } catch (error) {
      this.logger.error(error);
      handlerCatchError(error);
    }
  }

  async create(data: Prisma.CategorieUncheckedCreateInput): Promise<Categorie> {
    this.logger.log(`Creation de la categorie ${data.libelle}`);

    try {
      const result = await this.prisma.categorie.create({ data });
      this.logger.log(`Categorie ${result.libelle} cree avec succes`);
      return result;
    } catch (error) {
      this.logger.error(error);
      handlerCatchError(error);
    }
  }

  async update(
    id: number,
    data: Prisma.CategorieUpdateInput,
  ): Promise<Categorie> {
    await this.checkCategorie(id);
    try {
      const result = await this.prisma.categorie.update({
        data,
        where: {
          id,
        },
      });

      return result;
    } catch (error) {
      this.logger.error(error);
      handlerCatchError(error);
    }
  }

  public async checkCategorie(id: number): Promise<Categorie> {
    const categorie = await this.prisma.categorie.findFirst({
      where: {
        id,
      },
    });
    if (!categorie) {
      this.logger.error("La categorie n'existe pas ");
      throw new NotFoundException(`Categorie ${id}`);
    }
    return categorie;
  }
}
