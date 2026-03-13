export enum PaymentMethod {
  COD = "COD",
  VNPAY = "VNPAY",
}
export enum OrderStatus {
  PENDING = 'PENDING',         // vừa đặt hàng, chờ admin xác nhận
  CONFIRMED = 'CONFIRMED',     // admin đã xác nhận đơn
  PROCESSING = 'PROCESSING',   // shop đang đóng gói/xử lý
  SHIPPING = 'SHIPPING',       // đang giao cho shipper
  COMPLETED = 'COMPLETED',     // giao thành công, COD đã thu tiền
  CANCELLED = 'CANCELLED',     // user/admin huỷ
  REFUNDED = 'REFUNDED',       // hoàn tiền
}
export enum PaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export interface IOrderAddress {
  provinceCode: number;
  provinceName: string;
  wardCode: number;
  wardName: string;
  detail: string;
}

export interface IOrderDelivery {
  receiverName: string;
  receiverPhone: string;
  address: IOrderAddress;
  note: string;
}

export interface IOrderPayment {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
}

export interface IOrderItem {
  productId: string;
  productName: string;
  productSlug: string;
  price: number;
  sizeId: string;
  sizeCode: string;
  sizeName: string;
  quantity: number;
  totalPrice: number;
  thumbnail: string;
}

export interface IOrder {
  _id: string;
  userId: string;
  userEmail: string;
  items?: IOrderItem[];
  delivery: IOrderDelivery;
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  status: OrderStatus;
  payment: IOrderPayment;
  shippingFee: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
