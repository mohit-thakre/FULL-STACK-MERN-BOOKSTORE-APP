import React from "react";
import Mainimage from "../assets/hero.png";
import { FaArrowRightLong } from "react-icons/fa6";
const Hero = () => {
  return (
    <div className=" min-h-[80vh] w-full px-9 py-10 bg-[#caf0f8] flex justify-around items-center flex-col md:flex-row">
      <div className=" w-full md:w-[40%]">
        <h1 className=" mt-20 capitalize text-5xl font-[fantasy] tracking-wider text-center md:text-6xl md:text-left ">
          What book are you
          <br />
          looking for
        </h1>
        <p className=" p-3 text-center  capitalize font-semibold text-xl my-5 md:text-left">
          not sure what you read next? explore out catelog of public domin book
          with our editor
        </p>
        <button className=" mx-auto px-10 py-3 border-2 border-black rounded-full font-bold tracking-wider md:px-14 md:py-4">
          Explore Now
        </button>
        <button className=" px-10 py-5 ml-2 bg-black rounded-full text-white">
          <FaArrowRightLong />
        </button>
      </div>
      <div className=" w-full md:w-[40%]">
        <img
          className="w-[100%] h-full md:w-[80%]"
          src={Mainimage}
          alt="img"
        ></img>
      </div>
    </div>
  );
};

export default Hero;
