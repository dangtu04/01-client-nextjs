import CustomerFooter from "@/components/customer/layouts/footer";
import CustomerHeader from "@/components/customer/layouts/header";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Header */}
      <CustomerHeader />
      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <CustomerFooter />
      {/* Mini Cart (floating) */}
    </div>
  );
}
