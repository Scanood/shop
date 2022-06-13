import { ssrApolloClient } from "@/graphql/apollo/apolloClient";
import { CATEGORYDETAIL, ALLCATEGORIES } from "@/graphql/category/queries";
export async function getCategoryDetail(slug) {
  const response = await ssrApolloClient.query({
    query: CATEGORYDETAIL,
    variables: {
      slug,
    },
  });
  return response.data.category;
}

export async function getAllCategories() {
  const response = await ssrApolloClient.query({
    query: ALLCATEGORIES,
  });

  return response.data.categories.categories;
}
