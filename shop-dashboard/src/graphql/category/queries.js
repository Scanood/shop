import gql from "graphql-tag";
export const CATEGORIES = gql`
  query ($perCount: Int!, $number: Int, $tree: Boolean) {
    categories(perCount: $perCount, number: $number,tree:$tree) {
      count
      pages
      hasPrevious
      hasNext
      number
      categories {
        name
        slug
        children {
          name
          slug
        }
      }
    }
  }
`;

export const CATEGORY = gql`
  query ($slug: String!) {
    category(slug: $slug) {
      name
      slug
      description
      backgroundImage
      parent {
        name
        slug
      }
      children {
        name
        slug
      }
    }
  }
`;

export const FATHER_CATRGORIES = gql`
  query ($perCount: Int!, $number: Int) {
    categories(perCount: $perCount, number: $number) {
      categories {
        name
        slug
      }
    }
  }
`;
