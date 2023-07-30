import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState} from "react";

import Profile from "./pages/User/Profile";

import { TailSpin } from "react-loader-spinner";

import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { jwtDecode } from "jwt-decode"
import { loader, isLogin } from "./redux/common";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/User/LoginPage";
import Login from "./pages/User/Login";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Define the onCategorySelect function
  const onCategorySelect = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };
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
      <TailSpin
        height="100"
        width="80"
        color="#107B38"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass="tailSpin"
        visible={loaderStatus}
      />
      

      <Routes>
        <Route path="/" element={<Login />} />
       
        <Route path="/profile" element={<Profile />} />
       
      </Routes>

      
      <ToastContainer />
    </>
  );
}

export default App;
