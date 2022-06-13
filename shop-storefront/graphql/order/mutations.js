import { gql } from "@apollo/client";

export const DELETEORDER = gql`
  mutation ($token: String!) {
    OrderDelete(token: $token) {
      success
    }
  }
`;

export const UPDATEORDERSTATE=gql`
mutation($order:String!,$status:OrderStatusType){
  OrderUpdateStatus(order:$order,status:$status){
    success
    msg
  }
}

`