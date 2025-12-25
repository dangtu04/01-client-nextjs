interface IThumbnail {
  publicId: string;
  secureUrl: string;
}

interface ICategory {
  _id: string;
  name: string;
}

interface IBrand {
  _id: string;
  name: string;
}

export interface IProductVariant {
  sizeId: string;
  sizeCode?: string;
  sizeName?: string;
  quantity: number;
  isAvailable: boolean;
}

export interface IProductTable {
  _id: string;
  name: string;
  price: number;
  thumbnail: IThumbnail;
  categoryIds: ICategory[]; // Đã populate
  brandId: IBrand; // Đã populate
  variants: IProductVariant[];
  status: "active" | "inactive" | "draft";
}

export interface IProductDetail extends IProductTable {
  slug: string;
  description: string;
  material: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
