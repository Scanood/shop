import dayjs from "dayjs";
import Status from "@/components/order/status";
import { TrashIcon, SearchIcon } from "@heroicons/react/solid";
import Modal from "@/components/modal";
import { DELETEORDER } from "@/graphql/order/mutations";
import { useState } from "react";
import { apolloClient } from "@/graphql/apollo/apolloClient";
import Link from "next/link";
export default function Order(props) {
  const [visiable, setVisiable] = useState(false);
  const [deleteToken, setDeleteToken] = useState(null);
  function formatDate(date) {
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  }
  async function deleteOrder() {
    await apolloClient
      .mutate({
        mutation: DELETEORDER,
        variables: {
          token: deleteToken,
        },
      })
      .then(() => {
        apolloClient.refetchQueries({ include: "active" });
      })
      .catch((e) => alert(e));
    setVisiable(false);
  }
  return (
    <div className="bg-white p-8 rounded-md w-11/12 m-auto">
      <Modal
        content="确定要删除当前订单吗？"
        isVisiable={visiable}
        canceled={() => {
          setVisiable(false);
        }}
        confirmed={deleteOrder}
      />
      <div className=" flex items-center justify-between pb-6">
        <h2 className="text-gray-600 font-semibold">订单</h2>
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    订单号
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    订单金额
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    提交时间
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    订单状态
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                {props?.orders.map((order) => {
                  return (
                    <tr key={order.token}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {order.token}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {order.price}￥
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {formatDate(order.date)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Status status={order.status} />
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex justify-evenly">
                          <Link href={`/order/${order.token}`}>
                            <a>
                              <SearchIcon className="w-5 h-5 hover:cursor-pointer text-blue-600" />
                            </a>
                          </Link>
                          <TrashIcon
                            onClick={() => {
                              setVisiable(true);
                              setDeleteToken(order.token);
                            }}
                            className="w-5 h-5 hover:cursor-pointer text-red-600"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
