import React, { useState } from "react";
import '../css/Contact.modules.css'
import { Link } from "react-router-dom";

function Contact() {
  const [formValue, setFormValue] = useState({ username: '', phone: '', email: '', message: '' });
  const [Returnmessage, setReturnmessage] = useState();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const allInputvalue = { username: formValue.username, email: formValue.email, phone: formValue.phone, message: formValue.message };
    // console.log(allInputvalue);
    let res = await fetch("http://localhost:8000/api/user_message", {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(allInputvalue)
    });

    let resjson = await res.json();
    if (res.status === 200) {
      setReturnmessage(resjson.success);
    } else {
      setReturnmessage("Some error occure");
    }
  }
  return (
    <>
      <section className="WaveHeaderBox">
        <div className='row  faq-heads'>
          <div className='row faq-headers p-5 mt-5'>
            <div className='col-md-12 faq mains '>
              <h1 className="mt-5 " style={{ fontSize: "80px", marginBottom: "5px", fontWeight: '500' }}>Contact Us</h1>
              <Link to='/' className=''><i class="fa-solid fa-house" style={{ "color": "#719dea;" }}></i> CuService - Contact us</Link>
            </div>
          </div>
          <div className='wave wave1'></div>
          <div className='wave wave5'></div>
        </div>
      </section >

      <section >
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-10 col-12 offset-lg-1">
            <h2 className="text-center fw-4 mt-1">We're always eager to hear from you!</h2>
            <p className="text-center mb-5 fs-5 text-secondary mt-1">We value your feedback and are always looking for ways to improve. If you have any suggestions or ideas, feedback, or you need technical support, have a billing question, or just want to say Hello, we are here for you. Contact us anytime!</p>
          </div>
          </div>
          <div className="d-flex flex-column flex-md-row  align-items-center justify-content-evenly gap-3 pt-5">

            <div className="d-flex flex-column p-4 justify-content-center align-items-center contcard boxmodel mb-5">
              <div className="d-flex justify-content-center align-items-center p-4 " style={{ background: '#0eada3', borderRadius: "50%", width: "130px",  }}>
                <i className="fa-solid fa-phone fa-4x rounded-circle" style={{ color: '#fff' }} />
              </div>
              <p className="text-center mt-3 fs-5 fw-4">907-200-3462</p>
            </div>

            <div className="d-flex flex-column p-4 justify-content-center align-items-center contcard boxmodel mb-5">
              <div className="d-flex justify-content-center align-items-center p-4 " style={{ background: 'rgb(249, 138, 11)', borderRadius: "50%", width: "130px", }}>
                <i className="fa-solid fa-map-marker-alt fa-4x rounded-circle" style={{ color: '#fff' }} />
              </div>
              <p className="text-center mt-3 fs-5 fw-4">Kilix Home Tower</p>
            </div>

            <div className="d-flex flex-column p-4 justify-content-center align-items-center contcard boxmodel mb-5">
              <div className="d-flex justify-content-center align-items-center p-4 " style={{ background: '#ff577b', borderRadius: "50%", width: "130px", }}>
                <i className="fa-solid fa-envelope fa-4x rounded-circle" style={{ color: '#fff' }} />
              </div>
              <p className="text-center mt-3 fs-5 fw-4">CUEServices.com</p>
            </div>
          </div>
        </div>
      </section>


      {/* form */}

      <section style={{ marginBottom: '400px' }}>
        <div className="container p-5 my-2">
          <div className="row mt-4">
            <div className="col-lg-8  offset-lg-2 col-12">
                <h2 className="fs-1 text-center my-4">Fill the form below so we can get to know  you and your needs better.</h2>
              <div className="row  bg-light  p-4 " style={{ borderRadius: '1.563rem' }}>
                
                <form className="p-3" onSubmit={handleSubmit}>

                  <div className="mb-3 input-group-lg">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="Name" name="username" value={formValue.username} onChange={handleInput} required />
                  </div>

                  <div className="mb-3 input-group-lg">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" placeholder="Phone Number" name="phone" value={formValue.phone} onChange={handleInput} required />
                  </div>

                  <div className="mb-3 input-group-lg">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" placeholder="Email" name="email" value={formValue.email} onChange={handleInput} required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="floatingTextarea2" className="form-label">Write your message here</label>
                    <textarea typeof="text" className="form-control" name="message" value={formValue.message} onChange={handleInput} placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                  </div>

                  <div className="col mt-2">
                    <button type="submit" className="btn btn-primary btn-lg mb-3">Submit</button>
                  </div>
                  <p className="text-success text-center">{Returnmessage}</p>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>


      
    </>
  );
}

export default Contact;
