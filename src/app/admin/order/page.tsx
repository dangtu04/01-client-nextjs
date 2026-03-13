import OrderTable from "@/components/admin/orders/order.table";
import { sendAuthRequest } from "@/utils/api";
import { IOrder } from "@/types/models/order.model";
import OrderFilter from "@/components/admin/orders/order.filter";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ManageOrderPage = async (props: IProps) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;

  console.log(">>>>>> check searchParams: ", props.searchParams);

  const res = await sendAuthRequest<IBackendRes<IModelPaginate<IOrder>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders`,
    method: "GET",
    queryParams: { current, pageSize, ...props.searchParams },
    nextOption: {},
  });

  return (
    <>
      <OrderFilter />
      <OrderTable orders={res?.data?.results ?? []} meta={res?.data?.meta} />
    </>
  );
};

export default ManageOrderPage;
