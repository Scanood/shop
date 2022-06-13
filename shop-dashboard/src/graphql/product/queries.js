import gql from "graphql-tag";
export const PRODUCTS = gql`
  query ($perCount: Int!, $number: Int, $keyword: String) {
    products(perCount: $perCount, number: $number, keyword: $keyword) {
      count
      pages
      hasPrevious
      hasNext
      number
      products {
        name
        slug
        description
        published
        productImage
        category {
          name
        }
      }
    }
  }
`;

export const PRODUCT_SLUG = gql`
  query ($slug: String!) {
    productSlug(slug: $slug) {
      name
      description
      productImage
      published
      category {
        name
        slug
      }
    }
  }
`;

export const VARIANT_PRODUCT = gql`
  query ($slug: String!, $perCount: Int!, $number: Int) {
    productVariants(slug: $slug, perCount: $perCount, number: $number) {
      count
      pages
      number
      productVariants {
        name
        productVariantImage
        price
        stock
        slug
      }
    }
  }
`;
export const QUERY_VARIANT_SLUG = gql`
  query ($slug: String!) {
    variantSlug(slug: $slug) {
      name
      slug
      price
      stock
      description
      productVariantImage
      discountPrice
    }
  }
`;
