import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { ACTIVEACCOUNT } from "@/graphql/account/mutations";
import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import Success from "@/components/account/success";
import Error from "@/components/account/error";
import Spinner from "@/components/spinner";
export default function ActivePage() {
  const router = useRouter();
  const [accountActive] = useMutation(ACTIVEACCOUNT);
  const [status, setStatus] = useState(null);
  const token = router.query.token;
  useEffect(() => {
    if (token) {
      accountActive({ variables: { token } }).then(({ data }) => {
        if (data.verifyAccount.success) setStatus(true);
        else setStatus(false);
      });
    }
  }, [token]);
  if (status) return <Success />;
  if (status == null) return <Spinner />;
  if (status == false) return <Error />;
}

ActivePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
