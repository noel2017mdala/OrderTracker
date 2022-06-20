import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { GET_ORDER_BY_EMAIL } from "../graphql/queries";
import { DELETE_BY_EMAIL } from "../graphql/mutations";
import ClipLoader from "react-spinners/ClipLoader";
import { useGQLQuery } from "../hooks/useGqlQueries";
import { useGQLMutation } from "../hooks/useGqlMutations";
import { timeConverter } from "../helper/UnixTimeConverter";
import notify from "../helper/Notification";
import { css } from "@emotion/react";
import { useAuth } from "../context/authContext";
import { ToastContainer } from "react-toastify";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [selectState, setSelectState] = useState(5);
  const [emailTab, setEmailTab] = useState(false);
  const [inputError, clearInputError] = useState(false);
  const [searchError, setSearchError] = useState({
    state: false,
    msg: "",
  });

  const [deleteOrder, setDeleteOrder] = useState(false);
  const { userToken } = useAuth();

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useGQLQuery(
    ["get_orders_by_email", emailTab, selectState],
    GET_ORDER_BY_EMAIL,
    {
      email: searchText,
      limit: Number(selectState),
    }
  );

  const override = css`
    display: block;
    border-color: #00bfa5;
  `;

  const validateUserInput = (searchText) => {
    if (searchText === "") {
      clearInputError(true);
    } else {
      setEmailTab(!emailTab);
    }
  };

  const { mutateAsync: deleteOrderByEmail } = useGQLMutation(DELETE_BY_EMAIL, {
    onSuccess: () => {
      queryClient.invalidateQueries("get_orders_by_email");
    },
  });

  const validateDelete = async (e) => {
    try {
      if (data.getOrderByEmail) {
        let getMail = data.getOrderByEmail[0].customer.email;
        if (getMail) {
          let deleteByMail = await deleteOrderByEmail({
            email: getMail,
          });

          if (!deleteByMail) {
            notify.fail("Failed to delete");
            setSearchError({
              msg: "Failed to delete button",
              state: true,
            });
          } else {
            notify.success("Orders deleted successfully");
          }
        }
      } else {
        notify.fail("Failed to delete");
        setSearchError({
          msg: "Failed to delete",
          state: true,
        });
      }
    } catch (error) {
      notify.fail("Failed to delete");
      setSearchError({
        msg: "Failed to delete button",
        state: true,
      });
    }
  };

  return (
    <>
      <div>
        <div className="w-2/4 mx-auto mt-12 p-6">
          {searchError.state ? (
            <p className="text-center mb-2 text-red-400">{searchError.msg}</p>
          ) : null}

          <div className="flex items-center justify-center">
            <input
              className={` shadow
          appearance-none
          border
          rounded
          md:w-3/4
          lg:w-3/4
          py-3
          px-3
          text-gray-500
          leading-tight
          focus:outline-none focus:shadow-outline
          dark:shadow-lg
          
          ${
            inputError
              ? ` border-solid
          border-red-500
            border-3`
              : null
          }
          
          `}
              type="text"
              placeholder="Find orders by email"
              onChange={(e) => {
                setSearchText(e.target.value);
                if (inputError) {
                  clearInputError(false);
                }

                if (searchError.state) {
                  setSearchError({
                    msg: "",
                    state: false,
                  });
                }
              }}
            />

            <button
              className="px-3 bg-main mx-4 sm:py-3 text-white rounded hover:bg-mainHover"
              onClick={(e) => {
                e.preventDefault();
                validateUserInput(searchText);
              }}
            >
              Search
            </button>
          </div>
        </div>

        <div className="w-2/4 mt-4 flex h-fit mx-auto ">
          {isLoading ? (
            <div className="w-full mx-auto flex items-center justify-center">
              <ClipLoader
                color="#00BFA5"
                css={override}
                size={50}
                className=""
              />
            </div>
          ) : error ? (
            <div className="absolute mx-auto w-2/4  text-center">
              <p className="text-center  w-full">
                Opps something happened please try again later
              </p>
            </div>
          ) : !data.getOrderByEmail &&
            searchText.length > 0 ? null : !data.getOrderByEmail ? null : data
              .getOrderByEmail.length < 1 ? (
            <div className="absolute mx-auto w-2/4  text-center">
              <p>No Orders found</p>
            </div>
          ) : (
            <div className=" max-h-96 mx-auto w-full">
              <div className="flex items-center justify-between">
                <select
                  className="float-right px-4 py-2 mb-2 rounded border-none"
                  onChange={(e) => {
                    setSelectState(e.target.value);
                  }}
                  value={selectState}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>

                <button
                  className="bg-red-600 py-2 px-3 rounded text-white my-4 float-right"
                  onClick={validateDelete}
                >
                  {deleteOrder ? (
                    <ClipLoader
                      color="#FFFFFF"
                      css={override}
                      size={20}
                      className=""
                    />
                  ) : (
                    "Delete All"
                  )}
                </button>
              </div>

              <div className="max-h-96 mx-auto overflow-auto ">
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
                    </tr>
                  </thead>
                  {/* <tbody>
                    {data.getOrderByEmail.map((order, i) => (
                      <tr key={i}>
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
                        ></td>
                      </tr>
                    ))}
                  </tbody> */}

                  <tbody>
                {data.getOrderByEmail.map((order, i) => (
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
                      {/* <div className="flex flex-row items-center justify-evenly">

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
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div> */}
                    </td>
                  </tr>
                ))}
              </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Search;
