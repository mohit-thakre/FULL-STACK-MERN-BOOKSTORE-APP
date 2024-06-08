import React, { useState } from "react";
import toast from "react-hot-toast";
import { appurl } from "./Helper";
import Loader from "./Loader";
const Addbook = () => {
  const [loading, setloading] = useState(false);
  const [bookdata, setbookdata] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    description: "",
    language: "",
  });
  function handlechange(e) {
    const { name, value } = e.target;
    setbookdata({ ...bookdata, [name]: value });
  }
  async function handlesubmit(e) {
    setloading(true);
    try {
      e.preventDefault();
      const response = await fetch(`${appurl}/api/v1/book/addbook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(bookdata),
      });

      const data = await response.json();
      setloading(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error);
    }
  }
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (!bookdata || bookdata === null || bookdata.length === 0) {
    return (
      <div className=" grid place-content-center">
        <h1 className=" font-[moranga] text-3xl font-extrabold ">
          no data found
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-yellow-400 rounded-xl shadow-md text-black font-[gilroy3]">
      <h1 className="font-bold text-2xl bg-[#023047]  text-white text-center rounded-xl py-3 mb-2 font-[moranga]">
        Add New Book
      </h1>
      <form
        onSubmit={handlesubmit}
        className=" flex flex-col justify-between items-center"
      >
        <div className=" flex flex-col mb-4 w-[80%]">
          <label htmlFor="url" className=" font-semibold">
            {" "}
            Image Url
          </label>
          <input
            type="text"
            name="url"
            id="url"
            onChange={handlechange}
            value={bookdata.url}
            className=" border-2 bg-slate-100 rounded-lg py-1 my-1"
          ></input>
        </div>
        <div className=" flex flex-col mb-4 w-[80%]">
          <label htmlFor="title" className=" font-semibold">
            {" "}
            Book Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handlechange}
            value={bookdata.title}
            className=" border-2 bg-slate-100 rounded-lg py-1 my-1"
          ></input>
        </div>
        <div className=" flex flex-col mb-4 w-[80%]">
          <label htmlFor="author" className="font-semibold">
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            onChange={handlechange}
            value={bookdata.author}
            className=" border-2 bg-slate-100 rounded-lg py-1 my-1"
          ></input>
        </div>
        <div className=" flex flex-col mb-4 w-[80%]">
          <label htmlFor="price" className=" font-semibold">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            onChange={handlechange}
            value={bookdata.price}
            className=" border-2 bg-slate-100 rounded-lg py-1 my-1"
          ></input>
        </div>
        <div className=" flex flex-col mb-4 w-[80%]">
          <label htmlFor="description" className=" font-semibold">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={handlechange}
            value={bookdata.description}
            className=" border-2 bg-slate-100 rounded-lg py-1 my-1"
          ></input>
        </div>
        <div className=" flex flex-col mb-4 w-[80%]">
          <label htmlFor="language" className=" font-semibold">
            language
          </label>
          <input
            type="text"
            name="language"
            id="language"
            onChange={handlechange}
            value={bookdata.language}
            className=" border-2 bg-slate-100 rounded-lg py-1 my-1"
          ></input>
        </div>
        <button className="font-bold px-8 bg-green-700 text-white text-center rounded-xl py-2">
          {" "}
          submit{" "}
        </button>
      </form>
    </div>
  );
};

export default Addbook;
