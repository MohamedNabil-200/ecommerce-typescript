import useCategories from "@/hooks/useCategories";
import { GridList, Heading } from "@/components/common";
import Category from "@/components/eCommerce/Category/Category";
import { Loading } from "@/components/feedback";

const Categories = () => {
  const { loading, error, records } = useCategories();

  return (
    <>
      <Heading title="Categories" />
      <Loading status={loading} error={error}>
        <GridList
          emptyMessage="There are no categories"
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </>
  );
};

export default Categories;
