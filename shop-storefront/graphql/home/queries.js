import { gql } from "@apollo/client";

export const INDEX = gql`
  query ($perCount: Int!) {
    productsPublished(perCount: $perCount) {
      pages
      number
      products {
        id
        name
        slug
        description
        productImage
      }
    }
    categories(perCount: $perCount, tree: false) {
      categories {
        name
        slug
        description
        backgroundImage
      }
    }
  }
`;
