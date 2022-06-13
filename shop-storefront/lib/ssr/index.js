import { ssrApolloClient } from "@/graphql/apollo/apolloClient";
import { INDEX } from "@/graphql/home/queries";
export async function getIndexData() {
  const response = await ssrApolloClient.query({
    query: INDEX,
    variables: {
      perCount: 4,
    },
  });
  return response.data;
}
