import { ssrApolloClient } from "@/graphql/apollo/apolloClient";
import { PRODUCTS } from "@/graphql/product/queries";
export async function getProducts() {
    const response = await ssrApolloClient.query({
      query: PRODUCTS,
      variables: {
        perCount: 3,
      },
      fetchPolicy: "no-cache",
    });
    return response.data.productsPublished.products;
  }