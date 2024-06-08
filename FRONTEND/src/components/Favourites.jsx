import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdLanguage } from "react-icons/md";
import toast from "react-hot-toast";
import { appurl } from "./Helper";
import Loader from "./Loader";
const Favourites = () => {
  const [favourite, setfavourite] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${appurl}/api/v1/book/getfavouritebook`, {
          method: "GET",
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setfavourite(data.data);
        setloading(false);
      } catch (error) {
        toast.error(error);
      }
    }
    fetchData();
  }, []);

  async function fetchremove(bookid) {
    try {
      const response = await fetch(
        `${appurl}/api/v1/book/removebookfromfavourite`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            bookid: bookid,
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      setfavourite(favourite.filter((book) => book._id !== bookid));
      toast.success(data.message);
    } catch (error) {
      toast.error("Failed to remove book from favourites:", error);
    }
  }

  if (loading) {
    return (
      <div className="">
        <Loader />
      </div>
    );
  }

  if (!favourite || favourite === null || favourite.length === 0) {
    return (
      <div className=" grid place-content-center">
        <h1 className=" font-[moranga] text-3xl font-extrabold ">
          no data found
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl min-h-screen mx-auto bg-yellow-400 rounded-xl shadow-md font-[gilroy3]">
      <h1 className="font-bold text-2xl bg-[#023047] text-white text-center rounded-xl py-3 font-[moranga]">
        Favourite Books
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-6 mt-6">
        {favourite.length > 0 ? (
          favourite.map((item) => (
            <div>
              <Link to={`/viewbook/${item._id}`}>
                <div className="bg-white w-full h-[300px] md:w-[250px] md:h-[350px] flex flex-col items-center text-center capitalize rounded-2xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 border-4 border-gray-300">
                  <div className="flex flex-col gap-3 p-4 w-full">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="h-40 w-full object-cover rounded-t-2xl"
                    />
                    <div className="px-2 flex flex-col items-center">
                      <p className="font-bold text-lg">
                        {item.title.substr(0, 15)}
                      </p>
                      <p className="text-gray-700 flex flex-col items-center">
                        <span className="font-bold">₹ {item.price}</span>
                        <span className="flex gap-1 justify-center items-center">
                          <MdLanguage className="font-bold" /> {item.language}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        By - {item.author}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <div
                className="font-bold text-sm px-6 py-2 rounded-full text-white bg-red-500 hover:bg-red-600 cursor-pointer text-center  mx-auto"
                onClick={() => fetchremove(item._id)}
              >
                Remove
              </div>
            </div>
          ))
        ) : (
          <p className="w-full text-center font-bold text-lg text-gray-700">
            No favourite books found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Favourites;
