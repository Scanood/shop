import { STATIC_URL } from "@/lib/config";
import Link from "next/link";
export default function Cart(props) {
  function removeItem(id) {
    if (props.removeItem) props.removeItem(id);
    return true;
  }
  return (
    <div className="flex justify-center my-6">
      <div className="flex flex-col w-full p-8 text-gray-800 bg-white rounded-md shadow-md pin-r pin-y md:w-4/5 lg:w-4/5">
        <div className="flex-1">
          <table className="w-full text-sm lg:text-base" cellSpacing="0">
            <thead>
              <tr className="h-12 uppercase">
                <th className="hidden md:table-cell"></th>
                <th className="text-left">购买产品</th>
                <th className="lg:text-right text-left pl-5 lg:pl-0">
                  <span className="lg:hidden" title="Quantity">
                    购买数量
                  </span>
                  <span className="hidden  lg:inline">购买数量</span>
                </th>
                <th className="hidden text-right md:table-cell">商品单价</th>
                <th className="text-right">商品总价</th>
              </tr>
            </thead>
            <tbody>
              {props.lines.map((line) => {
                const product = line.variant.product;
                const variant = line.variant;
                return (
                  <tr key={line.id}>
                    <td className="hidden pb-4 md:table-cell">
                      <Link href={`/product/${product.slug}`}>
                        <img
                          src={`${STATIC_URL}${product.productImage}`}
                          className="w-20 rounded cursor-pointer"
                          alt="Thumbnail"
                        />
                      </Link>
                    </td>
                    <td>
                      <Link href={`/product/${product.slug}`}>
                        <p className="mb-2 md:ml-4 cursor-pointer">
                          {product.name}({variant.name})
                        </p>
                      </Link>
                      <button
                        onClick={() => removeItem(line.id)}
                        className="text-gray-700 md:ml-4"
                      >
                        <small>(移除)</small>
                      </button>
                    </td>
                    <td className="justify-center md:justify-end md:flex mt-10">
                      <div className="w-20 h-10">
                        <div className="relative flex flex-row w-full h-8">
                          <input
                            type="number"
                            value={line.quantity}
                            disabled
                            className="border-0 w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none  focus:outline-none hover:text-black focus:text-black"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="hidden text-right md:table-cell">
                      {variant.price == variant.discountPrice ? (
                        <span className="text-sm lg:text-base font-medium">
                          {variant.price}￥
                        </span>
                      ) : (
                        <span className="text-sm lg:text-base font-medium">
                          <span className="line-through text-red-500">
                            {variant.price}￥
                          </span>
                          &nbsp;&nbsp;
                          {variant.discountPrice}￥
                        </span>
                      )}
                    </td>
                    <td className="text-right">
                      <span className="text-sm lg:text-base font-medium">
                        {(variant.discountPrice * line.quantity).toFixed(2)}￥
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <hr className="pb-6 mt-6" />
          <div className="my-4 mt-6 -mx-2 lg:flex">
            <div className="lg:px-2 lg:w-1/2">
              <div className="p-4 bg-indigo-600 rounded-full">
                <h1 className="ml-2 text-white font-bold uppercase">
                  订单备注
                </h1>
              </div>
              <div className="p-4">
                <p className="mb-4 italic">
                  您可向商家添加备注信息，填写在下面的编辑框内：
                </p>
                <textarea
                  defaultValue={props.note.note}
                  onChange={(e) => props.note.setNote(e.target.value)}
                  className="w-full h-24 p-2  rounded"
                />
              </div>
            </div>
            <div className="lg:px-2 lg:w-1/2">
              <div className="p-4  bg-indigo-600 rounded-full">
                <h1 className="ml-2 font-bold text-white uppercase">
                  订单详情
                </h1>
              </div>
              <div className="p-4">
                <p className="mb-6 italic">订单详情如下所示</p>
                <div className="flex justify-between pt-4 border-b">
                  <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                    总价
                  </div>
                  <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                    {props.lines
                      .reduce(
                        (pre, line) =>
                          pre + line.variant.discountPrice * line.quantity,
                        0
                      )
                      .toFixed(2)}
                    ￥
                  </div>
                </div>
                <a>
                  <button
                    disabled={props.lines.length <= 0}
                    onClick={() => {
                      props.setShowCart(false);
                      window.scrollTo(0, 0);
                    }}
                    className="flex disabled:cursor-not-allowed justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none"
                  >
                    <span className="ml-2">继续</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
