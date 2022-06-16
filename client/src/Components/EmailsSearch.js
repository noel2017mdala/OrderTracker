import { timeConverter } from "../helper/UnixTimeConverter";
import DeleteButton from "./DeleteButton";
// import {GET_ORDER_BY_ID} from "../graphql/queries";

const EmailSearch = ({ values, state, error }) => {

  if(state) return <p>Loading</p>
  return (
    <div className="flex h-fit w-9/12  mx-auto mt-14">
      <div className="max-h-96  w-full">
        {!values.getOrderByEmail || values.getOrderByEmail.length < 1 ? (
          <p className="text-center bg-red-200">No Order found</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  No.
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Order Title
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
              {values.getOrderByEmail.map((order, i) => (
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
                      <button className="px-3 bg-main sm:py-3 text-white rounded hover:bg-mainHover">
                        Update
                      </button>
                      {/* <DeleteButton orderId={order.uid} /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmailSearch;
