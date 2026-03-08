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
//  tiếp theo sẽ xử lý lấy phần params rồi gửi về BE để hàm handleVNPayUrl xử lý xác thực, rồi chỉ cần nhận lại cái kết quả từ đó
// http://localhost:3000/payment/VNPay/return?
// vnp_Amount=129800000&
// vnp_BankCode=NCB&
// vnp_BankTranNo=VNP15442019&
// vnp_CardType=ATM&
// vnp_OrderInfo=Thanh+toan+don+hang+69ac50c276f48ce9a1e3085f&
// vnp_PayDate=20260307232551&vnp_ResponseCode=00&
// vnp_TmnCode=1VDO0HHN&
// vnp_TransactionNo=15442019&
// vnp_TransactionStatus=00&
// vnp_TxnRef=69ac50c276f48ce9a1e3085f&
// vnp_SecureHash=749abcf69b9ab6207cce4b4958475cccbfc27cf21fe5e4773dc8bbd5bad7fdcaf5c7d21aa2f18ba18b23731da0b3d5c45d6ff809ab643569e074ece311b0bee7


// http://localhost:3000/payment/VNPay/return?vnp_Amount=102800000&vnp_BankCode=NCB&vnp_BankTranNo=VNP15442120&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+don+hang+69ace33b25204838b1f8dcbf&vnp_PayDate=20260308095044&vnp_ResponseCode=00&vnp_TmnCode=1VDO0HHN&vnp_TransactionNo=15442120&vnp_TransactionStatus=00&vnp_TxnRef=69ace33b25204838b1f8dcbf&vnp_SecureHash=f0dfdbffa0022ce1348f3b20cfd05aae8562ca9b30f1a5c54677b593e04ff3bc59822c371c9e356170d69cbacc4548e533d0c25d82e5631685b465c5f79af890