import { sendAuthRequest } from "@/utils/api";
import { IOrder } from "@/types/models/order.model";
import OrderDetail from "@/components/admin/orders/order.detail";

interface OrderDetailPageProps {
  params: { id: string };
}

const OrderDetailPage = async ({ params }: OrderDetailPageProps) => {
  const { id } = params;

  const res = await sendAuthRequest<IBackendRes<IOrder>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders/${id}`,
    method: "GET",
    nextOption: { tags: [`order-detail-${id}`] },
  });

  const order = res?.data;

  if (!order) {
    return <div>Không tìm thấy đơn hàng</div>;
  }

  return <OrderDetail order={order} />;
};

export default OrderDetailPage;
