import Cart from "@/components/customer/cart/cart";
import { ICartItem } from "@/types/models/cart.model";
import { sendAuthRequest } from "@/utils/api";
interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
const CartPage = async (props: IProps) => {
  const current = Number(props?.searchParams?.current) || 1;
  const pageSize = 10;
  const sort = "-createdAt";
  const res = await sendAuthRequest<IBackendRes<IModelPaginate<ICartItem>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/carts`,
    method: "GET",
    queryParams: { current, pageSize, sort },
    nextOption: {
      next: { tags: ["list-cart"] },
      // cache: "no-store",
    },
  });

  return (
    <>
      <Cart items={res?.data?.results ?? []} meta={res?.data?.meta} />
    </>
  );
};

export default CartPage;
