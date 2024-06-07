import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// import { FaEyeSlash, FaEye } from "react-icons/fa";
import { appurl } from "../components/Helper";

const Signuppage = () => {
  // const [hidepassword, sethidepassword] = useState(true);

  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    address: "",
  });
  function handlechange(e) {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  }
  const navigate = useNavigate();
  async function handlesubmit(e) {
    try {
      e.preventDefault();

      const response = await fetch(`${appurl}/api/v1/book/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      toast.success("signup successfull");
      navigate("/login");
    } catch (error) {
      toast(error);
    }
  }
  return (
    <div className=" w-[97%] min-h-[84vh] font-[gilroy3] p-4 grid place-items-center bg-yellow-400 text-white rounded-2xl mx-auto ">
      <div className=" w-[95%] md:w-[30%] bg-[#023047] rounded-xl  mx-auto ">
        <form
          className="flex flex-col items-start justify-center gap-2 px-10 py-5 w-full text-white"
          onSubmit={handlesubmit}
        >
          <h1 className=" text-xl font-bold">Sign Up</h1>
          <div className=" w-full">
            <label htmlFor="username" className=" font-semibold">
              Username<span className=" text-red-700">*</span>
            </label>
            <br />
            <input
              className="  p-2  rounded-lg bg-[#d6e9ed] my-1 w-full text-black"
              type="text"
              placeholder="enter username"
              name="username"
              id="username"
              value={formdata.username}
              onChange={handlechange}
              required
            ></input>
          </div>
          <div className=" w-full">
            <label htmlFor="email" className=" font-semibold">
              Email<span className=" text-red-700">*</span>
            </label>
            <br />
            <input
              className="  p-2  rounded-lg bg-[#d6e9ed] my-1 w-full text-black"
              type="email"
              placeholder="enter email"
              name="email"
              id="email"
              value={formdata.email}
              onChange={handlechange}
              required
            ></input>
          </div>
          <div className=" w-full">
            <label htmlFor="password" className=" font-semibold">
              Password<span className=" text-red-700">*</span>
            </label>
            <br />
            <input
              className="  p-2  rounded-lg bg-[#d6e9ed] my-1 w-full text-black"
              type="text"
              placeholder="enter password"
              name="password"
              id="password"
              value={formdata.password}
              onChange={handlechange}
              required
            />
            {/* {hidepassword ? <FaEyeSlash /> : <FaEye />} */}
          </div>
          <div className=" w-full">
            <label htmlFor="cpassword" className=" font-semibold">
              Confirm Password<span className=" text-red-700">*</span>
            </label>
            <br />
            <input
              className="  p-2  rounded-lg bg-[#d6e9ed] my-1 w-full text-black"
              type="text"
              placeholder="confirm password"
              name="confirmpassword"
              id="cpassword"
              value={formdata.confirmpassword}
              onChange={handlechange}
              required
            />
          </div>
          <div className=" w-full">
            <label htmlFor="address" className=" font-semibold">
              Address<span className=" text-red-700">*</span>
            </label>
            <br />
            <textarea
              className="  p-2  rounded-lg bg-[#d6e9ed] my-1 w-full text-black"
              rows="4"
              cols="50"
              placeholder="enter address "
              name="address"
              id="address"
              value={formdata.address}
              onChange={handlechange}
              required
            ></textarea>
          </div>
          <button className=" w-full p-3 border-2 rounded-full text-black bg-[#caf0f8] mt-3 font-bold hover:bg-[#85d9e9] active:bg-yellow-400">
            Submit
          </button>
        </form>
        <p className=" text-xl font-bold text-center">OR</p>
        <p className="text-center my-2 capitalize">
          {" "}
          already have and account?{" "}
          <Link to="/login" className=" underline">
            login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signuppage;
