import '../css/Webinar.modules.css'
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../redux/courseSlice';



export default function Cources() {
  const IMGurl = process.env.REACT_APP_IMG_URL;
  // console.log(IMGurl);
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);
  const status = useSelector((state) => state.course.status);
  const error = useSelector((state) => state.course.error);
  //console.log(courses);

  useEffect(() => {
    // Fetch courses data when the component mounts
    dispatch(fetchCourses());
  }, [dispatch]);

  // Render based on the status
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }


  return (
    <>
      {/* webi */}
      <section className="WaveHeaderBox">
        <div className='row  faq-heads'>
          <div className='row faq-headers p-5 mt-5'>
            <div className='col-md-12 faq mains '>
              <h1 className="mt-5  text-white" style={{ fontSize: "80px", marginBottom: "5px", fontWeight: '500' }}>Programs</h1>
              <Link to='/' className='text-white'><i class="fa-solid fa-house" style={{ "color": "#719dea;" }}></i> CuService - Programs</Link>
            </div>
          </div>
          <div className='wave wave1'></div>
          <div className='wave wave5'></div>
        </div>
      </section >

      <section style={{ paddingTop: '110px' }}>
        <div className='container'>
          <div className='d-flex rounded-4 mb-5 justify-content-center flex-wrap gap-2 p-5' style={{ background: '#00bbae' }}>
            <div className='col-3 col-md-3'>
              <form>
                <input type='text' placeholder='Search here' className='p-3 form-control form-control-lg '></input>
              </form>
            </div>

            <div className="dropdown">
              <button className="p-3 btn btn-light btn-lg dropdown-toggle" style={{ width: '200px' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Event
              </button>
              <ul className="dropdown-menu bg-light rounded-0 " aria-labelledby="dropdownMenuButton1">
                <li><Link className="dropdown-item" href="#">Action</Link></li>
                <li><Link className="dropdown-item" href="#">Another action</Link></li>
                <li><Link className="dropdown-item" href="#">Something else here</Link></li>
              </ul>
            </div>


            <div class="dropdown">
              <button className="btn p-3 btn-light btn-lg dropdown-toggle" style={{ width: '200px' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Cradite
              </button>
              <ul className="dropdown-menu bg-light rounded-0" aria-labelledby="dropdownMenuButton1">
                <li><Link className="dropdown-item" href="#">Action</Link></li>
                <li><Link className="dropdown-item" href="#">Another action</Link></li>
                <li><Link className="dropdown-item" href="#">Something else here</Link></li>
              </ul>
            </div>


            <div className="dropdown ">
              <button class="btn p-3 btn-light btn-lg dropdown-toggle" style={{ width: '200px' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Industry
              </button>
              <ul className="dropdown-menu bg-light rounded-0" aria-labelledby="dropdownMenuButton1">
                <li><Link className="dropdown-item" href="#">Action</Link></li>
                <li><Link className="dropdown-item" href="#">Another action</Link></li>
                <li><Link className="dropdown-item" href="#">Something else here</Link></li>
              </ul>
            </div>

          </div>
          <div className='row'>
            {courses.map((course) => (
              <div className='col-sm-6 col-lg-4 col-md-4' key={course.id}>
                <Link to={`/Course_Detail/${course?.slug}`}>
                  <div className='newsCard  news-Slide-up'>
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
                              <h5 className=''><i class="fa-solid fa-calendar-days fa-md"></i>&emsp;{course.date}</h5>
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

