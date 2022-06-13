import { STATIC_URL } from "@/lib/config";
import Link from "next/link";
export default function CategoryList(props) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap -m-4">
          {props?.categories.map((category) => {
            return (
              <div className="p-4 md:w-1/4" key={category.slug}>
                <div className="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                    height={192}
                    width={286}
                    src={`${STATIC_URL}${category.backgroundImage}`}
                    alt="blog"
                  />
                  <div className="p-6">
                    <h1 className="title-font text-lg font-medium text-gray-600 mb-3">
                      {category.name}
                    </h1>
                    <p className="leading-relaxed mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center flex-wrap ">
                      <Link href={`/category/${category.slug}`}>
                        <a className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:scale-105 drop-shadow-md  shadow-cla-blue px-4 py-1 rounded-lg">
                          了解更多
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
