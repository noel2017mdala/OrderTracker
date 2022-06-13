import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ORDER_BY_EMAIL, GET_ORDER_BY_ID } from "../graphql/queries";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [selectState, setSelectState] = useState("");
  // const [searchText, setSearchText] = useState("");

  const [searchByEmail, { loading, error, data }] = useLazyQuery(
    GET_ORDER_BY_EMAIL,
    {
      variables: { email: searchText },
    }
  );

  const [searchById, { loading: load, error: err, data: searchData }] =
    useLazyQuery(GET_ORDER_BY_ID, {
      variables: { id: searchText },
    });

  console.log(searchData);

  console.log(data);

  const validateUserInput = (searchText, searchByField) => {
    if (searchText === "" && searchByField === "") {
      console.log("please enter your search text and which wield to search by");
    } else if (searchText === "") {
      console.log("Please enter an email od an id");
    } else if (searchByField === "") {
      console.log("Please select which field to select by");
    } else {
      if (searchByField === "Email") {
        console.log("searching by email");
        searchByEmail();
      } else if (searchByField === "Uid") {
        console.log("Searching by uid");
        searchById();
      } else {
        console.log("error");
      }
    }
  };
  return (
    <div className="flex h-fit w-9/12  mx-auto mt-14">
      <div className="overflow-auto  mx-auto md:w-3/4 lg:w-3/4">
        <div className="flex sm:flex-col md:flex-row lg:flex-row items-center justify-between">
          <select
            className="float-right px-4 py-3 mb-2 mx-4 rounded border-none"
            onChange={(e) => {
              setSelectState(e.target.value);
            }}
            //   defaultValue={selectState}
            value={selectState}
          >
            <option value={""}>Search by</option>
            <option value="Email">Email</option>
            <option value="Uid">Uid</option>
          </select>
          <input
            className=" shadow
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
          dark:shadow-lg"
            type="text"
            placeholder="Find orders by uid or email"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <button
            className="px-3 bg-main mx-4 sm:py-3 text-white rounded hover:bg-mainHover"
            onClick={(e) => {
              e.preventDefault();

              validateUserInput(searchText, selectState);
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
