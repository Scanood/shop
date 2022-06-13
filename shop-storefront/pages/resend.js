import Layout from "@/components/layout";
import Resend from "@/components/resend";
import { useMutation } from "@apollo/client";
import { RESENDACTIVATEEMAIL } from "@/graphql/account/mutations";
export default function ResendPage() {
  const [activeEmailResend] = useMutation(RESENDACTIVATEEMAIL);
  function resendEmail(email) {
    const emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!emailRegExp.test(email)) {
      alert("请输入一个正确的邮箱！");
      return;
    }
    activeEmailResend({ variables: { email } }).then(({ data }) => {
      if (data.resendActivationEmail.success)
        alert("邮件发送成功，请注意查收！");
      else {
        switch (data.resendActivationEmail.errors?.email[0]?.code) {
          case "already_verified":
            alert("邮件发送失败，账户已激活！");
            return;
          default:
            alert("邮件发送失败!");
        }
      }
    });
  }
  return <Resend resendEmail={resendEmail} />;
}
ResendPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
