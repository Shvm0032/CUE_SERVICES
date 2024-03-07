import React from 'react'
import Subscribe from './Subscribe';
import { useLocation, Link } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import { TfiLocationPin } from "react-icons/tfi"; 
import { TbPhoneCalling } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import "../css/Navbar.css";
export default function Footer() {

  const location = useLocation();
  const hideHeaderForPathsRegex = /^\/Invoice\/.*$/;
  if (hideHeaderForPathsRegex.test(location.pathname)) {
      return <></>;
  }
  return (
    <>
      {/* Remove the container if you want to extend the Footer to full width. */}
      <section className=' backgroundColor' style={{ marginTop: "40vh" }}>
        <div className=" position-relative container-fluid">
          <section>
            <div className='container'>
              <Subscribe />
            </div>
            
          <div className="row text-md-start p-5 pt-0" >
              <div className="col-md-3 text-start col-lg-4 col-xl-3 mx-auto">
                {/* Content */}
                <img src={logo} className='mb-4' width={200} height={70} alt='logo' />
                <p style={{ textAlign: 'justify' }}>In our Adult Participation programs, for most students, it is their first program in ceutrainers.</p>
                
              </div>
              
              <div className="col-md-2  text-start col-lg-2 col-xl-2 mx-auto mb-4">
                
                <h4 className="text-uppercase fw-bold">Products</h4>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: '#7c4dff', height: "2px" }} />
                <p>
                  <a href="/course" className="footer-text"><span className="arrow">-</span>Industury</a>
                </p>
                <p>
                  <a href="/course" className="footer-text"> <span className="arrow">-</span>Webinars</a>
                </p>
                <p>
                  <a href="/Speakers" className="footer-text"><span className="arrow">-</span>Speakers</a>
                </p>
                <p>
                  <a href="/login" className="footer-text"><span className="arrow">-</span>Login</a>
                </p>
              </div>
             
              <div className="col-md-3 text-start col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h4 className="text-uppercase fw-bold">Useful links</h4>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: '#7c4dff', height: "2px" }} />
                <p>
                  <a href="/login" className="footer-text "><span className="arrow">-</span>Login </a>
                </p>
                <p>
                  <a href="/register" className="footer-text"><span className="arrow">-</span>Register</a>
                </p>
                <p>
                  <a href="/Faqrear" className="footer-text"><span className="arrow">-</span>FAQ</a>
                </p>
                <p>
                  <a href="/Contactus" className="footer-text"><span className="arrow">-</span>Help</a>
                </p>
              </div>
              
              <div className="col-md-4 text-start col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* Links */}
                <h4 className="text-uppercase fw-bold">Contact</h4>
                <hr className="mb-4 mt-0 d-inline-block" style={{ width: "60px", backgroundColor: '#7c4dff', height: "2px" }}/>
                <p><TfiLocationPin className='footericon' />&emsp;<Link className='text-dark' to="tel:(702)-605-0095">304 S.Jones Blvd #5255,LasVegas,NV,89107 US</Link></p>
                <p><MdOutlineMail className='footericon' />&emsp;<Link className='text-dark' to="tel:(702)-605-0095">info@ceutrainers.com</Link></p>
                <p><TbPhoneCalling className='footericon' />&emsp;<Link className='text-dark' to="tel:(702)-605-0095">(702)-605-0095</Link></p>
               
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </section>
          {/* Section: Links  */}
          {/* Copyright */}
          <div className='row'>
            <img src='/img/wave-line.png' width={'100%'} height={'auto'} alt='' />
          </div>
          <div className="text-center p-3" >
            <p> © 2020 Copyright :  <a className="footericon" href="https://mdbootstrap.com/">info@ceutrainers.com</a></p>

          </div>
          {/* Copyright */}
        </div>
        {/* Footer */}
        {/* </div> */}
      </section>
      {/* End of .container */}

    </>
  );
}




