import "@/styles/globals.css";
import { apolloClient } from "@/graphql/apollo/apolloClient";
import { ApolloProvider } from "@apollo/client";
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ApolloProvider client={apolloClient}>
      {getLayout(<Component {...pageProps} />)}
    </ApolloProvider>
  );
}
export default MyApp;
