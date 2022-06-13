import gql from "graphql-tag";
export const DISCOUNTDELETE = gql`
  mutation ($slug: String!) {
    DiscountDelete(slug: $slug) {
      success
    }
  }
`;

export const DISCOUNTUPDATE = gql`
  mutation ($input: DiscountInput!, $slug: String!) {
    DiscountUpdate(input: $input, slug: $slug) {
      success
    }
  }
`;

export const DISCOUNTCREATE = gql`
  mutation ($input: DiscountInput!) {
    DiscountCreate(input: $input) {
      success
      discount {
        slug
      }
    }
  }
`;
