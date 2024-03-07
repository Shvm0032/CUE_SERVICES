import React from 'react';
// import '../css/Success.modules.css'
import successimg from'../../assets/paymentSuccess.jpg'
export default function Success() {
  return (
    <div class="vh-100 d-flex justify-content-center align-items-center">
      <div class="col-md-4">
        <div class="border border-3 border-success"></div>
        <div class="card  bg-white shadow p-3">
          <div class="mb-3 text-center">
           
            <img src={successimg} alt='' style={{'width':'280px','height':'260px',}}/>
          </div>
          <div class="text-center">
            <h2>Thank You !</h2>
            <p>We've send the link to your inbox. Lorem ipsum dolor sit,lorem lorem </p>
            <button class="btn btn-outline-success">Back Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}
