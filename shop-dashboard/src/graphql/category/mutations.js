import gql from "graphql-tag";
export const DELETE_CATEGORY = gql`
  mutation ($slug: String!) {
    categoryDelete(slug: $slug) {
      success
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation (
    $slug: String!
    $name: String!
    $description: String
    $file: Upload
    $parentSlug: String
  ) {
    categoryUpdate(
      slug: $slug
      name: $name
      description: $description
      parentSlug: $parentSlug
      backgroundImage: $file
    ) {
      success
      category {
        name
        slug
        description
        backgroundImage
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation (
    $name: String!
    $description: String
    $backgroundImage: Upload
    $parentSlug: String
  ) {
    categoryCreate(
      name: $name
      description: $description
      backgroundImage: $backgroundImage
      parentSlug: $parentSlug
    ) {
      success
      category {
        name
        slug
        description
        backgroundImage
      }
    }
  }
`;
