import { auth } from "@/auth";
import CustomerFooter from "@/components/customer/layouts/footer";
import CustomerHeader from "@/components/customer/layouts/header";
import { ICartItem } from "@/types/models/cart.model";
import { sendAuthRequest } from "@/utils/api";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch cart data to get totalQty
  const res = await sendAuthRequest<IBackendRes<IModelPaginate<ICartItem>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/carts`,
    method: "GET",
    queryParams: { current: 1, pageSize: 1 },
    nextOption: {
      next: { tags: ["cart-total"] },
      // cache: "no-store",
    },
  });

  const totalQty = res?.data?.meta?.totals || 0;

  const session = await auth();

  const isAuthenticated = session?.user?.access_token? true : false;


  return (
    <div>
      {/* Header */}
      <CustomerHeader totalQty={totalQty} isAuthenticated={isAuthenticated} />
      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <CustomerFooter />
      {/* Mini Cart (floating) */}
    </div>
  );
}
