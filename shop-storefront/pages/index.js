import Head from "next/head";
import styles from "@/styles/Home.module.css";
import ProductList from "@/components/products";
import { getIndexData } from "@/lib/ssr";
import Layout from "@/components/layout";
import Action from "@/components/home/action";
import CategoryList from "@/components/category/CategoryList";
import Advantage from "@/components/home/advantage";
import Link from "next/link";
export async function getStaticProps() {
  const data = await getIndexData();
  return {
    props: {
      data,
    }, // will be passed to the page component as props
    revalidate: 10, // In seconds
  };
}
export default function Home({ data }) {
  if (data)
    return (
      <div className={styles.container}>
        <Head>
          <title>YOLO-正品低价、品质保障、配送及时、轻松购物</title>
          <meta name="description" content="一个干净又卫生的在线食品商城" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Action />
        <h1 className="text-4xl text-gray-700 font-bold md:text-4xl">
          <a name="product"> 热门商品</a>
        </h1>
        <ProductList products={data.productsPublished.products} />
        <Link href="/product">
          <div className="m-5 mr-10 font-bold text-right cursor-pointer text-blue-600">
            查看更多
          </div>
        </Link>
        <h1 className="text-4xl text-gray-700 font-bold md:text-4xl">
          <a name="category"> 热销类别</a>
        </h1>
        <CategoryList categories={data.categories.categories} />
        <Link href="/category">
          <div className="m-5 mr-10 font-bold text-right cursor-pointer text-blue-600">
            查看更多
          </div>
        </Link>
        <a name="advantage"></a>
        <Advantage />
      </div>
    );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
