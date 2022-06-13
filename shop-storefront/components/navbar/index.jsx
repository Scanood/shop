import { SearchIcon } from "@heroicons/react/outline";
import Image from "next/image";
import UserBar from "@/components/navbar/userBar";
import { useState, useEffect } from "react";
import { readAuthcache } from "@/lib/Authcache";
import Dropdown from "./dropdown";
import Link from "next/link";
export default function NavBar(props) {
  const [loginState, setLoginState] = useState(true);
  useEffect(() => {
    readAuthcache().then((res) => setLoginState(res));
  }, []);
  function showMenuItem() {
    if (props.menuItem)
      return (
        <div className="w-2/3 justify-start hidden md:flex">
          {props.menuItem.map((item) => {
            return <Dropdown item={item} key={item.slug} />;
          })}
        </div>
      );
    return <></>;
  }
  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <nav aria-label="Top" className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <a>
                    <Image
                      src="/logo.png"
                      height={30}
                      width={100}
                      className="h-8 w-auto cursor-pointer"
                      alt="logo"
                    />
                  </a>
                </Link>
              </div>
              {showMenuItem()}
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <UserBar isLogin={loginState} />
                </div>
                {/* Search */}
                <div className="flex lg:ml-6">
                  <Link href="/search">
                    <a className="p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <SearchIcon className="w-6 h-6" aria-hidden="true" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
