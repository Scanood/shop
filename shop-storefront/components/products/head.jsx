export default function ProductHead() {
  return (
    <div className="flex relative text-center">
      <h1 className="text-3xl tracking-wider text-white text-sha uppercase font-bold p-4 self-center z-10 content-center absolute text-center w-full md:text-4xl">
        YOLO商城—值得信赖的食品销售平台
      </h1>
      <img
        className="w-11/12 object-cover h-72 block mx-auto"
        src="https://pic.imgdb.cn/item/62661764239250f7c5857018.png"
        alt="Banner"
        width="1920"
        height="288"
      />
    </div>
  );
}
