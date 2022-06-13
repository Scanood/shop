import { gql } from "@apollo/client";
export const USERAUTH = gql`
  query {
    me {
      email
    }
  }
`;

export const ME = gql`
  query ($number: Int) {
    me {
      username
      email
    }
    accountAddresses(perCount: 5, number: $number) {
      count
      hasPrevious
      hasNext
      addresses {
        id
        province
        city
        streetAddress
        phone
        firstName
        lastName
      }
    }
  }
`;
