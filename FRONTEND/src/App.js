import React, { useEffect } from "react";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Allbook from "./pages/Allbook";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import Cartpage from "./pages/Cartpage";
import Profile from "./pages/Profile";
import Viewbookdetais from "./components/Viewbookdetais";
import { useDispatch, useSelector } from "react-redux";
import { authaction } from "./store/auth";
import Favourites from "./components/Favourites";
import Orderhistory from "./components/Orderhistory";
import Setting from "./components/Setting";
import { Toaster } from "react-hot-toast";
import Addbook from "./components/Addbook";
import Allorderadmin from "./components/Allorderadmin";
import Updatebook from "./components/Updatebook";
import Aboutus from "./pages/Aboutus";
import Privateroute from "./components/Privateroute";
import Hero2 from "./components/Hero2";

const App = () => {
  const dispatch = useDispatch();
  useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authaction.login());
      dispatch(authaction.changerole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <div className="bg-[#ffffff] overflow-x-hidden ">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route path="/all-book" element={<Allbook />}></Route>
        <Route path="/login" element={<Loginpage />}></Route>
        <Route path="/signup" element={<Signuppage />}></Route>
        <Route
          path="/cart"
          element={
            <Privateroute>
              <Cartpage />
            </Privateroute>
          }
        ></Route>
        <Route path="/about" element={<Aboutus />}></Route>
        <Route path="/updatebook/:idd" element={<Updatebook />}></Route>
        <Route
          path="/profile"
          element={
            <Privateroute>
              <Profile />
            </Privateroute>
          }
        >
          <Route path="favourites" element={<Favourites />} />
          <Route path="addbook" element={<Addbook />} />
          <Route path="allorderadmin" element={<Allorderadmin />} />
          <Route path="orderhistory" element={<Orderhistory />} />
          <Route path="settings" element={<Setting />} />
        </Route>
        <Route path="/viewbook/:idd" element={<Viewbookdetais />}></Route>
        <Route path="/hero" element={<Hero2 />}></Route>
      </Routes>

      <div>
        <Toaster />
      </div>
    </div>
  );
};

export default App;
