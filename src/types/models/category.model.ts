export interface ICategoryParent {
  _id: string;
  name: string;
}
export interface ICategoryTable {
  _id: string;
  name: string;
  slug: string;

  parentId: ICategoryParent | null;

  level: number;
  order: number;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;

  __v?: number;
}

export interface ICreateCategoryDTO {
  name: string; // "Áo thun nam"

  parentId?: string | null; // null = category cha

  order?: number; // thứ tự hiển thị

  isActive?: boolean;
}

export interface IUpdateCategoryDTO extends Partial<ICreateCategoryDTO> {}
