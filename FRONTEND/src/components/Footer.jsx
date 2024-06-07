import React from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const role = localStorage.getItem("role");
  return (
    <footer className="bg-yellow-400 text-gray-800 py-8 font-semibold font-[gilroy3] w-[97%] rounded-2xl mb-4">
      <div className="flex justify-around flex-wrap items-start">
        <div className=" p-4 md:w-1/4">
          <h2 className=" font-extrabold text-3xl py-3 font-[moranga] ">
            Pages & Co
          </h2>
          <p className=" font-semibold">
            Ever wanted to buy a book but could not because it was too
            expensive? Worry not! Because Pages & Co is here! Pages & Co, these
            days in news, is being called as the Robinhood of the world of
            books.
          </p>
        </div>
        <div className=" p-4 md:w-1/4">
          <h2 className="text-xl font-bold mb-4">Our Links</h2>
          <ul>
            <li className="my-2">
              <Link to="/about">About Us</Link>
            </li>
            <li className="mb-2">
              <Link to="/all-book">All Books</Link>
            </li>
            <li className="my-2">
              <Link to="/profile">Profile</Link>
            </li>
            {role === "admin" ? (
              <>
                <li className="mb-2">
                  <Link to="/profile/addbook">Add Book</Link>
                </li>
                <li className="mb-2">
                  <Link to="/profile/allorderadmin"> All Orders </Link>
                </li>
              </>
            ) : (
              <>
                <li className="mb-2">
                  <Link to="/cart">Cart</Link>
                </li>
                <li className="my-2">
                  <Link to="/profile/favourites"> favourites </Link>
                </li>
                <li className="mb-2">
                  <Link to="/profile/settings">Profile setting</Link>
                </li>
                <li className="mb-2">
                  <Link to="/profile/orderhistory">Order History</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className=" p-4 md:w-1/4">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul>
            <li className="mb-2">
              <Link>Track Order</Link>
            </li>
            <li className="mb-2">
              <Link>FAQs</Link>
            </li>
            <li className="mb-2">
              <Link>Privacy Policy</Link>
            </li>
            <li className="mb-2">
              <Link>Terms & Conditions</Link>
            </li>
          </ul>
        </div>
        <div className=" p-4 md:w-1/4">
          <h2 className="text-xl font-bold mb-4">Supports</h2>
          <ul>
            <li className="mb-2">
              <Link>Call : 9876543219</Link>
            </li>
            <li className="mb-2">
              <Link>Email : mohitthakre1211@gmail.com</Link>
            </li>
          </ul>
          <div className=" flex justify-start text-2xl gap-5 items-center">
            <FaFacebook /> <FaInstagram /> <FaTwitter />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
