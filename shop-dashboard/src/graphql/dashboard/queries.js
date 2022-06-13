import gql from "graphql-tag";
export const ORDERCONDITION = gql`
  {
    orderCondition {
      status
      count
    }
  }
`;

export const PURCHASECOUNT = gql`
  {
    purchaseCount
  }
`;

export const USERCOUNT = gql`
  {
    userCount
  }
`;
