import React from "react";
import { FaHeart } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";

const role = localStorage.getItem("role");

const Mobilenav = ({ data }) => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <img
          src={data.avatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-white mb-1"
        />
        <p className=" font-semibold">{data.username}</p>
        <p className="text-sm font-medium text-gray-600">{data.email}</p>
      </div>
      <div className="flex flex-row w-full  px-5 py-2 rounded-2xl  justify-between gap-10 items-center">
        {role === "admin" ? (
          <>
            <Link
              to="/Profile/addbook"
              className="w-full text-center font-semibold flex flex-col justify-center items-center  rounded-md "
            >
              <FaHeart className="text-blue-600" />
              Addbook{" "}
            </Link>
            <Link
              to="/profile/allorderadmin"
              className="w-full text-center font-semibold flex flex-col justify-center items-center  rounded-md "
            >
              <FaHistory className=" text-green-600" />
              Allorders
            </Link>
          </>
        ) : (
          <>
            {" "}
            <Link
              to="/profile/favourites"
              className="w-full text-center font-semibold flex flex-col justify-center items-center  rounded-md "
            >
              <FaHeart className=" text-red-700" />
              <span className=" font-bold">Favourites</span>
            </Link>
            <Link
              to="/profile/orderhistory"
              className="w-full text-center font-semibold flex flex-col justify-center items-center  rounded-md "
            >
              <FaHistory className=" text-blue-800" />
              <span className=" font-bold">Order</span>
            </Link>
            <Link
              to="/profile/settings"
              className="w-full text-center font-semibold flex flex-col justify-center items-center  rounded-md "
            >
              <IoSettings className=" text-green-600" />
              <span className=" font-bold">Setting</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Mobilenav;
