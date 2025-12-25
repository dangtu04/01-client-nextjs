export interface IBrandTable {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// DTOs
export interface ICreateBrandDTO {
  name: string;
  isActive?: boolean;
}

export interface IUpdateBrandDTO extends Partial<ICreateBrandDTO> {}
