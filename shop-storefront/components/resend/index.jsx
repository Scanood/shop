import { useRef } from "react";
import Link from "next/link";
export default function Reset(props) {
  const emailRef = useRef(null);
  return (
    <div className="font-mono w-11/12 m-auto mt-5">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage: `url('https://pic.imgdb.cn/item/62773c1d09475431292b935c.png')`,
              }}
            ></div>

            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="px-8 mb-4 text-center">
                <h3 className="pt-4 mb-2 text-2xl font-bold">
                  未收到邮箱验证？
                </h3>
                <p className="mb-4 text-sm text-gray-700 font-bold">
                  在下方输入您的邮箱，系统将会重新发送一封激活邮件到您的邮箱，由此来激活您的账号。
                </p>
              </div>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    邮箱
                  </label>
                  <input
                    ref={emailRef}
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="输入邮箱..."
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    onClick={() => {
                      if (emailRef && emailRef.current.value)
                        props.resendEmail(emailRef.current.value);
                      else alert("邮箱不能为空！");
                    }}
                    className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    发送激活邮件
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link href="/register">
                    <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                      注册账户
                    </a>
                  </Link>
                </div>
                <div className="text-center">
                  <Link href="/login">
                    <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                      已有帐户，登录！
                    </a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
