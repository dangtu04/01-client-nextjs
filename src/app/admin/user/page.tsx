import UserTable from "@/components/admin/users/user.table";
import { IUserTable } from "@/types/models/user.model";
import { sendAuthRequest } from "@/utils/api";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ManageUserPage = async (props: IProps) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;

  const res = await sendAuthRequest<IBackendRes<IModelPaginate<IUserTable>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
    method: "GET",
    queryParams: { current, pageSize },
    nextOption: {
      next: { tags: ["list-users"] },
    },
  });

  return (
    <div>
      <UserTable users={res?.data?.results ?? []} meta={res?.data?.meta} />
    </div>
  );
};

export default ManageUserPage;
