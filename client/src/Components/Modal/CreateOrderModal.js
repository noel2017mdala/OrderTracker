import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useAuth } from "../../context/authContext";
import { useQueryClient } from "react-query";
import { CREATE_ORDER } from "../../graphql/mutations";
import { useGQLMutation } from "../../hooks/useGqlMutations";
import uuid from "react-uuid";
import styles from "../../styles.css";
const CreateOrderModal = ({ values, fetchData }) => {
  const [orderTitle, setOrderTitle] = useState("");
  const [orderCountry, setOrderCountry] = useState("");
  const [orderCity, setOrderCity] = useState("");
  const [orderZip, setOrderZip] = useState("");
  const [orderStreet, setOrderStreet] = useState("");

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
`}
                    id="username"
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
`}
                    id="username"
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
`}
                    id="username"
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
`}
                    id="username"
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
`}
                    id="username"
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
                      // console.log(
                      //   orderCity,
                      //   orderTitle,
                      //   orderCountry,
                      //   orderZip,
                      //   currentUser
                      // );

                      if (
                        orderCity == "" ||
                        orderTitle == "" ||
                        orderCountry == "" ||
                        orderZip == "" ||
                        orderStreet == ""
                      ) {
                        console.log("please enter the values");
                      } else {
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
                        let res = createOrder({ input: data });
                        if(res){
                          console.log("Order created");
                        }
                      }
                    }}
                  >
                    Create
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOrderModal;
