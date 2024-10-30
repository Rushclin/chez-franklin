import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/provider/prisma/prisma.module';
import { ProduitController } from './produit.controller';
import { ProduitService } from './produit.service';
import { CategorieModule } from '../categorie/categorie.module';

@Module({
  imports: [PrismaModule, CategorieModule],
  providers: [ProduitService],
  controllers: [ProduitController],
  exports: [ProduitService],
})
export class ProduitModule {}
