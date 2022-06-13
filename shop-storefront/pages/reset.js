import Layout from "@/components/layout";
import Reset from "@/components/reset";
import { SENDPASSWORDRESETEMAIL } from "@/graphql/account/mutations";
import { useMutation } from "@apollo/client";
import Head from "next/head";
export default function ResetPage() {
  const [sendEmail] = useMutation(SENDPASSWORDRESETEMAIL);
  function sendResetPasswordEmail(email) {
    const emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!emailRegExp.test(email)) {
      alert("请输入一个正确的邮箱！");
      return;
    }
    sendEmail({ variables: { email } }).then(({ data }) => {
      if (data.sendPasswordResetEmail.success)
        alert("邮件发送成功，请注意查收！");
    });
  }
  return (
    <>
      <Head>
        <title>YOLO-忘记密码</title>
        <meta name="description" content="YOLO商城-忘记密码" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Reset sendResetPasswordEmail={sendResetPasswordEmail} />
    </>
  );
}

ResetPage.getLayout = function getLayout() {
  return (
    <Layout>
      <ResetPage />
    </Layout>
  );
};
