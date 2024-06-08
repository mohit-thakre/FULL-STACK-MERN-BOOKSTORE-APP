import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appurl } from "./Helper";
import Loader from "./Loader";

const Orderhistory = () => {
  const [order, setorder] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    async function getorderhistory() {
      const response = await fetch(`${appurl}/api/v1/book/getorderhistory`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();

      setorder(data.data);
      setloading(false);
    }
    getorderhistory();
  }, []);

  if (loading) {
    return (
      <div>
        {" "}
        <Loader />
      </div>
    );
  }

  if (!order || order === null || order.length === 0) {
    return (
      <div className=" grid place-content-center">
        <h1 className=" font-[moranga] text-3xl font-extrabold ">
          no data found
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-yellow-400 rounded-xl shadow-md font-[gilroy3]">
      <h1 className="font-bold text-2xl bg-[#023047] mb-4 text-white text-center rounded-xl py-3 font-[moranga]">
        Order History
      </h1>

      {order && order.length > 0 ? (
        order.map((item) => (
          <Link key={item._id} to={`/viewbook/${item.book._id}`}>
            <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-full transition-transform transform hover:shadow-2xl hover:scale-105">
              <div className="flex flex-col md:flex-row items-center">
                <img
                  className="h-24 w-24 object-cover rounded-md mb-4 md:mb-0"
                  src={item.book.url}
                  alt="Product"
                />
                <div className="flex-1 mx-4">
                  <h2 className="font-semibold text-xl mb-2">
                    {item.book.title.substr(0, 30)}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {item.book.description.substr(0, 30)}...
                  </p>
                  <div className="flex flex-wrap gap-3 mb-2 text-sm text-gray-600">
                    <p>By {item.book.author.substr(0, 30)}</p>
                    <p>{item.book.language.substr(0, 30)}</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6">
                  <p className="text-xl text-green-600 font-extrabold">
                    ₹{item.book.price}
                  </p>
                  <p className="text-2xl text-blue-600 font-extrabold">
                    {item.payment.substr(0, 30)}
                  </p>
                  <p
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
                    {item.status.substr(0, 30)}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-center text-lg font-bold text-gray-700">
          No orders found.
        </p>
      )}
    </div>
  );
};

export default Orderhistory;
