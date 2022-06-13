import Layout from "@/components/layout";
import Account from "@/components/account/account";
import { ME } from "@/graphql/account/queries";
import {
  CHANGEPASSWORD,
  DELETEACCOUNT,
  DELETEADDRESS,
  UPDATEADDRESS,
  CREATEADDRESS,
} from "@/graphql/account/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Spinner from "@/components/spinner";
import Address from "@/components/address";
import { useState } from "react";
import style from "./index.module.css";
import Pagination from "@/components/order/pagination";
import { apolloClient } from "@/graphql/apollo/apolloClient";
import Head from "next/head";
export default function AccountPage() {
  const [page, setPage] = useState(1);
  const { data, loading, error, fetchMore } = useQuery(ME, {
    variables: { number: page },
  });
  const [active, setActive] = useState(1);
  const [passwordChange] = useMutation(CHANGEPASSWORD);
  const [accountDelete] = useMutation(DELETEACCOUNT);
  const [addressDelete] = useMutation(DELETEADDRESS);
  const [addressUpdate] = useMutation(UPDATEADDRESS);
  const [addressCreate] = useMutation(CREATEADDRESS);
  function changePassword(oldPassword, newPassword) {
    passwordChange({
      variables: {
        oldPassword,
        newPassword1: newPassword,
        newPassword2: newPassword,
      },
    }).then(({ data }) => {
      if (data.passwordChange.success) {
        alert("密码修改成功！");
        localStorage.setItem(
          "Authorization",
          "JWT " + data.passwordChange.token
        );
      } else alert("密码修改失败！");
    });
  }
  function deleteAccount(password) {
    accountDelete({ variables: { password } }).then(({ data }) => {
      if (data.deleteAccount.success) {
        localStorage.removeItem("Authorization");
        window.location.href = "/";
      } else alert("账户注销失败！");
    });
  }
  function tabStyle(index) {
    if (active == index) return style.active;
    else return style.inactive;
  }
  function onFetchMore(page) {
    fetchMore({
      variables: {
        number: page,
      },
    });
    setPage(page);
  }
  function deleteAddress(id) {
    addressDelete({ variables: { id } }).then(({ data }) => {
      if (data.AccountAddressDelete.success) {
        apolloClient.refetchQueries({ include: "active" });
      } else alert("删除失败！");
    });
  }
  function updateAddress(id, input) {
    addressUpdate({ variables: { id, input } })
      .then(({ data }) => {
        if (data.AccountAddressUpdate.success)
          apolloClient.refetchQueries({ include: "active" });
        else alert("更新失败！");
      })
      .catch((e) => alert(e));
  }

  function createAddress(input) {
    addressCreate({ variables: { input } })
      .then(({ data }) => {
        if (data.AccountAddressCreate.success)
          apolloClient.refetchQueries({ include: "active" });
        else alert("添加失败！");
      })
      .catch((e) => alert(e));
  }
  if (data && data.me)
    return (
      <div>
        <Head>
          <title>YOLO商城-个人中心</title>
          <meta name="description" content="YOLO商城-商品详情页" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <nav className="flex flex-col justify-center sm:flex-row">
          <button onClick={() => setActive(1)} className={tabStyle(1)}>
            账户信息
          </button>
          <button onClick={() => setActive(2)} className={tabStyle(2)}>
            地址管理
          </button>
        </nav>
        <div style={{ display: active == 1 ? "block" : "none" }}>
          <Account
            me={data.me}
            changePassword={changePassword}
            deleteAccount={deleteAccount}
          />
        </div>

        <div style={{ display: active == 2 ? "block" : "none" }}>
          <Address
            addresses={data.accountAddresses.addresses}
            deleteAddress={deleteAddress}
            updateAddress={updateAddress}
            createAddress={createAddress}
          />
          <Pagination
            hasPrevious={data.accountAddresses.hasPrevious}
            hasNext={data.accountAddresses.hasNext}
            count={data.accountAddresses.count}
            page={page}
            onFetchMore={onFetchMore}
          />
        </div>
      </div>
    );
  if (loading) return <Spinner />;
}

AccountPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
