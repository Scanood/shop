import Layout from "@/components/layout";
import ProductList from "@/components/products";
import Pagination from "@/components/order/pagination";
import { useState } from "react";
import { PRODUCTS } from "@/graphql/product/queries";
import { useQuery } from "@apollo/client";
import Spinner from "@/components/spinner";
import Head from "@/components/products/head"
export default function ProductPage() {
  const [page, setPage] = useState(1);
  const { data, loading, error, fetchMore } = useQuery(PRODUCTS, {
    variables: { perCount: 4, number: page },
  });
  function onFetchMore(page) {
    fetchMore({
      variables: {
        number: page,
      },
    });
    setPage(page);
  }
  if (data && data.productsPublished)
    return (
      <>
        <ProductList products={data.productsPublished.products} />
        <Pagination
          hasPrevious={data.productsPublished.hasPrevious}
          hasNext={data.productsPublished.hasNext}
          count={data.productsPublished.count}
          page={page}
          onFetchMore={onFetchMore}
        />
      </>
    );
  if (loading) return <Spinner />;
}

ProductPage.getLayout = function getLayout(page) {
  return (
    <Layout>
     <Head />
      {page}
    </Layout>
  );
};
