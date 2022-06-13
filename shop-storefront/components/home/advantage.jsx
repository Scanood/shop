export default function Advantage() {
  return (
    <>
      <section className="bg-white mb-10">
        <h1 className="md:text-5xl font-bold text-center text-3xl">
          为什么选择YOLO？
        </h1>
        <p className="w-16 mx-auto mt-4 h-1 w-30 bg-red-500"></p>
        <div className="grid md:grid-cols-3 gap-y-10 px-4 mt-20 gap-x-6 lg:px-40 md:px-">
          <div className="bg-gray-400 rounded-2xl flex flex-col items-center py-12 ">
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 text-black w-14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-black text-2xl font-semibold mb-2">配送更快</h2>
            <p className="text-black text-lg w-80 text-center p-2">
              根据您的地址选择就近快递服务。
            </p>
          </div>
          <div className=" bg-gray-400 rounded-2xl flex flex-col items-center py-12 ">
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 text-black w-14"
                fill=" none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-black text-2xl font-semibold mb-2">包邮到家</h2>
            <p className="text-black text-lg w-80 text-center">
              与多家主流快递公司展开合作~
            </p>
          </div>
          <div className="bg-gray-400 rounded-2xl flex flex-col items-center py-12 ">
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 text-black w-14"
                fill=" none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
            </div>
            <h2 className="text-black text-2xl font-semibold mb-2">品质更好</h2>
            <p className="text-black text-lg w-80 text-center">
              食品的生产过程经过严格把关！
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
