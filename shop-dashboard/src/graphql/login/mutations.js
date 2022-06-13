import gql from "graphql-tag";
export const StaffLogin = gql`
  mutation ($email: String!, $password: String!) {
    tokenAuth(email: $email, password:$password) {
      success
      user {
        email
        isStaff
      }
      token
    }
  }
`;
