import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Webinar.modules.css'
export default function Webinar() {
  var [Cources, setCources] = useState([]);
  var getData = async () => {
    try {
      var res = await axios.get("http://localhost:8000/api/Course");
      console.log(res);
      setCources(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      {/* webi */}
      <section className="WaveHeaderBox">
        <div className='row  faq-heads'>
          <div className='row faq-headers p-5'>
            <div className='col-md-12 faq mains'>
              <h2 className="mt-5 pt-5 " style={{ fontSize: "80px", marginTop: '20px', fontWeight: '600' }}>Programs</h2>
              <Link to='#' className='faq-lnk-main'><i class="fa-solid fa-house" style={{ "color": "#719dea;" }}></i> CuService - Programs </Link>
            </div>
            <div className='wave wave1'></div>
            <div className='wave wave5'></div>

          </div>
        </div>
      </section >
      <section style={{ paddingTop: '110px' }}>
        <div className='container '>
          <div className='row mb-5 p-4'>
            {Cources.map((Cources) => (

              <div key={Cources.id} className='col-lg-4 col-md-6 col-12 mb-5'>
                <div className='newsCard news-Slide-up '>
                  <div className='img-div'>
                    <img src={`http://127.0.0.1:8000/${Cources.course_thumbail}`} className='course-img' alt="" />
                  </div>
                  <div className='newsCaption'>
                    <div className='d-flex'>
                      <p className='newsCaption-content mb-2'>
                        <i class="fas fa-chalkboard-teacher fa-lg" style={{ color: '#00bbae' }}></i>&emsp; Herry bahi is grate
                      </p>
                      <p className='newsCaption-content mb-2 ms-5'>
                        <i class="fas fa-chalkboard-teacher fa-lg" style={{ color: '#00bbae' }}></i>&emsp; {Cources.date}
                      </p>
                    </div>
                    <div className='newsCaption-title'>
                      <h5>{Cources.title}</h5>
                    </div>
                    <div className="row  mt-0">
                      <div className="p-3">
                        <div className="d-flex justify-content-center align-items-center p-3 text-center mstt">
                          <div className="col border-end boder-4"><h6>Time<br />{Cources.time}</h6></div>
                          {/* <div className="col border-end boder-4"><h6>Date<br /></h6></div> */}
                          <div className="col"><h6>Duration <br />{Cources.duration}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex ps-3'>
                      <Link to={`/Course_Detail/${Cources.id}`}>
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
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            ))}

          </div>


        </div>

      </section>


      {/* pagination */}
      {/* <section style={{ marginBottom: '300px' }}>
        <div className='container'>
          <div class="row text-center">
            <div class=" col-6 offset-3 pagination">
              <Link to="/Webinar">&laquo;</Link>
              <Link to="/Webinar" class="active">1</Link>
              <Link to="/Webinar">2</Link>
              <Link to="/Webinar">3</Link>

              <Link to="/Webinar">&raquo;</Link>
            </div>
          </div>
        </div>
      </section> */}
    </>
  )
}

