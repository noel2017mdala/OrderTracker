import { gql } from "graphql-tag";

// export const CREATE_ORDER = gql`
//   mutation createOrder($input: OrderInput) {
//     createOrder(input: $input) {
//       address {
//         city
//         country
//         zip
//         street
//       }
//       bookingDate
//       customer {
//         name
//         phone
//         email
//       }
//       title
//       uid
//     }
//   }
// `;

// export const DELETE_ORDER_BY_ID = gql`
// mutation deleteOrder($id: ID!){
//     deleteOrder(id: $id)
// }
// `;

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
  mutation ($input: OrderInput){
    updateOrder(input: $input){
      title
      uid
      bookingDate
    }
  }
`

export const DELETE_ORDER_BY_ID = gql`
  mutation ($id: ID!) {
    deleteOrder(id: $id)
  }
`;
