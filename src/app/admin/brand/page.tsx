import BrandTable from "@/components/admin/brands/brand.table";
import { IBrandTable } from "@/types/models/brand.model";
import { sendAuthRequest } from "@/utils/api";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ManageBrandPage = async (props: IProps) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;

  const res = await sendAuthRequest<IBackendRes<IModelPaginate<IBrandTable>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/brands`,
    method: "GET",
    queryParams: { current, pageSize },
    nextOption: {
      next: { tags: ["list-brands"] },
    },
  });

  return (
    <div>
      <BrandTable brands={res?.data?.results ?? []} meta={res?.data?.meta} />
    </div>
  );
};

export default ManageBrandPage;