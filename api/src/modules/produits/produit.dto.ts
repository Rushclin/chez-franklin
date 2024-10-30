import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProduitCreateDto {
  @IsInt()
  @IsOptional()
  id?: number;
  
  @IsISO8601()
  @IsOptional()
  dateCreation?: Date;

  @IsISO8601()
  @IsOptional()
  dateEdition?: Date;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  libelle: string;

  @IsNumber()
  @IsNotEmpty()
  categorieId: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  couverture: string;

  @IsArray()
  images: string[];

  @IsNumber()
  @IsNotEmpty()
  prixCourant: number;

  @IsNumber()
  @IsNotEmpty()
  prixAncien: number;

  @IsNumber()
  @IsNotEmpty()
  votes: number;

  @IsNumber()
  @IsNotEmpty()
  revue: number;

  @IsNumber()
  @IsNotEmpty()
  pieceVendue: number;

  @IsBoolean()
  promotion: boolean;

  @IsBoolean()
  nouveaute: boolean;
}

export class ProduitUpdateDto extends ProduitCreateDto {

  @IsDate()
  dateCreation: Date;

  @IsDate()
  dateEdition: Date;
}
