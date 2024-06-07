import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { appurl } from "./Helper";

const Setting = () => {
  const [profile, setprofile] = useState("");
  const [address, setaddress] = useState({});

  useEffect(() => {
    async function fetchdata() {
      const response = await fetch(`${appurl}/api/v1/book/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data.success);
      setprofile(data.success);
      setaddress(data.success.address);
    }
    fetchdata();
  }, []);

  async function updateaddress() {
    const response = await fetch(`${appurl}/api/v1/book/updateaddress`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ address: address }),
    });
    const data = await response.json();
    console.log(data);
    toast(data.message);
  }

  function handlechange(e) {
    setaddress(e.target.value);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-yellow-400 rounded-xl shadow-md font-[gilroy3]">
      <h1 className="font-bold text-2xl bg-[#023047] text-white text-center rounded-xl py-3 font-[moranga]">
        Settings
      </h1>
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b">
          <div className="w-full mb-4 md:mb-0">
            <p className="text-lg font-bold">Username:</p>
            <p className="px-4 py-2 text-xl bg-green-300 font-extrabold rounded-md">
              {profile.username}
            </p>
          </div>
          <div className="w-full ml-2 ">
            <p className="text-lg font-bold">Email:</p>
            <p className="px-4 py-2 break-words md:text-xl bg-green-300 font-extrabold rounded-md">
              {profile.email}
            </p>
          </div>
        </div>
        <div className="w-full p-4">
          <p className="text-lg font-bold mb-2">Address:</p>
          <textarea
            rows="5"
            className="w-full bg-green-100 p-3 font-bold rounded-md resize-none"
            value={address}
            name="address"
            onChange={handlechange}
          ></textarea>
        </div>
        <div className="w-full flex justify-center p-4">
          <button
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition duration-200"
            onClick={updateaddress}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
