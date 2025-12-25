"use server";

import { IUpdateCategoryDTO } from "@/types/models/category.model";
import { sendAuthRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const handleCreateCategoryAction = async (data: any) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`,
    method: "POST",
    body: data,
  });

  revalidateTag("list-categories");
  return res;
};

export const handleUpdateCategoryAction = async (id: any, data: IUpdateCategoryDTO) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/${id}`,
    method: "PATCH",
    body: data,
  });
  revalidateTag("list-categories");
  return res;
};

export const handleDeleteCategoryAction = async (id: any) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/${id}`,
    method: "DELETE",
  });

  revalidateTag("list-categories");
  return res;
};
