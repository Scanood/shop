import { ApolloClient, InMemoryCache, from } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { createApolloProvider } from "@vue/apollo-option";
import { createUploadLink } from "apollo-upload-client";
import { ElMessage } from "element-plus";
function createFetch(uri, options) {
  const token = localStorage.getItem("Authorization");
  options.headers.Authorization = token;
  return fetch(uri, options);
}
// 与 API 的 HTTP 连接
const httpLink = createUploadLink({
  fetch: createFetch,
  // 你需要在这里使用绝对路径
  uri: "https://123.57.246.188/graphql/",
  //uri: "http://127.0.0.1:8000/graphql/",
});

// 缓存实现
const cache = new InMemoryCache();
// error
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === "You do not have permission to perform this action") {
        ElMessage.error("登录状态已过期，请重新登录！");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    });
});
// 创建 apollo 客户端
export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache,
});

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});
