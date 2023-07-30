import React, { useState, useEffect } from "react";
import "./Footer.css";
import logo from "../../assets/images/wkareersity-logo.png"
import { FaAngleRight } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { GrMail } from "react-icons/gr";
import { ImLocation } from "react-icons/im";
import { FaFacebookF, FaLinkedinIn, FaInstagramSquare, FaTwitter, FaYoutube } from "react-icons/fa";





import { useNavigate } from "react-router-dom";
const Footer = () => {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [categoryData, setCategoryData] = useState([]);
    let [refresher, setRefresher] = useState(true);
    
    useEffect(() => {

       
    }, [refresher]);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    return (
        <div className="Footer pt-5">
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                        <div className="FooTLOgo">
                            <img src={logo} className="img-fluid" />
                            <p>KareerSity stands at the forefront of educational innovation as a distinguished EdTech entity, uniquely positioned to infuse real-world industry insights into pharmaceutical education. Our genesis was driven by a singular aim: to catalyze career trajectories by orchestrating an intellectual symphony between the realms of academia and industry.​</p>



                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <div className="QuickLINk">
                            <h5>QUICK LINKS</h5>
                            <ul class="foot-nav">
                            <li><a href="/" onClick={() => { scrollToTop(); navigate('/'); }}><i><FaAngleRight /></i>Home</a></li>
                            <li><a href="/course" onClick={() => { scrollToTop(); navigate('/course'); }}><i><FaAngleRight /></i>Course</a></li>
                            <li><a href=" " onClick={() => { scrollToTop(); navigate(' '); }}><i><FaAngleRight /></i>Live Programs</a></li>
                            <li><a href="/blog" onClick={() => { scrollToTop(); navigate('/blog'); }}><i><FaAngleRight /></i>Blogs</a></li>
                            <li><a href="/about" onClick={() => { scrollToTop(); navigate('/about'); }}><i><FaAngleRight /></i>About Us</a></li>
                            <li><a href="/contact" onClick={() => { scrollToTop(); navigate('/contact'); }}><i><FaAngleRight /></i>Contact Us</a></li>
                            <li><a href=" " onClick={() => { scrollToTop(); navigate(' '); }}><i><FaAngleRight /></i>Join as  Student </a></li>
                            <li><a href="/educator" onClick={() => { scrollToTop(); navigate('/educator'); }}><i><FaAngleRight /></i>Join as Educator</a></li>
                            <li><a href="/termsncondt" onClick={() => { scrollToTop(); navigate('/termsncondt'); }}><i><FaAngleRight /></i>Terms & Conditions</a></li>
                            <li><a href="/privacypolicy" onClick={() => { scrollToTop(); navigate('/privacypolicy'); }}><i><FaAngleRight /></i>Privacy Policy</a></li>
                            <li><a href="/refund" onClick={() => { scrollToTop(); navigate('/refund'); }}><i><FaAngleRight /></i>Cancellation / Refund policy</a></li>
                            <li><a href=" " onClick={() => { scrollToTop(); navigate(' '); }}><i><FaAngleRight /></i>Help and Support</a></li>
                           
                           



                            </ul>
                            
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        
                        {/* <div className="QuickLINk cat">
                            <h5>CATEGORIES</h5>
                            <div className="foot-flex">
                            <ul className="foot-nav one  ">
                                {categoryData.slice(0, Math.ceil(categoryData.length / 2)).map((category) => (
                                    <li key={category._id}>

                                        <i><FaAngleRight /></i>
                                        <span onClick={() => { scrollToTop(); navigate('/course', { state: { categoryId: category._id } }); }}>
                                            {category.name}
                                        </span>

                                    </li>
                                ))}
                            </ul>
                            <ul className="foot-nav second ">
                                {categoryData.slice(Math.ceil(categoryData.length / 2)).map((category) => (
                                    <li key={category._id}>

                                        <i><FaAngleRight /></i>
                                        <span onClick={() => { scrollToTop(); navigate('/course', { state: { categoryId: category._id } }); }}>
                                            {category.name}
                                        </span>

                                    </li>
                                ))}
                            </ul>
                            </div>
                        </div> */}

<div className="QuickLINk cat">
    <h5>CATEGORIES</h5>
    <div className="foot-flex">
        <ul className="foot-nav one  ">
            {categoryData
                .slice(0, Math.ceil(categoryData.length))
                .filter(category => category.isHidden) // Filter categories where isHidden is true
                .map(category => (
                    <li key={category._id}>
                        <i><FaAngleRight /></i>
                        <span onClick={() => { scrollToTop(); navigate('/course', { state: { categoryId: category._id } }); }}>
                            {category.name}
                        </span>
                    </li>
                ))}
        </ul>
     
    </div>
</div>

                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                        <div className="REAchuss">
                            <div className="QuickLINk">
                                <h5>REACH US</h5>
                                <ul class="foot-nav rEAScg">
                                    <li><a href="tel:+919004214077 "><i><MdCall /></i>+91 90042 14077</a></li>
                                    <li><a href="mailto:askus@kareersity.com"><i><GrMail /></i>askus@kareersity.com</a></li>
                                    <li><a><i><ImLocation /></i>Corporate Office <br /> <span>Thane, Mumbai
                                    </span></a></li>

                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <hr />
                <div className="row justify-content-center pt-3">
                    <div className="col-lg-4 col-md-6 CoPyRigHTS">
                        <div className="COPyRights ">
                            <p>Copyright © 2023 Kareersity. All rights reserved</p>

                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 CoPyRigHTS text-center">
                        <div className="COPyRights">
                            <p>Powered By: <a href="https://www.cortexmarketing.in/">Cortex Media Marketing Pvt Ltd</a></p>

                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 CoPyRigHTS">
                        <div className="COPyRights d-flex">
                            <p>Follow us on:</p>
                            <div className="socialMEDia">
                                <li><a href=""><FaFacebookF /></a></li>
                                <li><a href=""><FaLinkedinIn /></a></li>
                                <li><a href=""><FaInstagramSquare /></a></li>
                                <li><a href=""><FaTwitter /></a></li>
                                <li><a href=""><FaYoutube /></a></li>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row pt-3 mt-3">
                    <div className="col-12">
                        <div className="SubSCribe d-flex">
                            <div className="SubPAr">
                                <p>Subscribe To Our Newsletter To Get Updates</p>
                            </div>
                            <div className="SubINPut">
                                <div class="input-group ftr mb-3"> 
                                    <input type="text" class="form-control" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <button class="btn btn-outline-secondary SuBS" type="button" id="button-addon2" >SUBSCRIBE <i className="RigHTSubsCR"><FaAngleRight /></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Footer