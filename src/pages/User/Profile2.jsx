import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { AiFillCamera } from "react-icons/ai";
import Nav from "react-bootstrap/Nav";
import abtGirl from "../../assets/images/abtGirl.png";
import { useForm } from "react-hook-form";
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
} from "../../redux/profile";
import { useDispatch } from "react-redux";
import { loader, isLogin } from "../../redux/common";
import { toast } from "react-toastify";

const Profile = () => {
  let dispatch = useDispatch();
  let [refresher, setRefresher] = useState(true);
  const [validationMode, setValidationMode] = useState(true);

  const [fullName, setFullName] = useState("");
  let firstNameRef = useRef();

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

          console.log("OBJECT", OBJECT.fullName);

          // firstNameRef.current.value = OBJECT.fullName;

          // console.log("firstNameRef.current.value", firstNameRef.current.value);
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

  const pesonalInfo = (data) => {
    console.log("data", data);

    dispatch(loader(true));
    dispatch(
      userPersonalInfo(data, (resp) => {
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
          setRefresher(!refresher);
        } else {
          dispatch(loader(false));
          toast.error(resp.message);
        }
      })
    );
  };
  const addressInfo = (data) => {
    console.log("data", data);
    const pinCodeValue = data.pinCode;
    const newData = { ...data, pinCode: parseInt(pinCodeValue) };
    dispatch(loader(true));
    dispatch(
      userAddressInfo(newData, (resp) => {
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

  const academicInfo = (data) => {
    console.log("data", data);
    const pinCodeValue = data.pinCode;
    const newData = { ...data, pinCode: parseInt(pinCodeValue) };
    dispatch(loader(true));
    dispatch(
      userAcademicInfo(newData, (resp) => {
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

  const professionalInfo = (data) => {
    console.log("data", data);
    const pinCodeValue = data.pinCode;
    const newData = { ...data, pinCode: parseInt(pinCodeValue) };
    dispatch(loader(true));
    dispatch(
      userProfessionalInfo(newData, (resp) => {
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
                    <Link to="/">Log Out</Link>
                  </Nav.Link>
                </Nav>
              </div>
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12">
              <div className="ProFileForM">
                {/* <form> */}
                <form onSubmit={handleSubmit(pesonalInfo)}>
                  <div className="row">
                    <div className="col-12">
                      <div className="ProFi1">
                        {/* <input type="file" id="imgupload" style={"display:none"}/>  */}
                        <i>
                          <AiFillCamera />
                        </i>
                        <img src={abtGirl} className="img-fluid border" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="ProFi1">
                        <h4>Personal Information</h4>
                      </div>
                    </div>
                    <div className="col-12 d-flex">
                      <div className="ProFi1">
                        <input
                          type="radio"
                          value="Student"
                          checked={personalData?.userType === "Student"}
                          readOnly={readOnly}
                          {...register("userType", {
                            required: "Please select your UserType",
                          })}
                        />
                        <label>Student</label>

                        <input
                          type="radio"
                          disabled={readOnly}
                          value="Working Professional"
                          checked={
                            personalData?.userType === "Working Professional"
                          }
                          readOnly={readOnly}
                          {...register("userType", {
                            required: "Please select your userType",
                          })}
                        />
                        <label>Working Professional</label>
                        {errors.userType && (
                          <small style={{ color: "red" }}>
                            {errors.userType.message}
                          </small>
                        )}
                      </div>
                      <button type="button" onClick={handleEditClick}>
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="ProFi">
                        <label>Name</label>
                        <br />
                        {personalData?.fullName ? (
                          <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            id="name"
                            readOnly={readOnly}
                            // ref={firstNameRef}
                            value={personalData?.fullName}
                            // value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            {...register("fullName")}
                          />
                        ) : (
                          <>
                            <input
                              type="text"
                              placeholder="Name"
                              // defaultValue={personalData?.fullName}

                              readOnly={readOnly}
                              name="name"
                              id="name"
                              {...register("fullName", {
                                required: "Name is required",
                              })}
                            />
                            {errors.fullName && (
                              <small style={{ color: "red", float: "left" }}>
                                {errors.fullName.message}
                              </small>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* {personalData?.fullName ? (
                        
                        ) : ()} */}

                  <div className="row">
                    <div className="col-6">
                      <div className="ProFi">
                        <label>Email Address</label>
                        <br />
                        {personalData?.email ? (
                          <input
                            type="text"
                            value={personalData?.email}
                            placeholder="Email Address"
                            readOnly={readOnly}
                            name="email"
                            id="email"
                            {...register("email", {})}
                          />
                        ) : (
                          <>
                            <input
                              type="text"
                              // defaultValue={personalData?.email}
                              placeholder="Email Address"
                              readOnly={readOnly}
                              name="email"
                              id="email"
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email format",
                                },
                              })}
                            />
                            {errors.email && (
                              <small style={{ color: "red", float: "left" }}>
                                {errors.email.message}
                              </small>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="ProFi">
                        <label>Mobile Number</label>
                        <br />
                        {personalData?.phoneNumber ? (
                          <input
                            type="number"
                            value={personalData?.phoneNumber}
                            placeholder="Mobile Number"
                            readOnly={readOnly}
                            name="mobilenumber"
                            id="mobilenumber"
                            {...register("phoneNumber", {})}
                          />
                        ) : (
                          <>
                            <input
                              type="number"
                              // defaultValue={personalData?.phoneNumber}
                              placeholder="Mobile Number"
                              readOnly={readOnly}
                              name="mobilenumber"
                              id="mobilenumber"
                              {...register("phoneNumber", {
                                required: "Mobilenumber is required",
                                pattern: {
                                  value: /^[0-9]{10}$/,
                                  message: "please enter 10 Digit ",
                                },
                              })}
                            />
                            {errors.phoneNumber && (
                              <small style={{ color: "red", float: "left" }}>
                                {errors.phoneNumber.message}
                              </small>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="ProFiBtn">
                        <button type="submit" disabled={readOnly}>
                          Save
                        </button>
                        <hr />
                      </div>
                    </div>
                  </div>
                </form>
                {/* {personalData?.fullName ? (
                          <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            id="name"
                            defaultValue={personalData?.fullName}
                          />
                        ) : (
                          <>
                            <input
                              type="text"
                              placeholder="Name"
                              defaultValue={personalData?.fullName}
                              readOnly={readOnly}
                              name="name"
                              id="name"
                              {...register("fullName", {
                                required: "Name is required",
                              })}
                            />
                            {errors.fullName && (
                              <small style={{ color: "red", float: "left" }}>
                                {errors.fullName.message}
                              </small>
                            )}
                          </>
                        )} */}

                {/* Password Info */}
                <form onSubmit={handleSubmit1(passwordInfo)}>
                  <div className="row">
                    <div className="col-12 d-flex">
                      <div className="ProFi1">
                        <h4>Password Information</h4>
                      </div>
                      <button type="button" onClick={handleEditClick1}>
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
                        <button type="submit" disabled={readOnly1}>
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
                      <div className="ProFi1">
                        <h4>Address Information</h4>
                      </div>
                      <button type="button" onClick={handleEditClick2}>
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
                          defaultValue={addressData?.addressLine}
                          name="Address"
                          id="Address"
                          {...register2("addressLine", {
                            required: "Address is required",
                          })}
                        />
                        {errors2.addressLine && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors2.addressLine.message}
                          </small>
                        )}
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
                          defaultValue={addressData?.pinCode}
                          name="pinCode"
                          id="pinCode"
                          {...register2("pinCode", {
                            required: "PinCode is required",
                          })}
                        />
                        {errors2.pinCode && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors2.pinCode.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="ProFi">
                        <label>City</label>
                        <br />
                        <select
                          name="city"
                          value={addressData?.city}
                          {...register2("city", {
                            required: "City is required",
                          })}
                          disabled={readOnly2}
                        >
                          <option value="">City</option>
                          <option value="Chennai">Chennai</option>
                          <option value="Coimbatore">Coimbatore</option>
                          <option value="Madurai">Madurai</option>
                        </select>
                        {errors2.city && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors2.city.message}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="ProFi">
                        <label>State</label>
                        <br />
                        <select
                          disabled={readOnly2}
                          value={addressData?.state}
                          name="state"
                          {...register2("state", {
                            required: "State is required",
                          })}
                        >
                          <option value="">State</option>
                          <option value="TamilNadu">TamilNadu</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Lucknow">Lucknow</option>
                        </select>
                        {errors2.state && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors2.state.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="ProFi">
                        <label>Country</label>
                        <br />
                        <select
                          disabled={readOnly2}
                          value={addressData?.country}
                          name="country"
                          {...register2("country", {
                            required: "Country is required",
                          })}
                        >
                          <option value="">Country</option>
                          <option value="India">India</option>
                          <option value="US">US</option>
                        </select>
                        {errors2.country && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors2.country.message}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="ProFiBtn mt-3">
                        <button type="submit" disabled={readOnly2}>
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
                      <div className="ProFi1">
                        <h4>Academic Information</h4>
                      </div>
                      <button type="button" onClick={handleEditClick3}>
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="ProFi">
                        <label>Name of the College</label>
                        <br />
                        <select
                          name="collegeName"
                          value={academicData?.collegeName}
                          {...register3("collegeName", {
                            required: "CollegeName is required",
                          })}
                          disabled={readOnly3}
                        >
                          <option value="">Others</option>
                          <option value="c1">C1</option>
                          <option value="c2">C2</option>
                          <option value="c3">C3</option>
                        </select>
                        {errors3.collegeName && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors3.collegeName.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="ProFi ProFipadd">
                        {/* <label>Address</label>
                        <br /> */}
                        <input
                          type="text"
                          readOnly={readOnly3}
                          // name="Address"
                          // id="Address"
                          // {...register3("Address", {
                          //   required: "Address is required",
                          // })}
                        />
                        {/* {errors3.Address && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors3.Address.message}
                          </small>
                        )} */}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="ProFi">
                        <label>Year of the College</label>
                        <br />
                        <select
                          value={academicData?.yearOfCollege}
                          name="yearOfCollege"
                          {...register3("yearOfCollege", {
                            required: "Year is required",
                          })}
                          disabled={readOnly3}
                        >
                          <option value="">Year</option>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                        </select>
                        {errors3.yearOfCollege && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors3.yearOfCollege.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="ProFi">
                        <label>City</label>
                        <br />
                        <input
                          type="text"
                          placeholder="City"
                          readOnly={readOnly3}
                          value={academicData?.city}
                          name="City"
                          id="City"
                          {...register3("city", {
                            required: "City is required",
                          })}
                        />
                        {errors3.city && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors3.city.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="ProFi">
                        <label>Pincode</label>
                        <br />
                        <input
                          type="number"
                          placeholder="Pincode"
                          name="pinCode"
                          id="pinCode"
                          value={academicData?.pinCode}
                          readOnly={readOnly3}
                          {...register3("pinCode", {
                            required: "PinCode is required",
                          })}
                        />
                        {errors3.pinCode && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors3.pinCode.message}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="ProFi">
                        <label>Degree of Stream</label>
                        <br />
                        <select
                          name="degree"
                          value={academicData?.degreeOfStream}
                          disabled={readOnly3}
                          {...register3("degreeOfStream", {
                            required: "DegreeOfStream is required",
                          })}
                        >
                          <option value="">Others</option>
                          <option value="B.Pharm">B.Pharm</option>
                          <option value="D.Pharm">D.Pharm</option>
                          <option value="M.Pharm">M.Pharm</option>
                          <option value="M.Pharm">M.Pharm</option>
                        </select>
                        {errors3.degreeOfStream && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors3.degreeOfStream.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="ProFi ProFipadd">
                        {/* <label>Pincode</label>
                        <br /> */}
                        <input
                          type="text"
                          readOnly={readOnly3}
                          // placeholder="Pincode"
                          // name="pinCode"
                          // id="pinCode"
                          // {...register3("pinCode", {
                          //   required: "PinCode is required",
                          // })}
                        />
                        {/* {errors3.pinCode && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors3.pinCode.message}
                          </small>
                        )} */}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="ProFiBtn">
                        <button type="submit" disabled={readOnly3}>
                          Save
                        </button>
                        <hr />
                      </div>
                    </div>
                  </div>
                </form>

                {/* Professional Info */}
                <form onSubmit={handleSubmit4(professionalInfo)}>
                  <div className="row">
                    <div className="col-12 d-flex">
                      <div className="ProFi1">
                        <h4>Professional Information</h4>
                      </div>
                      <button type="button" onClick={handleEditClick4}>
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
                          value={professionalData?.companyName}
                          readOnly={readOnly4}
                          {...register4("companyName", {
                            required: "CompanyName is required",
                          })}
                        />
                        {errors4.companyName && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors4.companyName.message}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="ProFi">
                        <label>Designation</label>
                        <br />
                        <input
                          type="text"
                          placeholder="Designation"
                          name="designation"
                          id="designation"
                          value={professionalData?.designation}
                          readOnly={readOnly4}
                          {...register4("designation", {
                            required: "Designation is required",
                          })}
                        />
                        {errors4.designation && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors4.designation.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="ProFi">
                        <label>Total No of Experience</label>
                        <br />
                        <input
                          type="number"
                          placeholder="Total No of Experience"
                          name="totalExperince"
                          id="totalExperince"
                          value={professionalData?.totalExperince}
                          readOnly={readOnly4}
                          {...register4("totalExperince", {
                            required: "TotalExperince is required",
                          })}
                        />
                        {errors4.totalExperince && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors4.totalExperince.message}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="ProFi">
                        <label>Degree of Stream</label>
                        <br />
                        <select
                          name="degreeofstream"
                          value={professionalData?.degreeOfStream}
                          disabled={readOnly4}
                          {...register4("degreeOfStream", {
                            required: "Degree Of Stream is required",
                          })}
                        >
                          <option value="">Others</option>
                          <option value="B.Pharm">B.Pharm</option>
                          <option value="D.Pharm">D.Pharm</option>
                          <option value="M.Pharm">M.Pharm</option>
                          <option value="M.Pharm">M.Pharm</option>
                        </select>
                        {errors4.degreeOfStream && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors4.degreeOfStream.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-6 pt-4">
                      <div className="ProFi">
                        <label></label>
                        <br />
                        <input type="text" placeholder="" />
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
                          id="city"
                          value={professionalData?.city}
                          readOnly={readOnly4}
                          {...register4("city", {
                            required: "City is required",
                          })}
                        />
                        {errors4.city && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors4.city.message}
                          </small>
                        )}
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
                          value={professionalData?.pinCode}
                          readOnly={readOnly4}
                          {...register4("pinCode", {
                            required: "PinCode is required",
                          })}
                        />
                        {errors4.pinCode && (
                          <small style={{ color: "red", float: "left" }}>
                            {errors4.pinCode.message}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="ProFiBtn">
                        <button type="submit" disabled={readOnly4}>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
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
