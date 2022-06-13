import Layout from "@/components/layout";
import Pagination from "@/components/order/pagination";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import Spinner from "@/components/spinner";
import CategoryList from "@/components/category/CategoryList";
import { CATEGORIES } from "@/graphql/category/queries";
import Head from "@/components/category/head";
export default function CategoryPage() {
  const [page, setPage] = useState(1);
  const { data, loading, error, fetchMore } = useQuery(CATEGORIES, {
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
  if (data && data.categories)
    return (
      <>
        <CategoryList categories={data.categories.categories} />
        <Pagination
          hasPrevious={data.categories.hasPrevious}
          hasNext={data.categories.hasNext}
          count={data.categories.count}
          page={page}
          onFetchMore={onFetchMore}
        />
      </>
    );
  if (loading) return <Spinner />;
}

CategoryPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Head />
      {page}
    </Layout>
  );
};
