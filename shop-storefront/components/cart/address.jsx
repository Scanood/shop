import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useRouter } from "next/router";
export default function Address(props) {
  const addresses = props.addresses;
  const defaultAddress = addresses.filter((item) => {
    if (item.isDefault) return item;
  })[0] ?? { id: null };
  const [selected, setSelected] = useState(defaultAddress.id);
  function submitCheckout() {
    if (props.submitCheckout && selected) props.submitCheckout(selected);
  }
  const router = useRouter();
  return (
    <section className="antialiased text-gray-600  h-fit px-4">
      <div className="flex flex-col justify-start mt-10 h-full">
        <div className="w-2/3 flex justify-end m-auto mb-5">
          <button
            onClick={() => {
              router.push("/account");
            }}
            className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-3 px-8 rounded-xl "
          >
            地址管理
          </button>
        </div>
        <div className="w-full max-w-6xl mx-auto bg-white  rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">请选择收货地址：</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <RadioGroup value={selected} onChange={setSelected}>
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">省份</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">城市</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">详细地址</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">联系人</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">选择</div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-sm divide-y divide-gray-100">
                    {addresses.map((address) => (
                      <tr
                        className={selected == address.id ? "bg-blue-200" : ""}
                        key={address.id}
                      >
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-800">
                              {address.province}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{address.city}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium">
                            {address.streetAddress}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium">
                            {address.lastName}
                            {address.firstName}-{address.phone}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div>
                            <RadioGroup.Option value={address.id}>
                              {({ checked }) => (
                                <div className="flex justify-center">
                                  <div
                                    style={{
                                      display: checked ? "block" : "none",
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      viewBox="0 0 20 20"
                                      fill="blue"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    style={{
                                      display: !checked ? "block" : "none",
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </RadioGroup.Option>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="flex w-2/3 justify-evenly ml-auto mr-auto">
          <button
            onClick={() => {
              props.setShowCart(true);
              window.scrollTo(0, 0);
            }}
            className="flex justify-center w-1/3 px-10 py-3 mt-6 font-medium text-white uppercase bg-indigo-600 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none"
          >
            <span className="ml-2">返回上一步</span>
          </button>
          <button
            onClick={submitCheckout}
            disabled={!selected}
            className=" disabled:cursor-not-allowed flex justify-center w-1/3 px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none"
          >
            <span className="ml-2">提交</span>
          </button>
        </div>
      </div>
    </section>
  );
}
