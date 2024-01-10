import React from 'react'
import Subscribe from './Subscribe';

export default function Footer() {



  return (
    <>
      {/* Remove the container if you want to extend the Footer to full width. */}
      <section className=' backgroundColor' style={{ marginTop: "40vh" }}>
        <div className=" position-relative container">
          <section >
            <div className=''>
              <Subscribe />
            </div>
            
            <div className="row text-center text-md-start" style={{ marginTop: '-120px' }}>
              
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* Content */}
                <h6 className="text-uppercase fw-bold">CuService </h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", height: "2px" }} />
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
                <div className=" d-flex form-outline form-white my-2">
                  <input type="email" id="form5Example2" class="form-control me-4" />
                  <button type="submit" className="btn btn-outline-primary  ">Subscribe</button>
                </div>
              </div>
              
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                
                <h6 className="text-uppercase fw-bold">Products</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: '#7c4dff', height: "2px" }} />
                <p>
                  <a href="#!" className="text-dark">MDBootstrap</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">MDWordPress</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">BrandFlow</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">Bootstrap Angular</a>
                </p>
              </div>
             
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: '#7c4dff', height: "2px" }} />
                <p>
                  <a href="#!" className="text-dark">Your Account</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">Become an Affiliate</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">Shipping Rates</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">Help</a>
                </p>
              </div>
              
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: '#7c4dff', height: "2px" }} />
                <p><i className="fas fa-home mr-3" /> New York, NY 10012, US</p>
                <p><i className="fas fa-envelope mr-3" /> info@example.com</p>
                <p><i className="fas fa-phone mr-3" /> + 01 234 567 88</p>
                <p><i className="fas fa-print mr-3" /> + 01 234 567 89</p>
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
            <p> © 2020 Copyright :  <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a></p>

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



