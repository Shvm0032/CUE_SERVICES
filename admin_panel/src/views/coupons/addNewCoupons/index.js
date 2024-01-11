import React, { useState } from 'react';

export default function AddCoupon() {
  const [formData, setFormData] = useState({
    couponName: '',
    discountType: '',
    startDate: '',
    expiryDate: '',
    coupanlimit:'',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/InsertCoupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form data successfully submitted to the server.');
      } else {
        console.error('Failed to submit form data to the server.');
      }
    } catch (error) {
      console.error('An error occurred while submitting form data:', error);
    }
  };

  return (
    <div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-3">
              <div className="row">
                <h3 style={{ textAlign: 'center' }}>Add Coupon</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <label className="form-label">Name of the coupon:</label>
                    <br />
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        name="couponName"
                        value={formData.couponName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <label className="form-label">Discount:</label>
                    <br />
                    <div className="col">
                      <select
                        className="form-select"
                        name="discountType"
                        value={formData.discountType}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="%">%</option>
                        <option value="$">$</option>
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <label className="form-label">Start Date:</label>
                    <br />
                    <div className="col">
                      <input
                        type="date"
                        className="form-control"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <label className="form-label">Expiry Date:</label>
                    <br />
                    <div className="col">
                      <input
                        type="date"
                        className="form-control"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <label className="form-label">Coupons Limits:</label>
                    <br />
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        name="coupanlimit"
                        value={formData.coupanlimit}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <label className="form-label">Status:</label>
                    <br />
                    <div className="col">
                      <select
                        className="form-select"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col">
                      <button type="submit" className="btn btn-success">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
