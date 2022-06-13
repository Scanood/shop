import { useEffect } from "react";
export default function Count(props) {
  function addCount() {
    if (props.quantity < props.max) props.setQuantity(props.quantity + 1);
  }
  function reduceCount() {
    if (props.quantity > 1) props.setQuantity(props.quantity - 1);
  }
  function onChange(e) {
    const value = e.target.value;
    if (value > 0 && value <= props.max) props.setQuantity(value);
    return true;
  }
  useEffect(() => {
    props.setQuantity(1);
  }, [props.max]);
  return (
    <div className="custom-number-input h-10 w-32 mt-5">
      <h3 className="text-sm text-gray-900 font-medium mt-2 mb-2">购买数量</h3>
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          onClick={reduceCount}
          className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          className="outline-none focus:outline-none text-center w-full bg-gray-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 border-0"
          name="custom-input-number"
          value={props.quantity}
          onChange={onChange}
        ></input>
        <button
          onClick={addCount}
          className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
      <style jsx>
        {`
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        `}
      </style>
    </div>
  );
}
