import React from "react";
const AboutUs = () => {
  return (
    <div className="bg-yellow-400 min-h-[83vh] p-8 w-[97%] mx-auto rounded-2xl shadow-md">
      <h1 className=" text-center font-extrabold text-blue-950 p-5 text-4xl">
        About Us
      </h1>
      <p className="text-xl  mb-4 md:w-[70%] mx-auto text-left font-semibold md:p-5 ">
        Welcome to our website! We are dedicated to providing you with the best
        user experience possible. Our team is constantly working to improve the
        site, but sometimes bugs and issues can slip through. If you encounter
        any problems, we would greatly appreciate your feedback. Here's how you
        can help:
      </p>
      <div className=" flex justify-around items-start">
        <div className="">
          <ul className=" mb-4 font-medium  md:p-5">
            <li>
              Identify the Bug: If you notice something isn't working correctly,
              please take note of the details.
            </li>
            <li>
              Contact Us: Send us a message with the following information:
              <br />
              Description of the Bug: Explain what went wrong and how it
              affected your experience.
              <br />
              Steps to Reproduce: Provide a step-by-step guide on how to
              replicate the issue.
              <br />
              Your Contact Information: Include your email address so we can get
              in touch with you if we need more information.
            </li>
          </ul>
        </div>
      </div>
      <div className=" py-10 border-4 border-blue-900 rounded-3xl">
        <h1 className=" text-center font-extrabold text-blue-950 p-5 text-4xl">
          {" "}
          Developer Information
        </h1>
        <p className=" font-semibold w-[70%] mx-auto text-5xl flex flex-col justify-center items-center">
          <span className=" text-center font-[fantasy] text-red-600"> Hi!</span>

          <span className=" text-center font-[moranga] text-[5.4vw] leading-[6.4vw] text-[#211542]">
            I'm MOHIT, a full stack web developer and a aspiring tech and coding
            enthusiast. Tech-savvy B.Tech student with a passion for coding and
            innovation. 🚀 Pursuing Computer Science & Engineering with fervor,
            I thrive on turning ideas into impactful projects
          </span>
        </p>
        <div className=" flex justify-center items-center gap-4 flex-wrap m-4">
          <a
            title="say Hi  "
            href="https://www.linkedin.com/in/mohit-thakre-8907a5253/"
            className="px-8 py-2 md:px-12 md:py-4 bg-yellow-800 text-2xl md:text-5xl text-white font-extrabold rounded-full"
          >
            <button type="button">
              Say Hi<span>👋</span>
            </button>
          </a>
          <a
            title="view my resume"
            href="https://github.com/mohit-thakre"
            className="px-8 py-2 md:px-12 md:py-4 bg-yellow-800 text-2xl  md:text-5xl text-white font-extrabold rounded-full"
          >
            <button type="button">View Github</button>
          </a>
          <a
            title="view my resume"
            href="https://mohit-thakre.github.io/PORTFOLIO-V2/"
            className="px-8 py-2 md:px-12 md:py-4 bg-yellow-800 text-2xl md:text-5xl text-white font-extrabold rounded-full"
          >
            <button type="button">Portfolio</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
