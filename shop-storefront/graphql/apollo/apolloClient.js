import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
const backendApi = "https://123.57.246.188/graphql/";
import { onError } from "@apollo/client/link/error";
function createFetch(uri, options) {
  const token = localStorage.getItem("Authorization");
  options.headers.Authorization = token;
  return fetch(uri, options);
}
const httpLink = createHttpLink({
  fetch: createFetch,
  uri: backendApi,
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === "You do not have permission to perform this action") {
        window.location.href = "/login";
      }
    });
});
const cache = new InMemoryCache();
export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache,
});

export const ssrApolloClient = new ApolloClient({
  link: createHttpLink({
    uri: backendApi,
  }),
  cache,
  ssrMode: true,
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});
