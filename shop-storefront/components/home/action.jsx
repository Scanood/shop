export default function Action() {
  return (
    <div className="py-16 pb-5 bg-white">
      <div className="container m-auto px-6 space-y-8 text-gray-500 md:px-12 lg:px-20">
        <div className="justify-center text-center gap-6 md:text-left md:flex lg:items-center  lg:gap-16">
          <div className="order-last mb-6 space-y-6 md:mb-0 md:w-6/12 lg:w-6/12">
            <h1 className="text-4xl text-gray-700 font-bold md:text-5xl">
              YOLO商城现在购买立享-
              <span className="text-blue-500">8折优惠</span>
            </h1>
            <p className="text-lg">
              yolo电商平台，致力于提供安全便捷的购物体验，现在使用立享八折优惠。
            </p>
            <div className="flex flex-row-reverse flex-wrap justify-center gap-4 md:gap-6 md:justify-end">
              <a
                href="#product"
                className="w-full py-3 px-6 text-center rounded-xl transition bg-gray-700 shadow-xl hover:bg-gray-600 active:bg-gray-700 focus:bg-gray-600 sm:w-max"
              >
                <span className="block text-white font-semibold">开始购物</span>
              </a>
              <a
                href="#advantage"
                className="w-full order-first py-3 px-6 text-center rounded-xl bg-gray-100 transition hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-200 sm:w-max"
              >
                <span className="block text-gray-600 font-semibold">
                  查看更多
                </span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-5 grid-rows-4 gap-4 md:w-5/12 lg:w-6/12">
            <div className="col-span-2 row-span-4">
              <img
                src="https://pic.3gbizhi.com/2014/0321/20140321094913684.jpg"
                className="rounded-full"
                width="640"
                height="960"
                alt="shoes"
                loading="lazy"
              />
            </div>
            <div className="col-span-2 row-span-2">
              <img
                src="https://pic.imgdb.cn/item/626617ba239250f7c5863504.png"
                className="w-full h-full object-cover object-top rounded-xl"
                width="640"
                height="640"
                alt="shoe"
                loading="lazy"
              />
            </div>
            <div className="col-span-3 row-span-3">
              <img
                src="https://pic.imgdb.cn/item/62661764239250f7c5857018.png"
                className="w-full h-full object-cover object-top rounded-xl"
                width="640"
                height="427"
                alt="shoes"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
