import React, { useState } from 'react';
import { Modal, ModalBody, InputGroup, Form, Button } from 'react-bootstrap';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';
import { Link } from 'react-router-dom';  // If using React Router
import '../../Component/Header/Header.css';
import Signin from "../../assets/images/signinimg.png";
import { useDispatch, useSelector } from "react-redux";
import { loader, isLogin } from "../../redux/common";
import { toast } from "react-toastify";
import Logo from "../../assets/images/logo.png";
import { useForm } from "react-hook-form";


import {
    userLoginCb,
    userForgotPassCb,
    userForgotPassSecCb,
    
  } from "../../redux/user";

const LoginPage = () => {
    const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showcontentForgot, setShowcontentForgot] = useState(0);
  const [showcontent, setShowcontent] = useState(0);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (data) => {
    // Handle form submission, e.g., make an API call
    console.log(data);
  };
  const {
    register: register5,
    formState: { errors: errors5 },
    reset: reset5,
    handleSubmit: handleSubmit5,
  } = useForm({ mode: "onBlur" });

  const signInFn = (data) => {
    dispatch(loader(true));
    dispatch(
      userLoginCb(data, (result) => {
        dispatch(loader(false));
        if (result.status) {
          toast.success(result.message);
          localStorage.setItem("oAuth", "Bearer " + result.origin);
          localStorage.setItem("isLogin", true);
          dispatch(isLogin(true));
          
          reset5();
        } else {
          toast.error(result.message);
        }
      })
    );
  };

  console.log('Rendering LoginPage component');
 

  return (
    <div>
      <h2>Hi how are you</h2>
    </div>
   
  );
};

export default LoginPage;
