import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { RiMenuFold3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { authaction } from "../store/auth";
import { ImCross } from "react-icons/im";
const Navbar = () => {
  const Links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about",
    },

    {
      title: "All Book",
      link: "/all-book",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];

  const isloggedin = useSelector((state) => state.auth.isloggedin);
  const role = localStorage.getItem("role");

  if (isloggedin === false) {
    Links.splice(3, 2);
  } else {
    Links.splice(0, 0);
  }
  if (role === "admin") {
    Links.splice(3, 1);
  }

  const location = useLocation();
  const path = location.pathname;

  const [responsivemenu, setresponsivemenu] = useState("hidden");
  const [activesection, setactivesection] = useState(path);

  useEffect(() => {
    setactivesection(location.pathname);
  }, [location]);

  function handlemenu() {
    setresponsivemenu((prevMenuState) =>
      prevMenuState === "hidden" ? "flex" : "hidden"
    );
  }

  function handlelink() {
    setresponsivemenu("hidden");
  }

  const dispatch = useDispatch();

  return (
    <div className="w-full flex justify-center items-center  z-50 font-[gilroy3] ">
      <div className="w-[97%] my-2">
        <nav className="relative bg-[#023047] flex justify-around text-white items-center py-4 px-4 md:px-8 rounded-2xl mx-auto">
          <div>
            <Link to="/">
              <p className="font-extrabold text-white text-4xl">Pages & Co</p>
            </Link>
          </div>
          <div className="hidden md:flex gap-4 justify-between items-center font-bold">
            {Links.map((item, index) => (
              <Link to={item.link} onClick={handlemenu} key={index}>
                <div
                  className={`${
                    activesection === item.link ? "text-yellow-400" : " "
                  } hover:text-blue-600 duration-300`}
                >
                  {item.title}
                </div>
              </Link>
            ))}
            <div className=" flex gap-4">
              {!isloggedin && (
                <>
                  <Link to="/login">
                    <button className="px-5 py-2 border-2 text-white border-yellow-400 rounded-md hover:bg-yellow-100 hover:text-black hover:border-zinc-700 duration-300">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="px-5 py-2 border-2 border-yellow-400 text-black bg-yellow-400  rounded-md hover:bg-yellow-600">
                      Signup
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div
            className="flex text-4xl duration-700 hover:text-gray-400 md:hidden"
            onClick={handlemenu}
          >
            {responsivemenu === "hidden" ? (
              <RiMenuFold3Fill />
            ) : (
              <ImCross className=" text-2xl" />
            )}
          </div>
        </nav>
        <div
          className={`${responsivemenu}  h-screen w-[50%] duration-150 fixed top-20 p-4 z-40 bg-[#1a2245] flex flex-col justify-center items-center font-semibold text-xl text-white gap-6 md:hidden mt-2 rounded-2xl mr-2`}
        >
          {Links.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              className="border-2 px-6 py-2 border-yellow-400 text-yellow-400 rounded-2xl"
              onClick={handlelink}
            >
              {item.title}
            </NavLink>
          ))}
          {!isloggedin && (
            <>
              <Link to="/login">
                <button className="px-5 py-2 border-2 text-yellow-400 border-yellow-400 rounded-2xl hover:bg-white hover:border-zinc-700 hover:text-black duration-300">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-5 py-2 bg-blue-100 text-black rounded-2xl">
                  Signup
                </button>
              </Link>
            </>
          )}
          {isloggedin && (
            <Link onClick={() => dispatch(authaction.logout())}>
              <button className="px-5 py-2 border-2 rounded-md">logout</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
