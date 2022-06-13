import gql from "graphql-tag";
export const ALLUSERS = gql`
  query ($perCount: Int!, $number: Int, $keyword: String) {
    activeUsers(perCount: $perCount, number: $number, keyword: $keyword) {
      count
      pages
      number
      activeUsers {
        username
        email
        token
      }
    }
  }
`;

export const USERINFO = gql`
  query ($token: String!) {
    user(token: $token) {
      email
      username
    }
  }
`;

export const USERORDER = gql`
  query ($perCount: Int!, $number: Int, $token: String) {
    userOrders(perCount: $perCount, number: $number, token: $token) {
      count
      number
      pages
      orders {
        token
        date
        status
        price
      }
    }
  }
`;
