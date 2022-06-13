import { useRef } from "react";
export default function ResetPsd(props) {
  const psdref = useRef(null);
  return (
    <div className="font-mono w-11/12 m-auto mt-5">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage: `url('https://pic.imgdb.cn/item/626ce99a239250f7c5693efe.png')`,
              }}
            ></div>

            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="px-8 mb-4 text-center">
                <h3 className="pt-4 mb-2 text-2xl font-bold">重置密码</h3>
                <p className="mb-4 text-sm text-gray-700 font-bold">
                  在下方输入您的新密码，由此来重置您的密码。
                </p>
              </div>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    密码
                  </label>
                  <input
                    ref={psdref}
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="password"
                    placeholder="输入新密码..."
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    onClick={() => {
                      if (psdref && psdref.current.value)
                        props.passwordReset(psdref.current.value);
                      else alert("邮箱不能为空！");
                    }}
                    className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    重置密码
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="/register"
                  >
                    注册账户
                  </a>
                </div>
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="/login"
                  >
                    已有帐户，登录！
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
