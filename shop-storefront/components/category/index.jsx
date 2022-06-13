import Tag from "@/components/tag";
import { STATIC_URL } from "@/lib/config";
import dayjs from "dayjs";
export default function Category({ category }) {
  function disCountIsValid(startDate, endDate) {
    const now = dayjs();
    if (endDate) return now.isAfter(startDate) && now.isBefore(endDate);
    else return now.isAfter(startDate);
  }
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="container px-6 py-8 mx-auto">
        <div className="items-center lg:flex">
          <div className="lg:w-2/5">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {category.name}
            </h2>

            <p className="mt-4 text-gray-500 dark:text-gray-400 lg:max-w-md">
              {category.description}
            </p>
            <div className="flex items-center mt-6 -mx-2">
              {category.discountSet
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

          <div className="mt-8 lg:mt-0 lg:w-3/5">
            <img
              className="object-cover object-center w-full h-64 rounded-md shadow"
              src={`${STATIC_URL}${category.backgroundImage}`}
              alt={category.name}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
