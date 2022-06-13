import React, { useState } from "react";
import Search from "./Search";
import Users from "./Users";
import Orders from "./Orders";
const Dashboard = () => {
  const [tabState, setTabState] = useState({
    users: true,
    orders: false,
    search: false,
  });
  return (
    <div className="">
      <nav className=" p-6 rounded-sm shadow-md w-full">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl tracking-wide">Order Tracker</p>
          </div>
          <div>
            <button
              className="bg-main
          text-white
          font-bold
          py-2
          px-4
          rounded focus:outline-none focus:shadow-outline
          shadow
        hover:bg-mainHover"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>

      <div className="">
        <div className="tabs flex flex-row pt-6 my-2  mx-12 w-3/4">
          <button
            className={` py-2 px-6 uppercase ${
              tabState.users
                ? "bg-main sm:py-3 text-white rounded hover:bg-mainHover"
                : ""
            } ${!tabState.users ? "hover:bg-gray-100" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setTabState({
                ...tabState,
                users: true,
                search: false,
                orders: false,
              });
            }}
          >
            Users
          </button>
          <button
            className={`py-2 px-6 uppercase ${
              tabState.orders
                ? "bg-main sm:py-3 text-white rounded hover:bg-mainHover"
                : ""
            } ${!tabState.orders ? "hover:bg-gray-100" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setTabState({
                ...tabState,
                search: false,
                users: false,
                orders: true,
              });
            }}
          >
            Orders
          </button>
          <button
            className={`py-2 px-6 uppercase ${
              tabState.search
                ? "bg-main sm:py-3 text-white rounded hover:bg-mainHover"
                : ""
            } ${!tabState.search ? "hover:bg-gray-100" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setTabState({
                ...tabState,
                search: true,
                users: false,
                orders: false,
              });
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div>
          {tabState.users ? <Users /> : tabState.orders ? <Orders /> : tabState.search ? <Search /> : null}
      </div>
    </div>
  );
};

export default Dashboard;
