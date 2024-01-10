import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../css/About.modules.css';
import { Link } from "react-router-dom";
import CountUp from 'react-countup';

const responsive = {

  
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
    autoPlay: true
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2
  },
  tablet: {
    breakpoint: { max: 1024, min: 564 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 564, min: 0 },
    items: 1
  }
};

const SpeakerSlider = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
    autoPlay: true
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 564 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 564, min: 0 },
    items: 1
  }
};

function About() {
  return (
    <>
      <section className="WaveHeaderBox">
        <div className='row  faq-heads'>
          <div className='row faq-headers p-5 mt-5'>
            <div className='col-md-12 faq mains'>
              <h1 className=" pageHeading mt-5 " >About Us</h1>
              <Link to='#' className='faq-lnk-main'><i class="fa-solid fa-house" style={{ "color": "#719dea;" }}></i> CuService - About-Us </Link>
            </div>

          </div>
          <div className='wave wave1'></div>
          <div className='wave wave5'></div>
        </div>
      </section >

      <section >
        <div className="container bg-white p-5">

          <div className="row  align-items-center ">

          </div>
          <div className="row my-5">
            <div className="col-lg-6 col-12">
              <div className="row " >
                <div className="col-6">
                  <div className="row mt-5">
                    <img src="img/girl2.jpg" className="abimg" alt="" style={{ width: '100%', height: '370px', borderRadius: "0  40px 0 40px" }} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="row p-3">
                    <img src="img/boy1.jpg" className="abimg" alt="" style={{ width: '100%', height: '200px', borderRadius: "40px 0 40px 0" }} />
                  </div>
                  <div className="row p-1">
                    <img src="img/girl1.jpg" className="abimg" alt="" style={{ width: '100%', height: '280px', borderRadius: "50%" }} />
                  </div>
                </div>
              </div>

            </div>
            <div className=" col-xl-6 col-lg-6 col-12 ps-lg-5   " style={{ borderRadius: '20px' }}>
              <h2 className="text-start">Welcome to CEU Services</h2>
              <h4><span >Enhance your skills with best Online courses</span> </h4>
              <p className=" text-start" >
                You can start and finish one of these popular courses in under a day Check out the list below.. Take the course for free
              </p>
              <p className="mt-2 text-dark ">With years of experience in the industry, we have developed a deep understanding of the challenges faced by organizations in meeting their compliance obligations.
                Our training programs are constantly updated to reflect the latest developments in the industry, ensuring that our clients have the knowledge and tools they need to stay compliant.</p>
              <div className="row">
                <div className="col-lg-6 col-12">
                  <ul>
                    <li className="mb-2">
                      <i className="fa-solid fa-angle-up fa-rotate-90 p-1" style={{ color: '#000', width: '26px', height: '26px', borderRadius: '50%', background: '#00bbae' }} />&emsp;
                      On-Demand Training</li>
                    <li >
                      <i className="fa-solid fa-angle-up fa-rotate-90 p-1" style={{ color: '#000', width: '26px', height: '26px', borderRadius: '50%', background: '#00bbae' }} />&emsp;
                      Live Training</li>
                  </ul>
                </div>
                <div className="col-lg-6 col-12">
                  <ul>
                    <li className="mb-2">
                      <i className="fa-solid fa-angle-up fa-rotate-90 p-1" style={{ color: '#000', width: '26px', height: '26px', borderRadius: '50%', background: '#00bbae' }} />&emsp;
                      E-Transcript</li>
                    <li>
                      <i className="fa-solid fa-angle-up fa-rotate-90 p-1" style={{ color: '#000', width: '26px', height: '26px', borderRadius: '50%', background: '#00bbae' }} />&emsp;
                      Responsive Support</li>
                  </ul></div>
              </div>
              <div className="row mt-4">
                <div className="col mt-2 text-center">
                  <button className="cta ms-lg-5 ">
                    <span>Start Learning</span>
                    <svg viewBox="0 0 13 10" height="10px" width="15px">
                      <path d="M1,5 L11,5" />
                      <polyline points="8 1 12 5 8 9" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* why cuttrainer */}
      <section className="position-relative" style={{ backgroundColor: '#00bbae', }}>
        <div className="container pt-5 mt-5">
          <h2 className="text-center text-white my-2">Why learn with our courses?</h2>
          <p className=" text-center mt-2 text-white" style={{ fontSize: "18px" }}>
            View classes by age, program, or subject. Check out upcoming camps
            and special events too!</p>
          <div className="container p-5">
            <div className="row my-5 align-item-center ">
              {/* 1 */}
              <div className="col-lg-3 mb-4  col-md-6 col-12 p-5 text-white AboutCard border hover-1 alt" >
                <div className="row" style={{ padding: "20px" }}>
                  <div className="col p-0  logo  text-center " >

                    <i className="fas fa-file-invoice-dollar fa-4x p-3" style={{ color: '#ff9b24', background: '#fff', borderRadius: "15% 85% 61% 39% / 41% 45% 55% 59%", width: '120px', height: '100px', }}></i>
                  </div>
                </div>

                <h5 className="text-center">Great Value</h5>
                <p className="text-center">We offer competitive prices for our webinars</p>
              </div>
              {/* 2 */}
              <div className="col-lg-3 mb-4 col-md-6 col-12  p-5 text-white border AboutCard hover-1 alt" >
                <div className="row" style={{ padding: "20px" }} >
                  <div className="col p-0  logo text-center " >
                    <i className="fab fa-cc-visa fa-4x  p-3 " style={{ color: '#ff9b24', background: '#fff', borderRadius: "15% 85% 61% 39% / 41% 45% 55% 59%", width: '120px', height: '100px', }}></i>
                  </div>
                </div>
                <h5 className="text-center  mt-3">Safe Payment</h5>
                <p className="text-center">Safe and reliable payment processing.</p>
              </div>
              {/*  3 */}
              <div className="col-lg-3 mb-4 col-md-6 col-12  p-5 text-white border  AboutCard hover-1 alt">
                <div className="row" style={{ padding: "20px" }}>
                  <div className="col p-0 logo  text-center" >
                    <i className="far fa-life-ring fa-3x p-4" style={{ color: '#ff9b24', background: '#fff', borderRadius: "15% 85% 61% 39% / 41% 45% 55% 59%", width: '130px', height: '100px', }}></i>
                  </div>
                </div>
                <h5 className="text-center  ">24/7 Support</h5>
                <p className="text-center">Personalized service, all day and all night.</p>
              </div>
              {/* 4 */}

              <div className="col-lg-3 mb-4 col-md-6 col-12  p-5 text-white border  AboutCard hover-1 alt">
                <div className="row" style={{ padding: "20px" }}>
                  <div className="col p-0 logo  text-center" >
                    <i className="fas fa-globe-americas fa-3x p-4" style={{ color: '#ff9b24', background: '#fff', borderRadius: "15% 85% 61% 39% / 41% 45% 55% 59%", width: '130px', height: '100px', }}></i>
                  </div>
                </div>
                <h5 className="text-center  ">Unlimited Access</h5>
                <p className="text-center">You can attend the webinar from anywhere.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="WaveBackground" >
          {/* <img src="imgs/wave-section-break.webp" className="img-fluid" width={"100%"}></img> */}
        </div>
      </section>

      <section className="bg-primary">
        <div className="container pt-5 mt-5 mb-5">
          <div className="row">
            <div className="col-lg-6 col-12 p-4" style={{ borderRadius: '20px' }}>
              <h2 className="py-2">Friendly atmosphere for all </h2>
              <p className=" py-2">A Swiss follower of Jean-Jacques Rousseau’s belief in the inherent goodness of children helper.</p>
              <p>A Swiss follower of Jean-Jacques Rousseau’s belief in the inherent goodness of children helper.
                The kindergarten was developed in the nineteenth century by Friedrich Froebel, a German reformer and educator. He built upon the ideas of Johann Heinrich Pestalozzi.</p>


              <div className="d-inline-flex justify-content-center align-items-center p-3 ms-0  gap-2" style={{ border: "2px solid #00bbae ", borderRadius: '20px' }}>
                <div className="col border-start-0 border-bottom-0 border-top-0" style={{ border: "2px solid #00bbae ", }}>
                  <div className="d-inline-flex justify-content-center align-items-center">
                    <div className=" d-flex justify-content-center align-items-center">
                      <i class="fas fa-medal fa-2x p-4" style={{ color: '#fff', background: '#ff9b24', borderRadius: "50%", width: '75px', height: '75px', }}></i>
                    </div>
                    <div className="d-flex justify-content-center align-items-center p-2">
                      <h6 className="text-center">
                        Full Day Sessions</h6>
                    </div>
                  </div>
                </div>
                <div className="col ">
                  <div className="d-inline-flex justify-content-center align-items-center">
                    <div className="d-inline-flex justify-content-center align-items-center ">
                      <i class="fas fa-tv fa-2x p-3" style={{ color: '#fff', background: '#00bbae', borderRadius: "50%", width: '75px', height: '75px', }}></i>
                    </div>
                    <div className="d-flex justify-content-center align-items-center p-2">
                      <h6 className="text-center">
                        Full Day Sessions</h6>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="col-lg-6 col-12 p-5">
              <div className="row p-3">
                <img src="imgs/pexels-cottonbro-studio-3584926.jpg" className="" alt="" height={"400px"} width={"100%"} style={{ "borderRadius": "0px 80px 0px 80px" }} />
              </div>
            </div>
          </div>
        </div>
      </section>




      <section className="position-relative " style={{ background: '#13bbaf', paddingBottom: "110px" }}>
        <div className="container">
          <div className="row pt-5 mt-5 align-items-center">
            <div className="col-md-8 mx-auto text-center text-white">
              <h2 className=" mt-3 ">What other Say</h2>
              <p className=" mt-2 text-white">Being brave isn’t always a grand gesture sometimes it just means having a go attempting that difficult question, offering an answer in a lesson when you’re simply really trying new.</p>
            </div>
          </div>
          <div className="row  p-lg-4">
            <div className="col-12 " >
              <Carousel additionalTransfrom={0}
                arrows
                autoPlay={true}
                autoPlaySpeed={2000}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false} responsive={responsive}>

                {/* 1card */}
                <div>
                  <div className="carousel-item active mb-4 p-3 " data-bs-interval="2000" >
                    <div className="" style={{ "background": " #cbf5f3", borderRadius: '25px', backgroundColor: '#ffecd6' }} >
                      <div className="row justify-content-center" >
                        <div className="col-lg-3 col-md-3 col-12  p-lg-3 p-md-4 pb-0 ms-lg-0 ms-5">
                          <img className="rounded-circle shadow-1-strong mt-5" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" style={{ width: '100px', height: '100px' }} />
                        </div>
                        <div className="col-lg-9 col-md-9 col-12 p-lg-3 p-md-3 p-5 pt-0 text-start">
                          <h5 className="mt-3 text-dark">Maria Kate</h5>
                          <p className="text-darkj">Photographer</p>
                          <p className="text-dark">
                            <i className="fas fa-quote-left pe-2" />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti
                            nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia
                          </p>
                        </div>
                      </div>

                      <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="far fa-star fa-sm" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="carousel-item active mb-4  p-lg-3" data-bs-interval="2000" >
                    <div className="" style={{ "background": " #cbf5f3", borderRadius: '25px' }} >
                      <div className="row justify-content-center" >
                        <div className="col-lg-3 col-md-3 col-12  p-lg-3 p-md-4 pb-0 ms-lg-0 ms-5">
                          <img className="rounded-circle shadow-1-strong mt-5" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" style={{ width: '100px', height: '100px' }} />
                        </div>
                        <div className="col-lg-9 col-md-9 col-12 p-lg-3 p-md-3 p-5 pt-0 text-start">
                          <h5 className="mt-3 text-dark">Maria Kate</h5>
                          <p className="text-darkj">Photographer</p>
                          <p className="text-dark">
                            <i className="fas fa-quote-left pe-2" />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti
                            nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia
                          </p>
                        </div>
                      </div>

                      <ul className="list-unstyled d-flex justify-content-center text-warning mb-3">
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="far fa-star fa-sm" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="carousel-item active mb-4  p-3" data-bs-interval="2000" >
                    <div className="" style={{ "background": " #cbf5f3", borderRadius: '25px', backgroundColor: '#ffecd6' }} >
                      <div className="row justify-content-center" >
                        <div className="col-lg-3 col-md-3 col-12  p-lg-3 p-md-4 pb-0 ms-lg-0 ms-5">
                          <img className="rounded-circle shadow-1-strong mt-5" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" style={{ width: '100px', height: '100px' }} />
                        </div>
                        <div className="col-lg-9 col-md-9 col-12 p-lg-3 p-md-3 p-5 pt-0 text-start">
                          <h5 className="mt-3 text-dark">Maria Kate</h5>
                          <p className="text-darkj">Photographer</p>
                          <p className="text-dark">
                            <i className="fas fa-quote-left pe-2" />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti
                            nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia
                          </p>
                        </div>
                      </div>

                      <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="far fa-star fa-sm" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="carousel-item active mb-4  p-3" data-bs-interval="2000" >
                    <div className="" style={{ "background": " #cbf5f3", borderRadius: '25px' }} >
                      <div className="row justify-content-center" >
                        <div className="col-lg-3 col-md-3 col-12  p-lg-3 p-md-4 pb-0 ms-lg-0 ms-5">
                          <img className="rounded-circle shadow-1-strong mt-5" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" style={{ width: '100px', height: '100px' }} />
                        </div>
                        <div className="col-lg-9 col-md-9 col-12 p-lg-3 p-md-3 p-5 pt-0 text-start">
                          <h5 className="mt-3 text-dark">Maria Kate</h5>
                          <p className="text-darkj">Photographer</p>
                          <p className="text-dark">
                            <i className="fas fa-quote-left pe-2" />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti
                            nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia
                          </p>
                        </div>
                      </div>

                      <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="far fa-star fa-sm" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="carousel-item active mb-4  p-3" data-bs-interval="2000" >
                    <div className="" style={{ "background": " #cbf5f3", borderRadius: '25px', backgroundColor: '#fff' }} >
                      <div className="row justify-content-center" >
                        <div className="col-lg-3 col-md-3 col-12  p-lg-3 p-md-4 pb-0 ms-lg-0 ms-5">
                          <img className="rounded-circle shadow-1-strong mt-5" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" style={{ width: '100px', height: '100px' }} />
                        </div>
                        <div className="col-lg-9 col-md-9 col-12 p-lg-3 p-md-3 p-5 pt-0 text-start">
                          <h5 className="mt-3 text-dark">Maria Kate</h5>
                          <p className="text-darkj">Photographer</p>
                          <p className="text-dark">
                            <i className="fas fa-quote-left pe-2" />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti
                            nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia
                          </p>
                        </div>
                      </div>

                      <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="fas fa-star fa-sm" /></li>
                        <li><i className="far fa-star fa-sm" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
        <div className="row  start-50  position-absolute top-100 translate-middle" style={{ width: '100%', height: '40px' }}>
          <img src="imgs/wave-section-break.webp" className="img-fluid" width={"100%"}></img>
        </div>
      </section>

      <section style={{ paddingBottom: '110px', paddingTop: '' }}>
        <div className="container">
          <div className="row p-lg-5 text-center">
            <h2 className="mt-3  ">Our Best Speakers</h2>
            <p className="fs-5 text-secondary">With the help of teachers and the environment as the third teacher, students<br />
              have opportunities to confidently take risks.</p>
          </div>
          <div className="">
            <Carousel additionalTransfrom={0}
              arrows
              autoPlay={true}
              autoPlaySpeed={2000}
              centerMode={false}
              className=""
              containerClass="container-with-dots"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              renderDotsOutside={false} responsive={SpeakerSlider}>

              {/* 1card */}
              <div>
                <div className="col mt-2">
                  <div className='wrapper p-2'>
                    <div className='pcard '>
                      <img src='./images/speaker1.jpg' className="ProfilePicture" alt='ProfilePicture' />
                      <div className='ProfileName'>
                        <h5 className="text-center">Tom Curuse</h5>
                        <p className="text-center">Ceo</p>
                        <h5 className=""></h5>
                        <ul className="SocialIcon  ">
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-facebook" />
                          </li>
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-twitter" />
                          </li>
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-google-plus" /></li>
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-linkedin" /></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="col">
                  <div className='wrapper p-2'>
                    <div className='pcard'>
                      <img src='./images/speaker3.jpg' className="ProfilePicture" alt='ProfilePicture' />
                      <div className='ProfileName'>
                        <h5 className="text-center">Tom Curuse</h5>
                        <p className="text-center">Ceo</p>
                        <h5 className=""></h5>
                        <ul className="SocialIcon  ">
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-facebook" />
                          </li>
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-twitter" />
                          </li>
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-google-plus" /></li>
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-linkedin" /></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="col">
                  <div className='wrapper p-2'>
                    <div className='pcard'>
                      <img src='./images/speaker4.jpg' className="ProfilePicture" alt='ProfilePicture' />
                      <div className='ProfileName'>
                        <h5 className="text-center">Tom Curuse</h5>
                        <p className="text-center">Ceo</p>
                        <h5 className=""></h5>
                        <ul className="SocialIcon  ">
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-facebook" />
                          </li>
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-twitter" />
                          </li>
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-google-plus" /></li>
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-linkedin" /></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="col">
                  <div className='wrapper p-2'>
                    <div className='pcard'>
                      <img src='./images/speaker5.jpg' className="ProfilePicture" alt='ProfilePicture' />
                      <div className='ProfileName'>
                        <h5 className="text-center">Tom Curuse</h5>
                        <p className="text-center">Ceo</p>
                        <h5 className=""></h5>
                        <ul className="SocialIcon  ">
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-facebook" />
                          </li>
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-twitter" />
                          </li>
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-google-plus" /></li>
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-linkedin" /></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="col">
                  <div className='wrapper p-2'>
                    <div className='pcard'>
                      <img src='./images/speaker6.jpg' className="ProfilePicture" alt='ProfilePicture' />
                      <div className='ProfileName'>
                        <h5 className="text-center">Tom Curuse</h5>
                        <p className="text-center">Ceo</p>
                        <h5 className=""></h5>
                        <ul className="SocialIcon  ">
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-facebook" />
                          </li>
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-twitter" />
                          </li>
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-google-plus" /></li>
                          <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-linkedin" /></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </section >

      {/* speaker end section */}


      <section style={{ paddingBottom: '70px', paddingTop: '120px' }}>
        <div className="container" >

          <div className="d-flex flex-column flex-lg-row gap-5 justify-content-eventuly">

            <div className="d-inline-flex border border-3 border-warning p-5 mb-3 shadow-lg " style={{ borderRadius: '32px' }}>
              <div className="d-inline-flex justify-content-center align-items-center">
                <i className="fas fa-star fa-3x p-2 rankboxicon" style={{ color: '#fff', background: '#ff9b24', borderRadius: "15% 85% 61% 39% / 41% 45% 55% 59%", width: '75px', height: '75px', }}></i>
                <h4 className="fw-bold" style={{ fontSize: '65px' }}><CountUp end={11} duration={5} scrollSpyDelay={1000} enableScrollSpy={true}  />+</h4>
              </div>
              <div className=" p-0 d-flex justify-content-center align-items-center text-center ">
                <h5 className=""> Years of experience</h5>
              </div>
            </div>


            <div className=" d-inline-flex border border-3 border-warning  shadow-lg p-5 mb-3 " style={{ borderRadius: '32px' }}>
              <div className=" d-inline-flex justify-content-center align-items-center">
                <i className="fas fa-user-graduate fa-3x p-2" style={{ color: '#fff', background: '#ff9b24', borderRadius: "15% 85% 61% 39% / 41% 45% 55% 59%", width: '75px', height: '75px', }}></i>
                <h4 className="fw-bold" style={{ fontSize: '65px' }}><CountUp end={7} duration={5} scrollSpyDelay={1000} enableScrollSpy={true} />K</h4>
              </div>
              <div className="p-0 d-flex justify-content-center align-items-center text-center">
                <h5 className=" text-start p-4"> Students each year</h5>
              </div>
            </div>

            <div className="d-inline-flex border border-3 border-warning  shadow-lg p-5 mb-3 " style={{ borderRadius: '32px' }}>
              <div className=" d-inline-flex justify-content-center align-items-center">
                <i className="fas fa-medal fa-3x p-2" style={{ color: '#fff', background: '#ff9b24', borderRadius: "15% 85% 61% 39% / 41% 45% 55% 59%", width: '75px', height: '75px', }}></i>
                <h4 className="fw-bold" style={{ fontSize: '65px' }}><CountUp end={15} duration={5} scrollSpyDelay={1000} enableScrollSpy={true} />K+</h4>
              </div>
              <div className=" d-inline-flex justify-content-center align-items-center text-center">
                <h5 className=" text-start   p-4"> Courses & programs</h5>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  )
}
export default About;