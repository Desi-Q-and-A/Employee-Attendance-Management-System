import { useState, useEffect, useRef } from "react";
import Logo from "../../assets/images/logo.png";
import { MdCall } from "react-icons/md";
import { GrMail } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagramSquare,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import InputGroup from "react-bootstrap/InputGroup";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineUnlock,
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible
} from "react-icons/ai";
import Form from "react-bootstrap/Form";
import { Button, Modal,  ModalBody } from "reactstrap";
import Signin from "../../assets/images/signinimg.png";
import Forgotpass from "../../assets/images/forgotpass.png";
import { Link } from "react-router-dom";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Modal as MD } from 'react-bootstrap';
import popup from "../../assets/images/popup.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loader, isLogin } from "../../redux/common";
import { firstSignUp, secSignUp } from "../../redux/user";
import {
  userLoginCb,
  userForgotPassCb,
  userForgotPassSecCb,
  
} from "../../redux/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Header = () => {
  const [selectedNotificationIndex, setSelectedNotificationIndex] = useState(null);
console.log("selectedNotificationIndex", selectedNotificationIndex)
  const cartCountval = useSelector((state) => state.apiReducer.cartCount);

  const dispatch = useDispatch();

  //   dispatch(loader(true))
  const [lgShow, setLgShow] = useState(false);
  const [reason, setReason] = useState([]);

  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const [cnfrmpasswordVisible, setcnfrmPasswordVisible] = useState(false);

  const [forPassTok, setForPassTok] = useState();

  const togglecnfrmPasswordVisibility = () => {
    setcnfrmPasswordVisible((prevState) => !prevState);
  };

  const [pop1, setPop1] = useState(false);
  const [modalforgotpass, setModalforgotpass] = useState(false);
  const toggleforgotpass = () => setModalforgotpass(!modalforgotpass);
  const [mobile, setMobile] = useState(false);
  const [showcontent, setShowcontent] = useState(0);
  const [courseList, setCourseList] = useState([]);
  const [notification, setNotification] = useState([]);
  const [showcontentForgot, setShowcontentForgot] = useState(0);
  const [cartCount, setCartCount] = useState({});

  const [inputValue, setInputValue] = useState();

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [show, setShow] = useState(false);


  const [open, setOpen] = useState(false);
  const [opensearch, setOpenSearch] = useState(false);

  const menuRef = useRef(null);

  const inputRef = useRef(null);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setInputValue('')
      setOpenSearch(false);
    }else if 
    (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
  }
  };

  window.addEventListener('click', (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)  ) {
     setOpen(false);
     console.log("anything")
     // setOpenSearch(false);
    }
  })

  const handleClose = () => {
    setShowModal(false);
    setCourseList([]);
  }
  const handleClose2 = () => {
    setShowModal1(false);
    setCourseList([]);
  }
  const handleShow = () => {
    // listNotifications()
    setShowModal(true);

  }
  const isLoginStatus = useSelector((state) => state.apiReducer.isLogin);



  // Model sign up
  const [modal, setModal] = useState(false);
 

  const toggle = () => setModal(!modal);
 






  const handleCourseClick = (item) => {
    // Redirect to the course detail page with the courseId

    navigate(`/course-detail/${item._id}/${item.title.replace(/ /g, '_')}`);
  };



  useEffect(() => {
    let data = {}

    if (
      localStorage.getItem("isLogin") == null ||
      localStorage.getItem("isLogin") == false
    ) {
      dispatch(isLogin(false));
    } else {
      dispatch(isLogin(true));
    }

    dispatch(loader(true));
    
    if (
      localStorage.getItem("isLogin") == null ||
      localStorage.getItem("isLogin") == false
    ) {
      dispatch(isLogin(false));
    } else {
      dispatch(isLogin(true));
    }



  }, [cartCountval, isLoginStatus, notification]);


  const [modalsignin, setModalsignin] = useState(false);
  const [nestedModalsignin, setNestedModalsignin] = useState(false);
  const [closeAllsignin, setCloseAllsignin] = useState(false);

  const firstNxtRegData = useSelector((state) => state.userReducer.firstSignUp);
  const secNxtRegData = useSelector((state) => state.userReducer.secSignUp);

  const firstForPassData = useSelector(
    (state) => state.userReducer.firstForgPass
  );

  const togglesignin = () => setModalsignin(!modalsignin);

  const toggleNestedsignin = () => {
    setNestedModalsignin(!nestedModalsignin);
    setCloseAllsignin(false);
  };
  const toggleAllsignin = () => {
    setNestedModalsignin(!nestedModalsignin);
    setCloseAllsignin(true);
  };

  // modal sign in end

  const {
    register: register2,
    formState: { errors: errors2 },
    reset: reset,
    handleSubmit: handleSubmit2,
  } = useForm({ mode: "onBlur" });
  const {
    register: register3,
    formState: { errors: errors3 },
    reset: reset3,
    handleSubmit: handleSubmit3,
  } = useForm({ mode: "onBlur" });
  const {
    register: register4,
    formState: { errors: errors4 },
    reset: reset4,
    handleSubmit: handleSubmit4,
  } = useForm({ mode: "onBlur" });

  const {
    register: register5,
    formState: { errors: errors5 },
    reset: reset5,
    handleSubmit: handleSubmit5,
  } = useForm({ mode: "onBlur" });
  const {
    register: register6,
    formState: { errors: errors6 },
    reset: reset6,
    handleSubmit: handleSubmit6,
  } = useForm({ mode: "onBlur" });
  const {
    register: register7,
    formState: { errors: errors7 },
    reset: reset7,
    handleSubmit: handleSubmit7,
  } = useForm({ mode: "onBlur" });
  const {
    register: register8,
    formState: { errors: errors8 },
    reset: reset8,
    handleSubmit: handleSubmit8,
  } = useForm({ mode: "onBlur" });


  const firstNxtReg = (data) => {
    dispatch(firstSignUp(data));
    setShowcontent(1);
  };
  const secondNxtReg = (data) => {
    dispatch(secSignUp(data));
    setShowcontent(2);
  };
  

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
          togglesignin();
          reset5();
        } else {
          toast.error(result.message);
        }
      })
    );
  };

  const firstForPass = (data) => {
    // dispatch(firstForgPass(data))
    dispatch(
      userForgotPassCb(data, (result) => {
        dispatch(loader(false));
        if (result.status) {
          setShowcontentForgot(1);
          setForPassTok(result.token);
        } else {
          toast.error(result.message);
          setShowcontentForgot(0);
        }
      })
    );
  };
  const secForPas = (data) => {
    dispatch(loader(true));
    var reqData = { token: forPassTok, ...data };
    dispatch(
      userForgotPassSecCb(reqData, (result) => {
        dispatch(loader(false));
        if (result.status) {
          toast.success(result.message);
          toggleforgotpass();
        } else {
          toast.error(result.message);
          setShowcontentForgot(0);
        }
      })
    );
  };
  const formatDate = (timestamp) => {
    const currentDate = new Date();
    const createdAtDate = new Date(timestamp);
    const timeDifference = currentDate - createdAtDate;

    // Convert time difference to seconds
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
      return `${seconds}s ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };


  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}${period}`;
  };

  const formatDateWithTime = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const time = formatTime(date);

    return `${day}/${month}/${year} ${time}`;
  };


  return (
    <div className="hEAD">
      <div className="header">
        <div className="container">
          <div className="hTOp">
            <div className="row">
              <div className="col-lg-2 col-md-6 col-sm-3">
                <div className="Logo">
                  <Link to="/">
                    <img src={Logo} alt="" className="img-fluid" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-2 CallHaed">
                <div className="HeADcaLL d-flex">
                  <div className="CallIcon">
                    <i>
                      {" "}
                      <MdCall />{" "}
                    </i>
                  </div>
                  <div className="CallNUmber">
                    <p>Call Us</p>
                    <a href="tel:+919004214077">+91 90042 14077</a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-3 col-sm-3">
                <div class="input-group" ref={inputRef}>
                  <input
                    type="text"
                    class="form-control search"
                    placeholder="Search"
                    value={inputValue}
                   

                  />

                  <button
                    class="btn btn-outline-secondary"
                    type="button"

                  >
                    <FiSearch />
                  </button>
                  <div >
                    {opensearch && (
                      <div className="modalsearch">

                        {courseList.map((item, index) => (
                          <div
                            key={item._id}
                            className="modalcon"
                            onClick={() => handleCourseClick(item)}
                           

                          >
                            <img src={item.thumbnail} alt="Course Thumbnail" className='searchThumbnail'
                              style={{
                                width: '72px',
                                height: 'auto',
                                margin: '10px'
                              }} />
                            <div className="edutitle">
                              <span style={{
                                fontWeight: '700',

                              }}>{item.title}</span>
                              <span style={{
                                fontWeight: 'inherit',

                              }}>{item.educators}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-3 col-sm-6">
                <div className="d-flex float-end">
                  {isLoginStatus ? (
                    <>
                      <div className="hEAderIcons d-flex">
                    
                        <div className="Icons">
                          <a class="notification">
                            <span>
                              <IoMdNotificationsOutline />
                            </span>
                            <span class="badge">
                              {cartCount.notifications}
                            </span>
                          </a>
                        </div>

                        {open && (
                       <div ref={menuRef} className="modalnotfr"  >
                        <div className="nothead">
                          Notifications  
                          <span className="notification-badge">{cartCount.notifications}</span></div>
                        {notification.map((item, index) => (
                          <div
                            key={item._id}
                            className={`notification-item ${selectedNotificationIndex === index ? 'active' : ''}`}
                            
                          
                          >
                            <div className={`notmsg ${selectedNotificationIndex === index ? 'selected-message' : ''}`}  ><p >{item.message}   <span className="nottime">{formatDate(item.createdAt)}</span></p> </div>
                        
                            {/* <div className="notifyhr"></div> */}
                          </div>
                        ))}
                      </div>
                    )}

                        <div className="Icons ml-2">
                          <Link to="/wishlist" class="notification">
                            <span>
                              <AiOutlineHeart />
                            </span>
                            <span class="badge">
                              {cartCount.itemsInWishlist}
                            </span>
                          </Link>
                        </div>
                        <div className="Icons ml-2">
                          <Link to="/cart" class="notification">
                            <span>
                              <AiOutlineShoppingCart />
                            </span>
                            <span class="badge">{cartCount.itemsInCart}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="SignUpBtn">
                        <button
                          className="BTNtopHead"
                          onClick={() => {
                            navigate("/dashboard");
                          }}
                        >
                          <i>
                            <AiOutlineUser />
                          </i>
                          <div className='signinbtn'>{cartCount.fullName}</div>

                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="hEAderIcons d-flex">
                        {/* <div className="Icons" >
                          <a
                            class="notification"
                            onClick={() => {
                              toast.error("Please Login to proceed");
                            }}
                          >
                            <span>
                              <IoMdNotificationsOutline />
                            </span>
                            <span class="badge">0</span>
                          </a>
                        </div> */}
                        <div className="Icons ml-2">
                          <a
                            class="notification"
                            onClick={() => {
                              toast.error("Please Login to proceed");
                            }}
                          >
                            <span>
                              <AiOutlineHeart />
                            </span>
                            <span class="badge">0</span>
                          </a>
                        </div>
                        <div className="Icons ml-2">
                          <a
                            class="notification"
                            onClick={() => {
                              toast.error("Please Login to proceed");
                            }}
                          >
                            <span>
                              <AiOutlineShoppingCart />
                            </span>
                            <span class="badge">0</span>
                          </a>
                        </div>
                      </div>
                      {/* <div className="SignUpBtn">
                        <button
                          href="#"
                          className="BTNtopHead"
                          onClick={() => {
                            setShowcontent(0);
                            togglesignin();
                          }}
                        >
                          <i>
                            <AiOutlineUser />
                          </i>{" "}
                          Sign In /Sign Up
                        </button>
                      </div> */}
                      <div className="SignUpBtn">


                        <button
                          href="#"
                          className="BTNtopHead"
                          onClick={() => {
                            setShowcontent(0);
                            togglesignin();
                          }}
                        >
                          <i>
                            <AiOutlineUser />
                          </i>{" "}
                          <div className='signinbtn'>   Sign In / Sign Up</div>

                        </button>

                      </div>


                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="MEnu">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="menu">
                <ul
                  className={
                    mobile ? "mobile-lIstmeNu" : "justify-content-center d-flex"
                  }
                  onClick={() => setMobile(false)}
                >
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li className="dropdown">
                    <Link to="/course">Course</Link>


                    <ul className="dropdown-content">
                      
                    </ul>

                  </li>
                  <li>
                    <Link to="">Live Programs</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blogs</Link>
                  </li>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/educator">Join as Educator</Link>
                  </li>
                  <div className="socialMEDia">
                    <li>
                      <Link to="https://www.facebook.com/kareersity">
                        <FaFacebookF />
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <FaLinkedinIn />
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <FaInstagramSquare />
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <FaTwitter />
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <FaYoutube />
                      </Link>
                    </li>
                  </div>
                </ul>
                <button
                  className="mobile-menu"
                  onClick={() => setMobile(!mobile)}
                >
                  {mobile ? <AiOutlineClose /> : <GiHamburgerMenu />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals sign up*/}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <div className="PopUppage d-flex">
            <div className="popImg">
              <img src={popup} className="img-fluid" />
            </div>
            <div className="PopConteNt">
              <div className="LogO">
                <img src={Logo} alt="" className="img-fluid" />
              </div>

              {showcontent == 0 ? (
                <form onSubmit={handleSubmit2(firstNxtReg)}>
                  <div className="POPrigh pt-2">
                    <h2>Sign Up</h2>
                    <p>Welcome please enter your details</p>
                    <div className="justify-content-center">
                      <input
                        type="radio"
                        value="student"
                        name="userType"
                        {...register2("userType", {
                          required: "select profession",
                        })}
                      />
                      <label>Student</label>
                      <input
                        type="radio"
                        value="workingProfessional"
                        name="userType"
                        {...register2("userType", {
                          required: "select profession",
                        })}
                      />
                      <label>Working Professional</label>
                      <br />
                      {errors2.userType && (
                        <small style={{ color: "red", marginTop: "-14px" }}>
                          {errors2.userType.message}
                        </small>
                      )}
                    </div>

                    <InputGroup className="mb-3 mt-3 input-group signinmod">
                      <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="fullName"
                        id="fullName"
                        {...register2("fullName", {
                          required: "Username is required",
                         
                            pattern: {
                              value: /^[A-Za-z\s]+$/, // Accepts letters and spaces
                              message: "Invalid format. User name accepts only characters and spaces",
                            
                           
                          },
                        })}
                      />
                      <InputGroup.Text id="basic-addon1">
                        <AiOutlineUser />
                      </InputGroup.Text>
                    </InputGroup>
                    {errors2.fullName && (
                      <small
                        style={{
                          color: "red",
                          float: "left",
                          marginTop: "-14px",
                        }}
                      >
                        {errors2.fullName.message}
                      </small>
                    )}
                    <InputGroup className="mb-3 mt-3 input-group signinmod">
                      <Form.Control
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        name="email"
                        id="email"
                        {...register2("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
                            message: "Invalid Format",
                          },
                        })}
                      />
                      <InputGroup.Text id="basic-addon1">
                        <GrMail />
                      </InputGroup.Text>
                    </InputGroup>
                    {errors2.email && (
                      <small
                        style={{
                          color: "red",
                          float: "left",
                          marginTop: "-14px",
                        }}
                      >
                        {errors2.email.message}
                      </small>
                    )}
                    <InputGroup className="mb-3 mt-3 input-group signinmod">
                      <Form.Control
                        placeholder="Mobile Number"
                        aria-label="Mobile Number"
                        aria-describedby="basic-addon1"
                        name="phoneNumber"
                        id="phoneNumber"
                        {...register2("phoneNumber", {
                          required: "Mobile Number is required",
                          pattern: {
                            value:
                              /^(?:\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
                            message:
                              "Invalid Format.Please enter 10 digit Mobile number",
                          },
                        })}
                      />
                      <InputGroup.Text id="basic-addon1">
                        <MdCall />
                      </InputGroup.Text>
                    </InputGroup>
                    {errors2.phoneNumber && (
                      <small
                        style={{
                          color: "red",
                          float: "left",
                          marginTop: "-14px",
                        }}
                      >
                        {errors2.phoneNumber.message}
                      </small>
                    )}
                    <button color="success" type="submit">
                      {" "}
                      Next{" "}
                    </button>

                    <div className="pt-5 SUbLow">
                      <p>
                        Already have an account yet?{" "}
                        <Link
                          onClick={() => {
                            togglesignin();
                            toggle();
                          }}
                        >
                          SIGN IN
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              ) : showcontent == 1 ? (
                <form key={1} onSubmit={handleSubmit3(secondNxtReg)}>
                  <div className="POPrigh OnE pt-2">
                    <h2>Reason for Sign Up</h2>
                    <p>Welcome please enter your details</p>
                    <div className="PopCheCkBOX optionss">
                      {reason?.map((item) => {
                        return (
                          <>
                            <input
                              type="radio"
                              name="reasonId"
                              value={item?._id}
                              {...register3("reasonId", {
                                required: "select reason",
                              })}
                            />
                            <label>{item?.reason}</label>
                            <br />
                          </>
                        );
                      })}
                    </div>
                    {errors3.reasonId && (
                      <small style={{ color: "red", marginTop: "-14px" }}>
                        {errors3.reasonId.message}
                      </small>
                    )}

                    <button type="submit">NEXT</button>
                    <div className="pt-5 SUbLow">
                      <p>
                        Already have an account yet?{" "}
                        <Link
                          onClick={() => {
                            toggle();
                            togglesignin();
                          }}
                        >
                          SIGN IN
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              ) : showcontent == 2 ? (
                <form key={2} >
                  <div className="POPrigh pt-2">
                    <h2>Password for Sign Up</h2>
                    <p>Welcome please enter your details</p>
                    <InputGroup className="mb-3 mt-3 input-group signinmod" >
                      <Form.Control
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                        aria-label="password"
                        aria-describedby="basic-addon1"
                        name="password"
                        id="inputpassword"
                        {...register4("password", {
                          required: "password is required",
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
                            message:
                              "Password Must contain 8 characters,one digit,one lowercase letter,one uppercase letter,one special character",
                          },
                        })}

                      />

                      <InputGroup.Text
                        id="basic-addon1"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      >
                        {passwordVisible ? (
                          <AiOutlineEye />
                        ) : (
                          <AiOutlineEyeInvisible />
                        )}
                      </InputGroup.Text>
                      <InputGroup.Text
                        id="basic-addon1"
                      >
                        <AiOutlineLock />
                      </InputGroup.Text>
                    </InputGroup>


                    {errors4.password && (
                      <small style={{ color: "red", float: "left" }}>
                        {errors4.password.message}
                      </small>
                    )}
                    <InputGroup className="mb-3 mt-3 input-group signinmod">
                      <Form.Control
                        type={cnfrmpasswordVisible ? "text" : "password"}
                        placeholder="Confirm Password"
                        aria-label="cnfrmpassword"
                        aria-describedby="basic-addon1"
                        name="confirmPassword"
                        id="confirmPassword"
                        {...register4("confirmPassword", {
                          required: "confirmPassword is required",
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
                            message:
                              "Password Must contain 8 characters,one digit,one lowercase letter,one uppercase letter,one special character",
                          },
                        })}
                      />
                      <InputGroup.Text
                        id="basic-addon1"
                        onClick={togglecnfrmPasswordVisibility}
                        style={{ cursor: "pointer" }}
                      >
                        {cnfrmpasswordVisible ? (
                          <AiOutlineEye />
                        ) : (
                          <AiOutlineEyeInvisible />
                        )}
                      </InputGroup.Text>
                      <InputGroup.Text
                        id="basic-addon1"
                      >
                        <AiOutlineLock />
                      </InputGroup.Text>
                    </InputGroup>
                    {errors4.confirmPassword && (
                      <small style={{ color: "red", float: "left" }}>
                        {errors4.confirmPassword.message}
                      </small>
                    )}
                    {/* <Button color="success" className='mt-5' >
                                                Sign up
                                            </Button> */}
                    <button color="success" type="submit" className="mt-5">
                      {" "}
                      Sign up{" "}
                    </button>
                    <div className="pt-5 SUbLow">
                      <p>
                        Already have an account yet?{" "}
                        <Link
                          onClick={() => {
                            togglesignin();
                            toggle();
                          }}
                        >
                          SIGN IN
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              ) : null}
            </div>
          </div>
          <br />
        </ModalBody>
      </Modal>
      {/* modal sign up end */}

      {/* modal for signin */}
      <Modal isOpen={modalsignin} toggle={togglesignin}>
        <ModalBody>
          <div className="PopUppage d-flex">
            <div className="PopConteNt">
              <div className="LogO">
                <img src={Logo} alt="" className="img-fluid" />
              </div>
              <form onSubmit={handleSubmit5(signInFn)}>
                <div className="POPrigh pt-2 ">
                  <h2>Sign In</h2>
                  <p>Welcome back please enter your details</p>
                  <InputGroup className="mb-3 mt-3 input-group signinmod">
                    <Form.Control
                      placeholder="Email"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      name="email"
                      id="inputEmail"
                      {...register5("email", { required: "Email is required" })}
                    />
                    <InputGroup.Text id="basic-addon1">
                      <GrMail />
                    </InputGroup.Text>
                  </InputGroup>
                  {errors5.email && (
                    <small style={{ color: "red", float: "left" }}>
                      {errors5.email.message}
                    </small>
                  )}
                  <InputGroup className="mb-3 mt-3 input-group signinmod">
                    <Form.Control
                      placeholder="Password"
                      aria-label="password"
                      aria-describedby="basic-addon1"
                      name="password"
                      id="inputpassword"
                      type={passwordVisible ? "text" : "password"}
                      {...register5("password", {
                        required: "password is required",
                      })}
                    />
                    <InputGroup.Text
                      id="basic-addon1"
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      {passwordVisible ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </InputGroup.Text>
                    <InputGroup.Text
                      id="basic-addon1"
                    >
                      <AiOutlineLock />
                    </InputGroup.Text>
                  </InputGroup>
                  {errors5.password && (
                    <small style={{ color: "red", float: "left" }}>
                      {errors5.password.message}
                    </small>
                  )}
                  <div className="d-flex signup">
                    {/* <input type="radio" /> */}
                    {/* <label >Remember Me</label> */}
                    <div className="Fpas">
                      <Link
                        onClick={() => {
                          togglesignin();
                          toggleforgotpass();
                          setShowcontentForgot(0);
                        }}
                      >
                        Forgot Password
                      </Link>
                    </div>
                  </div>
                  <button color="success" className="mt-5" type="submit">
                    Sign In
                  </button>
                  <div className="pt-5 SUbLow">
                    <p>
                      Don't have an account yet?{" "}
                      <Link
                        onClick={() => {
                          togglesignin();
                          toggle();
                          setShowcontent(0);
                        }}
                      >
                        SIGN UP
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <div className="popImg">
              <img src={Signin} className="img-fluid" />
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* end modal for sign in */}

      {/* forgot password */}

      <Modal isOpen={modalforgotpass} toggle={toggleforgotpass}>
        <ModalBody>
          <div className="PopUppage d-flex">
            <div className="PopConteNt">
              <div className="LogO">
                <img src={Logo} alt="" className="img-fluid" />
              </div>

              {showcontentForgot == 0 ? (
                <form onSubmit={handleSubmit6(firstForPass)}>
                  <div className="POPrigh pt-2">
                    <h2>Forgot Password</h2>
                    <p>Enter your email address to reset password</p>

                    <InputGroup className="mb-3 mt-3 input-group signinmod">
                      <Form.Control
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        name="email"
                        id="email"
                        {...register6("email", {
                          required: "email is required",
                        })}
                      />
                      <InputGroup.Text id="basic-addon1">
                        <GrMail />
                      </InputGroup.Text>
                    </InputGroup>
                    {errors6.email && (
                      <small style={{ color: "red", float: "left" }}>
                        {errors6.email.message}
                      </small>
                    )}
                    <Button color="success" type="submit">
                      Next
                    </Button>
                    <div className="pt-5 SUbLow">
                      <p>
                        Don't have an account yet?{" "}
                        <Link
                          onClick={() => {
                            toggleforgotpass();
                            toggle();
                            setShowcontent(0);
                          }}
                        >
                          SIGN UP
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              ) : showcontentForgot == 1 ? (
                <form onSubmit={handleSubmit7(secForPas)}>
                  <div className="POPrigh OnE pt-2">
                    <h2>Set New Password</h2>
                    <p>Enter new password</p>
                    <InputGroup className="mb-3 mt-3">
                      <Form.Control
                        type={passwordVisible ? "text" : "password"}
                        placeholder="New Password"
                        aria-label="newpassword"
                        aria-describedby="basic-addon1"
                        name="password"
                        id="password"
                        {...register7("password", {
                          required: "password is required",
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
                            message:
                              "Password Must contain 8 characters,one digit,one lowercase letter,one uppercase letter,one special character",
                          },
                        })}
                      />
                      <InputGroup.Text
                        id="basic-addon1"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      >
                        {passwordVisible ? (
                          <AiOutlineEye />
                        ) : (
                          <AiOutlineEyeInvisible />
                        )}
                      </InputGroup.Text>
                      <InputGroup.Text
                        id="basic-addon1"
                      >
                        <AiOutlineLock />
                      </InputGroup.Text>
                    </InputGroup>
                    {errors7.password && (
                      <small style={{ color: "red", float: "left" }}>
                        {errors7.password.message}
                      </small>
                    )}
                    <InputGroup className="mb-3 mt-3">
                      <Form.Control
                        placeholder="Confirm Password"
                        type={cnfrmpasswordVisible ? "text" : "password"}
                        aria-label="confirmpassword"
                        aria-describedby="basic-addon1"
                        name="confirmPassword"
                        id="confirmPassword"
                        {...register7("confirmPassword", {
                          required: "confirmPassword is required",
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
                            message:
                              "Password Must contain 8 characters,one digit,one lowercase letter,one uppercase letter,one special character",
                          },
                        })}
                      />
                      <InputGroup.Text
                        id="basic-addon1"
                        onClick={togglecnfrmPasswordVisibility}
                        style={{ cursor: "pointer" }}
                      >
                        {cnfrmpasswordVisible ? (
                          <AiOutlineEye />
                        ) : (
                          <AiOutlineEyeInvisible />
                        )}
                      </InputGroup.Text>
                      <InputGroup.Text
                        id="basic-addon1"
                      >
                        <AiOutlineLock />
                      </InputGroup.Text>
                    </InputGroup>
                    {errors7.confirmPassword && (
                      <small style={{ color: "red", float: "left" }}>
                        {errors7.confirmPassword.message}
                      </small>
                    )}
                    <button type="submit">Submit</button>
                    <div className="pt-5 SUbLow">
                      <p>
                        Don't have an account yet?{" "}
                        <Link
                          onClick={() => {
                            toggleforgotpass();
                            toggle();
                            setShowcontent(0);
                          }}
                        >
                          SIGN UP
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              ) : null}
            </div>
            <div className="popImg">
              <img src={Forgotpass} className="img-fluid" />
            </div>
          </div>
          <br />
        </ModalBody>
      </Modal>







      <MD
        show={showModal1 && inputValue.length >= 3} // Only show the modal when inputValue has more than three characters
        onHide={handleClose2} // Hide the modal when the user clicks outside or presses Esc
        className="modaldialog"
        style={{
          left: "506px",
          top: "68px",
          width: "394px",
          height: "406px",
          overflowY: "auto",
          display: "block",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <style>
          {`
        ::-webkit-scrollbar-thumb {
            background-color: transparent; 
            border-radius: 0; 
        }
        .modal-backdrop.show {
            opacity: -0.5; 
        }
        `}
        </style>
        <MD.Body className="modalheader">
          <div className="">
            {courseList.map((item, index) => (
              <div
                key={item._id}
                className=""
                onClick={() => handleCourseClick(item)}
                style={{
                  display: "flex",
                  width: "534px",
                  paddingLeft: "145px",
                  transition: "background-color 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "lightgray";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <img src={item.thumbnail} alt="Course Thumbnail" className='searchThumbnail'
                  style={{
                    width: '72px',
                    height: 'auto',
                    margin: '10px'
                  }} />
                <div className="edutitle">
                  <span style={{
                    fontWeight: '700',

                  }}>{item.title}</span>
                  <span style={{
                    fontWeight: 'inherit',

                  }}>{item.educators}</span>
                </div>

              </div>
            ))}
          </div>
        </MD.Body>
      </MD>


    </div>
  );
};
export default Header;
