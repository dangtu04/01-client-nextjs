import ProductTable from "@/components/admin/products/product.table";
import { IProductTable } from "@/types/models/product.model";
import { sendAuthRequest } from "@/utils/api";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ManageProductPage = async (props: IProps) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;

  const res = await sendAuthRequest<IBackendRes<IModelPaginate<IProductTable>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`,
    method: "GET",
    queryParams: { current, pageSize },
    nextOption: {
      next: { tags: ["list-products"] },
    },
  });

  return (
    <div>
      <ProductTable
        products={res?.data?.results ?? []}
        meta={res?.data?.meta}
      />
    </div>
  );
};

export default ManageProductPage;
