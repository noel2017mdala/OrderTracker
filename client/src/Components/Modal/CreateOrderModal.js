import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useAuth } from "../../context/authContext";
import { useQueryClient } from "react-query";
import { CREATE_ORDER } from "../../graphql/mutations";
import { useGQLMutation } from "../../hooks/useGqlMutations";
import ClipLoader from "react-spinners/ClipLoader";
import uuid from "react-uuid";
import styles from "../../styles.css";
import { css } from "@emotion/react";
const CreateOrderModal = ({ values, fetchData }) => {
  const [orderTitle, setOrderTitle] = useState("");
  const [orderCountry, setOrderCountry] = useState("");
  const [orderCity, setOrderCity] = useState("");
  const [orderZip, setOrderZip] = useState("");
  const [orderStreet, setOrderStreet] = useState("");
  const [createLoader, setCreateLoader] = useState(false);

  const [errorState, setError] = useState({
    orderTitleErr: false,
    orderCityErr: false,
    orderCountryErr: false,
    orderZipErr: false,
    orderStreetErr: false,
  });

  const [msg, setMsg] = useState({
    state: false,
    message: "",
  });

  const override = css`
    display: block;
    border-color: #ffffff;
  `;

  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync: createOrder } = useGQLMutation(CREATE_ORDER, {
    onSuccess: () => {
      queryClient.invalidateQueries("get_orders");
    },
  });
  return (
    <>
      <div
        className={`darkBG`}
        onClick={(e) => {
          values(false);
        }}
      />
      <div className="">
        <div
          className={`centered w-10/12 flex flex-col items-center justify-center `}
        >
          <div className="z-10 bg-white sm:w-11/12 md:w-9/12 rounded shadow">
            <button className={`styles.closeBtn`} onClick={() => values(false)}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
            <h5 className={`heading`}>Create Order</h5>

            <div className="w-full sm:max-w-xs md:max-w-md m-auto pb-4">
              <form className="bg-white rounded px-8 pt-6 pb-8 mb-4 ">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2 uppercase dark:text-white">
                    Order Title
                  </label>

                  <input
                    className={`
          shadow
          appearance-none
          border
          rounded
          w-full
          py-3
          px-3
          text-gray-500
          leading-tight
          focus:outline-none focus:shadow-outline
${
  errorState.orderTitleErr
    ? `
  border-solid
  border-red-500
  border-3

  `
    : null
}

`}
                    type="text"
                    placeholder="Title"
                    value={orderTitle}
                    onChange={(e) => {
                      setOrderTitle(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 uppercase dark:text-white">
                    Country
                  </label>

                  <input
                    className={`
          shadow
          appearance-none
          border
          rounded
          w-full
          py-3
          px-3
          text-gray-500
          leading-tight
          focus:outline-none focus:shadow-outline

          ${
            errorState.orderCountryErr
              ? `
            border-solid
            border-red-500
            border-3
            `
              : null
          }
`}
                    type="text"
                    placeholder="Country"
                    value={orderCountry}
                    onChange={(e) => {
                      setOrderCountry(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 uppercase dark:text-white">
                    City
                  </label>

                  <input
                    className={`
          shadow
          appearance-none
          border
          rounded
          w-full
          py-3
          px-3
          text-gray-500
          leading-tight
          focus:outline-none focus:shadow-outline

          ${
            errorState.orderCityErr
              ? `
            border-solid
            border-red-500
            border-3
            `
              : null
          }
`}
                    type="text"
                    placeholder="City"
                    value={orderCity}
                    onChange={(e) => {
                      setOrderCity(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 uppercase dark:text-white">
                    Zip
                  </label>

                  <input
                    className={`
          shadow
          appearance-none
          border
          rounded
          w-full
          py-3
          px-3
          text-gray-500
          leading-tight
          focus:outline-none focus:shadow-outline

          ${
            errorState.orderZipErr
              ? `
            border-solid
            border-red-500
            border-3
            `
              : null
          }
`}
                    type="text"
                    placeholder="Zip"
                    value={orderZip}
                    onChange={(e) => {
                      setOrderZip(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 uppercase dark:text-white">
                    Street
                  </label>

                  <input
                    className={`
          shadow
          appearance-none
          border
          rounded
          w-full
          py-3
          px-3
          text-gray-500
          leading-tight
          focus:outline-none focus:shadow-outline

          ${
            errorState.orderStreetErr
              ? `
            border-solid
            border-red-500
            border-3
            `
              : null
          }
`}
                    type="text"
                    placeholder="Street"
                    value={orderStreet}
                    onChange={(e) => {
                      setOrderStreet(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-4 flex items-end justify-around">
                  <button
                    className="
                bg-main
          text-white
          font-bold
          py-2
          px-4
          rounded
          focus:outline-none focus:shadow-outline
          shadow
        hover:bg-mainHover
                "
                    onClick={async (e) => {
                      e.preventDefault();
                      setCreateLoader(true);

                      if (
                        orderCity === "" &&
                        orderTitle === "" &&
                        orderCountry === "" &&
                        orderZip === "" &&
                        orderStreet === ""
                      ) {
                        setError({
                          orderTitleErr: true,
                          orderCityErr: true,
                          orderCountryErr: true,
                          orderZipErr: true,
                          orderStreetErr: true,
                        });
                        setCreateLoader(false);
                      } else if (orderCity === "") {
                        setError({
                          orderTitleErr: false,
                          orderCityErr: true,
                          orderCountryErr: false,
                          orderZipErr: false,
                          orderStreetErr: false,
                        });
                        setCreateLoader(false);
                      } else if (orderTitle === "") {
                        setError({
                          orderTitleErr: true,
                          orderCityErr: false,
                          orderCountryErr: false,
                          orderZipErr: false,
                          orderStreetErr: false,
                        });
                        setCreateLoader(false);
                      } else if (orderCountry === "") {
                        setError({
                          orderTitleErr: false,
                          orderCityErr: false,
                          orderCountryErr: true,
                          orderZipErr: false,
                          orderStreetErr: false,
                        });
                        setCreateLoader(false);
                      } else if (orderZip === "") {
                        setError({
                          orderTitleErr: false,
                          orderCityErr: false,
                          orderCountryErr: false,
                          orderZipErr: true,
                          orderStreetErr: false,
                        });
                        setCreateLoader(false);
                      } else if (orderStreet === "") {
                        setError({
                          orderTitleErr: false,
                          orderCityErr: false,
                          orderCountryErr: false,
                          orderZipErr: false,
                          orderStreetErr: true,
                        });
                        setCreateLoader(false);
                      } else {
                        setError({
                          orderTitleErr: false,
                          orderCityErr: false,
                          orderCountryErr: false,
                          orderZipErr: false,
                          orderStreetErr: false,
                        });
                        const date = new Date();
                        let year = date.getFullYear();
                        let month = date.getMonth();
                        let day = date.getDay();

                        let dateStr = `${year}-${month}-${day}`;

                        const unixTime = Math.floor(
                          new Date(dateStr).getTime() / 1000
                        );

                        let data = {
                          address: {
                            city: orderCity,
                            country: orderCountry,
                            zip: orderZip,
                            street: orderStreet,
                          },
                          uid: uuid(),
                          title: orderTitle,
                          bookingDate: String(unixTime),
                          customer: {
                            name: currentUser.displayName
                              ? currentUser.displayName
                              : currentUser.email,
                            email: currentUser.email,
                            phone: currentUser.phoneNumber
                              ? currentUser.phoneNumber
                              : "0123456789",
                          },
                        };
                        try {
                          let res = await createOrder({ input: data });
                          if (res) {
                            setMsg({
                              state: true,
                              message: "Order created Successfully",
                            });

                            setOrderTitle("");
                            setOrderCountry("");
                            setOrderCity("");
                            setOrderZip("");
                            setOrderStreet("");
                            setCreateLoader("");
                            setCreateLoader(false);
                          } else {
                            setMsg({
                              state: true,
                              message: "failed to create order",
                            });

                            setCreateLoader(false);
                          }
                        } catch (error) {
                          setMsg({
                            state: true,
                            message: "failed to create order",
                          });

                          setCreateLoader(false);
                        }
                      }
                    }}
                  >
                    {createLoader ? (
                      <ClipLoader color="#FFFFFF" css={override} size={30} />
                    ) : (
                      "Create"
                    )}
                  </button>

                  <button
                    className={"bg-red-600 py-2 px-3 rounded text-white"}
                    onClick={(e) => {
                      e.preventDefault();
                      values(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>

                {msg.state ? (
                  <p className="block text-center mt-4 text-red-400">
                    {msg.message}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOrderModal;
