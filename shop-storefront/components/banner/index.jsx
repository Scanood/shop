import { SpeakerphoneIcon } from "@heroicons/react/outline";
export default function Banner() {
  return (
    <div className="bg-indigo-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-indigo-800">
              <SpeakerphoneIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="hidden md:inline">
                YOLO商城首次上线！全场商品8折出售，快来抢购吧！
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
