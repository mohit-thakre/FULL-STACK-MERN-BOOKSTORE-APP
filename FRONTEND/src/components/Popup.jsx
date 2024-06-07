import React from "react";

const Popup = ({ item }) => {
  return (
    <div className="   font-[gilroy3]   text-black">
      <h1 className="  font-bold">Username: {item.username}</h1>
      <h1 className=" py-2 ">Email: {item.email}</h1>
      <h1 className="  ">Address: {item.address}</h1>
    </div>
  );
};

export default Popup;
