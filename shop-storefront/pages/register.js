import Register from "@/components/register";
import Layout from "@/components/layout";
import { useMutation } from "@apollo/client";
import { REGISTER } from "@/graphql/account/mutations";
import Head from "next/head";
function RegisterPage() {
  const [registerMutation] = useMutation(REGISTER);
  function register(email, username, password1, password2) {
    registerMutation({
      variables: {
        email,
        username,
        password1,
        password2,
      },
    })
      .then(({ data }) => {
        if (data.register.success) alert("注册成功，请查看您邮箱中的邮件！");
        else alert("注册失败！");
      })
      .catch((e) => alert(e));
  }
  return (
    <>
      <Head>
        <title>YOLO-注册</title>
        <meta name="description" content="YOLO商城账号注册" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Register register={register} />
    </>
  );
}
export default RegisterPage;

RegisterPage.getLayout = function getLayout() {
  return (
    <Layout>
      <RegisterPage />
    </Layout>
  );
};
