import Link from "next/link";
import Layout from "@/components/layout";
import Head from "next/head";
export default function NotFound() {
  return (
    <div className="mt-10 w-full flex flex-col  justify-center items-center ">
      <Head>
        <title>页面不存在</title>
        <meta name="description" content="YOLO商城-找不到页面" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">
        404
      </h1>
      <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
        页面找不到
      </div>
      <button className="mt-5">
        <div className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 text-black py-3 border border-current">
            <Link href="/">回到首页</Link>
          </span>
        </div>
      </button>
    </div>
  );
}
NotFound.getLayout = function getLayout() {
  return (
    <Layout>
      <NotFound />
    </Layout>
  );
};
