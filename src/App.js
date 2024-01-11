import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Component/Header/Header";


import Profile from "./pages/User/Profile";

import { TailSpin } from "react-loader-spinner";

import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { jwtDecode } from "jwt-decode"
import {  isLogin } from "./redux/common";


import Login from "./pages/User/Login";

function App() {
  
  const loaderStatus = useSelector((state) => state.apiReducer.loader);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  setInterval(() => {
    AuthVerifyComponent();
  }, 1000);
  const AuthVerifyComponent = () => {
    if (localStorage.getItem("oAuth")) {
      const jwt_Token_decoded = jwtDecode(localStorage.getItem("oAuth"));
      if (jwt_Token_decoded.exp * 1000 < Date.now()) {
        // console.log("comming")
        localStorage.clear();
        navigate("/");
        dispatch(isLogin(false));
        toast.error("Session expired.Please login to proceed");
      }
    }

    return <div></div>;
  };

  return (
    <>
     
      
<Header/>
      <Routes>
        <Route path="/" element={<Login />} />
       
        <Route path="/profile" element={<Profile />} />
       
      </Routes>

      
      <ToastContainer />
    </>
  );
}

export default App;
