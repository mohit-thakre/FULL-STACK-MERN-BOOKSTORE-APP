import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authaction } from "../store/auth";
import toast from "react-hot-toast";
import { appurl } from "../components/Helper";

const Loginpage = () => {
  const [formdata, setformdata] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handlesubmit(e) {
    try {
      e.preventDefault();
      const response = await fetch(`${appurl}/api/v1/book/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await response.json();
      dispatch(authaction.login());
      dispatch(authaction.changerole());
      localStorage.setItem("id", data.id);
      localStorage.setItem("role", data.role);
      localStorage.setItem("token", data.token);

      if (!response.ok) {
        toast.error(data.message);
        dispatch(authaction.logout());
        return;
      }

      toast.success("login successfull");
      navigate("/profile");
    } catch (error) {
      toast.error(error);
    }
  }
  function handlechange(e) {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  }

  return (
    <div className=" w-[97%] h-[84vh] grid place-items-center bg-yellow-400 font-[gilroy3] text-white rounded-2xl mx-auto ">
      <div className=" w-[95%] md:w-[30%] bg-[#023047] rounded-xl  mx-auto ">
        <form
          className="flex flex-col items-start justify-center gap-2 px-10 py-5 w-full text-white"
          onSubmit={handlesubmit}
        >
          <h1 className=" text-xl font-bold ">Login</h1>
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
          </div>

          <button className=" w-full p-3 border-2 rounded-full text-black bg-[#caf0f8] mt-3 font-bold hover:bg-[#85d9e9] active:bg-yellow-400">
            Login
          </button>
        </form>
        <p className=" text-xl font-bold text-center">OR</p>
        <p className="text-center my-2 capitalize">
          {" "}
          don't have an account?{" "}
          <Link to="/signup" className=" underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Loginpage;
