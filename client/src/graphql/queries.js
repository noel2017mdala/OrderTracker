import { useQuery, gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers($limit: Int) {
    getUsers(limit: $limit) {
      name
      email
      phone
      uid
    }
  }
`;

export const GET_ORDERS = gql`
  query getOrders($limit: Int) {
    getOrders(limit: $limit) {
      bookingDate
      title
      uid
      customer {
        name
        email
      }
    }
  }
`;

export const GET_ORDER_BY_EMAIL = gql`
  query getOrderByEmail($email: String!) {
    getOrderByEmail(email: $email) {
      title
      uid
      address {
        city
      }
    }
  }
`;

export const GET_ORDER_BY_ID = gql`
  query getOrder($id: String!) {
    getOrder(id: $id) {
      uid
      bookingDate
      title
      customer {
        name
      }
      address {
        city
        zip
      }
    }
  }
`;
