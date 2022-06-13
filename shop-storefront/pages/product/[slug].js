import { ssrApolloClient, apolloClient } from "@/graphql/apollo/apolloClient";
import { PRODUCTDETAIL } from "@/graphql/product/queries";
import { getProducts } from "@/lib/ssr/product";
import ProductDetail from "@/components/products/detail";
import Layout from "@/components/layout";
import { ADDTOCART } from "@/graphql/product/mutations";
import Head from "next/head";
export default function ProductDetailPage({ product, variants }) {
  async function addToCart(slug, quantity) {
    await apolloClient
      .mutate({
        mutation: ADDTOCART,
        variables: {
          slug,
          quantity,
        },
      })
      .then(({ data }) => {
        if (data.AddVariantToCheckout?.success) {
          alert("商品已添加到购物车！");
        }
      })
      .catch((e) => console.log(e));
  }
  return (
    <>
      <Head>
        <title>{`YOLO商城-${product.name}详情`}</title>
        <meta name="description" content="YOLO商城-商品详情页" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductDetail
        product={product}
        variants={variants}
        addToCart={addToCart}
      />
    </>
  );
}
//ssr
export async function getStaticPaths() {
  const products = await getProducts();
  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}
export async function getStaticProps(context) {
  let response = null;
  try {
    response = await ssrApolloClient.query({
      query: PRODUCTDETAIL,
      variables: {
        slug: context.params.slug,
      },
    });
  } catch (e) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      product: response.data.productSlugPublished,
      variants: response.data.productVariants.productVariants,
    },
    revalidate: 30,
  };
}
ProductDetailPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
