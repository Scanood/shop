import Layout from "@/components/layout";
import Order from "@/components/order";
import { ALLORDERS } from "@/graphql/order/queries";
import { useQuery } from "@apollo/client";
import Spinner from "@/components/spinner";
import { useState } from "react";
import Pagination from "@/components/order/pagination";
import Head from "next/head";
export default function OrderPage() {
  const [page, setPage] = useState(1);
  const { data, loading, error, fetchMore } = useQuery(ALLORDERS, {
    variables: { perCount: 5, number: page },
  });
  function onFetchMore(page) {
    fetchMore({
      variables: {
        number: page,
      },
    });
    setPage(page);
  }
  if (data && data.userOrders)
    return (
      <>
        <Head>
          <title>YOLO商城-订单列表</title>
          <meta name="description" content="YOLO商城-订单列表页" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Order orders={data.userOrders.orders} />
        <Pagination
          hasPrevious={data.userOrders.hasPrevious}
          hasNext={data.userOrders.hasNext}
          count={data.userOrders.count}
          page={page}
          onFetchMore={onFetchMore}
        />
      </>
    );
  if (loading) return <Spinner />;
  if (error) return <></>;
}

OrderPage.getLayout = function getLayout() {
  return (
    <Layout>
      <OrderPage />
    </Layout>
  );
};
