import Layout from "@/components/layout";
import SearchBar from "@/components/search";
import ProductList from "@/components/products";
import Pagination from "@/components/order/pagination";
import { useLazyQuery } from "@apollo/client";
import { SEARCHPRODUCTS } from "@/graphql/product/queries";
import { useState } from "react";
import Spinner from "@/components/spinner";
import Head from "next/head";
export default function SearchPage() {
  const [getProducts, { data, loading }] = useLazyQuery(SEARCHPRODUCTS);
  const [keyword, setKeyword] = useState(null);
  const [page, setPage] = useState(1);
  function Search(keyword) {
    getProducts({ variables: { keyword, number: page } });
    setKeyword(keyword);
    setPage(1);
  }
  function onFetchMore(page) {
    getProducts({ variables: { keyword, number: page } });
    setPage(page);
  }
  return (
    <>
      <Head>
        <title>YOLO-搜索商品</title>
        <meta name="description" content="YOLO商城-商品搜索" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar search={Search} />
      {data && data.searchPublishedProducts ? (
        <>
          <ProductList products={data.searchPublishedProducts.products} />
          <Pagination
            hasPrevious={data.searchPublishedProducts.hasPrevious}
            hasNext={data.searchPublishedProducts.hasNext}
            count={data.searchPublishedProducts.count}
            page={page}
            onFetchMore={onFetchMore}
          />
        </>
      ) : loading ? (
        <Spinner />
      ) : (
        <></>
      )}
    </>
  );
}
SearchPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
