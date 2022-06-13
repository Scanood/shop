import { TrashIcon, SearchIcon } from "@heroicons/react/solid";
import { useState, useRef } from "react";
import AddressForm from "./form";
import Modal from "@/components/modal";
export default function Address(props) {
  const [deleteVisiable, setDeleteVisiable] = useState(false);
  const [editVisiable, setEditVisiable] = useState(false);
  const [addVisiable, setAddVisiable] = useState(false);
  const [selectAddress, setSelectAddress] = useState(null);
  const formRef = useRef(null);
  const addformRef = useRef(null);
  function deleteAddress() {
    if (props.deleteAddress) props.deleteAddress(selectAddress.id);
    setDeleteVisiable(false);
  }
  function updateAddress() {
    if (!formRef) {
      setEditVisiable(false);
      return;
    }
    const form = formRef.current;
    const province = form.province.value;
    const city = form.city.value;
    const streetAddress = form.streetAddress.value;
    const lastName = form.lastName.value;
    const firstName = form.firstName.value;
    const phone = form.phone.value;

    if (
      !(province && city && streetAddress && lastName && firstName && phone)
    ) {
      alert("地址信息不完整！");
      setEditVisiable(false);
      return;
    }
    if (phone.length != 11) {
      alert("手机号码格式不正确！");
      setEditVisiable(false);
      return;
    }
    const input = {
      province,
      city,
      streetAddress,
      lastName,
      firstName,
      phone,
    };
    if (props.updateAddress) props.updateAddress(selectAddress.id, input);
    setEditVisiable(false);
  }
  function createAddress() {
    if (!addformRef) {
      setAddVisiable(false);
      return;
    }
    const form = addformRef.current;
    const province = form.province.value;
    const city = form.city.value;
    const streetAddress = form.streetAddress.value;
    const lastName = form.lastName.value;
    const firstName = form.firstName.value;
    const phone = form.phone.value;
    if (
      !(province && city && streetAddress && lastName && firstName && phone)
    ) {
      alert("地址信息不完整！");
      setAddVisiable(false);
      return;
    }
    if (phone.length != 11) {
      alert("手机号码格式不正确！");
      setEditVisiable(false);
      return;
    }
    const input = {
      province,
      city,
      streetAddress,
      lastName,
      firstName,
      phone,
    };
    if (props.createAddress) props.createAddress(input);
    setAddVisiable(false);
  }
  return (
    <div>
      <Modal
        content="确定要删除当前地址吗？"
        isVisiable={deleteVisiable}
        canceled={() => {
          setDeleteVisiable(false);
        }}
        confirmed={deleteAddress}
      />
      <Modal
        isVisiable={editVisiable}
        canceled={() => {
          setEditVisiable(false);
        }}
        confirmed={updateAddress}
      >
        <AddressForm address={selectAddress} formRef={formRef} />
      </Modal>
      <Modal
        isVisiable={addVisiable}
        canceled={() => {
          setAddVisiable(false);
        }}
        confirmed={createAddress}
      >
        <AddressForm address={selectAddress} formRef={addformRef} />
      </Modal>
      <div className="w-2/3 flex justify-end m-auto">
        <button
          onClick={() => {
            setSelectAddress(null);
            setAddVisiable(true);
          }}
          className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-3 px-8 rounded-xl "
        >
          添加地址
        </button>
      </div>
      <table className="table-auto w-5/6 m-auto mt-10">
        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
          <tr>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-left">省份</div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-left">城市</div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-left">详细地址</div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-left">联系人</div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-center">操作</div>
            </th>
          </tr>
        </thead>

        <tbody className="text-sm divide-y divide-gray-100">
          {props.addresses.map((address) => (
            <tr key={address.id}>
              <td className="p-2 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="font-medium text-gray-800">
                    {address.province}
                  </div>
                </div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-left">{address.city}</div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-left font-medium">
                  {address.streetAddress}
                </div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-left font-medium">
                  {address.lastName}
                  {address.firstName}-{address.phone}
                </div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="flex justify-evenly">
                  <a>
                    <SearchIcon
                      onClick={() => {
                        setEditVisiable(true);
                        setSelectAddress(address);
                      }}
                      className="w-5 h-5 hover:cursor-pointer text-blue-600"
                    />
                  </a>
                  <TrashIcon
                    onClick={() => {
                      setDeleteVisiable(true);
                      setSelectAddress(address);
                    }}
                    className="w-5 h-5 hover:cursor-pointer text-red-600"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
