import React, { useEffect, useRef, useState } from "react";
import "./User.css";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { AiFillCamera } from "react-icons/ai";
import Profimage from "../../assets/images/userimage.png";
import Nav from "react-bootstrap/Nav";
import abtGirl from "../../assets/images/abtGirl.png";
import { useForm } from "react-hook-form";
import {jwtDecode} from "jwt-decode";
import {
  userPersonalDetail,
  userAddressDetail,
  userAcademicDetail,
  userProfessionalDetail,
  userPersonalInfo,
  userPasswordInfo,
  userAddressInfo,
  userAcademicInfo,
  userProfessionalInfo,
  userProfilePic,
} from "../../redux/profile";
import { useDispatch } from "react-redux";
import { loader, isLogin } from "../../redux/common";
import { toast } from "react-toastify";

const Profile = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [refresher, setRefresher] = useState(true);
  const [validationMode, setValidationMode] = useState(true);

  const [fullName, setFullName] = useState("");
  let firstNameRef = useRef();
  let phoneNumberRef = useRef();
  let userTypeRef = useRef();
  let emailRef = useRef();
  let addressRef = useRef();
  let pincodeRef = useRef();
  let cityRef = useRef();
  let stateRef = useRef();
  let countryRef = useRef();
  let collegeRef = useRef();
  let yearRef = useRef();
  let academicCityRef = useRef();
  let academicPincodeRef = useRef();
  let academicDegreeRef = useRef();
  let profNameRef = useRef();
  let profDesigRef = useRef();
  let profExpRef = useRef();
  let profDegreeRef = useRef();
  let profCityRef = useRef();
  let profPincodeRef = useRef();

  const [readOnly, setReadOnly] = useState(true);
  const [readOnly1, setReadOnly1] = useState(true);
  const [readOnly2, setReadOnly2] = useState(true);
  const [readOnly3, setReadOnly3] = useState(true);
  const [readOnly4, setReadOnly4] = useState(true);

  const [personalData, setPersonalData] = useState({});
  const [addressData, setAddressData] = useState({});
  const [academicData, setAcademicData] = useState({});
  const [professionalData, setProfessionalData] = useState({});

  const [editedData, setEditedData] = useState({});
  const [cityData, setCityData] = useState();
  const [stateValue, setStateValue] = useState();
  const [cityValue, setCityValue] = useState();
  const [countryValue, setCountryValue] = useState();
  const [collegeValue, setCollegeValue] = useState();
  const [yearValue, setYearValue] = useState();
  const [acaCityValue, setAcaCityValue] = useState();
  const [acaPinValue, setAcaPinValue] = useState();
  const [acaDegreeValue, setAcaDegreeValue] = useState();
  const [profDegreeValue, setProfDegreeValue] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [radioValue, setRadiovalue] = useState("");

  const {
    register: register,
    control,
    formState: { errors: errors },
    reset: reset,
    handleSubmit: handleSubmit,
  } = useForm({ mode: "onBlur" });
  const {
    register: register1,
    control1,
    formState: { errors: errors1 },
    reset: reset1,
    handleSubmit: handleSubmit1,
  } = useForm({ mode: "onBlur" });
  const {
    register: register2,
    control2,
    formState: { errors: errors2 },
    reset: reset2,
    handleSubmit: handleSubmit2,
  } = useForm({ mode: "onBlur" });

  const {
    register: register3,
    control3,
    formState: { errors: errors3 },
    reset: reset3,
    handleSubmit: handleSubmit3,
  } = useForm({ mode: "onBlur" });

  const {
    register: register4,
    control4,
    formState: { errors: errors4 },
    reset: reset4,
    handleSubmit: handleSubmit4,
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    dispatch(loader(true));
    dispatch(
      userPersonalDetail((resp) => {
        if (resp.status) {
          console.log("profile", resp.data);
          setPersonalData(resp.data);
          let OBJECT = resp.data;

          firstNameRef.current.value = OBJECT?.fullName;
          phoneNumberRef.current.value = OBJECT?.phoneNumber;
          emailRef.current.value = OBJECT?.email;
          setPreviewImage(resp?.data?.profilePic);
          // userTypeRef.current.value = OBJECT?.userType;

          setRadiovalue(resp?.data?.userType);

          dispatch(loader(false));
        } else {
          dispatch(loader(false));
          toast.error(resp.message);
        }
      })
    );

    dispatch(
      userAddressDetail((resp) => {
        if (resp.status) {
          // console.log("Address", resp.data);
          setAddressData(resp.data);
          let OBJECT = resp.data;
          addressRef.current.value = OBJECT?.addressLine;
          pincodeRef.current.value = OBJECT?.pinCode;
          setCityData(OBJECT?.city);
          cityRef.current.value = OBJECT?.city;
          stateRef.current.value = OBJECT?.state;
          countryRef.current.value = OBJECT?.country;

          dispatch(loader(false));
        } else {
          dispatch(loader(false));
          toast.error(resp.message);
        }
      })
    );
    dispatch(
      userAcademicDetail((resp) => {
        if (resp.status) {
          // console.log("Academic", resp.data);
          setAcademicData(resp.data);
          let OBJECT = resp.data;
          collegeRef.current.value = OBJECT?.collegeName;
          yearRef.current.value = OBJECT?.yearOfCollege;
          academicDegreeRef.current.value = OBJECT?.degreeOfStream;
          academicCityRef.current.value = OBJECT?.city;
          academicPincodeRef.current.value = OBJECT?.pinCode;
          dispatch(loader(false));
        } else {
          dispatch(loader(false));
          toast.error(resp.message);
        }
      })
    );
    dispatch(
      userProfessionalDetail((resp) => {
        if (resp.status) {
          // console.log("professional", resp.data);
          setProfessionalData(resp.data);
          let OBJECT = resp.data;
          profNameRef.current.value = OBJECT?.companyName;
          profDesigRef.current.value = OBJECT?.designation;
          profExpRef.current.value = OBJECT?.totalExperince;
          profDegreeRef.current.value = OBJECT?.degreeOfStream;
          profPincodeRef.current.value = OBJECT?.pinCode;
          profCityRef.current.value = OBJECT?.city;
          dispatch(loader(false));
        } else {
          dispatch(loader(false));
          toast.error(resp.message);
        }
      })
    );
  }, [refresher]);

  const handleEditClick = () => {
    setReadOnly(false);
  };
  const handleEditClick1 = () => {
    setReadOnly1(false);
  };
  const handleEditClick2 = () => {
    setReadOnly2(false);
  };

  const handleEditClick3 = () => {
    setReadOnly3(false);
  };
  const handleEditClick4 = () => {
    setReadOnly4(false);
  };

  function shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);

    const keys2 = Object.keys(object2);

    var arr = {};

    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        arr[key] = object1[key];
      }
    }

    return arr;
  }

  const pesonalInfo = () => {
    if (
      firstNameRef.current.value == "" ||
      phoneNumberRef.current.value == "" ||
      emailRef.current.value == "" ||
      radioValue == ""
    ) {
      toast.error("Please enter all input fields.");
      dispatch(loader(false));
      return;
    }

    dispatch(loader(true));
    let data = {};
    data["fullName"] = firstNameRef.current.value;
    data["phoneNumber"] = phoneNumberRef.current.value;
    data["userType"] = radioValue;
    data["email"] = emailRef.current.value;

    // console.log("dataaa", data);
    // console.log("aradio", radioValue);

    var result = shallowEqual(data, personalData);

    // console.log("resultresult", result);

    dispatch(
      userPersonalInfo(result, (resp) => {
        if (resp.status) {
          console.log("resp.data", resp);
          dispatch(loader(false));
          toast.success(resp.message);
          setReadOnly(true);
          setRefresher(!refresher);
        } else {
          dispatch(loader(false));
          toast.error(resp.message);
        }
      })
    );
  };

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState();

  // const handleProfilePic = (event) => {
  //   setImageFile(event.target.files[0]);
  // };

  const handleProfilePic = (event) => {
    const selectedFile = event.target.files[0];
    console.log("selectedFile", selectedFile);
    // setImageFile(event.target.files[0]);

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewImage(
        "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
      );
    }

    let formData = new FormData();
    formData.append("profilePic", selectedFile);
    console.log("selectedFile", selectedFile);
    dispatch(loader(true));
    dispatch(
      userProfilePic(formData, (resp) => {
        if (resp.status) {
          console.log("resp.data", resp);
          dispatch(loader(false));
          toast.success(resp.message);
          if (resp.data && resp.data.profilePic) {
            setPreviewImage(resp.data.profilePic);
          }
          setReadOnly1(true);
          setRefresher(!refresher);
        } else {
          dispatch(loader(false));
          // toast.error(resp.message);
        }
      })
    );
  };

  const passwordInfo = (data) => {
    console.log("data", data);
    dispatch(loader(true));
    dispatch(
      userPasswordInfo(data, (resp) => {
        if (resp.status) {
          console.log("resp.data", resp);
          dispatch(loader(false));
          toast.success(resp.message);
          setReadOnly1(true);
          reset1();
          setRefresher(!refresher);
        } else {
          dispatch(loader(false));
          toast.error(resp.message);
        }
      })
    );
  };

  const addressInfo = () => {
    dispatch(loader(true));

    if (
      addressRef.current.value == "" ||
      cityRef.current.value == "" ||
      pincodeRef.current.value == "" ||
      countryRef.current.value == "" ||
      stateRef.current.value == ""
    ) {
      toast.error("Please enter all input fields.");
      dispatch(loader(false));
      return;
    }

    let data = {};
    data["addressLine"] = addressRef.current.value;
    data["city"] = cityRef.current.value;
    data["state"] = stateRef.current.value;
    data["country"] = countryRef.current.value;
    data["pinCode"] = parseInt(pincodeRef.current.value);

    dispatch(
      userAddressInfo(data, (resp) => {
        if (resp.status) {
          console.log("resp.data", resp);
          dispatch(loader(false));
          toast.success(resp.message);
          setReadOnly2(true);
          setRefresher(!refresher);
        } else {
          dispatch(loader(false));
          toast.error(resp.message);
        }
      })
    );
  };

  const academicInfo = () => {
    dispatch(loader(true));

    if (
      collegeRef.current.value == "" ||
      yearRef.current.value == "" ||
      academicDegreeRef.current.value == "" ||
      academicCityRef.current.value == "" ||
      academicPincodeRef.current.value == ""
    ) {
      toast.error("Please enter all input fields.");
      dispatch(loader(false));
      return;
    }

    let data = {};
    data["collegeName"] = collegeRef.current.value;
    data["yearOfCollege"] = yearRef.current.value;
    data["degreeOfStream"] = academicDegreeRef.current.value;
    data["city"] = academicCityRef.current.value;
    data["pinCode"] = parseInt(academicPincodeRef.current.value);

    dispatch(
      userAcademicInfo(data, (resp) => {
        if (resp.status) {
          console.log("resp.data", resp);
          dispatch(loader(false));
          toast.success(resp.message);
          setReadOnly3(true);
          setRefresher(!refresher);
        } else {
          dispatch(loader(false));
          toast.error(resp.message);
        }
      })
    );
  };

  const professionalInfo = () => {
    dispatch(loader(true));

    if (
      profNameRef.current.value == "" ||
      profDesigRef.current.value == "" ||
      profExpRef.current.value == "" ||
      profDegreeRef.current.value == "" ||
      profCityRef.current.value == "" ||
      profPincodeRef.current.value == ""
    ) {
      toast.error("Please enter all input fields.");
      dispatch(loader(false));
      return;
    }

    let data = {};
    data["companyName"] = profNameRef.current.value;
    data["city"] = profCityRef.current.value;
    data["designation"] = profDesigRef.current.value;
    data["degreeOfStream"] = profDegreeRef.current.value;
    data["totalExperince"] = profExpRef.current.value;
    data["pinCode"] = parseInt(profPincodeRef.current.value);
    dispatch(
      userProfessionalInfo(data, (resp) => {
        if (resp.status) {
          console.log("resp.data", resp);
          dispatch(loader(false));
          toast.success(resp.message);
          setReadOnly4(true);
          setRefresher(!refresher);
        } else {
          dispatch(loader(false));
          toast.error(resp.message);
        }
      })
    );
  };

  const changeSelection = (e) => {
    setRadiovalue(e.target.value);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);

    console.log("event.target.value", event.target.value);
  };

  const handleStateChange = (event) => {
    setStateValue(event.target.value);
  };
  const handleCityChange = (event) => {
    setCityValue(event.target.value);
  };
  const handleCountryChange = (event) => {
    setCountryValue(event.target.value);
  };
  const handleCollegeChange = (event) => {
    setCollegeValue(event.target.value);
  };
  const handleColYearChange = (event) => {
    setYearValue(event.target.value);
  };
  const handleAcaCityChange = (event) => {
    setAcaCityValue(event.target.value);
  };
  const handleAcaPinChange = (event) => {
    setAcaPinValue(event.target.value);
  };
  const handleAcaDegreeChange = (event) => {
    setAcaDegreeValue(event.target.value);
  };
  const handleProfDegreeChange = (event) => {
    setProfDegreeValue(event.target.value);
  };

  setInterval(() => {
    autoLogOut();
  }, 1000);

  const autoLogOut = () => {
    if (localStorage.getItem("oAuth")) {
      const jwt_Token_decoded = jwtDecode(localStorage.getItem("oAuth"));
      if (jwt_Token_decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("oAuth");
        //localStorage.clear();
        navigate("/");
        dispatch(isLogin(false));
        toast.error("Session expired.Please login to proceed");
      }
    }
  };
  const handleLogOut = () => {
    localStorage.removeItem("oAuth");
    localStorage.removeItem("isLogin");
    navigate("/");
    dispatch(isLogin(false));
    toast.success("You have logged out successfully");
  };

  return (
    <div className="ProFILE">
      <div className="PageHEaders">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="PageTi pt-5">
                <h2>Profile</h2>
                <p>
                  <Link to="/">Home</Link>{" "}
                  <i>
                    <FaAngleRight />
                  </i>
                  <Link to="/profile">Profile</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ProfileTabs pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-12">
              <div className="SIdeBar">
                <Nav defaultActiveKey="/dashboard" className="flex-column">
                  <Nav.Link>
                    {" "}
                    <Link to="/dashboard">Dashboard</Link>{" "}
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/subscribe">My Subscription</Link>
                  </Nav.Link>
                  <Nav.Link>
                    {" "}
                    <Link to="/mycourse">My Course</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/orderhistory">Order History</Link>{" "}
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/wishlist">Wishlist</Link>
                  </Nav.Link>
                  <Nav.Link className="Active">
                    {" "}
                    <Link to="/profile">My Profile</Link>
                  </Nav.Link>
                  <Nav.Link>
                    {" "}
                    <span onClick={handleLogOut}>Log Out</span>
                  </Nav.Link>
                </Nav>
              </div>
              
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12">
              <div className="ProFileForM">
                {/* <form> */}
                <form onSubmit={handleSubmit(pesonalInfo)}>
                  <div className="profile-img-area">
                 
                  <div className="row">
                    <div className="col-12">
                      <div className="ProFi1 ProFiles">
                        <label htmlFor="imgupload">
                          <input
                            type="file"
                            id="imgupload"
                            onChange={handleProfilePic}
                            style={{ display: "none" }}
                            disabled={readOnly}
                          />
                          <i>
                            <AiFillCamera />
                          </i>
                          <img
                            src={previewImage ? previewImage : Profimage}
                            className="img-fluid border"
                            alt="User Profile"
                            style={{ width: "150px" }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="ProFi1 ProFiles">
                        <h4>Personal Information</h4>
                      </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                      <div className="ProFiles profileimg">
                        <div>
                        <input
                          type="radio"
                          readOnly={readOnly}
                          id="Student"
                          name="Student"
                          value="student"
                          onChange={changeSelection}
                          checked={radioValue === "student"}
                        />
                        <label>Student</label>
                        </div>
                     
                        <div>
                        <input
                          type="radio"
                          disabled={readOnly}
                          readOnly={readOnly}
                          id="Working Professional"
                          name="Working Professional"
                          value="workingProfessional"
                          onChange={changeSelection}
                          checked={radioValue === "workingProfessional"}
                        />
                        <label>Working Professional</label>
                        </div>
                        
                      </div>
                      <button type="button" onClick={handleEditClick} className="editbtn">
                        Edit
                      </button>
                    </div>
                  </div>
                  
                  </div>
                  
                  <div className="row">
                    <div className="col-12">
                      <div className="ProFi">
                        <label>Name</label>
                        <br />

                        <input
                          type="text"
                          placeholder="Name"
                          name="name"
                          id="name"
                          readOnly={readOnly}
                          ref={firstNameRef}
                        />
                      </div>
                    </div>
                  </div>

                  {/* {personalData?.fullName ? (
                        
                        ) : ()} */}

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="ProFi">
                        <label>Email Address</label>
                        <br />

                        <input
                          type="text"
                          placeholder="Email Address"
                          readOnly={readOnly}
                          ref={emailRef}
                          name="email"
                          id="email"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="ProFi">
                        <label>Mobile Number</label>
                        <br />

                        <input
                          type="number"
                          placeholder="Mobile Number"
                          readOnly={readOnly}
                          ref={phoneNumberRef}
                          name="mobilenumber"
                          id="mobilenumber"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="ProFiBtn">
                        <button
                          type="submit"
                          disabled={readOnly}
                          className={readOnly ? "ProFiBtnBlur" : "ProFiBtn"}
                        >
                          Save
                        </button>
                        <hr />
                      </div>
                    </div>
                  </div>
                </form>

                {/* Password Info */}
                <form onSubmit={handleSubmit1(passwordInfo)}>
                  <div className="row">
                    <div className="col-12 d-flex">
                      <div className="ProFi1 pswdInfo">
                        <h4>Password Information</h4>
                      </div>
                      <button type="button" onClick={handleEditClick1} className="editBtnPw">
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="ProFi">
                        <label>Current Password</label>
                        <br />
                        <input
                          type="text"
                          placeholder="*****"
                          readOnly={readOnly1}
                          name="currentPassword"
                          id="currentPassword"
                          {...register1("currentPassword", {
                            required: "CurrentPassword is required",
                          })}
                        />
                        {errors1.currentPassword && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors1.currentPassword.message}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="ProFi">
                        <label>New Password</label>
                        <br />
                        <input
                          type="text"
                          placeholder="*****"
                          readOnly={readOnly1}
                          name="newPassword"
                          id="newPassword"
                          {...register1("newPassword", {
                            required: "NewPassword is required",
                          })}
                        />
                        {errors1.newPassword && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors1.newPassword.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="ProFi">
                        <label>Confirm Password</label>
                        <br />
                        <input
                          type="text"
                          placeholder="*****"
                          readOnly={readOnly1}
                          name="confirmPassword"
                          id="confirmPassword"
                          {...register1("confirmPassword", {
                            required: "ConfirmPassword is required",
                          })}
                        />
                        {errors1.confirmPassword && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors1.confirmPassword.message}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="ProFiBtn">
                        <button
                          type="submit"
                          disabled={readOnly1}
                          className={readOnly1 ? "ProFiBtnBlur" : "ProFiBtn"}
                        >
                          Save
                        </button>
                        <hr />
                      </div>
                    </div>
                  </div>
                </form>

                {/* Adress Info */}
                <form onSubmit={handleSubmit2(addressInfo)}>
                  <div className="row">
                    <div className="col-12 d-flex">
                      <div className="ProFi1 addInfo">
                        <h4>Address Information</h4>
                      </div>
                      <button type="button" onClick={handleEditClick2} className="editAddrs">
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="ProFi">
                        <label>Address</label>
                        <br />
                        <input
                          type="text"
                          placeholder="Address"
                          readOnly={readOnly2}
                          ref={addressRef}
                          name="Address"
                          id="Address"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="ProFi">
                        <label>Pincode</label>
                        <br />
                        <input
                          type="number"
                          placeholder="Pincode"
                          readOnly={readOnly2}
                          ref={pincodeRef}
                          name="pinCode"
                          id="pinCode"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="ProFi">
                        <label>City</label>
                        <input
                          type="text"
                          name="city"
                          placeholder="city"
                          disabled={readOnly2}
                          value={cityValue}
                          onChange={(e) => handleCityChange(e)}
                          ref={cityRef}
                        />
                        <br />
                        {/* <select
                          name="city"
                          // value={addressData?.city}
                          disabled={readOnly2}
                          value={cityValue}
                          onChange={(e) => handleCityChange(e)}
                          ref={cityRef}
                        >
                          <option value="">City</option>
                          <option value="Chennai">Chennai</option>
                          <option value="Coimbatore">Coimbatore</option>
                          <option value="Madurai">Madurai</option>
                        </select> */}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="ProFi">
                        <label>State</label>
                        <br />
                        <input
                          type="text"
                          placeholder="State"
                          disabled={readOnly2}
                          value={stateValue}
                          onChange={(e) => handleStateChange(e)}
                          ref={stateRef}
                          name="state"
                        />
                        {/* <select
                          disabled={readOnly2}
                          value={stateValue}
                          onChange={(e) => handleStateChange(e)}
                          ref={stateRef}
                          name="state"
                        >
                          <option value="">State</option>
                          <option value="TamilNadu">TamilNadu</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Lucknow">Lucknow</option>
                        </select> */}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="ProFi">
                        <label>Country</label>
                        <br />

                        <input
                          type="text"
                          placeholder="Country"
                          disabled={readOnly2}
                          value={countryValue}
                          onChange={(e) => handleCountryChange(e)}
                          ref={countryRef}
                          name="country"
                        />
                        {/* <select
                          disabled={readOnly2}
                          value={countryValue}
                          onChange={(e) => handleCountryChange(e)}
                          ref={countryRef}
                          name="country"
                        >
                          <option value="">Country</option>
                          <option value="India">India</option>
                          <option value="US">US</option>
                        </select> */}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="ProFiBtn mt-3">
                        <button
                          type="submit"
                          disabled={readOnly2}
                          className={readOnly2 ? "ProFiBtnBlur" : "ProFiBtn"}
                        >
                          Save
                        </button>
                        <hr />
                      </div>
                    </div>
                  </div>
                </form>

                {/* Academic Info */}
                <form onSubmit={handleSubmit3(academicInfo)}>
                  <div className="row">
                    <div className="col-12 d-flex">
                      <div className="ProFi1 acadInfo">
                        <h4>Academic Information</h4>
                      </div>
                      <button type="button" onClick={handleEditClick3} className="editAcad">
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="row">
                   
                    <div className="col-lg-12  col-sm-12">
                      <div className="ProFi">
                        <label>Name of the College</label>
                        <br />
                        <input
                          type="text"
                          name="collegeName"
                          placeholder="Name of the College"
                          value={collegeValue}
                          onChange={(e) => handleCollegeChange(e)}
                          ref={collegeRef}
                          disabled={readOnly3}
                        />
                      </div>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-lg-6  col-sm-12">
                      <div className="ProFi">
                        <label>Year of the College</label>
                        <br />
                        <select
                          name="yearOfCollege"
                          disabled={readOnly3}
                          value={yearValue}
                          onChange={(e) => handleColYearChange(e)}
                          ref={yearRef}
                        >
                          <option value="">Year</option>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="ProFi">
                        <label>Degree of Stream</label>
                        <br />
                        <input
                          type="text"
                          placeholder="Degree Of Stream"
                          name="degree"
                          disabled={readOnly3}
                          value={acaDegreeValue}
                          onChange={(e) => handleAcaDegreeChange(e)}
                          ref={academicDegreeRef}
                        />
                        {/* <select
                          name="degree"
                          disabled={readOnly3}
                          value={acaDegreeValue}
                          onChange={(e) => handleAcaDegreeChange(e)}
                          ref={academicDegreeRef}
                        >
                          <option value="">Others</option>
                          <option value="B.Pharm">B.Pharm</option>
                          <option value="D.Pharm">D.Pharm</option>
                          <option value="M.Pharm">M.Pharm</option>
                          <option value="M.Pharm">M.Pharm</option>
                        </select> */}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="ProFi">
                        <label>City</label>
                        <br />
                        <input
                          type="text"
                          placeholder="City"
                          readOnly={readOnly3}
                          name="City"
                          id="City"
                          value={acaCityValue}
                          onChange={(e) => handleAcaCityChange(e)}
                          ref={academicCityRef}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="ProFi">
                        <label>Pincode</label>
                        <br />
                        <input
                          type="number"
                          placeholder="Pincode"
                          name="pinCode"
                          id="pinCode"
                          readOnly={readOnly3}
                          value={acaPinValue}
                          onChange={(e) => handleAcaPinChange(e)}
                          ref={academicPincodeRef}
                        />
                      </div>
                    </div>
                    
                  </div>
                  <div className="row">
                 
                   
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="ProFiBtn">
                        <button
                          type="submit"
                          disabled={readOnly3}
                          className={readOnly3 ? "ProFiBtnBlur" : "ProFiBtn"}
                        >
                          Save
                        </button>
                        <hr />
                      </div>
                    </div>
                  </div>
                </form>

                {/* Professional Info */}
                {personalData.userType !== "student" && (
                  <form onSubmit={handleSubmit4(professionalInfo)}>
                    <div className="row">
                      <div className="col-12 d-flex">
                        <div className="ProFi1 profInfo">
                          <h4>Professional Information</h4>
                        </div>
                        <button type="button" onClick={handleEditClick4} className="editProf">
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="ProFi">
                          <label>Name of the Company</label>
                          <br />
                          <input
                            type="text"
                            placeholder="Name of the Company"
                            name="companyName"
                            id="companyName"
                            ref={profNameRef}
                            readOnly={readOnly4}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="ProFi">
                          <label>Degree of Stream</label>
                          <br />

                          <input
                            type="text"
                            placeholder="Degree Of Stream"
                            name="degreeofstream"
                            value={profDegreeValue}
                            onChange={(e) => handleProfDegreeChange(e)}
                            ref={profDegreeRef}
                            disabled={readOnly4}
                          />
                        
                        </div>
                      </div>
                   
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="ProFi">
                          <label>Designation</label>
                          <br />
                          <input
                            type="text"
                            placeholder="Designation"
                            name="designation"
                            id="designation"
                            ref={profDesigRef}
                            readOnly={readOnly4}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="ProFi">
                          <label>Total No of Experience</label>
                          <br />
                          <input
                            type="number"
                            placeholder="Total No of Experience"
                            name="totalExperince"
                            id="totalExperince"
                            ref={profExpRef}
                            readOnly={readOnly4}
                          />
                        </div>
                      </div>
                    </div>
                   
                    <div className="row">
                      <div className="col-6">
                        <div className="ProFi">
                          <label>City</label>
                          <br />
                          <input
                            type="text"
                            placeholder="City"
                            name="city"
                            // id="city"
                            ref={profCityRef}
                            readOnly={readOnly4}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="ProFi">
                          <label>Pincode</label>
                          <br />
                          <input
                            type="number"
                            placeholder="Pincode"
                            name="pinCode"
                            id="pinCode"
                            ref={profPincodeRef}
                            readOnly={readOnly4}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="ProFiBtn">
                          <button
                            type="submit"
                            disabled={readOnly4}
                            className={readOnly4 ? "ProFiBtnBlur" : "ProFiBtn"}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
