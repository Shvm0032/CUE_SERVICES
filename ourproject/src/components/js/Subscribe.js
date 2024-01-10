import React from 'react'

export default function Subscribe() {


  return (

    <div>
      <div className='d-flex subscibeBox start-50 translate-middle'>
        <div className='subscibeContent'>
          <div className='row'>
            <h2 className="text-center text-white mt-5" >Join Our Newsletter</h2>
            <p className="text-center mt-1 text-white"> Subscribe our Channel to get our latest update & news.</p>
            <div className=" row p-lg-2 p-1  align-items-center">
              <form className="p-lg-3 col-12 col-lg-8 offset-lg-2 d-flex bg-body  justify-content-center rounded-pill">
                <input type="search" placeholder="Your email" className="form-control rounded-pill border-0" />
                <button className="buttonAP">Join us</button>
              </form>
            </div><div className="col">
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}
