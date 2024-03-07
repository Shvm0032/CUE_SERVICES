import React, { useEffect } from "react"
import 'bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from "react-router-dom";
import '../css/Home.modules.css';
import CountUp from 'react-countup';
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../redux/courseSlice';
import { fetchSpeakers } from '../../redux/speakerSlice';
import Homeimg1 from '../../assets/Home/curved-line-2.webp';
//images 
import Homeimg2 from '../../assets/Home/Home2.webp';
import Homeimg3 from '../../assets/Home/Home3.webp';
import Homeimg4 from '../../assets/Home/Home4.webp';
import Homeimg5 from '../../assets/Home/Home5.jpg';
import Homeicon1 from '../../assets/Home/Homeicon1.gif';
import Homeicon2 from '../../assets/Home/Homeicon2.gif';
import Homeicon3 from '../../assets/Home/Homeicon3.gif';
const Home = () => {
  const IMGurl = process.env.REACT_APP_IMG_URL;
  //console.log(IMGurl);


  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);
  const speakers = useSelector((state) => state.speaker.speakers);
  const status = useSelector((state) => state.course.status);
  const error = useSelector((state) => state.course.error);


  useEffect(() => {

    // Fetch courses data when the component mounts
    dispatch(fetchCourses());
    dispatch(fetchSpeakers());
  }, [dispatch]);

  // Render based on the status
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  const unique_id = uuid();
  if (localStorage.getItem('unique_id')) {

  }
  else {
    localStorage.setItem('unique_id', unique_id);
  }



  const Siderresponsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
      autoPlay: false,
      slidesToSlide: 1,


    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,


    },
    tablet: {
      breakpoint: { max: 1024, min: 564 },
      items: 2,
      slidesToSlide: 1

    },
    mobile: {
      breakpoint: { max: 564, min: 0 },
      items: 1,
      slidesToSlide: 1

    }
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
      autoPlay: false,

    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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




  return (
    <div className="Home">
      <section className='HeroSection' >
        {/* second card */}
        <div className="container-xl  container-fluid p-lg-3 p-md-3 p-3">
          <div className="row py-4 align-items-center">
            <div className=" col-lg-6 col-md-6 col-12  p-lg-5 p-5  ">
              <div className=" d-sm-none d-lg-flex" style={{ width: '100px', marginLeft: "75%", }}>
                <img src={Homeimg1} class=" w-100 h-100 BouncingImg" alt="img" />
              </div>
              <div className="row my-lg-3 my-md-3 my-3">
                <span className="" style={{ color: "rgb(19, 187, 175)", fontSize: "23px", fontWeight: '600' }}>CEU Services<br /></span>
                <h1 >Best Online Courses</h1>
                {/* <h5>{localStorage.getItem('unique_id')}</h5> */}
                <div class="p-lg-2 p-2">
                  <Link to="/course"><button class="button1 rounded-pill"> View All Cources</button></Link> &emsp; &emsp;
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-12 p-lg-2 px-lg-2  p-2">
              <div className=" align-items-center">
                <img src={Homeimg2} className="shapesimg" alt="" style={{ mixBlendMode: "darken" }} />
              </div>
            </div>
          </div>
        </div>

      </section>



      <section style={{ paddingBottom: '120px', paddingTop: '110px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className=" col-12  text-center pt-5">
              <div className="bd-section-title-wrapper text-center mb-55 wow fadeInUp" style={{ marginBottom: '55px' }}>
                <h2 className="bd-section-title mb-0">Our Offerings</h2>
                <p className="">Our multi-level kindergarten programs cater to the age group of 2-5 years<br /> with a curriculum focussing children.</p>
              </div>
            </div>
          </div>
          <div className="row px-3">
            <div className="col-12">
              <Carousel
                additionalTransfrom={0}
                arrows={false}
                autoPlay={false}
                autoPlaySpeed={2000}
                centerMode={false}
                className="carousel-container" // Add a class to the container
                containerClass="container-with-dots"
                dotListClass="dot"
                draggable
                focusOnSelect={true}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                showDots={false}
                renderDotsOutside={false}
                partialVisible={true}
                responsive={Siderresponsive}
              >
                {/* 1 card  */}
                <div style={{ margin: '0 12px' }}>
                  <div className="Offer-card-body">
                    <div className="Offer-card-bg" style={{ padding: '40px' }}>
                      <div className="row d-flex align-items-center  justify-content-center  justify-content-center   " >
                        <div className="card-icon">
                          <i className="fa fa-user fa-3x  "></i>
                        </div>
                        <div className="row offer-card-detail text-center my-2 justify-content-center">
                          <h3>
                            Live
                          </h3>
                          <p className='mt-2'>
                            Browse wide-range of CEU Webinars  and  Training Session
                            {/* We provide on demand services for your business. */}
                          </p>
                          <div className="col my-2">
                            <Link to='/course'>
                              <button class="View-Details-btn">View Details</button>
                            </Link>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                {/* 2card */}
                <div style={{ margin: '0 12px' }}>
                  <div className="Offer-card-body">
                    <div className="Offer-card-bg" style={{ padding: '40px' }}>
                      <div className="row d-flex align-items-center  justify-content-center  justify-content-center   " >
                        <div className="card-icon">
                          <i class="fab fa-line fa-3x"></i>
                        </div>
                        <div className="row offer-card-detail text-center my-2 justify-content-center">
                          <h3>
                            On Demands
                          </h3>
                          <p className='mt-2'>
                            Allow you to learn anytime, anywhere
                            {/* We provide on demand services for your business. */}
                          </p>
                          <div className="col my-2">
                            <Link to='/course'>
                              <button class="View-Details-btn">View Details</button>
                            </Link>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 card */}
                <div style={{ margin: '0 12px' }}>
                  <div className="Offer-card-body">
                    <div className="Offer-card-bg" style={{ padding: '40px' }}>
                      <div className="row d-flex align-items-center  justify-content-center  justify-content-center   " >
                        <div className="card-icon">
                          <i className="fa fa-video fa-3x  "></i>
                        </div>
                        <div className="row offer-card-detail text-center my-2 justify-content-center">
                          <h3>
                            E-Transcript
                          </h3>
                          <p className='mt-2'>
                            Learn from the top subject-matter-Experts
                            {/* We provide on demand services for your business. */}
                          </p>
                          <div className="col my-2">
                            <Link to='/course'>
                              <button class="View-Details-btn">View Details</button>
                            </Link>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </Carousel>

            </div>
          </div>

        </div>

      </section>


      {/*-------------*************----- second section------************** */}
      <section style={{ paddingBottom: '120px', paddingTop: '110px' }} >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6  ">
              <div className="HeroImage me-5 ">
                <img src={Homeimg3} alt="" style={{ width: "100%", }} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row" style={{ textAlign: 'justify' }}>
                <h2 className="text-start my-3 " style={{}}>Best for Level-up</h2>
                <p className="text-start my-3  lh-base" style={{ lineHeight: "30px" }}>
                  Craft engaging webinars with relevant topics, visuals, and actionable insights. Encourage interaction, feature guest speakers, provide follow-up resources, and collect feedback for improvement.                </p>
              </div>
              <div className="my-3">
                <div className="d-flex  flex-column flex-lg-row flex-md-row  justify-content-around p-3 border" style={{ backgroundColor: '#00bbae', borderRadius: '25px' }}>
                  <div className="col">
                    <div className="d-flex flex-row flex-md-column border-2 border-end text-center align-items-center" >
                      <div className="col fw-bolder text-white"><span className="fw-bold p-3" style={{ fontSize: '45px' }} > <CountUp end={14} duration={5} scrollSpyDelay={1000} enableScrollSpy={true} />+</span></div>
                      <div className="col"><p className=" text-center text-white lh-sm mt-1" style={{ fontSize: '16px' }}> Years of experience</p></div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="d-flex flex-row  flex-md-column border-2 border-end text-center align-items-center">
                      <div className="col fw-bolder text-white"><span className="fw-bold p-3" style={{ fontSize: '45px' }}>  <CountUp end={7} duration={5} scrollSpyDelay={1000} enableScrollSpy={true} />K+</span></div>
                      <div className="col"><p className=" text-center text-white lh-sm mt-1" style={{ fontSize: '16px' }}> Students
                        each year</p></div>
                    </div></div>
                  <div className="col">
                    <div className="d-flex flex-row flex-md-column align-items-center">
                      <div className="col fw-bolder text-center text-white"><span className="fw-bold p-3" style={{ fontSize: '45px' }}><CountUp end={15} duration={5} scrollSpyDelay={1000} enableScrollSpy={true} />+ </span></div>
                      <div className="col"><p className=" text-center text-white lh-sm mt-1" style={{ fontSize: '16px' }}> Online Courses</p></div>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="mt-3 p-0 list-unstyled">
                <li className="">
                  <p> <i className="fa-solid fa-angle-up fa-rotate-90 p-1" style={{ color: '#000', width: '26px', height: '26px', borderRadius: '50%', background: '#00bbae' }} />&emsp;  Look for trending topics in your industry or niche.</p>
                </li>
                <li>
                  <p> <i className="fa-solid fa-angle-up fa-rotate-90  p-1" style={{ color: '#000', width: '26px', height: '26px', borderRadius: '50%', background: '#00bbae' }} />&emsp; Share real-life examples and success stories to illustrate key points.</p>
                </li>
              </ul>
              <div className="row mt-5">
                <Link to='/Contactus'>
                  <button class="Applynow type1"></button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* home page 3 section start here ******(our cources)************ */}
      <section className='backgroundColor' style={{ paddingBottom: '120px', }} >
        <div className="container">

          <div className='row pt-5 mt-5' >
            <div className="col-12" >
              <h2 className="text-center pt-5 mt-4 ">Our Programs</h2>
              <p className='text-center mt-2'>
                Lorem ipsum odor amet, consectetuer adipiscing elit. Conubia integer est. Sit turpis.
              </p>
            </div>
          </div>
          <div className='row p-4'>
            <Carousel additionalTransfrom={0}
              arrows
              autoPlay={true}
              autoPlaySpeed={2000}
              centerMode={false}
              className="carousel-container"
              containerClass="container-with-dots"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={true}
              renderDotsOutside={true} responsive={responsive}>
              {/* first card */}
              {courses.map((course) => (
                <div style={{ margin: '0 12px' }} key={course.id}>
                  <div className='col-lg-4 col-md-6 col-12 mb-5' style={{ width: '28rem' }}>
                    <Link to={`/Course_Detail/${course?.slug}`}>
                      <div className='newsCard news-Slide-up '>
                        <div className='img-div'>
                          <img src={`${IMGurl}/${course.course_thumbail}`} className='course-img' alt="Course_thumnail" />
                        </div>
                        <div className='newsCaption'>
                          <div className='d-flex gap-4'>
                            <p className='newsCaption-content mb-3' >
                              <i class="fas fa-chalkboard-teacher fa-lg" style={{ color: '#00bbae' }}></i>&emsp;{course.name}
                            </p>
                            <p className='newsCaption-content mb-3'>
                              <i class="fas fa-clock fa-lg" style={{ color: '#00bbae' }}></i>&emsp;{course.est_time}
                            </p>
                          </div>
                          <div className='newsCaption-title'>
                            <h5>{course.title}</h5>
                          </div>
                          <div className="row  mt-0">
                            <div className="p-4">
                              <div className="d-flex justify-content-center align-items-center p-3 text-center mstt">
                                <div className="col boder-4">
                                  <h5 className=''><i class="fa-solid fa-calendar-days fa-lg"></i>&emsp; {course.date}</h5>
                                </div>
                                {/* <div className="col border-end boder-4"><h6>Date<br /></h6></div> */}
                                <div className="col border-start text-center"><h5><i className="fa-solid fa-stopwatch-20 fa-lg"></i>&emsp;{course.duration} min </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='d-flex ps-3'>
                            <button className="animated-button" >
                              <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                ></path>
                              </svg>&emsp;
                              <span className="text">Read More</span>
                              <span className="circle"></span>&emsp;
                              <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </Carousel>

          </div>
        </div>
      </section>

      {/* home page 2 section end here ******(our cources)************ */}

      <div className="container-fluid " style={{ paddingBottom: '120px', }}>
        <div className="container">
          <div className="row pt-5 align-items-center my-5" >
            <div className="col-xl-6  col-lg-6 col-12">
              <h2 className="text-start my-5 lh-base" style={{}}>Know More<br /> About CuService</h2>
              <div className="row">
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                      <button class="accordion-button collapsed " style={{ background: '#ff9b24', borderRadius: '10px' }} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Who we are ?
                      </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">We are a team of experienced professionals, passionate about providing high-quality CEU Webinars on statutory and regulatory compliance areas. With years of experience in the industry, we have developed a deep understanding of the challenges faced by organizations in meeting their compliance obligations.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTwo">
                      <button class="accordion-button collapsed " style={{ borderRadius: '10px' }} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        What we do ?
                      </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                        At CEU Trainers, we believe in providing a personalized experience for our clients. Keeping the unique compliance needs in the mind, we offer tailored trainings to meet the specific needs of individuals and organizations, ensuring knowledge & tools needed to stay compliant.                        </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingThree">
                      <button class="accordion-button collapsed" style={{ borderRadius: '10px' }} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        Our Mission & Vision
                      </button>
                    </h2>
                    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                        Our mission is to help organizations and individuals stay up-to-date with the latest compliance issues and minimize their risk of non-compliance and earn CEU Credits in that process.                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12  " data-aos="fade-up">
              <div className="HeroImage ms-5 mt-lg-0 mt-5">
                <img src={Homeimg4} alt="..." style={{ width: "100%" }} />
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* 5 section end here for brandbox start*/}
      {/* ashu section start here  */}
      <section className="ashu mt-5">
        <div className='container-fluid p-lg-5  ' style={{ borderBottom: '10px solid #ff9b24', backgroundImage: '' }}>
          <div className='container p-e'>
            <div className='row'>
              <div className='mt-4 col-12 col-md-8 offset-md-2 text-center text-white'>
                <h2 className=" mt-3 fw-bold text-white" data-aos="fade-up ">Join Our New Session</h2>
                <p className=" text-white my-4">CEU believes that good questions drive good answers. Whether it's a query
                  about the world around us or a challenge.</p>
                {/* <div className='row imgarrow text-center '></div> */}
                <Link to='/Contactus'>
                  <button className='my-5 button-Join rounded-pill shadow'>Purchase Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ashu section end here  */}


      {/* 4 section start here for our speaker start here */}
      <section className=" team section-padding" style={{ paddingBottom: '120px', paddingTop: '110px' }}>
        <div className="container-fluid pt-3">
          <div className="row align-items-center ">
            <div className="col-12 text-center">
              <h2 className="text-center my-3">Course Instructors</h2>
              <p className="text-center">Sed quis nisi nisi. Proin consectetur porttitor dui sit amet viverra. Fusce sit amet lorem faucibus.</p>
            </div>
          </div>
          <div className="container p-4 mt-4">
            <div className="row">
              <Carousel
                additionalTransfrom={0}
                arrows={false}
                autoPlay={true}
                autoPlaySpeed={2000}
                centerMode={false}
                className="carousel-container" // Add a class to the container
                containerClass="container-with-dots"
                dotListClass="dot"
                draggable
                focusOnSelect={true}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                showDots={false}
                renderDotsOutside={false}
                partialVisible={true}
                responsive={Siderresponsive}
              >
                {speakers.map((speaker) => (
                  <div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-3" style={{ width: '22rem' }} >
                      <Link to={`/speaker/${speaker?.speaker_id}`}>
                        <div className="our-team" >
                          <div className="picture ">
                            <img className="img-fluid" alt='Speaker' src={`${IMGurl}/${speaker.images}`} />
                          </div>

                          <div className="team-content">
                            <h3 className="name">{speaker.name}</h3>
                            <h4 className="title">{speaker.title}</h4>
                          </div>
                          <ul className="social">
                            <li><Link to="/" className="fab fa-facebook" aria-hidden="true" />
                            </li>
                            <li><Link to="/" className="fab fa-twitter" aria-hidden="true" />
                            </li>
                            <li><Link to="/" className="fab fa-google-plus" aria-hidden="true" /></li>
                            <li><Link to="/" className="fab fa-linkedin" aria-hidden="true" />
                            </li>
                          </ul>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </Carousel>

            </div>
          </div>


        </div>
      </section>

      {/* 4section start here for our speaker end here */}


      {/* testmonila section */}

      <section style={{ background: '#13bbaf', paddingBottom: '120px', paddingTop: '90px' }}>
        <div className="container-fluid p-lg-5 p-5"  >
          <div className="container ">
            <div className="row align-item-center pt-5cy" >
              <div className="col-lg-6 col-md-12 col-12 my-5 ">
                <img src={Homeimg5} alt="" style={{ height: "400px", width: "100%", borderRadius: "25px" }} />
              </div>
              <div className="col-lg-6 col-md-12v col-12 mb-5">
                <h2 className="text-start   text-white mt-5">What Students Say</h2>

                {/* <!-- Carousel wrapper --> */}
                <div id="carouselExampleControls" className="carousel slide text-center mt-5" data-bs-ride="carousel" >


                  < div className="carousel-inner" style={{ borderRadius: '25px' }} >
                    {/* 1card */}
                    <div className="carousel-item active p-3" data-bs-interval="2000" style={{ "background": " #cbf5f3", backgroundColor: '#ffecd6' }}>
                      <div className="row justify-content-center">
                        <div className="col-lg-3 col-md-3 col-12  p-lg-3 p-md-4 pb-0 ms-lg-0  ">
                          <img className="rounded-circle shadow-1-strong mt-5" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" style={{ width: '100px', height: '100px' }} />
                        </div>
                        <div className="col p-3 text-start">
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

                    {/* 2 card*/}
                    <div className="carousel-item active p-3" data-bs-interval="2000" style={{ "background": " #cbf5f3" }}>
                      <div className="row justify-content-center">
                        <div className="col-lg-3 col-md-3 col-12  p-lg-3 p-md-4 pb-0 ms-lg-0  ">
                          <img className="rounded-circle shadow-1-strong mt-5" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" style={{ width: '100px', height: '100px' }} />
                        </div>
                        <div className="col p-3 text-start">
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
                    {/* 3 card */}

                    {/* 4 card */}
                    <div className="carousel-item active p-3" data-bs-interval="2000" style={{ "background": " #cbf5f3", backgroundColor: '#ffecd6' }}>
                      <div className="row justify-content-center">
                        <div className="col-lg-3 col-md-3 col-12  p-lg-3 p-md-4 pb-0 ms-lg-0  ">
                          <img className="rounded-circle shadow-1-strong mt-5" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" style={{ width: '100px', height: '100px' }} />
                        </div>
                        <div className="col p-3 text-start">
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

                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
                {/* <!-- Carousel wrapper --> */}
              </div>
            </div>
          </div>

        </div>

      </section >
      {/* seduu section start here */}

      <section section className=" background " style={{ paddingTop: '110px' }} >

        <div className="container">
          <div className="row" data-aos="fade-up">
            <div className="col-lg-8 offset-lg-2 col-12  text-center mt-2">
              <h2 className="mt-5" data-aos="fade-up">
                Achieve Your Goals with Us</h2>
              <p className=" text-center">
                Unlock your potential and achieve your Goals with our innovative approach to Learning.
                We provide a comprehensive solution for modern learners, empowering them to succeed in their careers and beyond.
              </p>
            </div>
          </div>

          <div className="d-flex flex-column  flex-lg-row gap-5 justify-content-eventuly" style={{ paddingTop: '55px' }}>
            <div className="Offer-card-body">
              <div className="Offer-card-bg" style={{ padding: '40px' }}>
                <div className="row d-flex align-items-center  justify-content-center  justify-content-center   " >
                  <div className="card-icon">
                    <img src={Homeicon1} className="rounded-circle" style={{ width: '100%' }} alt="" />
                  </div>
                  <div className="row offer-card-detail text-center my-2 justify-content-center">
                    <h3>Essential Skills</h3>
                    <p className='mt-2'>Keep up your skills to meet industry standards.</p>
                    <div className="col my-2">
                      <Link to='/course'>
                        <button class="View-Details-btn">View Details</button>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="Offer-card-body ">
              <div className="Offer-card-bg" style={{ padding: '40px' }}>
                <div className="row d-flex align-items-center  justify-content-center  justify-content-center   " >
                  <div className="card-icon">
                    <img src={Homeicon2} className="rounded-circle" style={{ width: '100%' }} alt="" />

                  </div>
                  <div className="row offer-card-detail text-center my-2 justify-content-center">
                    <h3> Ready for Job</h3>
                    <p className='mt-2'>
                      With high demands in mastering new skills
                    </p>
                    <div className="col my-2">
                      <Link to='/course'>

                        <button class="View-Details-btn">View Details</button>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="Offer-card-body">
              <div className="Offer-card-bg" style={{ padding: '40px' }}>
                <div className="row d-flex align-items-center  justify-content-center  justify-content-center   " >
                  <div className="card-icon">
                    <img src={Homeicon3} className="rounded-circle" style={{ width: '100%' }} alt="" />
                  </div>
                  <div className="row offer-card-detail text-center my-2 justify-content-center">
                    <h3>Earn Credits</h3>
                    <p className='mt-2'>
                      From the Regulators and the Accreditors File
                    </p>
                    <div className="col my-2">
                      <Link to='/course'>
                        <button class="View-Details-btn">View Details</button>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section ><br /><br />
    </div>
  );
}
export default Home;
