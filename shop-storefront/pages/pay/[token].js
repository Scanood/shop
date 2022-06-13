import { useRouter } from "next/router";
import Layout from "@/components/layout";
import { useState } from "react";
import { PAYFORORDER } from "@/graphql/cart/mutations";
import { useMutation } from "@apollo/client";
import Modal from "@/components/modal";
import Head from "next/head";
export default function PayPage() {
  const [getway, setGetway] = useState("ALIPAY");
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [payOrder] = useMutation(PAYFORORDER);
  function Pay() {
    const token = router.query.token;
    payOrder({
      variables: {
        getway,
        token,
      },
    })
      .then((res) => {
        window.open(res.data.PayForOrder.url, "_blank");
        setShow(true);
      })
      .catch((e) => alert(e));
  }
  return (
    <>
      <Head>
        <title>YOLO商城-订单支付</title>
        <meta name="description" content="YOLO商城-订单支付" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal
        content="您是否完成支付？"
        isVisiable={show}
        canceled={() => {
          setShow(false);
        }}
        confirmed={() => {
          router.push("/");
        }}
      />
      <div className="w-2/3 m-auto">
        <h1 className="text-xl font-bold mt-10">请选择支付方式：</h1>
        <div className="flex justify-evenly">
          <div className="form-check flex items-center">
            <input
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="getway"
              id="flexRadioDefault1"
              value="ALIPAY"
              onClick={() => setGetway("ALIPAY")}
              defaultChecked
            />
            <label
              className="form-check-label inline-block text-gray-800"
              htmlFor="flexRadioDefault1"
            >
              <img src="/alipay.png" width={168} height={58} />
            </label>
          </div>
          <div className="form-check flex items-center">
            <input
              className=" form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
              type="radio"
              name="getway"
              id="flexRadioDefault2"
              value="WEXINPAY"
              disabled
              onClick={() => setGetway("WEXINPAY")}
            />
            <label
              className="form-check-label inline-block text-gray-800"
              htmlFor="flexRadioDefault2"
            >
              <img src="/wechatpay.png" width={168} height={58} />
            </label>
          </div>
        </div>
        <a>
          <button
            onClick={Pay}
            className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none"
          >
            <span className="ml-2">支付</span>
          </button>
        </a>
      </div>
    </>
  );
}

PayPage.getLayout = function getLayout() {
  return (
    <Layout>
      <PayPage />
    </Layout>
  );
};
