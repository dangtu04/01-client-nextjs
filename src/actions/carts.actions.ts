"use server";

import { sendAuthRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const handleAddtoCartAction = async (
  productId: string,
  sizeId: string,
  quantity: number
) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/carts`,
    method: "POST",
    body: { productId, sizeId, quantity },
  });

  revalidateTag("list-carts");
  revalidateTag("cart-total");

  return res;
};

export const handleDeleteCartItemAction = async (itemId: string) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/carts/${itemId}`,
    method: "DELETE",
  });

  revalidateTag("list-carts");
  revalidateTag("cart-total");
  return res;
};


export const handleUpdateCartItemAction = async (
  itemId: string,
  newQuantity: number
) => {
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/carts`,
    method: "PATCH",
    body: { id: itemId,  newQuantity },
  });
  console.log('>>>> call api update')
  revalidateTag("list-carts");
  return res;
};