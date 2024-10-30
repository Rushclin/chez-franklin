import { Module } from '@nestjs/common';
import { CategorieController } from './categorie.controller';
import { CategorieService } from './categorie.service';
import { PrismaModule } from 'src/provider/prisma/prisma.module';

@Module({
  controllers: [CategorieController],
  providers: [CategorieService],
  imports: [PrismaModule],
  exports: [CategorieService],
})
export class CategorieModule {}
