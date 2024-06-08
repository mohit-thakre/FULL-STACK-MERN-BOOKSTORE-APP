import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { appurl } from "../components/Helper";
import Loader from "../components/Loader";

const Cartpage = () => {
  const [cart, setCart] = useState([]);
  const [location, setlocation] = useState("");

  useEffect(() => {
    async function getcart() {
      setlocation(true);
      const response = await fetch(`${appurl}/api/v1/book/getbookincart`, {
        method: "GET",
        headers: {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setCart(data.data);
      setlocation(false);
    }
    getcart();
  }, []);

  async function handleremove(bookid) {
    try {
      const response = await fetch(`${appurl}/api/v1/book/removebookfromcart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          bookid: bookid,
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // const data = await response.json();

      setCart(cart.filter((book) => book._id !== bookid));
    } catch (error) {
      toast.error(error);
    }
  }

  const calculatetotal = () => {
    return cart.reduce((acc, item) => acc + item.price, 0);
  };
  const handlebuy = async () => {
    const response = await fetch(`${appurl}/api/v1/book/placeorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        order: cart,
      },
      body: JSON.stringify({ order: cart }),
    });

    const data = await response.json();
    console.log(data);

    setCart([]);

    toast.success(data.message);
  };

  if (location) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const role = localStorage.getItem("role");
  return (
    <div className="w-[98%] min-h-screen  mx-auto font-[gilroy3]">
      <div className="w-full h-full p-5 bg-yellow-400 rounded-2xl m-2">
        {role === "user" && (
          <div className="mt-5">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md p-6 mb-4 w-full md:w-[80%] mx-auto"
                >
                  <div className="flex md:flex-row flex-col justify-between items-center">
                    <img
                      className="h-24 w-24 object-cover"
                      src={item.url}
                      alt="Product"
                    />
                    <div className="flex-1 mx-4">
                      <h2 className="font-semibold text-xl">
                        {item.title.substr(0, 30)}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {item.description.substr(0, 31)}...
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-2xl font-semibold">₹{item.price}</p>
                      <button
                        onClick={() => handleremove(item._id)}
                        className="text-3xl text-red-800"
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 w-full h-screen text-3xl capitalize grid place-items-center place-content-center">
                <p className=" font-semibold"> cart is empty </p>
                <Link
                  to="/all-book"
                  className=" text-xl font-bold p-4 text-blue-600"
                >
                  {" "}
                  shop now
                </Link>
              </p>
            )}
            {cart.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-4 w-full md:w-[80%] mx-auto">
                <div className="text-center">
                  <h1 className="font-bold text-3xl mb-4">Summary</h1>
                  <div className="flex justify-between items-center text-xl font-bold mb-4">
                    <p>{cart.length > 1 ? "books" : "book"}</p>
                    <p>Total: ₹{calculatetotal()}</p>
                  </div>
                  <button
                    className="font-semibold text-lg px-8 py-2 rounded-lg bg-blue-700 text-white"
                    onClick={handlebuy}
                  >
                    BUYNOW
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cartpage;
