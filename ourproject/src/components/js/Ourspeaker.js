import React, { useEffect, useState } from 'react';
import http from "../../utils/http-client";
import '../css/Ourspeaker.modules.css';
import { Link } from "react-router-dom";


function Ourspeaker() {
    var [Speaker, setSpeaker] = useState([]);
    var getData = async () => {
        try {
            const res = await http.get("Speaker");
            if(res?.data?.success){
                setSpeaker(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <section className="WaveHeaderBox">
                <div className='row  faq-heads'>
                    <div className='row faq-headers p-5 mt-5'>
                        <div className='col-md-12 faq mains'>
                            <h1 className="mt-5 " style={{ fontSize: "80px", marginBottom: "5px", fontWeight: '500' }}>Our Speaker</h1>
                            <Link to='#' className='faq-lnk-main'><i class="fa-solid fa-house" style={{ "color": "#719dea;" }}></i> CuService </Link>
                        </div>

                    </div>
                    <div className='wave wave1'></div>
                    <div className='wave wave5'></div>
                </div>
            </section >
            <section style={{  marginBottom: '300px' }}>
                <div className="container-fluid bg-body p-lg-5 p-3">
                    <h1 className='text-center mt-5'>Instructors</h1>
                    <p className="text-center mt-3">We’re on a mission to deliver engaging, curated courses at a reasonable price.</p> 
                    {/* serch bar and dropdown */}
                    <div className="row p-0 py-lg-3 shadow rounded-4" style={{ background: '#ffecd6' }}>
                        <div className="col-lg-3 col-md-6 col-12 py-2">
                            <p className="">Showing 24 total results</p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12 offset-lg-1 offset-0">
                            <div class="input-group">
                                <select class="form-select" id="inputGroupSelect02">
                                    <option selected>Choose...</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <span className="input-group-text" for="inputGroupSelect02"><i class="fas fa-search"></i></span>
                            </div>

                        </div>
                        <div className="col-lg-2 col-6">
                            <div className="dropdown">
                                <a className="btn btn--otline-light dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown link
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li><a className="dropdown-item active" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-6">
                            <div className="dropdown">
                                <a className="btn btn--otline-light dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown link
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li><a className="dropdown-item active" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>




                    {/* speaker card  container start here */}
                    <div className="container mt-5">
                        <div className="row p-lg-5">
                            {/* first card */}
                            {Speaker.map((speaker) => (
                                <div key={speaker.id} className="col-lg-4 mb-4" >
                                <div className='wrapper'>
                                    <div className='pcard'>
                                        <img src='./images/speaker1.jpg' className="ProfilePicture" alt='ProfilePicture' />
                                        <div className='ProfileName'>
                                                <h5 className="text-center">{speaker.name}</h5>
                                                <p className="text-center">{speaker.designation}</p>
                                            <h5 className=""></h5>
                                                <Link to={`/About-Speaker/${speaker.id}`}> 
                                            <ul className="SocialIcon  ">
                                                <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-facebook" />
                                                </li>
                                                <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-twitter" />
                                                </li>
                                                <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-google-plus" /></li>
                                                <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-linkedin" /></li>
                                            </ul>
                                                </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                      
                    </div>
                </div>
            </section>
        </>

    )
}
export default Ourspeaker;
