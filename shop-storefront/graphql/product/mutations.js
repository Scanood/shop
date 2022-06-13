import { gql } from "@apollo/client";
export const ADDTOCART = gql`
  mutation ($slug: String!, $quantity: Int!) {
    AddVariantToCheckout(variantSlug: $slug, quantity: $quantity) {
      success
    }
  }
`;
