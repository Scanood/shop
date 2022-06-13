export default function Pagination(props) {
  if (props?.count <= 0) return <div></div>;
  return (
    <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between">
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          disabled={!props?.hasPrevious}
          onClick={() => {
            props.onFetchMore(props.page - 1);
          }}
          className="disabled:cursor-not-allowed text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l"
        >
          上一页
        </button>
        &nbsp; &nbsp;
        <button
          onClick={() => {
            props.onFetchMore(props.page + 1);
          }}
          disabled={!props?.hasNext}
          className="disabled:cursor-not-allowed text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r"
        >
          下一页
        </button>
      </div>
    </div>
  );
}
