export default function Tag(props) {
  return (
    <div className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full">
      {props.content}
    </div>
  );
}
