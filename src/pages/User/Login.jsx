import React, { useEffect, useState } from "react";
import "./Login.css";

import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { loader, isLogin } from "../../redux/common";
import {
    userLoginCb,
    userForgotPassCb,
    userForgotPassSecCb,
    
  } from "../../redux/user";
import { useDispatch, useSelector } from "react-redux";

import { AiFillCamera } from "react-icons/ai";
import Profimage from "../../assets/images/userimage.png";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryListData, setCategoryListData] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [file, setFile] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [city, setCity] = useState('')
  const [expertise, setExpertise] = useState('')
  const [designation, setDesignation] = useState('')
  const [description, setDescription] = useState('')
  const [cvUrl, setcvUrl] = useState('')
  const [cvUrlfile, setcvUrlfile] = useState('')
  const [course1Url, setcourse1Url] = useState('')
  const [course1Urlfile, setcourse1Urlfile] = useState('')
  const [course2Url, setcourse2Url] = useState('')
  const [course2Urlfile, setcourse2Urlfile] = useState('')
  const [readOnly, setReadOnly] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(true);
  let [refresher, setRefresher] = useState(true);
  const {
    register: register,
    formState: { errors: errors },
    reset: reset,
    handleSubmit: handleSubmit,
  } = useForm({ mode: "onBlur" });

console.log(email, password)

  const signInFn = (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    dispatch(loader(true));
    dispatch(
      userLoginCb(data, (result) => {
        dispatch(loader(false));
        if (result.status) {
          toast.success(result.message);
          console.log(data)
          localStorage.setItem("oAuth", "Bearer " + result.data.token);
          localStorage.setItem("isLogin", true);
          dispatch(isLogin(true));
          reset();
          navigate("/profile")
        } else {
          toast.error(result.message);
        }
      })
    );
  };
  const signUpFn = (data) => {
    // Create a new FormData object
    console.log("function works")
    const formData = new FormData();

    // Append required fields to formData
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("city", data.city);
    formData.append("expertise", data.expertise);
    formData.append("designation", data.designation);
    formData.append("description", data.description);
    formData.append("cvUrl", data.cvUrl[0]);
    formData.append("course1Url", data.course1Url[0]);
    formData.append("course2Url", data.course2Url[0]);
   // formData.append("photoUrl", data.photoUrl[0]);
    formData.append('photoUrl', file);

    
  };


  const handleProfilePic = (event) => {
    const selectedFile = event.target.files[0];
    //const selectedFile = event.target.value.getAsDataURL()
    console.log("file123", selectedFile)
    if (selectedFile) {
      setFile(selectedFile);
    
      // Create a preview image URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);

    } else {
      setPreviewImage(
        'https://cdn.landesa.org/wp-content/uploads/default-user-image.png'
      );
      setFile(null);
    }
  };
  const handleFileChangeCV = (event) => {
    const file = event.target.files[0];
    console.log(event.target.files[0], "event.target.files[0]");
    setcvUrl(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setcvUrlfile(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFileChangecrs1 = (event) => {
    const file = event.target.files[0];
    console.log(event.target.files[0], "event.target.files[0]");
    setcourse1Url(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setcourse1Urlfile(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleFileChangeCrs2 = (event) => {
    const file = event.target.files[0];
    console.log(event.target.files[0], "event.target.files[0]");
    setcourse2Url(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setcourse2Urlfile(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="EDucaTorPage">
      <div className="PageHEaders edu">
        <div className="container">
          <div className="row">
            <div className="col-12"></div>
          </div>
        </div>
      </div>
      <div className="EduCatorFrom pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="PAgeTit small pt-3 pb-3">
                <h2 className="row justify-content-center" >Login Now</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="eDUcAfo">

                <form onSubmit={handleSubmit(signInFn)}>

                  {/* <div className="ProFi1 "
                  // style={{
                  //   paddingLeft:"345px"
                  // }}
                  >
                    <label htmlFor="imgupload">
                      <input
                        type="file"
                        id="imgupload"
                        onChange={handleProfilePic}
                        style={{ display: "none" }}
                        // readOnly={readOnly}
                       // {...register("photoUrl")}

                      />
                      <i >
                        <AiFillCamera />
                      </i>
                      <img
                        src={previewImage ? previewImage : Profimage}
                        // src={file ? file : Profimage }

                        className="img-fluid border"
                        //alt="User Profile"
                        style={{
                          width: "150px",
                        }}
                      // {...register("photoUrl", {
                      //   required: "Profile photo is required",
                      // })}

                      />

                    </label>
                    {errors.photoUrl && (
                      <small style={{ color: "red", float: "left" }}>
                        {errors.photoUrl.message}
                      </small>
                    )}


                  </div>
                   */}
                  <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="EduCf">
                        <label>Email Address</label>
                        <input
                          type="text"
                          className="inputFormF"
                          placeholder="Email Address"
                          name="email"
                          id="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
                              message: "Invalid Format",
                            },
                          })}
                        />
                        {errors.email && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors.email.message}
                          </small>
                        )}
                      </div>
                    </div>
                    
                  </div>


                  <div className="row justify-content-center">
                    
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="EduCf">
                        <label>Password</label>
                        <input
                          type="text"
                          className="inputFormF"
                          placeholder="Password"
                          name="password"
                          id="password"
                          {...register("password", {
                            required: "Password is required",
                            // pattern: {
                            //   value:
                            //     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            //   message:
                            //     "Invalid Format.Please enter 8 digit Password",
                            // },
                          })}
                        />
                        {errors.password && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors.password.message}
                          </small>
                        )}
                      </div>
                    </div>

                  </div>
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <div className="SIGBtn">
                        <div className="EduCf">
                          <button type="submit">Sign In</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;