import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/queries";
const Users = () => {

  const [selectState, setSelectState] = useState(5);

  const { error, loading, data, refetch } = useQuery(GET_USERS, {
    variables: {limit: Number(selectState)}
  });


  // console.log(data);
  if (loading) return <div>Loading ...</div>;

  if (error) return <div>Opps something</div>;

 
  return (
    <div className="flex h-fit w-9/12  mx-auto mt-14">
      <div className="overflow-auto rounded-lg shadow mx-auto md:w-3/4 lg:w-3/4">
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
        </select>
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                No.
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Name
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Email
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Phone
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.getUsers.map((user, i) => (
              <tr key={i}>
                <td
                  className={`p-3 text-sm text-gray-700 ${
                    i + (1 % 2) === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {(i = 1)}
                </td>
                <td
                  className={`p-3 text-sm text-gray-700 ${
                    i + (1 % 2) === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {user.name}
                </td>
                <td
                  className={`p-3 text-sm text-gray-700 ${
                    i + (1 % 2) === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {user.email}
                </td>
                <td
                  className={`p-3 text-sm text-gray-700 ${
                    i + (1 % 2) === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {user.phone}
                </td>
                <td
                  className={`p-3 text-sm text-gray-700 ${
                    i + (1 % 2) === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <button>View all customer Orders</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
