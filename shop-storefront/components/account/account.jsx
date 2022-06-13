import { useRef, useState } from "react";
import Modal from "@/components/modal";
export default function Account(props) {
  const oldpsd = useRef(null);
  const newpsd = useRef(null);
  const psd = useRef(null);
  const [visiable, setVisiable] = useState(false);
  function submit() {
    if (!oldpsd || !newpsd) return;
    console.log(oldpsd.current.value, newpsd.current.value);
    if (oldpsd.current.value && newpsd.current.value)
      props.changePassword(oldpsd.current.value, newpsd.current.value);
  }
  function deleteAccount() {
    if (!psd) return;
    console.log(psd.current.value);
    setVisiable(false);
    if (psd.current.value) props.deleteAccount(psd.current.value);
  }
  return (
    <div className="mt-10 mb-10 bg-opacity-50">
      <Modal
        content="确定要注销当前账户吗？"
        isVisiable={visiable}
        canceled={() => {
          setVisiable(false);
        }}
        confirmed={deleteAccount}
      >
        <input
          ref={psd}
          type="password"
          className="w-5/6 focus:outline-none focus:text-gray-600 p-2 ml-4 border"
          placeholder="请输入密码:"
        />
      </Modal>
      <div className="mx-auto container max-w-4xl md:w-3/4 shadow-md">
        <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t"></div>
        <div className="bg-white space-y-6">
          <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 max-w-sm mx-auto">账户</h2>
            <div className="md:w-2/3 max-w-sm mx-auto">
              <label className="text-sm text-gray-400">邮箱</label>
              <div className="w-full inline-flex border">
                <div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                  <svg
                    fill="none"
                    className="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder={props.me.email}
                  disabled
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 mx-auto max-w-sm">个人信息</h2>
            <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
              <div>
                <label className="text-sm text-gray-400">用户名</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder={props.me.username}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
            <div className="w-1/12 pt-2">
              <svg
                fill="none"
                className="w-6 text-gray-400 mx-auto"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="md:w-4/12 max-w-sm mx-auto">修改密码</h2>

            <div className=" w-full flex flex-col max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
              <div className="w-full inline-flex border-b">
                <label className="text-sm text-gray-400">原密码</label>
                <input
                  id="oldPassword"
                  type="password"
                  ref={oldpsd}
                  className="w-5/6 focus:outline-none focus:text-gray-600 p-2 ml-4"
                />
              </div>
              <div className="w-full inline-flex border-b">
                <label className="text-sm text-gray-400">新密码</label>
                <input
                  id="newPassword"
                  type="password"
                  ref={newpsd}
                  className="w-5/6 focus:outline-none focus:text-gray-600 p-2 ml-4"
                />
              </div>
            </div>

            <div className="md:w-3/12 text-center md:pl-6">
              <button
                onClick={submit}
                className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-600 py-2 px-4 inline-flex items-center focus:outline-none md:float-right"
              >
                <svg
                  fill="none"
                  className="w-4 text-white mr-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                更新
              </button>
            </div>
          </div>

          <hr />
          <div className="w-full p-4 text-right text-gray-500">
            <button
              onClick={() => setVisiable(true)}
              className="inline-flex items-center focus:outline-none mr-4"
            >
              <svg
                fill="none"
                className="w-4 mr-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              注销账户
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
