// import { useQuery, useMutation } from "@apollo/client";
// import { DELETE_ORDER_BY_ID } from "../graphql/mutations";
// import { GET_ORDERS } from "../graphql/queries";

const DeleteButton = ({ orderId, QUERY }) => {

  // const [deleteOrder] = useMutation(DELETE_ORDER_BY_ID, {
  //   variables: { id: orderId },
  //   refetchQueries: [{ query: QUERY }],
  // });

  //   const {loading, error, data, refetch} = useQuery(GET_ORDERS);

  return (
    <button
      className="px-3 bg-red-600 sm:py-3 text-white rounded hover:bg-red-700"
      // onClick={() => {
      //   // console.log(orderId);
      //   deleteOrder({ variables: { id: orderId } });
      // }}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
