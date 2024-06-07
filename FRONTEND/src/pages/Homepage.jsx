import React from "react";
import Recentbook from "../components/Recentbook";
import Hero2 from "../components/Hero2";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <Hero2 />
      <Recentbook />
      <Footer />
    </div>
  );
};

export default Homepage;
