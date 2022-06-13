import { gql } from "@apollo/client";
export const PRODUCTS = gql`
  query ($perCount: Int!, $number: Int) {
    productsPublished(perCount: $perCount, number: $number) {
      pages
      number
      hasNext
      hasPrevious
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

export const PRODUCTDETAIL = gql`
  query ($slug: String!) {
    productSlugPublished(slug: $slug) {
      id
      name
      description
      productImage
      discountSet {
        name
        slug
        isDelete
        startDate
        endDate
      }
    }
    productVariants(slug: $slug, perCount: 10) {
      productVariants {
        discountPrice
        id
        name
        slug
        price
        stock
        description
        productVariantImage
      }
    }
  }
`;

export const SEARCHPRODUCTS = gql`
  query ($keyword: String!, $number: Int) {
    searchPublishedProducts(keyword: $keyword, perCount: 4, number: $number) {
      count
      hasNext
      hasPrevious
      products {
        id
        name
        slug
        productImage
      }
    }
  }
`;
