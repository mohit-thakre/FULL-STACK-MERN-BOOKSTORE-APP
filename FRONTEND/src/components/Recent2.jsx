import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
const Recent2 = () => {
  return (
    <div className=" w-[97%] h-[90vh] my-4 mx-auto font-[gilroy3] ">
      <div className=" w-full p-5 h-full bg-yellow-500 rounded-2xl  flex justify-around items-center">
        <div className=" w-1/2">
          <h1 className=" mt-6 px-10 capitalize text-5xl py-10  font-[moranga] tracking-wider text-center md:text-6xl md:text-left ">
            Our Recent books
          </h1>
          <p className=" font-semibold text-xl px-10">
            xplore our curated selection of recent releases and find your next
            great read. From gripping thrillers and heartfelt romances to
            insightful non-fiction and inspiring self-help, our catalog is
            constantly updated to include the hottest new titles
          </p>
          <button className=" ml-10 my-4 mx-auto px-10 py-3 border-2 border-black rounded-full font-bold tracking-wider md:px-14 md:py-4">
            Explore Now
          </button>
          <button className=" px-10 py-5 ml-2 bg-black rounded-full text-white">
            <FaArrowRightLong />
          </button>
        </div>
        <div className=" w-1/2 flex flex-wrap justify-center items-center gap-4">
          <div className=" bg-white w-[250px] h-[250px]  flex justify-start flex-col items-center rounded-2xl">
            <div className=" flex flex-col gap-3 p-4  w-[70%] ">
              <img
                src="https://t4.ftcdn.net/jpg/06/38/81/25/240_F_638812581_RMBR4G8J0Hj88x44Z66hb9MheYlnn9hx.jpg"
                alt="s"
              />
              <p className=" font-bold ">honda cicic 999 r</p>
              <p className=" text-gray-400">
                <span>hindi</span>
                <span>by-author</span>{" "}
              </p>
            </div>
          </div>
          <div className=" bg-white w-[250px] h-[250px]  flex justify-start flex-col items-center rounded-2xl">
            <div className=" flex flex-col gap-3 p-4  w-[70%] ">
              <img
                src="https://t4.ftcdn.net/jpg/06/38/81/25/240_F_638812581_RMBR4G8J0Hj88x44Z66hb9MheYlnn9hx.jpg"
                alt="s"
              />
              <p className=" font-bold ">honda cicic 999 r</p>
              <p className=" text-gray-400">
                <span>hindi</span>
                <span>by-author</span>{" "}
              </p>
            </div>
          </div>
          <div className=" bg-white w-[250px] h-[250px]  flex justify-start flex-col items-center rounded-2xl">
            <div className=" flex flex-col gap-3 p-4  w-[70%] ">
              <img
                src="https://t4.ftcdn.net/jpg/06/38/81/25/240_F_638812581_RMBR4G8J0Hj88x44Z66hb9MheYlnn9hx.jpg"
                alt="s"
              />
              <p className=" font-bold ">honda cicic 999 r</p>
              <p className=" text-gray-400">
                <span>hindi</span>
                <span>by-author</span>{" "}
              </p>
            </div>
          </div>
          <div className=" bg-white w-[250px] h-[250px]  flex justify-start flex-col items-center rounded-2xl">
            <div className=" flex flex-col gap-3 p-4  w-[70%] ">
              <img
                src="https://t4.ftcdn.net/jpg/06/38/81/25/240_F_638812581_RMBR4G8J0Hj88x44Z66hb9MheYlnn9hx.jpg"
                alt="s"
              />
              <p className=" font-bold ">honda cicic 999 r</p>
              <p className=" text-gray-400">
                <span>hindi</span>
                <span>by-author</span>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recent2;
