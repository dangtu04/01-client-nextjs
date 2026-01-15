import { ISize, IThumbnail, ProductStatus } from "./product.model";

export enum CartLimits {
  MAX_ITEMS = 30,
  MAX_QUANTITY_PER_ITEM = 30,
}

interface ICartVariant {
  isAvailable: boolean;
  stock: number;
}

interface ICartProduct {
  _id: string;
  name: string;
  price: number;
  thumbnail: IThumbnail;
  status: ProductStatus | string; 
}

export interface ICartItem {
  _id: string;
  productId: ICartProduct;
  sizeId: ISize;
  quantity: number;
  variant: ICartVariant;
}
