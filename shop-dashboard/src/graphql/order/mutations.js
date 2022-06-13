import gql from "graphql-tag";
export const UPDATEORDERSTATUS = gql`
  mutation ($order: String!, $status: OrderStatusType) {
    OrderUpdateStatus(order: $order, status: $status) {
      success
      msg
    }
  }
`;

export const UPDATEORDERSHIPPING = gql`
  mutation ($shipping: String!, $token: String!) {
    OrderShippingUpdate(shipping: $shipping, token: $token) {
      success
    }
  }
`;
