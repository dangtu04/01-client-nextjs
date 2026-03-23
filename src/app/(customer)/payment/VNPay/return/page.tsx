import VNPayReturn from "@/components/customer/checkout/vnpay.return";
import { PaymentStatus } from "@/types/models/order.model";
import { sendAuthRequest } from "@/utils/api";

interface VNPayReturnParams {
  vnp_Amount: string;
  vnp_BankCode: string;
  vnp_CardType: string;
  vnp_OrderInfo: string;
  vnp_PayDate: string;
  vnp_ResponseCode: string;
  vnp_TmnCode: string;
  vnp_TransactionNo: string;
  vnp_TransactionStatus: string;
  vnp_TxnRef: string;
  vnp_SecureHash: string;
}

interface VNPayReturnPageProps {
  searchParams: VNPayReturnParams;
}

interface VNPayReturnResponse {
  success: boolean;
  orderId?: string;
  status?: PaymentStatus;
  message?: string;
}

export const metadata = {
  title: "Kết quả thanh toán VNPay",
};
const VNPayReturnPage = async ({ searchParams }: VNPayReturnPageProps) => {
  // console.log("VNPay Return Search Params >>>>>>>>>>>>>:", searchParams);

  const res = await sendAuthRequest<IBackendRes<VNPayReturnResponse>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/vnpay/return`,
    method: "GET",
    queryParams: { ...searchParams },
    // nextOption: {},
  });
  // console.log(">>>>>>>>>>>> response: ", res);
  return <VNPayReturn data={res.data} />;
};

export default VNPayReturnPage;
