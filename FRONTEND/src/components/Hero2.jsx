import React, { useState, useEffect } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { appurl } from "./Helper";
import Loader from "./Loader";

const Hero2 = () => {
  const [index, setIndex] = useState(0);
  const [data, setBookData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`${appurl}/api/v1/book/getallbook`, {
          method: "GET",
        });
        const data = await res.json();
        setBookData(data);

        setLoading(false);
      } catch (error) {
        toast.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className=" w-full h-screen grid place-items-center">
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

  function handleLeft() {
    setIndex((prevIndex) => {
      const newIndex = prevIndex - 1 < 0 ? data.data.length - 1 : prevIndex - 1;
      return newIndex;
    });
  }

  function handleRight() {
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1 >= data.data.length ? 0 : prevIndex + 1;
      return newIndex;
    });
  }

  return (
    <div className="w-[97%] my-4 mx-auto font-[gilroy3]">
      <div className=" w-full p-5 h-full bg-yellow-500 rounded-2xl">
        <h1 className="mt-6 px-10 capitalize font-[moranga] text-3xl py-10  tracking-wider text-center md:text-6xl md:text-left text-[#023047]">
          What book are you looking for
        </h1>
        <p className="font-semibold px-10 text-lg text-center md:text-left font-[gilroy3]">
          Discover Your Next Favorite Read Find the Perfect Book for Any Mood
          Explore a World of Stories
          <br /> Uncover Hidden Gems in Literature Your Guide to the Best Books
        </p>
        <div className="flex flex-col md:flex-row justify-around items-center mt-8">
          <div
            className="w-14 h-14 rounded-full bg-[#003049] cursor-pointer text-white grid place-items-center  mb-4 md:mb-0"
            onClick={handleLeft}
          >
            <FaArrowLeftLong />
          </div>
          <div className="path1 bg-white w-full md:w-[900px] min-h-[450px] rounded-lg font-[gilroy3] p-6 flex flex-col md:flex-row justify-around items-center ">
            <div className="flex flex-col md:gap-3 w-full md:w-2/5 text-center md:text-left">
              <p className="text-green-600 font-extrabold">
                <span className="flex gap-1 justify-start items-center">
                  <FaBookOpenReader className=" text-blue-700" /> Pages & Co
                </span>
              </p>
              <p className="font-extrabold text-2xl capitalize font-[moranga]">
                {data.data[index].title.substr(0, 25)}
              </p>
              <p>{data.data[index].description.substr(0, 100)}...</p>
              <p className="text-gray-600">
                <span className="flex gap-1 md:justify-start justify-center items-center">
                  <MdLanguage className="font-bold" />{" "}
                  {data.data[index].language.substr(0, 25)}
                </span>
                <span> by-{data.data[index].author.substr(0, 25)}</span>
              </p>
              <p className="font-bold text-xl mt-3">
                ₹ {data.data[index].price}
              </p>
              <Link to={`viewbook/${data.data[index]._id}`}>
                <button className=" hidden md:flex font-bold px-4 py-2 md:px-10 rounded-2xl bg-black text-white my-5">
                  View Book
                </button>
              </Link>
            </div>
            <div>
              <img
                src={data.data[index].url}
                alt="s"
                className=" max-w-full m-1 md:m-0 md:max-w-[360px] h-auto"
              />
              <button className=" mx-auto flex md:hidden cursor-pointer font-bold px-8 md:px-4 py-2 rounded-2xl bg-black text-white my-5">
                view book
              </button>
            </div>
          </div>
          <div
            className="w-14 h-14 rounded-full bg-[#003049] text-white grid place-items-center cursor-pointer mt-4 md:mt-0"
            onClick={handleRight}
          >
            <FaArrowRightLong />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
