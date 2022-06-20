// import { useQuery, gql } from "@apollo/client";
import { gql } from "graphql-tag";

export const GET_USERS = gql`
  query ($limit: Int) {
    getUsers(limit: $limit) {
      name
      email
      phone
      uid
    }
  }
`;

export const GET_ORDERS = gql`
  query ($limit: Int) {
    getOrders(limit: $limit) {
      bookingDate
      title
      uid
      customer {
        name
        email
      }
      address {
        city
        country
        street
        zip
      }
    }
  }
`;

export const GET_ORDER_BY_EMAIL = gql`
  query ($email: String, $limit: Int) {
    getOrderByEmail(email: $email, limit: $limit) {
      title
      uid
      bookingDate
      address {
        city
      }
      customer {
        name
        email
      }
    }
  }
`;

export const GET_ORDER_BY_ID = gql`
  query ($id: ID!) {
    getOrder(id: $id) {
      uid
      bookingDate
      title
      customer {
        name
      }
      address {
        city
        country
        street
        zip
      }
    }
  }
`;
// export const GET_USERS = gql`
//   query getUsers($limit: Int) {
//     getUsers(limit: $limit) {
//       name
//       email
//       phone
//       uid
//     }
//   }
// `;

// export const GET_ORDERS = gql`
//   query getOrders($limit: Int) {
//     getOrders(limit: $limit) {
//       bookingDate
//       title
//       uid
//       customer {
//         name
//         email
//       }
//     }
//   }
// `;

// export const GET_ORDER_BY_EMAIL = gql`
//   query getOrderByEmail($email: String!) {
//     getOrderByEmail(email: $email) {
//       title
//       uid
//       bookingDate
//       address {
//         city
//       }
//       customer {
//         name
//         email
//       }
//     }
//   }
// `;

// export const GET_ORDER_BY_ID = gql`
//   query getOrder($id: ID!) {
//     getOrder(id: $id) {
//       uid
//       bookingDate
//       title
//       customer {
//         name
//       }
//       address {
//         city
//         zip
//       }
//     }
//   }
// `;
