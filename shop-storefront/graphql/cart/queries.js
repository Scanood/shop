import { gql } from "@apollo/client";
export const CART = gql`
  query {
    checkout(perCount: 100) {
      lines {
        id
        quantity
        variant {
          slug
          name
          price
          discountPrice
          product {
            name
            slug
            productImage
            isDelete
          }
        }
      }
    }
    accountAddresses(perCount: 100) {
      addresses {
        id
        province
        city
        streetAddress
        firstName
        lastName
        isDefault
        phone
      }
    }
  }
`;
