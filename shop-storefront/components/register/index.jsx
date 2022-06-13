import { LockClosedIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
export default function Register(props) {
  function onSubmit() {
    if (login_form.checkValidity()) {
      const email = login_form.email.value;
      const username = login_form.username.value;
      const password1 = login_form.password1.value;
      const password2 = login_form.password2.value;
      console.log(email, username, password1, password2);
      if (props.register) props.register(email, username, password1, password2);
    } else alert("请确认注册信息是否完整！");
  }
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="flex flex-row justify-center">
              <Image src="/logo.png" height={40} width={130} />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              注册
            </h2>
          </div>
          <form className="mt-8 space-y-6" name="login_form">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="邮箱："
                />
              </div>
              <div>
                <label htmlFor="username" className="sr-only">
                  username
                </label>
                <input
                  id="username"
                  name="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="用户名："
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password1"
                  name="password1"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="密码："
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="确认密码："
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/resend">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    未收到邮件？
                  </a>
                </Link>
              </div>
              <div className="text-sm">
                <Link href="/login">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    已有帐号？登录！
                  </a>
                </Link>
              </div>
            </div>
          </form>
          <div>
            <button
              onClick={onSubmit}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              注册
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
