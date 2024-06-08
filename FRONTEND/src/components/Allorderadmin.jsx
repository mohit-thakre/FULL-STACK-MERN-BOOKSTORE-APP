import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Popup from "./Popup";
import { appurl } from "./Helper";
import Loader from "./Loader";
import toast from "react-hot-toast";
const Allorderadmin = () => {
  const [showmodel, setshowmodel] = useState("hidden");
  const [userdata, setuserdata] = useState("");
  const [data, setdata] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function fetchdata() {
      setloading(true);
      const response = await fetch(`${appurl}/api/v1/book/getallorderhistory`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();

      setdata(data.data);
      setloading(false);
    }
    fetchdata();
  }, []);

  function hidemodel() {
    setshowmodel("hidden");
  }

  async function updatestatus(id, e) {
    try {
      const response = await fetch(
        `${appurl}/api/v1/book/updateorderstatus/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: e }),
        }
      );
      const data = await response.json();

      setuserdata(data.user);
      setdata((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, status: e } : item
        )
      );
    } catch (error) {
      toast.error(error);
    }
  }

  if (loading) {
    return (
      <div className="">
        <Loader />
      </div>
    );
  }

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
      <div className="p-6 max-w-6xl mx-auto bg-yellow-400 rounded-xl shadow-md text-black relative font-[gilroy3]">
        <h1 className="font-bold text-2xl bg-[#023047] text-white text-center rounded-xl py-3 mb-2 font-[moranga]">
          All User Order
        </h1>
        {data &&
          data.map((item) => (
            <div key={item._id}>
              <div className="bg-white rounded-lg font-[gilroy3] shadow-md p-4 mb-4 w-full transition-transform transform hover:shadow-2xl shadow-orange-950 relative">
                <div className="flex flex-col md:flex-row items-center">
                  <img
                    className="h-24 w-24 object-cover rounded-md mb-4 md:mb-0"
                    src={item.book.url}
                    alt="Product"
                  />
                  <div className="flex-1 mx-4">
                    <h2 className="font-semibold text-xl mb-2">
                      {item.book.title}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      {item.book.description.substr(0, 30)}...
                    </p>
                    <div className="flex flex-wrap gap-3 mb-2 text-sm text-gray-600">
                      <p>By {item.book.author}</p>
                      <p>{item.book.language}</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6">
                    <p className="text-xl text-green-600 font-extrabold">
                      ₹{item.book.price}
                    </p>
                    <p className="text-2xl text-blue-600 font-extrabold">
                      {item.payment}
                    </p>
                    <div
                      className={`text-xl font-bold px-2 py-1 rounded ${
                        item.status === "delivered"
                          ? "text-green-500 bg-green-100"
                          : item.status === "out for delivery"
                          ? "text-blue-500 bg-blue-100"
                          : item.status === "canceled"
                          ? "text-red-800 bg-red-100"
                          : "text-orange-400 bg-orange-100"
                      }`}
                    >
                      <select
                        value={item.status}
                        className="cursor-pointer"
                        onChange={(e) => updatestatus(item._id, e.target.value)}
                      >
                        <option value="delivered">Delivered</option>
                        <option value="out for delivery">
                          Out for Delivery
                        </option>
                        <option value="canceled">Canceled</option>
                        <option value="order placed">Order Placed</option>
                      </select>
                    </div>
                    <p
                      className="flex flex-col justify-center items-center"
                      onClick={() => {
                        setuserdata(item.user);
                        setshowmodel("flex");
                      }}
                    >
                      <FaRegUser className="font-extrabold text-xl text-green-700 cursor-pointer hover:scale-[1.4] duration-300" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {userdata && (
        <div
          className={`${showmodel} p-6 w-full md:w-[500px] h-screen md:h-[300px] mx-auto bg-gray-300 rounded-xl shadow-2xl shadow-black text-black fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center md:items-center transition-transform duration-300 ease-in-out`}
        >
          <Popup item={userdata} />
          <h1
            onClick={hidemodel}
            className="absolute top-4 right-4 p-3 bg-white rounded-full hover:scale-[1.4] duration-300 cursor-pointer"
          >
            <ImCross />
          </h1>
        </div>
      )}
    </>
  );
};

export default Allorderadmin;
