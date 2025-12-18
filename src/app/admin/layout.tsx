import { auth } from "@/auth";
import { AdminContextProvider } from "../library/admin.context";
import AdminSideBar from "@/components/admin/layouts/admin.sidebar";
import AdminHeader from "@/components/admin/layouts/admin.header";
import AdminContent from "@/components/admin/layouts/admin.content";
import AdminFooter from "@/components/admin/layouts/admin.footer";
import { redirect } from "next/navigation";
import { UserRole } from "@/utils/roles";
const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // console.log(">>>>> check render")
  const session = await auth();

  if (session?.user?.role !== UserRole.ADMIN) {
    redirect("/");
  }
  // console.log(">>> check sessions: ", session);
  return (
    <AdminContextProvider>
      <div style={{ display: "flex" }}>
        <div className="left-side" style={{ minWidth: 80 }}>
          <AdminSideBar />
        </div>
        <div className="right-side" style={{ flex: 1 }}>
          <AdminHeader session={session} />
          <AdminContent>{children}</AdminContent>
          <AdminFooter />
        </div>
      </div>
    </AdminContextProvider>
  );
};

export default AdminLayout;
