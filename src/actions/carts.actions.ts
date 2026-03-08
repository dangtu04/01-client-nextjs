"use server";

import { sendAuthRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";
import { auth } from "@/auth";

export const handleAddtoCartAction = async (
  productId: string,
  sizeId: string,
  quantity: number,
) => {
  const session = await auth();
  const userId = session?.user?._id;
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/carts`,
    method: "POST",
    body: { productId, sizeId, quantity },
  });

  revalidateTag(`list-cart-${userId}`);
  revalidateTag("cart-total");

  return res;
};

export const handleDeleteCartItemAction = async (itemId: string) => {
  const session = await auth();
  const userId = session?.user?._id;
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/carts/${itemId}`,
    method: "DELETE",
  });

  revalidateTag(`list-cart-${userId}`);
  revalidateTag("cart-total");
  return res;
};

export const handleUpdateCartItemAction = async (
  itemId: string,
  newQuantity: number,
) => {
  const session = await auth();
  const userId = session?.user?._id;
  const res = await sendAuthRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/carts`,
    method: "PATCH",
    body: { id: itemId, newQuantity },
  });
  revalidateTag(`list-cart-${userId}`);
  return res;
};
