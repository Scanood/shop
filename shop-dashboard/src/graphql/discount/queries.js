import gql from "graphql-tag";
export const ALLDISCOUNT = gql`
  query ($perCount: Int!, $number: Int) {
    discounts(perCount: $perCount, number: $number) {
      pages
      number
      discounts {
        name
        slug
        type
        value
        startDate
        endDate
      }
    }
  }
`;

export const DISCOUNTDETAIL = gql`
  query ($slug: String!) {
    discount(slug: $slug) {
      name
      slug
      type
      value
      categories {
        name
        slug
        backgroundImage
      }
      products {
        name
        slug
        productImage
      }
      startDate
      endDate
    }
  }
`;
