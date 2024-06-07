import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { appurl } from "./Helper";

const UpdateBook = () => {
  const [bookdata, setbookdata] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    description: "",
    language: "",
  });
  const { idd } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${appurl}/api/v1/book/getbookbyid/${idd}`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        setbookdata(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [idd]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setbookdata({ ...bookdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${appurl}/api/v1/book/updatebook`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          bookid: idd,
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(bookdata),
      });
      const data = await response.json();

      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the book.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-yellow-400 rounded-xl font-[gilroy3] shadow-md text-black">
      <h1 className="font-bold text-2xl bg-[#023047] font-[moranga] text-white text-center rounded-xl py-3 mb-2">
        Update Book
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between items-center"
      >
        <div className="flex flex-col mb-4 w-[80%]">
          <label htmlFor="url" className="font-semibold">
            Image Url
          </label>
          <input
            type="text"
            name="url"
            id="url"
            onChange={handleChange}
            value={bookdata.url}
            className="border-2 bg-slate-100 rounded-lg py-1 my-1"
          />
        </div>
        <div className="flex flex-col mb-4 w-[80%]">
          <label htmlFor="title" className="font-semibold">
            Book Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={bookdata.title}
            className="border-2 bg-slate-100 rounded-lg py-1 my-1"
          />
        </div>
        <div className="flex flex-col mb-4 w-[80%]">
          <label htmlFor="author" className="font-semibold">
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            onChange={handleChange}
            value={bookdata.author}
            className="border-2 bg-slate-100 rounded-lg py-1 my-1"
          />
        </div>
        <div className="flex flex-col mb-4 w-[80%]">
          <label htmlFor="price" className="font-semibold">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            onChange={handleChange}
            value={bookdata.price}
            className="border-2 bg-slate-100 rounded-lg py-1 my-1"
          />
        </div>
        <div className="flex flex-col mb-4 w-[80%]">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
            value={bookdata.description}
            className="border-2 bg-slate-100 rounded-lg py-1 my-1"
          />
        </div>
        <div className="flex flex-col mb-4 w-[80%]">
          <label htmlFor="language" className="font-semibold">
            Language
          </label>
          <input
            type="text"
            name="language"
            id="language"
            onChange={handleChange}
            value={bookdata.language}
            className="border-2 bg-slate-100 rounded-lg py-1 my-1"
          />
        </div>
        <button className="font-bold px-8 bg-green-500 text-white text-center rounded-xl py-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
