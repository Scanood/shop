import dayjs from "dayjs";
import Status from "@/components/order/status";
import { useRouter } from "next/router";
import { STATIC_URL } from "@/lib/config";
function formatDate(date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}
export default function OrderDetail(props) {
  const order = props.order;
  const address = props.order.address;
  const router = useRouter();
  function showShipping() {
    if (order.shipping) return <div className="font-bold">快递单号：{order.shipping}</div>;
    return <></>;
  }
  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto w-11/12 m-auto">
      <div className="flex justify-start item-start space-y-2 flex-col">
        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          订单: {order.token}
        </h1>
        <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
          {formatDate(order.date)}
        </p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
              订单详情
            </p>
            {order.lines.map((line) => (
              <div
                key={line.variant.id}
                className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
              >
                <div className="pb-4 md:pb-8 w-full md:w-40">
                  <img
                    src={`${STATIC_URL}${line.variant.product.productImage}`}
                    alt="dress"
                  />
                </div>
                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                      {line.variant.product.name}
                    </h3>
                    <div className="flex justify-start items-start flex-col space-y-2">
                      <p className="text-sm dark:text-white leading-none text-gray-800">
                        <span className="dark:text-gray-400 text-gray-500">
                          种类
                        </span>
                        【{line.variant.name}】
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="text-base dark:text-white xl:text-lg leading-6">
                      ￥{line.realPrice}
                      <span className="text-red-300 line-through">
                        ￥{line.price}
                      </span>
                    </p>
                    <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                      {line.quantiy}
                    </p>
                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                      ￥{(line.realPrice * line.quantiy).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                订单明细
              </h3>
              <div className="flex justify-between items-center w-full">
                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                  总金额
                </p>
                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                  ￥{order.price}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                  折扣价
                </p>
                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                  ￥{order.paidPrice}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                订单状态
              </h3>
              <div className="flex justify-between items-start w-full">
                <Status status={order.status} />
              </div>
              {showShipping()}
              <div className="w-full flex justify-center items-center">
                <button
                  style={{
                    display: order.status == "UNFULFILLED" ? "block" : "none",
                  }}
                  onClick={() => {
                    router.push(`/pay/${order.token}`);
                  }}
                  className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                >
                  支付
                </button>
                <button
                  style={{
                    display: order.status == "UNFULFILLED" ? "block" : "none",
                  }}
                  onClick={() => {
                    props.updateOrderStatus("CANCELED");
                  }}
                  className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                >
                  取消
                </button>

                <button
                  style={{
                    display: order.status == "SHIPPED" ? "block" : "none",
                  }}
                  onClick={() => {
                    props.updateOrderStatus("RECEIVED");
                  }}
                  className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                >
                  确认收货
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
            用户
          </h3>
          <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 7L12 13L21 7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="cursor-pointer text-sm leading-5 ">
                  {order.user.email}
                </p>
              </div>
            </div>
            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                    收货地址
                  </p>
                  <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {address.province}-{address.city}-{address.streetAddress}
                    &nbsp;&nbsp;
                    {address.lastName}
                    {address.firstName}-{address.phone}
                  </p>
                </div>
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                  <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                    备注
                  </p>
                  <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {order.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
