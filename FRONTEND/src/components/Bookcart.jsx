import React from "react";
import { Link } from "react-router-dom";
const Bookcart = ({ data }) => {
  return (
    <div>
      <Link to={`/viewbook/${data._id}`}>
        <div className=" p-4 bg-[#90cbd7]">
          <img
            src={data.url}
            alt="imagge"
            className="h-[25vh] w-[90%] mx-auto rounded-md"
          />
          <p className=" font-bold p-2">{data.title}</p>
          <p className=" font-semibold pl-2">by- {data.author}</p>
          <p className="font-semibold p-2 "> Rs {data.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Bookcart;
