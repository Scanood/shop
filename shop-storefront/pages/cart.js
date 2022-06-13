import Layout from "@/components/layout";
import Cart from "@/components/cart";
import { CART } from "@/graphql/cart/queries";
import { REMOTECARTITEM, SUBMITCHECKOUT } from "@/graphql/cart/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { apolloClient } from "@/graphql/apollo/apolloClient";
import Spinner from "@/components/spinner";
import Address from "@/components/cart/address";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
export default function CartPage() {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [showCart, setShowCart] = useState(true);

  const { data, loading, error } = useQuery(CART, {
    fetchPolicy: "network-only",
  });
  const [removeItemMutation] = useMutation(REMOTECARTITEM);
  const [submitMutation] = useMutation(SUBMITCHECKOUT);

  function removeItem(id) {
    removeItemMutation({
      variables: {
        id,
      },
    })
      .then(() => {
        apolloClient.refetchQueries({ include: "active" });
      })
      .catch((e) => alert(e));
  }
  function submitCheckout(addressId) {
    const variants = [];
    const lines = data.checkout.lines;
    for (let index in lines) {
      variants.push(lines[index].variant.slug);
    }
    submitMutation({
      variables: {
        input: {
          addressId,
          variants,
          note,
        },
      },
    })
      .then((res) => {
        console.log(res.data.OrderCreate.order.token);
        router.push(`/pay/${res.data.OrderCreate.order.token}`);
      })
      .catch((e) => alert(e));
  }
  if (data && data.checkout)
    return (
      <div>
        <Head>
          <title>YOLO-我的购物车</title>
          <meta name="description" content="YOLO商城-购物车" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div style={{ display: showCart ? "block" : "none" }}>
          <Cart
            lines={data.checkout.lines}
            removeItem={removeItem}
            note={{ note, setNote }}
            setShowCart={setShowCart}
          />
        </div>
        <div style={{ display: !showCart ? "block" : "none" }}>
          <Address
            addresses={data.accountAddresses.addresses}
            setShowCart={setShowCart}
            submitCheckout={submitCheckout}
          />
        </div>
      </div>
    );
  if (loading)
    return (
      <div className=" mt-20">
        <Spinner />
      </div>
    );
  if (error) return <></>;
}

CartPage.getLayout = function getLayout() {
  return (
    <Layout>
      <CartPage />
    </Layout>
  );
};
