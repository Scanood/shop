import Link from "next/link";
export default function Error() {
  return (
    <div>
      <div className="bg-white p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-red-600 w-20 h-20 mx-auto my-6"
        >
          <path
            fillRule="evenodd"
            fill="currentColor"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            账号验证失败！
          </h3>
          <p className="text-gray-600 my-2">对不起！账号验证失败！</p>
          <p> 稍后再试试看~ </p>
          <div className="py-10 text-center">
            <Link href="/login">
              <a className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                去登录
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
