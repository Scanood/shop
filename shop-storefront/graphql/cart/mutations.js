import { gql } from "@apollo/client";

export const REMOTECARTITEM = gql`
  mutation ($id: ID!) {
    DeleteVariantInCheckout(id: $id) {
      success
    }
  }
`;
export const SUBMITCHECKOUT = gql`
  mutation ($input: OrderInput!) {
    OrderCreate(input: $input) {
      success
      order {
        token
      }
    }
  }
`;
export const PAYFORORDER = gql`
  mutation ($getway: GetWayEnum!, $token: String!) {
    PayForOrder(getway: $getway, token: $token) {
      success
      url
    }
  }
`;
