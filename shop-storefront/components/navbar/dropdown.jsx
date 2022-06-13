import Link from "next/link";
export default function Dropdown(props) {
  const item = props.item;
  return (
    <div key={item.slug} className="p-3 relative mx-3 ">
      <Link href={`/category/${item.slug}`}>
        <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
          {item.name}
        </a>
      </Link>
    </div>
  );
}
