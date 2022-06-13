import Link from "next/link";
import { useState } from "react";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/outline";
export default function UserBar(props) {
  const [dropdown, setDropdown] = useState(false);
  function logout() {
    localStorage.removeItem("Authorization");
    window.location.href = "/";
  }
  const isLogin = props.isLogin;
  if (!isLogin)
    return (
      <>
        <Link href="/login">
          <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
            登录
          </a>
        </Link>
        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
        <Link href="/register">
          <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
            注册
          </a>
        </Link>
      </>
    );
  else
    return (
      <div className="ml-auto flex items-center">
        <div>
          <div
            onClick={() => {
              setDropdown(!dropdown);
            }}
            className="relative w-10 h-10 cursor-pointer overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
          >
            <UserIcon className="absolute w-12 h-12 text-gray-400 -left-1" />
          </div>

          <div
            style={{ display: dropdown ? "block" : "none" }}
            className="absolute right-5 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
          >
            <Link href="/account">
              <a className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                我的信息
              </a>
            </Link>
            <Link href="/order">
              <a className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                我的订单
              </a>
            </Link>
            <a
              onClick={logout}
              className="block px-4 py-2 hover:cursor-pointer text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
            >
              退出
            </a>
          </div>
        </div>
        {/* Cart */}
        <div className="ml-4 flow-root lg:ml-6">
          <Link href="/cart">
            <a className="group -m-2 p-2 flex items-center">
              <ShoppingBagIcon
                className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </a>
          </Link>
        </div>
      </div>
    );
}
