"use server";
import { auth } from "@/auth";
import { sendAuthRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const handleCreateCODOrderAction = async (data: any) => {
  try {
    const session = await auth();
    const userId = session?.user?._id;
    const res = await sendAuthRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders`,
      method: "POST",
      body: data,
    });

    if (res && res.statusCode === 201) {
      revalidateTag(`list-cart-${userId}`);
      revalidateTag(`list-order-${userId}`);
      if (Array.isArray(res.data)) {
        res.data.map((i: string) => revalidateTag(`product-detail-${i}`));
      }
      return { success: true };
    }
    console.log(">>>>> res: ", res);
    return { success: false, message: res?.message };
  } catch (error) {}
};

export const handleCreateVNPayOrderAction = async (data: any) => {
  try {
    const session = await auth();
    const userId = session?.user?._id;
    const res = await sendAuthRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/vnpay`,
      method: "POST",
      body: data,
    });

    if (res && res.statusCode === 201) {
      // revalidateTag(`list-cart-${userId}`);
      // revalidateTag(`list-order-${userId}`);
      // if (Array.isArray(res.data)) {
      //   res.data.map((i: string) => revalidateTag(`product-detail-${i}`));
      // }
      return { success: true, paymentUrl: res.data.paymentUrl };
    }
    console.log(">>>>> res: ", res);
    return { success: false, message: res?.message };
  } catch (error) {}
};
