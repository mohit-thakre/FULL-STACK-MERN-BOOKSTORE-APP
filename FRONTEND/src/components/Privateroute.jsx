import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Privateroute = ({ children }) => {
  const location = useLocation();
  console.log(location.pathname, "in priate route");

  const isloggedin = useSelector((state) => state.auth.isloggedin);

  if (isloggedin === true) {
    return children;
  } else {
    return <Navigate to={location.pathname} />;
  }
};

export default Privateroute;
