import { useRef } from "react";
export default function SearchBar(props) {
  const keyword = useRef(null);
  function Search() {
    const key = keyword.current.value;
    if (key) {
      props.search(key);
    } else alert("商品名称不能为空！");
  }
  return (
    <div className="flex justify-center items-center">
      <div className="container mx-auto  rounded-lg w-1/3">
        <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
          <input
            ref={keyword}
            className="text-base text-gray-400 flex-grow outline-none px-2  rounded-md border-0 bg-slate-100"
            type="text"
            placeholder="输入商品名称："
          />
          <button
            onClick={Search}
            className="bg-indigo-500 m-5 text-white text-base rounded-lg px-4 py-2 font-thin disabled:cursor-not-allowed"
          >
            搜索
          </button>
        </div>
      </div>
    </div>
  );
}
