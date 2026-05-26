import useProducts from "@/hooks/useProducts";
import { GridList, Heading } from "@/components/common";
import { Product } from "@/components/eCommerce";
import { Loading } from "@/components/feedback";

const Products = () => {
  const { paramsPrefix, loading, error, productFullInfo } = useProducts();
  return (
    <>
      <Heading
        title={`${
          (paramsPrefix?.charAt(0).toUpperCase() as string) +
          paramsPrefix?.slice(1)
        } Products`}
      />
      <Loading status={loading} error={error} type="product">
        <GridList
          emptyMessage="There are no products"
          records={productFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Products;
