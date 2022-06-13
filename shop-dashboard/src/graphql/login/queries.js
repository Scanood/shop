import gql from "graphql-tag";
export const Me = gql`
  query {
    me {
      isStaff
    }
  }
`;
