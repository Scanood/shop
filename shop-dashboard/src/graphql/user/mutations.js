import gql from "graphql-tag";
export const STAFFPASSWORDRESET = gql`
  mutation ($token: String!, $newPassWord: String!) {
    PassWordResetWithToken(token: $token, newPassword: $newPassWord) {
      success
    }
  }
`;

export const STAFFDELETEUSER = gql`
  mutation ($token: String!) {
    AccountDeleteWithToken(token: $token) {
      success
    }
  }
`;
