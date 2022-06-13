import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Count from "@/components/products/count";
import Tag from "@/components/tag";
import { STATIC_URL } from "@/lib/config";
import dayjs from "dayjs";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function isNull(params) {
  return params != null && params != "" && params != undefined;
}
function collectImages(variants) {
  const images = [];
  for (let i in variants) {
    if (isNull(variants[i].productVariantImage))
      images.push(variants[i].productVariantImage);
  }
  return images;
}
export default function ProductDetail(props) {
  const myproduct = props.product;
  const variants = props.variants;
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [cover, setCover] = useState(myproduct.productImage);
  const images = collectImages(variants);
  function addToCart() {
    if (props.addToCart) props.addToCart(selectedVariant.slug, quantity);
    return true;
  }
  function disCountIsValid(startDate, endDate) {
    const now = dayjs();
    if (endDate) return now.isAfter(startDate) && now.isBefore(endDate);
    else return now.isAfter(startDate);
  }
  return (
    <div className="bg-white">
      {/* Product info */}
      <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl  lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <div>
            <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
              <img
                src={`${STATIC_URL}${cover}`}
                className="w-full h-full object-scale-down object-center"
              />
            </div>
            <div className="flex w-fit m-auto">
              {images.map((i) => {
                return (
                  <div className="flex-1  px-2" key={i}>
                    <button
                      onClick={() => setCover(i)}
                      className={
                        cover == i
                          ? "ring-2 ring-indigo-400 ring-inset focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center"
                          : "focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center"
                      }
                    >
                      <img
                        src={`${STATIC_URL}${i}`}
                        className="w-fit h-full object-fill object-center overflow-hidden p-1"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Options */}
        <div className="mt-4 lg:mt-0 lg:row-span-3">
          <div className="flex">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl mb-5">
              {myproduct.name}
            </h1>
            <div>
              {myproduct.discountSet
                .filter((discount) => !discount.isDelete)
                .map((discount) =>
                  disCountIsValid(discount.startDate, discount.endDate) ? (
                    <Tag content={discount.name} key={discount.slug} />
                  ) : (
                    <></>
                  )
                )}
            </div>
          </div>

          {selectedVariant.price == selectedVariant.discountPrice ? (
            <p className="text-3xl text-gray-900">{selectedVariant.price}￥</p>
          ) : (
            <span className="text-3xl text-gray-900  ">
              <span className="line-through text-red-600">
                {selectedVariant.price}￥
              </span>
              &nbsp;&nbsp;
              {selectedVariant.discountPrice}￥
            </span>
          )}

          <form className="mt-10">
            {/* Sizes */}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-900 font-medium">选择规格</h3>
                <a className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  还剩{selectedVariant.stock}件
                </a>
              </div>
              <RadioGroup
                value={selectedVariant}
                onChange={setSelectedVariant}
                className="mt-4"
              >
                <RadioGroup.Label className="sr-only">
                  Choose a size
                </RadioGroup.Label>
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                  {variants.map((variant) => (
                    <RadioGroup.Option
                      key={variant.slug}
                      value={variant}
                      disabled={variant.stock == 0}
                      className={({ active }) =>
                        classNames(
                          variant.stock > 0
                            ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                            : "bg-gray-50 text-gray-500 cursor-not-allowed",
                          active ? "ring-2 ring-indigo-500" : "",
                          "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <RadioGroup.Label as="p">
                            {variant.name}
                          </RadioGroup.Label>
                          {variant.stock > 0 ? (
                            <div
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "absolute -inset-px rounded-md pointer-events-none"
                              )}
                              aria-hidden="true"
                            />
                          ) : (
                            <div
                              aria-hidden="true"
                              className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                            >
                              <svg
                                className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                stroke="currentColor"
                              >
                                <line
                                  x1={0}
                                  y1={100}
                                  x2={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </div>
                          )}
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </form>
          {/* 数量 */}
          <Count
            quantity={quantity}
            setQuantity={setQuantity}
            max={selectedVariant.stock}
          />
          <button
            onClick={addToCart}
            className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            加入购物车
          </button>
          <p className="text-base text-gray-900 mt-5">
            {selectedVariant.description}
          </p>
        </div>

        <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          {/* Description and details */}
          <div>
            <div className="space-y-6">
              <p className="text-base text-black font-medium">
                {myproduct.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
