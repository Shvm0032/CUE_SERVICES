import React, { useState } from 'react';
import axios from 'axios';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/NewSubscribe', { email });

      setModalType(response.data.success ? 'success' : 'danger');
      setModalMessage(response.data.message);

      // Open the modal
      document.getElementById('subscriptionModalButton').click();
    } catch (error) {
      console.error('Error:', error);
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
                className="p-lg-3 col-12 col-lg-8 offset-lg-2 d-flex bg-body justify-content-center rounded-pill"
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="form-control rounded-pill border-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="buttonAP">
                  Join us
                </button>
              </form>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>

      {/* Bootstrap 5 Modal */}
      <div className="modal fade" id="subscriptionModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className={`modal-content bg-${modalType}`}>
            <div className="modal-header">
              <h5 className="modal-title">Subscription Status</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>{modalMessage}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              {/* Additional modal footer buttons can be added here */}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden button to trigger the modal */}
      <button
        id="subscriptionModalButton"
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#subscriptionModal"
        style={{ display: 'none' }}
      >
        Hidden Button
      </button>
    </div>
  );
}
