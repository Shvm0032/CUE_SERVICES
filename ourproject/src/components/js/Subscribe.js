import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import http from "../../utils/http-client";
export default function Subscribe() {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await http.post('/NewSubscribe', { email });

      toast(response.data.message, {
        duration: 4000,
        icon: response.data.success ? '🎉' : '❌', // You can customize the icon
        style: {
          border: response.data.success ? '1px solid #4CAF50' : '1px solid #FF3232',
          padding: '16px',
          color: response.data.success ? '#4CAF50' : '#FF3232',
        },
      });
      // Reset email state
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred during subscription', { duration: 4000 });
    }
  };

  return (
    <div>
      <div className="d-flex subscibeBox start-50 translate-middle">
        <div className="subscibeContent">
          <div className="row">
            <h2 className="text-center text-white mt-5">Join Our Newsletter</h2>
            <p className="text-center mt-1 text-white">
              Subscribe our Channel to get our latest update & news.
            </p>
            <div className="row p-lg-2 p-1 align-items-center">
              <form
                onSubmit={handleSubscribe}
                className="p-lg-3 col-12 col-lg-8 gap-3 offset-lg-2 d-flex bg-body justify-content-center rounded-pill"
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="form-control  form-control-lg rounded-pill border-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="buttonAP">
                  Join us
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
