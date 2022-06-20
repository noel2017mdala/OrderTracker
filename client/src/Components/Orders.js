import React, { useState } from "react";
import { GET_ORDERS } from "../graphql/queries";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import CreateOrderModal from "./Modal/CreateOrderModal";
import { timeConverter } from "../helper/UnixTimeConverter";
import { useQueryClient } from "react-query";
import { DELETE_ORDER_BY_ID } from "../graphql/mutations";
import UpdateModal from "./Modal/UpdateModal";
import { useGQLMutation } from "../hooks/useGqlMutations";
import notify from "../helper/Notification";
import { useGQLQuery } from "../hooks/useGqlQueries";
import { useAuth } from "../context/authContext";
import { ToastContainer } from "react-toastify";

const Orders = () => {
  const [selectState, setSelectState] = useState(5);
  const [modalState, setModalState] = useState(false);
  const [updateModal, setUpdateModalState] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [deleteLoaderState, setDeleteLoaderState] = useState(false);

  const { userToken } = useAuth();

  const override = css`
    display: block;
    border-color: #00bfa5;
  `;

  const queryClient = useQueryClient();

  const { mutateAsync: deleteOrder } = useGQLMutation(DELETE_ORDER_BY_ID, {
    onSuccess: () => {
      queryClient.invalidateQueries("get_orders");
    },
  });

  const { data, isLoading, error } = useGQLQuery(
    ["get_orders", selectState, userToken],
    GET_ORDERS,
    {
      limit: Number(selectState),
    }
  );

  return (
    <div className="flex h-fit w-9/12  mx-auto mt-14">
      {isLoading ? (
        <div className="w-full mx-auto flex items-center justify-center">
          <ClipLoader color="#00BFA5" css={override} size={50} className="" />
        </div>
      ) : error ? (
        <div className="w-full mx-auto flex items-center justify-center">
          <p className="text-center  w-full">
            Opps something happened please try again later
          </p>
        </div>
      ) : data.getOrders.length < 1 ? (
        <div className="w-full mx-auto flex items-center justify-center">
          <p className="text-center  w-full">No Orders found</p>
        </div>
      ) : (
        <div className="rounded-lg shadow mx-auto md:w-3/4 lg:w-3/4 h-3/4">
          <div className="flex items-center justify-between mb-4">
            <button
              className="px-3 bg-main sm:py-3 text-white rounded hover:bg-mainHover"
              onClick={(e) => {
                setModalState(!modalState);
              }}
            >
              Create Order
            </button>
            <select
              className="px-4 py-3 mb-2 rounded border-none"
              onChange={(e) => {
                setSelectState(e.target.value);
              }}
              //   defaultValue={selectState}
              value={selectState}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className=" max-h-96 overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    No.
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Order name
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Customer Name
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Booking date
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.getOrders.map((order, i) => (
                  <tr key={order.uid}>
                    <td
                      className={`p-3 text-sm text-gray-700 ${
                        (i + 1) % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </td>
                    <td
                      className={`p-3 text-sm text-gray-700 ${
                        (i + 1) % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      {order.title}
                    </td>
                    <td
                      className={`p-3 text-sm text-gray-700 ${
                        (i + 1) % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      {order.customer.name}
                    </td>
                    <td
                      className={`p-3 text-sm text-gray-700 ${
                        (i + 1) % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      {timeConverter(order.bookingDate)}
                    </td>
                    <td
                      className={`p-3 text-sm text-gray-700 ${
                        (i + 1) % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex flex-row items-center justify-evenly">
                        <button
                          className="px-3 bg-main sm:py-3 text-white rounded hover:bg-mainHover"
                          onClick={(e) => {
                            setOrderData(order);
                            setModalState(false);
                            setUpdateModalState(true);
                          }}
                        >
                          Update
                        </button>

                        <button
                          className="px-3 bg-red-600 sm:py-3 text-white rounded hover:bg-red-700"
                          disabled={deleteLoaderState ? "disabled" : ""}
                          onClick={async () => {
                            setDeleteLoaderState(true);

                            let deleteId = await deleteOrder({ id: order.uid });

                            if (deleteId) {
                              
                              setDeleteLoaderState(false);
                              notify.success("Order deleted successfully");
                            }else{
                              notify.fail("Failed to delete oder")
                            }
                          }}

                          style={
                            deleteLoaderState
                              ? {
                                  cursor: "not-allowed",
                                }
                              : null
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalState ? <CreateOrderModal values={setModalState} /> : null}
      {updateModal ? (
        <UpdateModal modalState={setUpdateModalState} orderData={orderData} />
      ) : null}

      <ToastContainer />
    </div>
  );
};

export default Orders;
