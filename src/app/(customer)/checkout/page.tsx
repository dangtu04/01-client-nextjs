import Checkout from "@/components/customer/checkout/checkout";
import { ICartItem } from "@/types/models/cart.model";

import { IProfileUser } from "@/types/models/user.model";
import { sendAuthRequest } from "@/utils/api";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const CheckoutPage = async (props: IProps) => {
  const current = Number(props?.searchParams?.current) || 1;
  const pageSize = 5;
  const sort = "-createdAt";
  const cart = await sendAuthRequest<
    IBackendRes<IModelPaginate<ICartItem> & { totalPrice: number }>
  >({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/carts`,
    method: "GET",
    queryParams: { current, pageSize, sort },
    nextOption: {
      next: { tags: ["list-cart"] },
    },
  });

  const userData = await sendAuthRequest<IBackendRes<IProfileUser>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/profile/me`,
    method: "GET",
    nextOption: {
      next: { tags: ["profile-user"] },
    },
  });

  console.log("userData checkout page", userData);
  return (
    <>
      <Checkout
        cartItems={cart?.data?.results ?? []}
        meta={cart?.data?.meta}
        totalPrice={cart?.data?.totalPrice ?? 0}
        userData={userData.data}
      />
    </>
  );
};
export default CheckoutPage;
