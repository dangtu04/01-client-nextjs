import CategoryTable from "@/components/admin/categories/category.table";
import { ICategoryParent, ICategoryTable } from "@/types/models/category.model";
import { sendAuthRequest } from "@/utils/api";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ManageCategoryPage = async (props: IProps) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;

  const res = await sendAuthRequest<
    IBackendRes<IModelPaginate<ICategoryTable>>
  >({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`,
    method: "GET",
    queryParams: { current, pageSize },
    nextOption: {
      next: { tags: ["list-categories"] },
    },
  });

  const listCategoriesForSelect = await sendAuthRequest<
    IBackendRes<IModelPaginate<ICategoryParent>>
  >({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/select/all`,
    method: "GET",
    nextOption: {
      next: { tags: ["list-categories"] },
    },
  });

  return (
    <CategoryTable
      categories={res?.data?.results ?? []}
      meta={res?.data?.meta}
      listCategoriesForSelect={listCategoriesForSelect?.data?.results ?? []}
    />
  );
};

export default ManageCategoryPage;
