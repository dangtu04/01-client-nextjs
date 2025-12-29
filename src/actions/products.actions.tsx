"use server";

import { auth } from "@/auth";
import { IProductVariant } from "@/types/models/product.model";
import { sendAuthRequest, sendRequestFile } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const handleCreateProductAction = async (formData: FormData) => {
  const session = await auth();
  const res = await sendRequestFile<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`,
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  revalidateTag("list-products");
  return res;
};

export const handleUpdateProductAction = async (
  id: string,
  formData: FormData
) => {
  const session = await auth();
  const res = await sendRequestFile<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${id}`,
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  revalidateTag("list-products");
  return res;
};

export const handleUpdateProductVariantsAction = async (
  id: any,
  variants: IProductVariant
) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${id}/variants`,
    method: "PUT",
    body: { variants },
  });

  revalidateTag("list-products");
  return res;
};

export const handleDeleteProductAction = async (id: any) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${id}`,
    method: "DELETE",
  });

  revalidateTag("list-products");
  return res;
};

export const handleBulkAddImagesAction = async (
  id: string,
  formData: FormData
) => {
  const session = await auth();
  const res = await sendRequestFile<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${id}/images-detail`,
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  revalidateTag("list-products");
  return res;
};

export const handleBulkUpdateImagesAction = async (
  id: string,
  formData: FormData
) => {
  const session = await auth();
  const res = await sendRequestFile<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${id}/images-detail`,
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  revalidateTag("list-products");
  return res;
};
