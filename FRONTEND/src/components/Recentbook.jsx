import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdLanguage } from "react-icons/md";
import { appurl } from "./Helper";
import Loader from "./Loader";

const Recentbook = () => {
  const [bookdata, setbookdata] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchdata() {
      try {
        setLoading(true);
        const res = await fetch(`${appurl}/api/v1/book/getrecentbook`);
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
      <div>
        <Loader />
      </div>
    );
  }

  if (!bookdata) {
    return (
      <div className=" w-full h-screen grid place-items-center">
        no data found
      </div>
    );
  }

  return (
    <div className="w-[97%] my-4 mx-auto font-[gilroy3]">
      <div className="w-full p-5 h-full bg-yellow-400 rounded-2xl flex flex-col md:flex-row justify-around items-center">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="mt-6 px-10 capitalize text-5xl py-10 font-[moranga] tracking-wider md:text-6xl text-[#023047]">
            Our Recent books
          </h1>
          <p className="font-semibold text-xl px-10">
            Explore our curated selection of recent releases and find your next
            great read. From gripping thrillers and heartfelt romances to
            insightful non-fiction and inspiring self-help, our catalog is
            constantly updated to include the hottest new titles
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start px-10 mt-4">
            <button className="mx-2 my-2 px-10 py-3 border-4 rounded-full font-bold tracking-wider md:px-14 md:py-4  border-white">
              <Link to="/all-book"> Explore Now</Link>
            </button>
            <button className="mx-2 my-2 px-10 py-5 bg-[#003049] rounded-full text-white ">
              <Link to="/all-book">
                <FaArrowRightLong />
              </Link>
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-wrap justify-center items-center gap-4 mt-4 md:mt-0">
          {bookdata.map((item, index) => (
            <Link to={`/viewbook/${item._id}`} key={index}>
              <div className="bg-white w-full h-auto  md:w-[250px] md:h-[350px] flex flex-col items-center text-center capitalize rounded-2xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 border-4 border-gray-300 ">
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
                        <MdLanguage className="font-bold" />{" "}
                        {item.language.substring(0, 15)}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      By - {item.author.substring(0, 25)}
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

export default Recentbook;
