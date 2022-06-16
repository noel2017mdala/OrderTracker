import { gql } from "graphql-tag";

export const CREATE_ORDER = gql`
  mutation ($input: OrderInput) {
    createOrder(input: $input) {
      address {
        city
        country
        zip
        street
      }
      bookingDate
      customer {
        name
        phone
        email
      }
      title
      uid
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation ($input: OrderInput) {
    updateOrder(input: $input) {
      title
      uid
      bookingDate
    }
  }
`;

export const DELETE_ORDER_BY_ID = gql`
  mutation ($id: ID!) {
    deleteOrder(id: $id)
  }
`;

export const DELETE_BY_EMAIL = gql`
  mutation ($email: String!) {
    deleteAllOrdersByEmail(email: $email)
  }
`;
