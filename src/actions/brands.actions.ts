"use server";
import { IUpdateBrandDTO } from "@/types/models/brand.model";
import { sendAuthRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const handleCreateBrandAction = async (data: any) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/brands`,
    method: "POST",
    body: data,
  });

  revalidateTag("list-brands");
  return res;
};

export const handleUpdateBrandAction = async (id: any, data: IUpdateBrandDTO) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/brands/${id}`,
    method: "PATCH",
    body: data,
  });
  revalidateTag("list-brands");
  return res;
};

export const handleDeleteBrandAction = async (id: any) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/brands/${id}`,
    method: "DELETE",
  });

  revalidateTag("list-brands");
  return res;
};
