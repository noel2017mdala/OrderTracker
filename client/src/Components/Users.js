import React, { useState } from "react";
import { GET_USERS } from "../graphql/queries";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { useGQLQuery } from "../hooks/useGqlQueries";
import { useAuth } from "../context/authContext";
const Users = () => {
  const [selectState, setSelectState] = useState(5);
  const { userToken } = useAuth();

  const { data, isLoading, error } = useGQLQuery(
    ["get_users", selectState, userToken],
    GET_USERS,
    { limit: Number(selectState) }
  );

  const override = css`
    display: block;
    border-color: #00bfa5;
  `;

  // if (error) return <div>Opps something</div>;

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
      ) : data.getUsers.length < 1 ? (
        <div className="w-full mx-auto flex items-center justify-center">
          <p className="text-center  w-full">No Users found</p>
        </div>
      ) : (
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
            <option value={50}>50</option>
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
      )}
    </div>
  );
};

export default Users;
