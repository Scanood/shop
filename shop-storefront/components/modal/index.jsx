import { useState, useEffect } from "react";
export default function Modal(props) {
  const content = props.content;
  const cancelText = props.cancelText;
  const confirmText = props.confirmText;
  const canceled = props.canceled;
  const confirmed = props.confirmed;
  const [show, setShow] = useState(props.isVisiable);

  useEffect(() => {
    setShow(props.isVisiable);
  }, [props.isVisiable]);

  function onCanceled() {
    setShow(false);
    if (canceled) canceled();
  }

  function onConfirmed() {
    setShow(false);
    if (confirmed) confirmed();
  }

  if (show)
    return (
      <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center fixed inset-0 z-20">
        <div className="bg-white px-16 py-14 rounded-md text-center">
          <h1 className="text-xl mb-4 font-bold text-slate-500">{content}</h1>
          {props.children}
          <div className="flex justify-around mt-5">
            <button
              onClick={onCanceled}
              className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
            >
              {cancelText ? cancelText : "取消"}
            </button>
            <button
              onClick={onConfirmed}
              className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
            >
              {confirmText ? confirmText : "确定"}
            </button>
          </div>
        </div>
      </div>
    );
  else return <></>;
}
