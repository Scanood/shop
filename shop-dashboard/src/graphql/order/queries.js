import gql from "graphql-tag";
export const ORDERS = gql`
  query ($perCount: Int!, $number: Int) {
    orders(perCount: $perCount, number: $number) {
      count
      pages
      number
      orders {
        token
        user {
          username
        }
        date
        status
        price
      }
    }
  }
`;

export const ORDERTETAIL = gql`
  query ($token: String!) {
    orderDetail(token: $token) {
      token
      staffFulfill
      user {
        email
        username
      }
      address {
        firstName
        lastName
        province
        city
        streetAddress
        phone
      }
      status
      lines {
        quantiy
        price
        realPrice
        variant {
          name
          product {
            name
            slug
            productImage
          }
        }
      }
      payment {
        outTradeNo
        tradeNo
        method
        paid
        money
      }
      note
      shipping
    }
  }
`;
