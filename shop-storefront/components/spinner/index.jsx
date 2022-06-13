import { RefreshIcon } from "@heroicons/react/outline";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center w-full h-full flex-grow gap-2">
      <RefreshIcon className="animate-spin w-5 h-5" />
      <div className="animate-pulse">Loading ...</div>
    </div>
  );
}