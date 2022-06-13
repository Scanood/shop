import Layout from "@/components/layout";
import Category from "@/components/category";
import { getCategoryDetail, getAllCategories } from "@/lib/ssr/category";
import ProductList from "@/components/products";
import { CATEGORYPRODUCT } from "@/graphql/category/queries";
import { useQuery } from "@apollo/client";
import Pagination from "@/components/order/pagination";
import { useState } from "react";
import Spinner from "@/components/spinner";
import Head from "next/head";
export default function CategoryPage({ category, slug }) {
  const [page, setPage] = useState(1);
  const { data, loading, error, fetchMore } = useQuery(CATEGORYPRODUCT, {
    variables: { perCount: 4, number: page, slug },
  });
  function onFetchMore(page) {
    fetchMore({
      variables: {
        number: page,
      },
    });
    setPage(page);
  }
  if (data)
    return (
      <div>
        <Head>
          <title>{`YOLO商品种类详情-${category.name}`}</title>
          <meta name="description" content="YOLO商城-商品种类" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Category category={category} />
        <h1 className="text-4xl text-gray-700 font-bold md:text-4xl ml-16">
          <a name="product">商城好物</a>
        </h1>
        <ProductList products={data.productCategoryPublished.products} />
        <Pagination
          hasPrevious={data.productCategoryPublished.hasPrevious}
          hasNext={data.productCategoryPublished.hasNext}
          count={data.productCategoryPublished.count}
          page={page}
          onFetchMore={onFetchMore}
        />
      </div>
    );
  if (loading)
    return (
      <div>
        <Category category={category} />
        <Spinner />
      </div>
    );
}
//ssr
export async function getStaticProps(context) {
  try {
    const category = await getCategoryDetail(context.params.slug);
    return {
      props: {
        category,
        slug: context.params.slug,
      },
      revalidate: 30, // In seconds
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
export async function getStaticPaths() {
  const categories = await getAllCategories();
  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}
CategoryPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
