import { gql } from "@apollo/client";

export const ALLADDRESSES = gql`
  {
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
