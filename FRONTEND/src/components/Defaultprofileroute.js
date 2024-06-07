import React from "react";
import { Navigate } from "react-router-dom";

const Defaultprofileroute = ({ role }) => {
  if (role === "admin") {
    return <Navigate to="addbook" replace />;
  } else {
    return <Navigate to="favourites" replace />;
  }
};

export default Defaultprofileroute;
