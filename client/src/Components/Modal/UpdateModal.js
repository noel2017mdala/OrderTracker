import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "../../context/authContext";
import { RiCloseLine } from "react-icons/ri";
import styles from "../../styles.css";
import { UPDATE_ORDER } from "../../graphql/mutations";
import getAuthToken from "../../helper/getAuthToken";
import request from "graphql-request";

const UpdateModal = ({ modalState, orderData }) => {
  const [title, setTitle] = useState(orderData.title);
  const [country, setCountry] = useState(orderData.address.country);
  const [city, setCity] = useState(orderData.address.city);
  const [zip, setZip] = useState(orderData.address.zip);
  const [street, setStreet] = useState(orderData.address.street);
  const { currentUser } = useAuth();

  const queryClient = useQueryClient();

  const updateOrderFunc = async (data) => {
    let updateOrder = await request(
      process.env.REACT_APP_PRODUCTION_SERVER,
      UPDATE_ORDER,
      {
        input: data,
      }
    );

    if (updateOrder) {
      console.log(updateOrder);
    } else {
      console.log("failed to update order");
    }
  };

  const { mutateAsync: updateOrder } = useMutation(updateOrderFunc, {
    onSuccess: () => {
      queryClient.invalidateQueries("get_orders");
    },
  });

  return (
    <>
      <div
        className="darkBG"
        onClick={() => {
          modalState(false);
        }}
      />

      <div className="">
        <div
          className={`centered w-10/12 flex flex-col items-center justify-center `}
        >
          <div className="z-10 bg-white sm:w-11/12 md:w-9/12 rounded shadow">
            <button
              className={`styles.closeBtn`}
              onClick={() => modalState(false)}
            >
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
            <h5 className={`heading`}>Update Order</h5>
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
`}
                    id="username"
                    type="text"
                    value={title == null ? "" : title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    placeholder="Title"
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
`}
                    id="username"
                    value={country === null ? "" : country}
                    type="text"
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                    placeholder="Country"
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
`}
                    id="username"
                    type="text"
                    value={city === null ? "" : city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    placeholder="City"
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
`}
                    id="username"
                    type="text"
                    value={zip === null ? "" : zip}
                    onChange={(e) => {
                      setZip(e.target.value);
                    }}
                    placeholder="Zip"
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
`}
                    id="username"
                    type="text"
                    value={street === null ? "" : street}
                    onChange={(e) => {
                      setStreet(e.target.value);
                    }}
                    placeholder="Street"
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
                      if (
                        city === "" ||
                        title === "" ||
                        country === "" ||
                        zip === "" ||
                        street === ""
                      ) {
                        console.log("Please enter your values");
                      } else {
                        let data = {
                          address: {
                            city: city,
                            country: country,
                            street: street,
                          },
                          title: title,
                          uid: orderData.uid,
                        };

                        let result = updateOrder(data);

                        if (result) {
                          console.log(data);
                        } else {
                          console.log("Failed to update document");
                        }
                      }
                    }}
                  >
                    update
                  </button>

                  <button
                    className={"bg-red-600 py-2 px-3 rounded text-white"}
                    onClick={(e) => {
                      e.preventDefault();
                      modalState(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
