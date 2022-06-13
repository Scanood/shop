import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      success
      user {
        email
        isStaff
      }
      token
    }
  }
`;

export const SENDPASSWORDRESETEMAIL = gql`
  mutation ($email: String!) {
    sendPasswordResetEmail(email: $email) {
      success
      errors
    }
  }
`;

export const REGISTER = gql`
  mutation (
    $email: String!
    $username: String!
    $password1: String!
    $password2: String!
  ) {
    register(
      email: $email
      username: $username
      password1: $password1
      password2: $password2
    ) {
      success
      errors
    }
  }
`;

export const CHANGEPASSWORD = gql`
  mutation (
    $oldPassword: String!
    $newPassword1: String!
    $newPassword2: String!
  ) {
    passwordChange(
      oldPassword: $oldPassword
      newPassword1: $newPassword1
      newPassword2: $newPassword2
    ) {
      success
      token
    }
  }
`;

export const DELETEACCOUNT = gql`
  mutation ($password: String!) {
    deleteAccount(password: $password) {
      success
    }
  }
`;

export const DELETEADDRESS = gql`
  mutation ($id: ID!) {
    AccountAddressDelete(id: $id) {
      success
    }
  }
`;

export const UPDATEADDRESS = gql`
  mutation ($id: ID!, $input: AddressInput!) {
    AccountAddressUpdate(id: $id, input: $input) {
      success
    }
  }
`;

export const CREATEADDRESS = gql`
  mutation ($input: AddressInput!) {
    AccountAddressCreate(input: $input) {
      success
    }
  }
`;

export const ACTIVEACCOUNT = gql`
  mutation ($token: String!) {
    verifyAccount(token: $token) {
      success
    }
  }
`;

export const PASSWORDRESET = gql`
  mutation ($token: String!, $newPassword1: String!, $newPassword2: String!) {
    passwordReset(
      token: $token
      newPassword1: $newPassword1
      newPassword2: $newPassword2
    ) {
      success
      errors
    }
  }
`;

export const RESENDACTIVATEEMAIL = gql`
  mutation ($email: String!) {
    resendActivationEmail(email: $email) {
      success
      errors
    }
  }
`;
