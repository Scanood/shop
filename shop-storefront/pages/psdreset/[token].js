import { useMutation } from "@apollo/client";
import { PASSWORDRESET } from "@/graphql/account/mutations";
import ResetPsd from "@/components/reset/psdreset";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import Head from "next/head";
export default function ResetPage() {
  const [psdRest] = useMutation(PASSWORDRESET);
  const router = useRouter();
  function passwordReset(password) {
    const token = router.query.token;
    if (!token) return;
    psdRest({
      variables: {
        token,
        newPassword1: password,
        newPassword2: password,
      },
    }).then(({ data }) => {
      if (data.passwordReset.success) {
        alert("密码重置成功！");
        router.push("/login");
      } else alert(data.passwordReset.errors);
    });
  }
  return (
    <>
      <Head>
        <title>YOLO商城-密码重置</title>
        <meta name="description" content="YOLO商城-密码重置" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResetPsd passwordReset={passwordReset} />
    </>
  );
}

ResetPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
