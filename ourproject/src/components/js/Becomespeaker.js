import React from "react";
import Carousel from "react-multi-carousel";
import '../css/Becomespeaker.modules.css';
import { Link } from "react-router-dom";

function Becomespeaker() {
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
  return (
    <>
      <section className="WaveHeaderBox">
        <div className='row  faq-heads'>
          <div className='row faq-headers p-5 mt-5'>
            <div className='col-md-12 faq mains'>
              <h1 className="mt-5 " style={{ fontSize: "80px", marginBottom: "5px", fontWeight: '500' }}>Become a Speaker</h1>
              <Link to='#' className='faq-lnk-main'><i class="fa-solid fa-house" style={{ "color": "#719dea;" }}></i> CuService </Link>
            </div>

          </div>
          <div className='wave wave1'></div>
          <div className='wave wave5'></div>
        </div>
      </section >
      
      <section>
        <div className="conatiner-fluid p-5" >
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="row p-lg-5">
                <img src="imgs/1.webp" style={{ width: "100%", height: "" }} alt="" />

              </div>
              {/* <div className="row">
                <img src="imgs/pexels-huỳnh-đạt-2177482.jpg" alt="" style={{zIndex:"3", position:"absolute", width:"300px", height:"170px", marginTop:"-210px", marginLeft:"300px"}} />
            </div> */}
            </div>

            <div className="col-lg-6 col-12 p-lg-5 mt-lg-4">
              <div className="row mt-4">
                <h1 className="mt-5 lh-base display-5" style={{ fontWeight: "500" }}>Become an Instructor Today</h1>
                <h5 className="mt-3">Use the list below to bring attention to your product’s key
                  differentiator.</h5>
              </div>
              <button className="button1 mt-4 ms-5 ">Join our team</button>
            </div>

          </div>
        </div>
      </section>
      <section>
        <div className="container-fluid mt-lg-0 mt-4 p-5" style={{ background: '#13bbaf' }}>

          <div className="row">
            <div className="col-lg-8 col-12 offset-lg-2 p-4" style={{ background: '#fff6eb', borderRadius: "25px" }}>

              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" style={{ background: '#fff', borderRadius: "25px" }}>
                <li class="nav-item ms-lg-5" role="presentation">
                  <button class="nav-link active " id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Become an Instructor</button>
                </li>
                <li class="nav-item ms-lg-5" role="presentation">
                  <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Instructor Rules</button>
                </li>
                <li class="nav-item ms-lg-5 " role="presentation">
                  <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Start with Courses</button>
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                  <p className="fs-5" style={{ "fontWeight": "400" }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.

                    Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
                </div>
                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                  <p className="fs-5" style={{ "fontWeight": "400" }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                </div>
                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                  <p className="fs-5" style={{ "fontWeight": "400" }}>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
                </div>
              </div>          </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container-fluid">
          <div className="row mt-5 p-lg-2">
            <h1 className="text-center">Start your Learning Journey Today!</h1>
            <p className="fs-5 text-center" style={{ "fontWeight": "400" }}>Lorem ipsum dolor sit amet, consectetur.</p>
          </div>

          <div className="row">
            <div className="col-lg-3 col-12">
              <div className="row p-5">
                <div className="col text-center animation">
                  <img src="imgs/good-feedback.png " height={'100px'} width={'100px'} alt="" />
                  <h6 className="mt-2 text-center">Learn with Experts</h6>
                  <p className="">Grursus mal suada faci lisis that ipsum ameti consecte</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-12">
              <div className="row p-5">
                <div className="col text-center animation">
                  <img src="imgs/book (1).png " height={'100px'} width={'100px'} alt="" />
                  <h6 className="mt-2 text-center">Learn Anything</h6>
                  <p className="">Grursus mal suada faci lisis that ipsum ameti consecte.</p>
                </div>
              </div>
            </div>


            <div className="col-lg-3 col-12">
              <div className="row p-5">
                <div className="col text-center animation">
                  <img src="imgs/online-course.png " height={'100px'} width={'100px'} alt="" />
                  <h6 className="mt-2 text-center">Flexible Learning</h6>
                  <p className="">Grursus mal suada faci lisis that ipsum ameti consecte</p>
                </div>
              </div>
            </div>


            <div className="col-lg-3 col-12">
              <div className="row p-5">
                <div className="col text-center animation">
                  <img src="imgs/certificate.png " height={'100px'} width={'100px'} alt="" />
                  <h6 className="mt-2 text-center">Industrial Standart</h6>
                  <p className="">Grursus mal suada faci lisis that ipsum ameti consecte</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section>
        <div className="container-fluid p-5" style={{ background: '#13bbaf' }}>
          <div className="row">
            <div className="col-md-8 mx-auto text-center text-white">
              <h2 className=" my-3" style={{ fontSize: '45px', fontWeight: '600' }}>What other Say</h2>
              <p className=" mt-2" style={{ fontSize: '16px' }}>Being brave isn’t always a grand gesture sometimes it just means having a go attempting that difficult question, offering an answer in a lesson when you’re simply really trying new.</p>
            </div>
          </div>
          <div className="row  p-lg-4">
            <div className="col-12" >
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
                  <div className="carousel-item active p-3" data-bs-interval="2000" >
                    <div className="" style={{ "background": " #cbf5f3", borderRadius: '25px', backgroundColor: '#ffecd6' }} >
                      <div className="row justify-content-center" >
                        <div className="col-3  p-3">
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
                </div>
                <div>
                  <div className="carousel-item active p-3" data-bs-interval="2000" >
                    <div className="" style={{ "background": " #cbf5f3", borderRadius: '25px' }} >
                      <div className="row justify-content-center" >
                        <div className="col-3  p-3">
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
                </div>
                <div>
                  <div className="carousel-item active p-3" data-bs-interval="2000" >
                    <div className="" style={{ "background": " #cbf5f3", borderRadius: '25px', backgroundColor: '#ffecd6' }} >
                      <div className="row justify-content-center" >
                        <div className="col-3  p-3">
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
                </div>
                <div>
                  <div className="carousel-item active p-3" data-bs-interval="2000" >
                    <div className="" style={{ "background": " #cbf5f3", borderRadius: '25px' }} >
                      <div className="row justify-content-center" >
                        <div className="col-3  p-3">
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
                </div>
                <div>
                  <div className="carousel-item active p-3" data-bs-interval="2000" >
                    <div className="" style={{ "background": " #cbf5f3", borderRadius: '25px', backgroundColor: '#fff' }} >
                      <div className="row justify-content-center" >
                        <div className="col-3  p-3">
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
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      <section>
  <div className="container   Suscribe " >
    <div className="row p-5  mt-5 SuscribeBox">
      <div className="col-8 p-lg-4 offset-2 text-center">
        <h1 className="text-center text-white mt-5" style={{ fontSize: '50px', fontWeight: '600' }}>Join Our Team</h1>
        <p className="text-center mt-3 fs-5 text-white"> Subscribe our Channel to get our latest update & news.</p>
        <div className="col-12 offset-0  col-lg-8 offset-lg-2 ">
        </div>
        <div className=" row my-4">
          <div className=" d-flex p-lg-3 gap-3  bg-body  rounded-pill">
            <input type="search" placeholder="Your email" className="form-control rounded-pill border-0" />
            <button className="Applynow type1 text-center">Join us</button>
          </div><div className="col">
          </div>
        </div>

      </div>
    </div>
  </div>
</section>





    </>
  )
}

export default Becomespeaker

