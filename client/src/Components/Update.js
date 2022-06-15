import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Update from "./Modal/UpdateModal";

const UpdateModal = ({ orderId }) => {
  const [updateModalState, setUpdateModalState] = useState(false);
  return (
    <>
      <button
        className="px-3 bg-main sm:py-3 text-white rounded hover:bg-mainHover"
        onClick={(e) => {
          e.preventDefault();
          setUpdateModalState(!updateModalState);
        }}
      >
        Update
      </button>

      {updateModalState ? <Update values={setUpdateModalState}/> : ""}
    </>
  );
};

export default UpdateModal;
