import { gql } from "@apollo/client";

export const ALLCATEGORIES = gql`
  query {
    categories(perCount: 100, tree: false) {
      categories {
        name
        slug
        description
        backgroundImage
        discountSet {
          name
          isDelete
          slug
        }
      }
    }
  }
`;

export const CATEGORYDETAIL = gql`
  query ($slug: String!) {
    category(slug: $slug) {
      name
      slug
      description
      backgroundImage
      discountSet {
        name
        isDelete
        slug
        startDate
        endDate
      }
    }
  }
`;

export const CATEGORYPRODUCT = gql`
  query ($slug: String!, $perCount: Int!, $number: Int) {
    productCategoryPublished(
      slug: $slug
      perCount: $perCount
      number: $number
    ) {
      hasPrevious
      hasNext
      count
      products {
        id
        name
        slug
        description
        productImage
      }
    }
  }
`;

export const NAVCATEGORIES = gql`
  query {
    categories(perCount: 6) {
      categories {
        name
        slug
      }
    }
  }
`;

export const CATEGORIES = gql`
  query ($perCount: Int!, $number: Int) {
    categories(perCount: $perCount, number: $number, tree: false) {
      pages
      number
      hasNext
      hasPrevious
      categories {
        name
        slug
        description
        backgroundImage
      }
    }
  }
`;
