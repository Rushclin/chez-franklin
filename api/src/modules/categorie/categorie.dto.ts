import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CategorieCreateDto {
  @IsNumber()
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
  libelle: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  couleur: string;
}

export class CategorieUpdateDto extends CategorieCreateDto{}