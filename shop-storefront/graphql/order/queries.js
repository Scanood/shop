import { gql } from "@apollo/client";

export const ALLORDERS = gql`
  query ($perCount: Int!, $number: Int) {
    userOrders(perCount: $perCount, number: $number) {
      hasNext
      hasPrevious
      count
      orders {
        date
        price
        paidPrice
        status
        token
      }
    }
  }
`;

export const ORDERDETAIL = gql`
  query ($token: String!) {
    orderDetail(token: $token) {
      user {
        email
      }
      shipping
      address {
        firstName
        lastName
        province
        city
        streetAddress
        phone
      }
      token
      date
      status
      price
      paidPrice
      note
      lines {
        quantiy
        price
        realPrice
        variant {
          id
          name
          product {
            productImage
            name
            slug
          }
        }
        quantiy
      }
    }
  }
`;
