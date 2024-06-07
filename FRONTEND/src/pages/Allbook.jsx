import React from "react";
import { useState, useEffect } from "react";
import Bookcart from "../components/Bookcart";
import { MdLanguage } from "react-icons/md";
import { Link } from "react-router-dom";
import { appurl } from "../components/Helper";
import Loader from "../components/Loader";
const Allbook = () => {
  const [bookdata, setbookdata] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchdata() {
      try {
        setLoading(true);
        const res = await fetch(`${appurl}/api/v1/book/getallbook`);
        const data = await res.json();
        setbookdata(data.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchdata();
  }, []);

  if (loading) {
    return (
      <div className=" w-full h-screen grid place-items-center ">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-[97%] min-h-screen mx-auto">
      <div className=" w-full p-5 h-full bg-yellow-500 rounded-2xl font-[gilroy3]">
        <h1 className="text-2xl font-bold text-blue-900 p-10 text-center font-[moranga] ">
          All Books
        </h1>
        <div className=" flex justify-center items-center flex-wrap gap-10">
          {bookdata.map((item) => (
            <Link to={`/viewbook/${item._id}`} key={item._id}>
              <div className="bg-white  w-full h-auto md:w-[250px] md:h-[350px] flex flex-col items-center text-center capitalize rounded-2xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 border-4 border-gray-300">
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
          ))}
        </div>
      </div>
    </div>
  );
};
export default Allbook;
