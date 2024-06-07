import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Privateroute = ({ children }) => {
  const isloggedin = useSelector((state) => state.auth.isloggedin);

  if (isloggedin === true) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Privateroute;
