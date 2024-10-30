import { Categorie, Prisma, Produit } from '@prisma/client';
import { CategorieCreateDto } from 'src/modules/categorie/categorie.dto';
import { ProduitCreateDto } from 'src/modules/produits/produit.dto';

/**
 * La fonction qui doit permettre de transformer un object ProduitCreateDto en un object Produit
 * @param input ProduitCreateDto
 * @returns Produit
 */
export const fromProduitDtoToPrismaproduit = (
  input: ProduitCreateDto,
): Produit => {
  return {
    archive: false,
    categorieId: input.categorieId,
    couverture: input.couverture,
    dateCreation: input.dateCreation,
    dateEdition: input.dateEdition,
    description: input.description,
    id: input.id,
    images: input.images,
    libelle: input.libelle,
    nouveaute: input.nouveaute,
    pieceVendue: input.pieceVendue,
    prixAncien: new Prisma.Decimal(input.prixAncien),
    prixCourant: new Prisma.Decimal(input.prixCourant),
    promotion: input.promotion,
    revue: input.revue,
    slug: input.slug,
    votes: input.votes,
  };
};

export const fromPrismaProduitToProduitDto = (
  input: Produit,
): ProduitCreateDto => {
  return {
    categorieId: input.categorieId,
    couverture: input.couverture,
    dateCreation: input.dateCreation,
    dateEdition: input.dateEdition,
    description: input.description,
    id: input.id,
    images: input.images,
    libelle: input.libelle,
    nouveaute: input.nouveaute,
    pieceVendue: input.pieceVendue,
    prixAncien: Number(input.prixAncien),
    prixCourant: Number(input.prixCourant),
    promotion: input.promotion,
    revue: input.revue,
    slug: input.slug,
    votes: input.votes,
  };
};

export const fromCategorieDtoToCategoriePrisma = (
  input: CategorieCreateDto,
): Categorie => {
  return {
    couleur: input.couleur,
    dateCreation: input.dateCreation,
    dateEdition: input.dateEdition,
    description: input.description,
    id: input.id,
    image: input.image,
    libelle: input.libelle,
  };
};


export const fromPrismaCategorieToCategorieDto = (
    input: Categorie,
  ): CategorieCreateDto => {
    return {
      couleur: input.couleur,
      dateCreation: input.dateCreation,
      dateEdition: input.dateEdition,
      description: input.description,
      id: input.id,
      image: input.image,
      libelle: input.libelle,
    };
  };
  