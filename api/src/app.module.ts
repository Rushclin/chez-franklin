import { Module } from '@nestjs/common';
import { PrismaModule } from './provider/prisma/prisma.module';
import { ProduitModule } from './modules/produits/produit.module';
import { CategorieModule } from './modules/categorie/categorie.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './interceptors/http-exception.filter';

@Module({
  imports: [PrismaModule, ProduitModule, CategorieModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
})
export class AppModule {}
