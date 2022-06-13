import Login from "@/components/login";
import Head from "next/head";
import { LOGIN } from "@/graphql/account/mutations";
import { useMutation } from "@apollo/client";
import Layout from "@/components/layout";
function LoginPage() {
  const [loginMutation] = useMutation(LOGIN);
  async function login(email, password) {
    loginMutation({ variables: { email, password } })
      .then(({ data }) => {
        if (data.tokenAuth.success && !data.tokenAuth.user.isStaff) {
          const token = data.tokenAuth.token;
          localStorage.setItem("Authorization", "JWT " + token);
          //使用location刷新nanbar的状态
          location.href = "/";
        } else {
          alert("登录失败，账号密码不正确或当前账户未激活！");
        }
      })
      .catch((e) => {
        alert(e);
      });
  }
  return (
    <>
      <Head>
        <title>YOLO-登录</title>
        <meta name="description" content="YOLO商城账号登录" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login onLogin={login} />
    </>
  );
}
export default LoginPage;

LoginPage.getLayout = function getLayout() {
  return (
    <Layout>
      <LoginPage />
    </Layout>
  );
};
