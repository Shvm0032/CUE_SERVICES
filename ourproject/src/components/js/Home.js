import React from "react"
import 'bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from "react-router-dom";
import '../css/Home.modules.css';
import CountUp from 'react-countup';

const Home = () => {

  // var [Cources, setCources] = useState([]);
  // var getData = async () => {
  //   try {
  //     var res = await axios.get("http://localhost:8000/api/Course");
  //     console.log(res);
  //     setCources(res.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }
  // useEffect(() => {
  //   getData();
  // }, []);


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
              <div className=" d-sm-none d-lg-flex" style={{width:'100px', marginLeft: "75%", }}>
                <img src="img/curved-line-2.webp" class=" w-100 h-100 BouncingImg" alt="img"/>
              </div>
              <div className="row my-lg-3 my-md-3 my-3">
                <span className="" style={{ color: "rgb(19, 187, 175)", fontSize: "23px", fontWeight: '600' }}>CEU Services<br /></span>
                <h1 >Best Online Courses</h1>
                <div class="p-lg-2 p-2">
                  <Link to="/Webinar" ><button class="button1 rounded-pill"> View All Cources</button></Link> &emsp; &emsp;
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-12 p-lg-2 px-lg-2  p-2">
              <div className=" align-items-center">
       <img src="img/2.webp" className="shapesimg" alt="" style={{mixBlendMode:"darken"}}/>
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
                            On Demands
                          </h3>
                          <p className='mt-2'>
                            We provide on demand services for your business.
                          </p>
                          <div className="col my-2">
                            <button class="View-Details-btn">View Details</button>
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
                            We provide on demand services for your business.
                          </p>
                          <div className="col my-2">
                            <button class="View-Details-btn">View Details</button>
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
                            On Demands
                          </h3>
                          <p className='mt-2'>
                            We provide on demand services for your business.
                          </p>
                          <div className="col my-2">
                            <button class="View-Details-btn">View Details</button>
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
                <img src="img/3.webp" alt="" style={{ width: "100%", }} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <h2 className="text-start my-3 " style={{}}>Best for Level-up</h2>
                <p className="text-start my-3  lh-base" style={{ lineHeight: "30px" }}>Being brave isn’t always a grand gesture sometimes it just means having a go attempting that difficult question, offering an answer in a lesson when you’re simply really trying new.</p>
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
                  <p> <i className="fa-solid fa-angle-up fa-rotate-90 p-1" style={{ color: '#000', width: '26px', height: '26px', borderRadius: '50%', background: '#00bbae' }} />&emsp; We believe every child is intelligent so we care.</p>
                </li>
                <li>
                  <p> <i className="fa-solid fa-angle-up fa-rotate-90  p-1" style={{ color: '#000', width: '26px', height: '26px', borderRadius: '50%', background: '#00bbae' }} />&emsp; We believe every child is intelligent so we care.</p>
                </li>
              </ul>
              <div className="row mt-5">
                <button class="Applynow type1">
                </button>
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
              <div style={{ margin: '0 12px' }}>
                <article>
                  <div className="article-wrapper p-3">
                    <figure>
                      <img src='images/WhatsApp Image 2023-10-22 at 20.49.00_5b7b6b67.jpg' alt="" style={{ borderRadius: '24px' }} />

                    </figure>
                    <div className="article-body">
                      <div>
                        <h6 className="mt-2 text-center">
                          <i class="fa-solid fa-volume-high" style={{ "color": "#e13214" }}></i>
                          &emsp; Schwartz
                        </h6>
                        <h5 className="cssut text-center">
                          Travel Pay &amp; FLSA Compliance 2023 Travel Pay &amp; FLSA
                          Compliance...
                        </h5>
                      </div>

                      <div className="row  mt-0">
                        <div className="p-3">
                          <div className="row p-3 text-center mstt">
                            <div className="col border-end boder-4"><h6>1 PM<br /> EST</h6></div>
                            <div className="col border-end boder-4">   <h6>JUNE <br /> 30</h6></div>
                            <div className="col">  <h6>
                              Duration <br />90 min</h6>
                            </div></div>
                        </div>
                      </div>
                      <Link to="/" className="read-more">
                        Read more <span className="sr-only">about this is some title</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
              {/* second card */}
              <div style={{ margin: '0 12px' }}>
                <article>
                  <div className="article-wrapper p-3">
                    <figure>
                      <img src='images/WhatsApp Image 2023-10-22 at 20.49.00_5b7b6b67.jpg' alt="" style={{ borderRadius: '24px' }} />

                    </figure>
                    <div className="article-body">
                      <div>
                        <h6 className="mt-2 text-center">
                          <i class="fa-solid fa-volume-high" style={{ "color": "#e13214" }}></i>
                          &emsp; Schwartz
                        </h6>
                        <h5 className="cssut text-center">
                          Travel Pay &amp; FLSA Compliance 2023 Travel Pay &amp; FLSA
                          Compliance...
                        </h5>
                      </div>

                      <div className="row  mt-0">
                        <div className="p-3">
                          <div className="row p-3 text-center mstt">
                            <div className="col border-end boder-4"><h6>1 PM<br /> EST</h6></div>
                            <div className="col border-end boder-4">   <h6>JUNE <br /> 30</h6></div>
                            <div className="col">  <h6>
                              Duration <br />90 min</h6>
                            </div></div>
                        </div>
                      </div>
                      <Link to="/" className="read-more">
                        Read more <span className="sr-only">about this is some title</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
              {/* third card */}
              <div style={{ margin: '0 12px' }}>

                <article>
                  <div className="article-wrapper  p-3">
                    <figure>
                      <img src='images/WhatsApp Image 2023-10-22 at 20.49.00_5b7b6b67.jpg' alt="" />

                    </figure>
                    <div className="article-body">
                      <div>
                        <h6 className="mt-2 text-center">
                          <i class="fa-solid fa-volume-high" style={{ "color": "#e13214" }}></i>
                          &emsp; Schwartz
                        </h6>
                        <h5 className="cssut text-center">
                          Travel Pay &amp; FLSA Compliance 2023 Travel Pay &amp; FLSA
                          Compliance...
                        </h5>
                      </div>

                      <div className="row  mt-0">
                        <div className="p-3">
                          <div className="row p-3 text-center mstt">
                            <div className="col border-end boder-4"><h6>1 PM<br /> EST</h6></div>
                            <div className="col border-end boder-4">   <h6>JUNE <br /> 30</h6></div>
                            <div className="col">  <h6>
                              Duration <br />90 min</h6>
                            </div></div>
                        </div>
                      </div>
                      <Link to="/" className="read-more">
                        Read more <span className="sr-only">about this is some title</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>

              </div>
              {/* forth card  */}
              <div style={{ margin: '0 12px' }}>
                <article>
                  <div className="article-wrapper p-3">
                    <figure>
                      <img src='images/WhatsApp Image 2023-10-22 at 20.49.00_5b7b6b67.jpg' alt="" />

                    </figure>
                    <div className="article-body">
                      <div>
                        <h6 className="mt-2 text-center">
                          <i class="fa-solid fa-volume-high" style={{ "color": "#e13214" }}></i>
                          &emsp; Schwartz
                        </h6>
                        <h5 className="cssut text-center">
                          Travel Pay &amp; FLSA Compliance 2023 Travel Pay &amp; FLSA
                          Compliance...
                        </h5>
                      </div>

                      <div className="row  mt-0">
                        <div className="p-3">
                          <div className="row p-3 text-center mstt">
                            <div className="col border-end boder-4"><h6>1 PM<br /> EST</h6></div>
                            <div className="col border-end boder-4">   <h6>JUNE <br /> 30</h6></div>
                            <div className="col">  <h6>
                              Duration <br />90 min</h6>
                            </div></div>
                        </div>
                      </div>
                      <Link to="/" className="read-more">
                        Read more <span className="sr-only">about this is some title</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>


              </div>
              {/* fifth card */}
              <div style={{ margin: '0 12px' }}>
                <article>
                  <div className="article-wrapper p-3">
                    <figure>
                      <img src='images/WhatsApp Image 2023-10-22 at 20.49.00_5b7b6b67.jpg' alt="" />

                    </figure>
                    <div className="article-body">
                      <div>
                        <h6 className="mt-2 text-center">
                          <i class="fa-solid fa-volume-high" style={{ "color": "#e13214" }}></i>
                          &emsp; Schwartz
                        </h6>
                        <h5 className="cssut text-center">
                          Travel Pay &amp; FLSA Compliance 2023 Travel Pay &amp; FLSA
                          Compliance...
                        </h5>
                      </div>

                      <div className="row  mt-0">
                        <div className="p-3">
                          <div className="row p-3 text-center mstt">
                            <div className="col border-end boder-4"><h6>1 PM<br /> EST</h6></div>
                            <div className="col border-end boder-4">   <h6>JUNE <br /> 30</h6></div>
                            <div className="col">  <h6>
                              Duration <br />90 min</h6>
                            </div></div>
                        </div>
                      </div>
                      <Link to="/" className="read-more">
                        Read more <span className="sr-only">about this is some title</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>

              </div>
              {/* sixth card */}
              <div style={{ margin: '0 12px' }}>

                <article>
                  <div className="article-wrapper p-3">
                    <figure>
                      <img src='images/WhatsApp Image 2023-10-22 at 20.49.00_5b7b6b67.jpg' alt="" />

                    </figure>
                    <div className="article-body">
                      <div>
                        <h6 className="mt-2 text-center">
                          <i class="fa-solid fa-volume-high" style={{ "color": "#e13214" }}></i>
                          &emsp; Schwartz
                        </h6>
                        <h5 className="cssut text-center">
                          Travel Pay &amp; FLSA Compliance 2023 Travel Pay &amp; FLSA
                          Compliance...
                        </h5>
                      </div>

                      <div className="row  mt-0">
                        <div className="p-3">
                          <div className="row p-3 text-center mstt">
                            <div className="col border-end boder-4"><h6>1 PM<br /> EST</h6></div>
                            <div className="col border-end boder-4">   <h6>JUNE <br /> 30</h6></div>
                            <div className="col">  <h6>
                              Duration <br />90 min</h6>
                            </div></div>
                        </div>
                      </div>
                      <Link to="/" className="read-more">
                        Read more <span className="sr-only">about this is some title</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>

              </div>
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
                        Accordion Item #1
                      </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTwo">
                      <button class="accordion-button collapsed " style={{ borderRadius: '10px' }} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        Accordion Item #2
                      </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingThree">
                      <button class="accordion-button collapsed" style={{ borderRadius: '10px' }} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        Accordion Item #3
                      </button>
                    </h2>
                    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12  " data-aos="fade-up">
              <div className="HeroImage ms-5 mt-lg-0 mt-5">
                <img src="img/1.webp"alt="..." style={{ width: "100%" }} />
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
                <p className=" text-white my-4">Kindedo believes that good questions drive good answers. Whether it's a query
                  about the world around us or a challenge.</p>
                {/* <div className='row imgarrow text-center '></div> */}
                <button className='my-5 button-Join rounded-pill shadow'>Purchase Now</button>
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
              <div className="col-12 col-sm-6 col-md-6 col-lg-3" >
                <div className="our-team" >
                  <div className="picture ">
                    <img className="img-fluid" alt='' src="https://picsum.photos/130/130?image=1027" />
                  </div>
                  <div className="team-content">
                    <h3 className="name">Michele Miller</h3>
                    <h4 className="title">Web Developer</h4>
                  </div>
                  <ul className="social">
                    <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-facebook" aria-hidden="true" />
                    </li>
                    <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-twitter" aria-hidden="true" />
                    </li>
                    <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-google-plus" aria-hidden="true" /></li>
                    <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-linkedin" aria-hidden="true" />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div className="our-team">
                  <div className="picture">
                    <img className="img-fluid" alt="" src="https://picsum.photos/130/130?image=839" />
                  </div>
                  <div className="team-content">
                    <h3 className="name">Patricia Knott</h3>
                    <h4 className="title">Web Developer</h4>
                  </div>
                  <ul className="social">
                    <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-facebook" aria-hidden="true" />
                    </li>
                    <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-twitter" aria-hidden="true" />
                    </li>
                    <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-google-plus" aria-hidden="true" /></li>
                    <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-linkedin" aria-hidden="true" />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div className="our-team">
                  <div className="picture">
                    <img className="img-fluid" alt src="https://picsum.photos/130/130?image=856" />
                  </div>
                  <div className="team-content">
                    <h3 className="name">Justin Ramos</h3>
                    <h4 className="title">Web Developer</h4>
                  </div>
                  <ul className="social">
                    <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-facebook" aria-hidden="true" />
                    </li>
                    <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-twitter" aria-hidden="true" />
                    </li>
                    <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-google-plus" aria-hidden="true" />
                    </li>
                    <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-linkedin" aria-hidden="true" />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div className="our-team">
                  <div className="picture">
                    <img className="img-fluid" alt src="https://picsum.photos/130/130?image=836" />
                  </div>
                  <div className="team-content">
                    <h3 className="name">Mary Huntley</h3>
                    <h4 className="title">Web Developer</h4>
                  </div>
                  <ul className="social">
                    <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-facebook" aria-hidden="true" />
                    </li>
                    <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-twitter" aria-hidden="true" />
                    </li>
                    <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-google-plus" aria-hidden="true" /></li>
                    <li><a href="https://codepen.io/collection/XdWJOQ/" className="fab fa-linkedin" aria-hidden="true" />
                    </li>
                  </ul>
                </div>
              </div>
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
                <img src="img/friend.jpg" alt="" style={{ height: "400px", width: "100%", borderRadius: "25px" }} />
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

      <section section className=" background " style={{paddingTop:'110px'}} >

        <div className="container">
          <div className="row" data-aos="fade-up">
            <div className="col-lg-8 offset-lg-2 col-12  text-center mt-2">
              <h2 className="mt-5" data-aos="fade-up">
                Achieve Your Goals with Us</h2>
              <p className=" text-center">Lorem ipsum odor amet, consectetuer adipiscing elit. Duis consectetur blandit mi. Non sapien scelerisque maximus. Duis ligula cras lacinia.
                Aliquam scelerisque dictumst luctus.</p>
            </div>
          </div>

          <div className="d-flex flex-column  flex-lg-row gap-5 justify-content-eventuly" style={{paddingTop:'55px'}}>
            <div className="Offer-card-body">
              <div className="Offer-card-bg" style={{ padding: '40px' }}>
                <div className="row d-flex align-items-center  justify-content-center  justify-content-center   " >
                  <div className="card-icon">
                    <img src="images/book.gif " className="rounded-circle" style={{width:'100%'}} alt="" />
                  </div>
                  <div className="row offer-card-detail text-center my-2 justify-content-center">
                    <h3>Essential Skills</h3>
                    <p className='mt-2'>Keep up your skills to meet industry standards.</p>
                    <div className="col my-2">
                      <button class="View-Details-btn">View Details</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
             
            <div className="Offer-card-body ">
              <div className="Offer-card-bg" style={{ padding: '40px' }}>
                <div className="row d-flex align-items-center  justify-content-center  justify-content-center   " >
                  <div className="card-icon">
                    <img src="images/job-seeking.gif" className="rounded-circle" style={{ width: '100%' }} alt="" />

                  </div>
                  <div className="row offer-card-detail text-center my-2 justify-content-center">
                    <h3> Ready for Job</h3>
                    <p className='mt-2'>
                      With high demands in mastering new skills
                    </p>
                    <div className="col my-2">
                      <button class="View-Details-btn">View Details</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="Offer-card-body">
              <div className="Offer-card-bg" style={{ padding: '40px' }}>
                <div className="row d-flex align-items-center  justify-content-center  justify-content-center   " >
                  <div className="card-icon">
                    <img src='images/safe.gif' className="rounded-circle" style={{ width: '100%' }} alt="" />
                  </div>
                  <div className="row offer-card-detail text-center my-2 justify-content-center">
                    <h3>Earn Credits</h3>
                    <p className='mt-2'>
                      From the Regulators and the Accreditors File
                    </p>
                    <div className="col my-2">
                      <button class="View-Details-btn">View Details</button>
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