import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProduitCreateDto } from './produit.dto';
import { Prisma, Produit } from '@prisma/client';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { handlerCatchError } from '../../interceptors/handler-catch-exception-filter';
import { slugify } from '../../helpers/slugify';
import { CategorieService } from '../categorie/categorie.service';

@Injectable()
export class ProduitService {
  logger: Logger = new Logger(ProduitService.name);

  constructor(public prisma: PrismaService, public categorie: CategorieService) {}

  async list(params?: {
    where?: Prisma.ProduitWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.Enumerable<Prisma.ProduitOrderByWithAggregationInput>;
    cursor?: Prisma.ProduitWhereUniqueInput;
  }): Promise<Produit[]> {
    try {
      const { where, skip, take, orderBy, cursor } = params;
      const result = await this.prisma.produit.findMany({
        where,
        skip,
        take,
        orderBy,
        cursor,
      });
      this.logger.log('Récupération des produits');
      return result;
    } catch (error) {
      this.logger.error(error);
      handlerCatchError(error);
    }
  }

  async create(
    data: Omit<Prisma.ProduitUncheckedCreateInput, 'id'>,
    categorieId: number,
  ): Promise<Produit> {
    this.logger.log(`$Creation du produit ${data.slug}`);
    await this.categorie.checkCategorie(categorieId);
    try {
      const slugName = slugify(data.slug);
      const produit = await this.prisma.produit.create({
        data: {
          ...data,
          slug: slugName,
        },
      });
      this.logger.debug(`Produit crée avec success ${produit.slug}`);
      return produit;
    } catch (error) {
      this.logger.error(error);
      handlerCatchError(error);
    }
  }

  async update(
    id: number,
    data: Prisma.ProduitUpdateInput,
  ): Promise<Produit> {
    await this.checkProduit(id);
    try {
      const result = await this.prisma.produit.update({
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

  public async checkProduit(id: number): Promise<Produit> {
    const produit = await this.prisma.produit.findFirst({
      where: {
        id,
      },
    });
    if (!produit) {
      this.logger.error("le produit n'existe pas ");
      throw new NotFoundException(`Produit ${id}`);
    }
    return produit;
  }
}
