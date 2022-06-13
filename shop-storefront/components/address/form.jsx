export default function AddressForm(props) {
  const selectAddress = props.address;
  return (
    <form ref={props.formRef ?? null}>
      <div>
        <label className="uppercase text-sm font-bold opacity-70">省份：</label>
        <input
          type="text"
          name="province"
          defaultValue={selectAddress?.province ?? null}
          className="p-3 mt-2 mb-4  bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
        />
        <label className="uppercase text-sm font-bold opacity-70 m-5">
          县市：
        </label>
        <input
          type="text"
          name="city"
          defaultValue={selectAddress?.city ?? null}
          className="p-3 mt-2 mb-4  bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
        />
      </div>
      <div className="flex justify-start items-center">
        <label className="uppercase text-sm font-bold opacity-70">街道：</label>
        <input
          type="text"
          name="streetAddress"
          defaultValue={selectAddress?.streetAddress ?? null}
          className="p-3 mt-2 mb-4  bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
        />
      </div>
      <hr />
      <div>
        <label className="uppercase text-sm font-bold opacity-70">姓氏：</label>
        <input
          type="text"
          name="lastName"
          defaultValue={selectAddress?.lastName ?? null}
          className="p-3  mt-2 mb-4  bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
        />
        <label className="uppercase text-sm font-bold opacity-70 m-5">
          名称：
        </label>
        <input
          type="text"
          name="firstName"
          defaultValue={selectAddress?.firstName ?? null}
          className="p-3 mt-2 mb-4  bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
        />
      </div>
      <div className="flex justify-start items-center">
        <label className="uppercase text-sm font-bold opacity-70">电话：</label>
        <input
          type="number"
          name="phone"
          defaultValue={selectAddress?.phone ?? null}
          className="p-3 mt-2 mb-4  bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
        />
      </div>
    </form>
  );
}
