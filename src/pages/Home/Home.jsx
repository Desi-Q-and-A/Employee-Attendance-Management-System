import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import CountUp from "react-countup";
import ModalVideo from "react-modal-video";

import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";

import "./Home.css";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import banner from "../../assets/images/banner1.png";
import { Link } from "react-router-dom";
import { FaAngleRight, FaPlay } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { HiChevronDoubleRight } from "react-icons/hi";
import { TiTick } from "react-icons/ti";

// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// images

import { blogListCb } from "../../redux/user";

import { useNavigate } from "react-router-dom";
import coursebanner1 from "../../assets/images/course-banner.png";
import c1 from "../../assets/images/course.png";
import courseimg from "../../assets/images/coursebanner.png";
import abt from "../../assets/images/abt.png";
import master from "../../assets/images/masterIMG.png";
import educator from "../../assets/images/educator.png";
import blog from "../../assets/images/blog.png";
import abbottLaboratories from "../../assets/images/abbottLaboratories.png";
import ajantapharma from "../../assets/images/ajantapharma.png";
import alembicPharmaceuticalsLtd from "../../assets/images/alembicPharmaceuticalsLtd.png";
import alkem from "../../assets/images/alkem.png";
import astrazeneca from "../../assets/images/astrazeneca.png";
import aurobindoPharma from "../../assets/images/aurobindoPharma.png";
import biocon from "../../assets/images/biocon.png";
import cipla from "../../assets/images/cipla.png";
import divisLaboratories from "../../assets/images/divisLaboratories.png";
import drReddyLaboratories from "../../assets/images/drReddyLaboratories.png";
import glenmarkPharmaceuticals from "../../assets/images/glenmarkPharmaceuticals.png";
import intas from "../../assets/images/intas.png";
import ipcaLabs  from "../../assets/images/ipcaLabs.png";
import lauruslabs  from "../../assets/images/lauruslabs.png";
import lupin  from "../../assets/images/lupin.png";
import mankind  from "../../assets/images/mankind.png";
import marksans  from "../../assets/images/marksans.png";
import natcoPharma  from "../../assets/images/natcoPharma.png";
import piramal  from "../../assets/images/piramal.png";
import sanofi  from "../../assets/images/sanofi.png";
import sunpharma  from "../../assets/images/sunpharma.png";
import wockhardt  from "../../assets/images/wockhardt.png";
import zydus  from "../../assets/images/zydus.png";
import p1 from "../../assets/images/p1.png";
import p2 from "../../assets/images/p2.png";
import p3 from "../../assets/images/p3.png";
import p4 from "../../assets/images/p4.png";
import p5 from "../../assets/images/p5.png";
import e1 from "../../assets/images/e1.png";
import quotes from "../../assets/images/quote.png";
import { useDispatch, useSelector } from "react-redux";
import { loader } from "../../redux/common";
import { toast } from "react-toastify";
const Home = () => {
  const searchValue = useSelector((state) => state.userReducer.searchValue);

  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState([]);
  const navigate = useNavigate();
  const [shortUrl, setShortUrl] = useState("");
  const [shortUrl1, setShortUrl1] = useState("");
  const [shortUrlTest, setShortUrlTest] = useState("");

  useEffect(() => {
    dispatch(
      blogListCb((resp) => {
        if (resp.status) {
          console.log("blogdata", resp.data);

          const filteredData = resp.data.filter(
            (item) => item.isActive === true
          );
          console.log("blog filteredData: ", filteredData);
          setBlogData(filteredData);
        }
      })
    );
  }, []);

  const blogViewCb = (data) => {
    console.log(data);
    navigate("/blogdetail/" + data._id);
  };

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [shortList, setShortList] = useState([]);
  const [getURL, setURL] = useState([]);
  const [getURL1, setURL1] = useState([]);
  const [getURLTestimonial, setURLTestimonial] = useState([]);
  let [refresher, setRefresher] = useState(true);
  const [testimonialList, setTestimonialList] = useState([]);
  const [bannerListData, setBannerListData] = useState([]);
  const [freeCourses, setfreeCourses] = useState([]);

  const [popularCourses, setPopularCourses] = useState([]);
  const [popularCoursesCopy, setPopularCoursesCopy] = useState([]);
  const [videoTestimonialData, setVideoTestimonialData] = useState([]);
  const [subscritionBannerList, setSubscritionBannerList] = useState([]);
  const [LiveBannerList, setLiveBannerList] = useState([]);
  const [subscriptnPlan, setSubscriptnPlan] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    console.log("tab", tab);
    setActiveTab(tab);
  };



  // useEffect(() => {
  //   // Check if searchValue exists and use it to filter/update popular courses

  //   console.log("popularCourses", popularCoursesCopy);
  //   if (searchValue) {
  //     const filteredCourses = popularCoursesCopy.filter((course) =>
  //       course.title.toLowerCase().includes(searchValue.toLowerCase())
  //     );
  //     setPopularCourses(filteredCourses);
  //   }
  // }, [searchValue]);

  
  const openModal = (status, id) => {
    setModal(!modal);
    if (status == "open") {
      console.log(getURL, "getURL", getURL[id]);
      setShortUrl(getURL[id]);
    }
  };
  const openModal1 = (status, id) => {
    setModal1(!modal1);

    console.log("testeeste", id, status);

    if (status == "open") {
      console.log(getURL1, "getURL1", getURL1[id]);
      setShortUrl1(getURL1[id]);
      // console.log(getURLTestimonial, "getURL", getURLTestimonial[id]);
      // setShortUrlTest(getURLTestimonial[id]);
    }
  };

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  const [isOpen, setOpen] = useState(false);

  var course = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  var popular = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  var pharma = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    slidesToShow: 5,
    arrows: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  var experts = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: false,
    slidesToShow: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  var testimonial = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: false,
    slidesToShow: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  };
  var videoTestimonial = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    slidesToShow: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  };
  var Image = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    slidesToShow: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  const filterBySearch = (event) => {
    const query = event.target.value;
    // var updatedlist = [...dummydataComplete];

    // var updatedList = updatedlist.filter((item) => {
    //   return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    // });

    // setBundleList(updatedList);
  };

  const categorySelect = (data) => {
    console.log("categorydata", data.name);
    sessionStorage.setItem("CategorySelect", data.name);
    navigate("/course");
  };

  return (
    <div className="HomEPage">
      {/* header banner */}

      <div className="SliderS">
        <Carousel>
          {bannerListData.map((item, i) => (
            // Only render Carousel items where isActive is true
            item.isActive ? (
              <Carousel.Item key={i}>
                <Link to={item.videoUrl} target="_blank">
                  <img src={item.thumbnail} className="img-fluid" alt={`Banner ${i}`} />
                </Link>
              </Carousel.Item>
            ) : null
          ))}
        </Carousel>
      </div>

      {/* header banner end */}
      {/* free course */}
      <div className="COurSe pt-5 ">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="PAgeTit pt-3 pb-3">
                <h2>Free Courses</h2>
              </div>
            </div>
            <div className="col-12">
              <Slider {...course}>
                {freeCourses.map((item, index) => (
                  <div className="MainCOurSEdIV">
                    <div className="couRSeImg">
                      <img
                        src={item.thumbnail}
                        alt="Hepatology"
                        className="img-fluid oragnsTop categriesImg"
                       // style={{ width: "100%", height: "235px" }}
                      />
                    </div>
                    <div className="COurseConTEnt">
                      <h5 >
                       
                        <Link
                          to={`/course-detail/${item._id}/${item.title.replace(
                            / /g,
                            "_"
                          )}`}
                        >
                          {item.title}
                        </Link>
                      </h5>
                      <span className="SAPnHr">
                        <hr />
                      </span>
                      <div className="SCetionCourse d-flex">
                        <h4>FREE</h4>
                        <h6>{item.level}</h6>
                        <h6 className="text-end">{item.duration}</h6>
                      </div>
                      <span className="SAPnHr">
                        <hr />
                      </span>
                      <div className="FinAlDIv d-flex">
                        <p>
                          <i>
                            <AiFillStar />
                          </i>{" "}
                          {item.avgRating} ({item.totalRatings})
                          {/* 4.9 (250) */}
                        </p>
                        <Link
                          to={`/course-detail/${item._id}/${item.title.replace(
                            / /g,
                            "_"
                          )}`}
                        >
                          Learn More{" "}
                          <i>
                            <HiChevronDoubleRight />
                          </i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* free course end */}
      {/* subscription banner image Section */}
      <div className="IMAgeSession">
        <div className="container">
          <div className="row">
            <div className="col-12 pt-3 pb-3">
              <Slider {...Image}>
                {subscritionBannerList.map((item, i) => (
                  <Link to={item?.videoUrl}>
                    <img
                      src={item?.thumbnail}
                      className="img-fluid"
                      // style={{ width: "100%", height: "345px" }}
                    />
                  </Link>
                ))}

                {/* <Link to="#">
                    <img src={courseimg} className="img-fluid" />
                  </Link>
                  <Link to="#">
                    <img src={courseimg} className="img-fluid" />
                  </Link> */}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* image section end */}
      {/* Explore category */}
      <div className="ExplorCAtegory pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="PAgeTit pt-3 pb-3">
                <h2>EXPLORE OUR CATEGORIES</h2>
                {/* <p>
                  Aliquam mollis felis at ipsum iaculis, in iaculis nibh
                  iaculis. Duis consectetur ullamcorper tellus vitae dapibus.
                </p> */}
              </div>
            </div>
          </div>
          <div className="row justify-content-center pt-2 ">
            {/* {categoryList.map((item) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12"
                // onClick={() => {
                //   categorySelect(item);
                // }}
                onClick={() =>
                  navigate("/course", { state: { categoryId: item._id } })
                }
              >
                <div className="CAteGorey">
                  <h5>{item.name}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            ))} */}

            {categoryList
              .filter(item => item.isHidden) // Filter categories where isHidden is true
              .map(item => (
                <div
                  key={item._id}
                  className="col-lg-4 col-md-6 col-sm-6 col-6"
                  onClick={() => navigate("/course", { state: { categoryId: item._id } })}
                >
                  <div className="CAteGorey">
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}

          </div>
        </div>
      </div>
      {/* end explore category */}
      {/* counter */}
      <div className="COUnters pt-5 pb-5">
        <div className="container">
          <div className="row ">
            <div className="PAgeTit pt-3 pb-3">
              <h2>KAREERSITY FACTS</h2>
              <p>
              Discover a dynamic learning environment designed to enhance student engagement, facilitates customized learning experiences, and empower educators with cutting-edge tools. We're not just shaping the future; we're redefining education through technology.
              </p>
            </div>
          </div>
          <div className="row pt-3 pb-3">
            <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
              <div className="COuntErs">
                <div className="quizCount">
                  <CountUp start={0} end={50000} duration={3} />

                  <h6>Courses + Quizzes Signed Up</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
              <div className="COuntErs">
                <div  className="lrnsCount">
                  <CountUp start={0} end={48000} duration={3} />

                  <h6>Learners</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mb-4 ">
              <div className="COuntErs">
                <div className="crsCount">
                  <CountUp start={0} end={440} duration={3} />

                  <h6>Courses</h6>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
              <div className="COuntErs">
                <div className="ratCount">
                  <CountUp start={0} end={4} duration={3} />

                  <h6>Average Rating out of 5</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* counter end */}
      {/* subcribe */}
      <div className="SubSrcibe pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="PAgeTit pt-3 pb-3">
                <h2>SUBSCRIPTION PLAN</h2>
                <p>
               We provide subscription plans tailored to individual academic needs ​
                </p>
              </div>
            </div>
          </div>
         
          <div className="row pb-5 ">
          {subscriptnPlan.slice(0, 3).map((item, index) => (
          <div className="col-lg-4">
             {index === 2 && (
            <div className="col-md-12 pt-5 ">
                
              <div className="BasIC ">
                <div className="BAsicHEad blue">
                  <h6>{item.planName}</h6>
                </div>
                <div className="BAsicContainer">
                  <h1>₹ {item.oneMonthPrice}</h1>
                  <span>Per Month</span>
                  <ol className="LiSTSUB pt-4 pb-4">
                  
                      
                      {item.features.map((feature, featureIndex) => (
                                                            <li key={featureIndex}><i>
                                                            <TiTick />
                                                          </i>{feature}</li>
                                                        ))}
                   
                  
                  </ol>
                  <div className="BAsicHEad blue acc">
                  <h6>ALSO ACCESS TO STANDARD COURSES</h6>
                </div>
                <div className="choosePlan blu">
                  <Link 
                  to={`/subcart/${item._id}`}
                  
                  className="PLanChse"
                  
                 
                  >
                     
                    CHOOSE PLAN{" "}
                    <i>
                      <FaAngleRight />
                    </i>
                  </Link>
                  </div>
                </div>
              </div>
             
            </div>
            )}
             <div className="col-md-12">
             {index === 1 && (
              <div className="BasIC ylw">
                <div className="BAsicHEad ylw">
                  <h6>{item.planName}</h6>
                </div>
                <div className="BAsicContainer ylw">
                  <h1>₹ {item.oneMonthPrice}</h1>
                  <span>Per Month</span>
                  <ul className="LiSTSUB pt-4 pb-4">
                  
                      
                      {item.features.map((feature, featureIndex) => (
                                                            <li key={featureIndex}><i>
                                                            <TiTick />
                                                          </i>{feature}</li>
                                                        ))}
                  
                  
                  </ul>
                  <div className="BAsicHEad ylw acc">
                  <h6 >ALSO ACCESS TO STANDARD AND PRIME COURSES</h6>
                </div>
                <div className="choosePlan ylow">
                  <Link to={`/subcart/${item._id}`} className="PLanChse">
                    CHOOSE PLAN{" "}
                    <i>
                      <FaAngleRight />
                    </i>
                  </Link>
                  </div>
                </div>
              </div>
)}
            </div>
            
            <div className="col-md-12 pt-5">
            {index === 0 && (
              <div className="BasIC">
                <div className="BAsicHEad grn">
                  <h6>{item.planName}</h6>
                </div>
                <div
                  className="BAsicContainer grn
                                "
                >
                  <h1>₹ {item.oneMonthPrice}</h1>
                  <span>Per Month</span>
                  <ul className="LiSTSUB pt-4 pb-4">
                
                      
                      {item.features.map((feature, featureIndex) => (
                                                            <li key={featureIndex}><i>
                                                            <TiTick />
                                                          </i>{feature}</li>
                                                        ))}
                
                  
                  </ul>
                 
                  <Link to={`/subcart/${item._id}`} className="PLanChse">
                    CHOOSE PLAN{" "}
                    <i>
                      <FaAngleRight />
                    </i>
                  </Link>
                </div>
              </div>
)}
            </div> 
           
          </div>

))}
</div>
        </div>
      </div>
      {/* subscribe end */}
      {/* about session */}
      <div className="AbtSEssion pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 whyus_cont">
              <div className="PAgeTit pt-5 pb-3">
                <h2>WHY US ?</h2>
              </div>
              <p className="">
              Choose KareerSity because we offer more than just an educational platform; 
              we are dedicated to helping you achieve transformative success. 
              We pride ourselves on our dedication to delivering exceptional results,
              pushing boundaries with creative solutions, and tailoring our services to meet your unique needs. We offer a distinctive combination of practical industry knowledge, innovative teaching methods, and a strong focus on our students. Our programs not only prepare students with the necessary skills for the workforce, but also cultivate a mindset of adaptability and leadership. We are proud of our comprehensive approach, which covers all aspects of educational and professional requirements. Whether you're a student looking to enter the workforce, a professional seeking to enhance your skills, or a business in need of expert guidance, KareerSity is here to be your trusted partner. We'll take you on a transformative journey towards a future filled with unparalleled success in the dynamic landscapes of industry and business. Experience the exceptional with KareerSity - your gateway to extraordinary possibilities.
              </p>
           
            </div>
            <div className="col-lg-5 col-md-12">
              <img src={abt} className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
      {/* about session end */}
      {/* Master class */}
      {/* {LiveBannerList.map((item,i)=>{
        <div className="MASterClass pt-5">
        <Link to="/">
          <img src={item.thumbnail} className="img-fluid" />
        </Link>
      </div>
      })} */}

      <div className="MASterClass">
        {/* <div className="container">
          <div className="row"> */}
        <div className="col-12">
          <Slider {...Image}>
            {LiveBannerList.map((item, i) => (
              <Link to={item?.videoUrl}>
                <img
                  src={item?.thumbnail}
                  className="img-fluid"
                  // style={{ width: "100%", height: "345px" }}
                />
              </Link>
            ))}

            {/* <Link to="#">
                    <img src={courseimg} className="img-fluid" />
                  </Link>
                  <Link to="#">
                    <img src={courseimg} className="img-fluid" />
                  </Link> */}
          </Slider>
        </div>
        {/* </div>
        </div> */}
      </div>

      {/* master class end */}
      {/* popular course */}
      <div className="COurSe pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="PAgeTit pt-3 pb-3">
                <h2>PopulAR Courses</h2>
                <p>
                KareerSity offers comprehensive programs for pharmacy students and young professionals. Here are our most popular courses tailored to your academic needs.​
                </p>
              </div>
            </div>
            <div className="col-12">
              <Slider {...popular}>
                {popularCourses.map((x, i) => (
                  <div className="MainCOurSEdIV">
                    <div className="couRSeImg">
                      <img
                        src={x?.thumbnail}
                        alt="Hepatology"
                        className="img-fluid oragnsTop categriesImg"
                        //style={{ width: "100%", height: "235px" }}
                      />
                    </div>
                    <div className="COurseConTEnt">
                      {/* <h5 >{x.title}</h5> */}
                      <Link
                        to={`/course-detail/${x._id}/${x.title.replace(
                          / /g,
                          "_"
                        )}`}
                      >
                        <h5 >{x.title}</h5>
                      </Link>
                      <span className="SAPnHr">
                        <hr />
                      </span>
                      <div className="SCetionCourse d-flex">
                        <h4>
                          {" "}
                          {x.regularPrice === 0 ? "FREE" : `₹ ${x.price}`}
                        </h4>
                        <h6>{x.level}</h6>
                        <h6 className="text-end">{x.duration}</h6>
                      </div>
                      <span className="SAPnHr">
                        <hr />
                      </span>
                      <div className="FinAlDIv d-flex">
                        <p>
                          <i>
                            <AiFillStar />
                          </i>{" "}
                          {x.avgRating} ({x.totalRatings})
                          {/* 4.9 (250) */}
                        </p>
                        <Link
                          to={`/course-detail/${x._id}/${x.title.replace(
                            / /g,
                            "_"
                          )}`}
                        >
                          Learn More{" "}
                          <i>
                            <HiChevronDoubleRight />
                          </i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* popular course end */}
      {/* listen experts */}

      <div className="ExPertS pt-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="PAgeTit pt-3 pb-3">
                <h2>LISTEN TO EXPERTS</h2>
                {/* <p>
                  Aliquam mollis felis at ipsum iaculis, in iaculis nibh
                  iaculis. Duis consectetur ullamcorper tellus vitae dapibus.
                </p> */}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <Slider {...experts}>
                {shortList.map((item, i) => (
                  <div className="ExPErt">
                    <div className="eXpImg">
                      <img
                        src={item.thumbnail}
                        className="img-fluid ExPert"
                        style={{ height: "100%" }}
                      />

                      <div className="ExPertCont">
                        <h6>{item.title}</h6>
                      </div>

                      <button
                        className="btn-primary PlY"
                        onClick={() => {
                          openModal("open", i);
                        }}
                      >
                        <FaPlay />
                      </button>
                    </div>
                  </div>
                ))}
              </Slider>

              {modal ? (
                <section className="modal__bg">
                  <div className="modal__align">
                    <div className="modal__content" modal={modal}>
                      <IoCloseOutline
                        className="modal__close"
                        arial-label="Close modal"
                        onClick={openModal}
                      />

                      <div className="modal__video-align">
                        {videoLoading ? (
                          <div className="modal__spinner"></div>
                        ) : null}

                        <iframe
                          className="modal__video-style"
                          onLoad={spinner}
                          loading="lazy"
                          width="800"
                          height="500"
                          src={shortUrl}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* listen experts end */}
      {/* testimonials */}

      <div className="TeStimonial pt-2 pb-5 ">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="PAgeTit pt-3 pb-3">
                <h2>WHAT STUDENTS THINK AND SAY ABOUT KAREERSITY</h2>
                <p>
                Discover Testimonials​ Explore the valuable insights and experiences shared by learners on our feedback page.​
                </p>
              </div>
            </div>
          </div>

          <div className="tab-buttons">
            <button
              onClick={() => handleTabClick("tab1")}
              className={activeTab === "tab1" ? "active" : ""}
            >
              What Students Say
            </button>
            <button
              onClick={() => handleTabClick("tab2")}
              className={activeTab === "tab2" ? "active" : ""}
            >
              Video Testimonial
            </button>
          </div>

          {/* <div className="tab-content">
            {activeTab === "tab1" && (
              <div className="row">
                <div className="col-12">
                  <Slider {...testimonial}>
                    {testimonialList.map((item) => {
                      return (
                        <>
                          <div className="TestimoniaLS">
                            <div className="QuoTEImg pb-3">
                              <img src={quotes} className="img-fluid" />
                            </div>
                            <div className="TestiMoniAlSConTENT">
                              <p>{item?.feedback}</p>
                              <div className="DetILSTEsti">
                                <h5>{item?.name}</h5>
                                <h6>{item?.qualification}</h6>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            )}
            {activeTab === "tab2" && <p>Content for Tab 2 goes here.</p>}
          </div> */}
          <div className="tab-content">
            {activeTab === "tab1" && (
              <div className="row">
                <div className="col-12">
                  <Slider {...testimonial} className="testmonial-slick">
                    {testimonialList.map((item) => {
                      return (
                        <>
                          <div className="TestimoniaLS">
                            <div className="QuoTEImg pb-3">
                              <img
                                src={quotes}
                                className="img-fluid fld"

                              />
                            </div>
                            <div className="TestiMoniAlSConTENT">
                              <p>{item?.feedback}</p>
                              <div className="DetILSTEsti">
                                <h5>{item?.name}</h5>
                                <h6>{item?.qualification}</h6>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            )}
            {activeTab === "tab2" && (
              <div className="row">
                <div className="col-12">
                  {/* <Slider {...testimonial}>
                    {testimonialList.map((item, i) => (
                      <div className="ExPErt">
                        <div className="eXpImg">
                          <img
                            src={item?.thumbnail}
                            className="img-fluid ExPert"
                          />

                          <div className="ExPertCont">
                            <h6>{item?.name}</h6>
                          </div>

                          <button
                            className="btn-primary PlY1"
                            onClick={() => {
                              openModal1("open", i);
                            }}
                          >
                            <FaPlay />
                          </button>
                        </div>
                      </div>
                    ))}
                  </Slider> */}
                  <div
                    className="slider-container"
                    style={{ height: "100%", width: "100%" }}
                  // style={{ height: "300px", marginTop: "25px" }}
                  >
                    <Slider {...videoTestimonial} className="videotestimonialh">
                      {videoTestimonialData.map((item, i) => {
                        return (
                          <div className="ExPErt">
                            <div className="eXpImg">
                              <img
                                src={item?.thumbnail}
                                // src={e1}
                                className="img-fluid ExPert"
                                style={{
                                  height: "350px",
                                  borderRadius: "10px",
                                  width: "100%",
                                }}
                              />

                              {/* <div className="ExPertCont">
                              <h6>{item?.name}</h6>
                            </div> */}

                              <button
                                className="btn-primary PlY1"
                                onClick={() => {
                                  openModal1("open", i);
                                }}
                              >
                                <FaPlay />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </Slider>
                  </div>

                  {modal1 ? (
                    <section className="modal__bg">
                      <div className="modal__align">
                        <div className="modal__content" modal={modal1}>
                          <IoCloseOutline
                            className="modal__close"
                            arial-label="Close modal"
                            onClick={openModal1}
                          />

                          <div className="modal__video-align">
                            {videoLoading ? (
                              <div className="modal__spinner"></div>
                            ) : null}

                            <iframe
                              className="modal__video-style"
                              onLoad={spinner}
                              loading="lazy"
                              width="800"
                              height="500"
                              src={shortUrl1}
                              // src={"https://www.youtube.com/embed/rFKSPb6g8KY"}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowfullscreen
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    </section>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* testimonial end */}

      {/* <div>
        <div className="tab-buttons">
          <button
            onClick={() => handleTabClick("tab1")}
            className={activeTab === "tab1" ? "active" : ""}
          >
            Testimonial Text
          </button>
          <button
            onClick={() => handleTabClick("tab2")}
            className={activeTab === "tab2" ? "active" : ""}
          >
            Testimonial Video
          </button>
        </div>
        
      </div> */}

      {/* blogs */}
      <div className="BLOgs pt-5 pb-5 ">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="PAgeTit pt-3 pb-3">
                <h2>OUR BLOG</h2>
                <p>
                Step into the heart of our community where we explore the stories behind our brand, industry trends, and valuable tips. Our blog is the canvas where we share our passions, experiences, and the latest happenings. Join us on a journey of discovery, stay ahead in the world of Pharmaceuticals , and be part of the conversation that shapes our collective journey.
                </p>
              </div>
            </div>
            <div className="row pt-3 pb-3">
              <div className="col-lg-7 col-md-12">
                {blogData
                  .filter((item, i) => i > 0 && i <= 3)
                  .map((filBlog) => {
                    return (
                      <>
                        <div className="row">
                          <div
                            className="col-lg-4 col-md-4 col-sm-6 col-6"
                            onClick={() => {
                              blogViewCb(filBlog);
                            }}
                          >
                            <div className="blogIMG">
                              <img
                                src={filBlog?.thumbnail}
                                className="img-fluid"
                              />
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8 col-sm-6 col-6">
                            <div
                              className="BLogContent"
                              onClick={() => {
                                blogViewCb(filBlog);
                              }}
                            >
                              {/* <h6>
                                {new Date(filBlog?.updatedAt).toLocaleString()}
                              </h6> */}
                              <h6>
                              {new Date(filBlog?.updatedAt).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                              </h6>

                              <h5>{filBlog?.title}</h5>
                              <p>{filBlog?.sDesc}</p>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </>
                    );
                  })}
              </div>

              {blogData
                .filter((item, i) => i === 0)
                .map((filBlog) => {
                  console.log(filBlog, "filBlog");
                  return (
                    <>
                      <div
                        className="col-lg-5 col-md-12"
                        onClick={() => {
                          blogViewCb(filBlog);
                        }}
                      >
                        <div className="BLOGImg">
                          <img src={filBlog?.thumbnail} className="img-fluid" />
                        </div>
                        <div className="BLogContent larGE">
                        <h6>
                              {new Date(filBlog?.updatedAt).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                              </h6>
                          <h5>{filBlog?.title}</h5>
                          <p>{filBlog?.sDesc}</p>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {/* blogs end */}

      {/* become educator */}
      <div className="EDucatoR">
        <div className="EduCatorImg ">
          <img src={educator} className="img-fluid"></img>
        </div>
        <div className="EDuCtORCOntEnt">
          <h3>BECOME AN EDUCATOR & SPREAD YOUR KNOWLEDGE</h3>
          <p>
          Embrace the opportunity to educate and share your expertise by joining one of the world's largest online learning marketplaces. We have a dedicated team ready to support instructors like you, and our Teaching Center offers a wide range of valuable resources. Join our community and be a part of an exciting platform that encourages collaboration, knowledge-sharing, and professional development. 
          </p>
          <Link to="/educator" className="MstwhiTE mt-3">
            {" "}
            GEt started
            <i>
              <FaAngleRight />
            </i>
          </Link>
        </div>
      </div>
      {/* educator end */}

      {/* course selection end */}
      {/* pharma industry */}
      <div className="PharmaCARo pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="PAgeTit pt-3 pb-3">
                <h2>POTENTIAL EMPLOYERS</h2>
                {/* <p>
                  Aliquam mollis felis at ipsum iaculis, in iaculis nibh
                  iaculis. Duis consectetur ullamcorper tellus vitae dapibus.
                </p> */}
              </div>
            </div>
          </div>
          
        </div>
      </div>
      {/* pharama end */}
    </div>
  );
};
export default Home;
