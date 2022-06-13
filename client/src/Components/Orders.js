import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../graphql/queries";
const Orders = () => {
  const [selectState, setSelectState] = useState(5);

  const { error, loading, data } = useQuery(GET_ORDERS, {
    variables: { limit: Number(selectState) },
  });

  if (loading) return <div>Loading.....</div>;

  if (error) return <div>Opps something happened</div>;
  return (
    <div className="flex h-fit w-9/12  mx-auto mt-14 ">
      <div className="overflow-auto rounded-lg shadow mx-auto md:w-3/4 lg:w-3/4 h-3/4">
        <div className="flex items-center justify-between mb-4">
          <button className="px-3 bg-main sm:py-3 text-white rounded hover:bg-mainHover">Create Order</button>
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
          </select>
        </div>

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
                  {order.bookingDate}
                </td>
                <td
                  className={`p-3 text-sm text-gray-700 ${
                    (i + 1) % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <div className="flex flex-row items-center justify-evenly">
                    <button className="px-3 bg-main sm:py-3 text-white rounded hover:bg-mainHover">
                      Update
                    </button>
                    <button className="px-3 bg-red-600 sm:py-3 text-white rounded hover:bg-red-700">
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
  );
};

export default Orders;
