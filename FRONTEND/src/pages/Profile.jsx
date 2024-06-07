import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Mobilenav from "../components/Mobilenav";
import { appurl } from "../components/Helper";
import Loader from "../components/Loader";

const Profile = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [profile, setprofile] = useState({});
  const [loading, setloading] = useState(false);
  // const role = useSelector((state)=>state.auth.role)
  useEffect(() => {
    async function fetchdata() {
      setloading(true);
      const res = await fetch(`${appurl}/api/v1/book/getuser`, {
        headers,
      });
      const data = await res.json();
      console.log(data);
      setprofile(data.success);
    }
    fetchdata();
    setloading(false);
  }, []);

  return (
    <div className=" w-full min-h-screen px-12 py-8">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className=" flex flex-col md:flex-row gap-5 relative font-[gilroy3]">
            <div className=" flex w-full md:w-1/5  md:h-[80vh] my-4 rounded-md">
              <Sidebar data={profile} />
            </div>

            <div className=" w-full md:w-5/6">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
