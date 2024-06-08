import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { FaHeart, FaHistory } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { authaction } from "../store/auth";
import toast from "react-hot-toast";
const Sidebar = ({ data }) => {
  const role = localStorage.getItem("role");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(authaction.logout());
    navigate("/login");
    toast.success("logout successfull");
  };

  if (!data || data === null || data.length === 0) {
    return (
      <div className=" grid place-content-center">
        <h1 className=" font-[moranga] text-3xl font-extrabold ">
          no data found
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className=" hidden md:flex flex-col justify-between items-center text-white bg-[#023047]  h-full p-10 ">
        <div className="flex flex-col items-center">
          <img
            src={data.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-white mb-4"
          />
          <p className="text-2xl font-semibold">{data.username}</p>
          <p className="text-sm font-medium text-gray-400">{data.email}</p>
        </div>

        {role === "admin" ? (
          <div>
            <Link
              to="/Profile/addbook"
              className="flex items-center justify-center gap-2 px-5 font-semibold py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition duration-200 my-4"
            >
              <FaHeart />
              Addbook{" "}
            </Link>
            <Link
              to="/profile/allorderadmin"
              className="flex items-center justify-center gap-2 px-5 font-semibold py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition duration-200"
            >
              <FaHistory />
              All order
            </Link>
          </div>
        ) : (
          <div className="flex flex-col w-full mt-10 space-y-4">
            <Link
              to="/profile/favourites"
              className="flex items-center justify-center gap-2 px-5 font-semibold py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition duration-200"
            >
              <FaHeart />
              Favourites
            </Link>
            <Link
              to="/profile/orderhistory"
              className="flex items-center justify-center gap-2 px-5 font-semibold py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition duration-200"
            >
              <FaHistory />
              Order History
            </Link>
            <Link
              to="/profile/settings"
              className="flex items-center justify-center gap-2 px-5 font-semibold py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition duration-200"
            >
              <IoSettings />
              Settings
            </Link>
          </div>
        )}

        <button
          className="flex items-center gap-3 mt-10 py-2 px-4 bg-red-600 hover:bg-red-500 transition duration-200 text-white font-semibold rounded-md "
          onClick={logout}
        >
          Logout
          <IoLogOut />
        </button>
      </div>
      <div className=" flex w-full justify-center items-start ">
        <div>
          <div className=" flex justify-center items-center md:hidden flex-col ">
            <img
              src={data.avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white mb-1"
            />
            <p className=" font-semibold">{data.username}</p>
            <p className="text-sm font-medium text-gray-600">{data.email}</p>
          </div>
          <div className=" flex md:hidden flex-row w-full  px-5 py-2 rounded-2xl  justify-center  gap-10 items-center">
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
      </div>
    </>
  );
};

export default Sidebar;
