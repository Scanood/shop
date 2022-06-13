import Layout from "@/components/layout";
import OrderDetail from "@/components/order/detail";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ORDERDETAIL } from "@/graphql/order/queries";
import { UPDATEORDERSTATE } from "@/graphql/order/mutations";
import { apolloClient } from "@/graphql/apollo/apolloClient";
import { useEffect } from "react";
import Spinner from "@/components/spinner";
import Head from "next/head";
export default function OrderDetailPage() {
  const [updateStatusMutation] = useMutation(UPDATEORDERSTATE);
  const router = useRouter();
  const token = router.query.token;
  const [query, { data, loading, error }] = useLazyQuery(ORDERDETAIL);
  useEffect(() => {
    if (token)
      query({
        variables: { token: token },
      });
  }, [token]);
  function updateOrderStatus(status) {
    updateStatusMutation({
      variables: {
        order: token,
        status,
      },
    })
      .then(() => {
        apolloClient.refetchQueries({ include: "active" });
      })
      .catch((e) => alert(e));
  }
  if (data && data.orderDetail)
    return (
      <>
        <Head>
          <title>YOLO商城-订单详情</title>
          <meta name="description" content="YOLO商城-订单详情页" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <OrderDetail
          order={data.orderDetail}
          updateOrderStatus={updateOrderStatus}
        />
      </>
    );
  if (error) router.push("/404");
  if (loading || token) return <Spinner />;
}

OrderDetailPage.getLayout = function getLayout() {
  return (
    <Layout>
      <OrderDetailPage />
    </Layout>
  );
};
