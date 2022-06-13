import gql from "graphql-tag";
export const DELETE_PRODUCT = gql`
  mutation ($slug: String!) {
    ProductDelete(slug: $slug) {
      success
    }
  }
`;
export const CREATE_PRODUCT = gql`
  mutation ($input: ProductInput!) {
    ProductCreate(input: $input) {
      success
      product {
        name
        slug
        description
        productImage
        category {
          name
          slug
        }
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation ($input: ProductInput!, $slug: String!) {
    ProductUpdate(input: $input, slug: $slug) {
      success
    }
  }
`;
export const PUBLISH_PRODUCT = gql`
  mutation ($slug: String!) {
    ProductPublish(slug: $slug) {
      success
    }
  }
`;
export const UNPUBLISH_PRODUCT = gql`
  mutation ($slug: String!) {
    ProductUnpublish(slug: $slug) {
      success
    }
  }
`;

export const DELETE_PRODUCT_VARIANT = gql`
  mutation ($slug: String!) {
    ProductVariantDelete(slug: $slug) {
      success
    }
  }
`;

export const CREATE_PRODUCT_VARIANT = gql`
  mutation ($input: ProductVariantInput!) {
    ProductVariantCreate(input: $input) {
      success
    }
  }
`;

export const UPDATE_PRODUCT_VARIANT = gql`
  mutation ($input: ProductVariantInput!, $slug: String!) {
    ProductVariantUpdate(input: $input, slug: $slug) {
      success
    }
  }
`;
