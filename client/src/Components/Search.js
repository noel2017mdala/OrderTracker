import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { GET_ORDER_BY_EMAIL } from "../graphql/queries";
import { DELETE_BY_EMAIL } from "../graphql/mutations";
import ClipLoader from "react-spinners/ClipLoader";
import { useGQLQuery } from "../hooks/useGqlQueries";
import { useGQLMutation } from "../hooks/useGqlMutations";
import { timeConverter } from "../helper/UnixTimeConverter";
import { css } from "@emotion/react";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [selectState, setSelectState] = useState("");
  const [emailTab, setEmailTab] = useState(false);
  const [inputError, clearInputError] = useState(false);
  const [searchError, setSearchError] = useState({
    state: false,
    msg: "",
  });

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useGQLQuery(
    ["get_orders_by_email", emailTab],
    GET_ORDER_BY_EMAIL,
    {
      email: searchText,
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

  return (
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
          dark:text-white
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

      <div className="w-2/4 mt-4 flex h-fit mx-auto">
        {isLoading ? (
          <div className="w-full mx-auto flex items-center justify-center">
            <ClipLoader color="#00BFA5" css={override} size={50} className="" />
          </div>
        ) : error ? (
          <div className="absolute mx-auto  w-full">
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
          <div className=" max-h-96 mx-auto">
            <button
              className="bg-red-600 py-2 px-3 rounded text-white my-4 float-right"
              onClick={async (e) => {
                e.preventDefault();

                try {
                  if (data.getOrderByEmail) {
                    let getMail = data.getOrderByEmail[0].customer.email;
                    if (getMail) {
                      let deleteByMail = await deleteOrderByEmail({
                        email: getMail,
                      });

                      if (!deleteByMail) {
                        setSearchError({
                          msg: "Failed to delete button",
                          state: true,
                        });
                      }
                    }
                  } else {
                    setSearchError({
                      msg: "Failed to delete button",
                      state: true,
                    });
                  }
                } catch (error) {
                  setSearchError({
                    msg: "Failed to delete button",
                    state: true,
                  });
                }
              }}
            >
              Delete All
            </button>
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
                    ></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

