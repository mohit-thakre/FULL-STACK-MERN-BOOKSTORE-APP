import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaRegHeart, FaCartPlus, FaEdit } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MdLanguage } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";
import { appurl } from "./Helper";
import Loader from "./Loader";
const ViewBookDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { idd } = useParams();

  const [description, setdescription] = useState(true);

  const isLoggedIn = useSelector((state) => state.auth.isloggedin);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${appurl}/api/v1/book/getbookbyid/${idd}`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [idd]);

  if (loading) {
    return (
      <div className=" w-full h-screen grid place-items-center ">
        <Loader />
      </div>
    );
  }

  if (!data || !data.data) {
    return (
      <h1 className=" w-full h-screen grid place-items-center font-extrabold text-3xl">
        No data found
      </h1>
    );
  }

  function handledescription() {
    setdescription(!description);
  }

  async function handlefavourite() {
    const response = await fetch(`${appurl}/api/v1/book/addbooktofavourite`, {
      method: "put",
      headers: {
        bookid: idd,
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    toast.success(data.message);
  }

  async function handlecart() {
    const response = await fetch(`${appurl}/api/v1/book/addbooktocart`, {
      method: "put",
      headers: {
        bookid: idd,
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    toast.success(data.message);
  }

  async function deletebook() {
    try {
      const response = await fetch(`${appurl}/api/v1/book/deletebook`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
          bookid: idd,
        },
      });
      const data = await response.json();
      toast(data.message);
      navigate("/all-book");
    } catch (error) {
      console.log(error);
      toast(`Error: ${error.message}`);
    }
  }

  return (
    <div className="path bg-yellow-400 w-full  md:w-[97%] font-[gilroy3] min-h-[85vh] rounded-lg p-6 flex flex-col md:flex-row justify-around items-center md:mx-auto">
      <div className="flex flex-col items-center">
        <img
          src={data.data.url}
          alt="img-s"
          className="w-[95%] mx-auto md:max-w-[550px] h-auto rounded-md"
        />

        {isLoggedIn && (
          <div className="flex  justify-center items-center gap-4">
            {role === "admin" ? (
              <>
                <Link to={`/updatebook/${idd}`}>
                  <button className="mx-auto flex cursor-pointer font-bold px-8 md:px-4 py-2 rounded-2xl bg-blue-100 text-blue-600 my-5">
                    <span className="flex justify-center gap-1 items-center">
                      Edit Book <MdEdit />
                    </span>
                  </button>
                </Link>
                <button
                  className="mx-auto flex cursor-pointer font-bold px-8 md:px-4 py-2 rounded-2xl bg-red-100 text-red-600 my-5"
                  onClick={deletebook}
                >
                  <span className="flex justify-center gap-1 items-center">
                    Delete Book <MdDelete />
                  </span>
                </button>
              </>
            ) : (
              <>
                <button
                  className="mx-auto flex cursor-pointer font-bold px-8 md:px-4 py-2 rounded-2xl bg-blue-100 text-red-600 my-5"
                  onClick={handlefavourite}
                >
                  <span className="flex justify-center gap-1 items-center">
                    Add To Favourite
                    <FaRegHeart />
                  </span>
                </button>
                <button
                  className="mx-auto flex cursor-pointer font-bold px-8 md:px-4 py-2 rounded-2xl bg-blue-100 text-blue-600 my-5"
                  onClick={handlecart}
                >
                  <span className="flex justify-center gap-1 items-center">
                    Add To Cart <FaCartPlus />
                  </span>
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col md:gap-3 w-full md:w-2/5 text-center md:text-left">
        <p className="text-green-600 font-extrabold">
          <span className="flex gap-1 justify-center md:justify-start items-center">
            <FaBookOpenReader className=" text-blue-700" /> BOOKTOPIA
          </span>
        </p>
        <p className="font-extrabold text-3xl capitalize font-[moranga]">
          {data.data.title}
        </p>
        <p className=" text-lg font-semibold">
          {description
            ? data.data.description.substr(0, 200)
            : data.data.description}{" "}
          <span
            className=" font-semibold mx-2 text-blue-700 cursor-pointer"
            onClick={handledescription}
          >
            {description ? "... show more" : "show less"}
          </span>
        </p>
        <p className="text-gray-800 font-semibold text-lg">
          <span className="flex gap-1 justify-center md:justify-start items-center">
            <MdLanguage className="font-bold" /> {data.data.language}
          </span>
          <span> by-{data.data.author}</span>
        </p>
        <p className="font-bold text-xl mt-3">₹ {data.data.price}</p>
      </div>
    </div>
  );
};

export default ViewBookDetails;
