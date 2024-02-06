import React, { useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';

const AddCoupon = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    couponName: '',
    discountType: '',
    startDate: '',
    expiryDate: '',
    coupanlimit: '',
    status: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.couponName) {
      newErrors.couponName = 'Coupon name is required';
    }

    if (!formData.discountType) {
      newErrors.discountType = 'Discount type is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }

    if (!formData.coupanlimit) {
      newErrors.coupanlimit = 'Coupon limit is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.error('Form validation failed.');
      return;
    }

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
        setSuccessMessage('Coupon added successfully');

        // Navigate to all coupons page after a short delay (e.g., 2 seconds)
        navigate('/Copons/AllCopons');
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
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}


                <form className="shadow p-5 my-3" onSubmit={handleSubmit} >
                  <div className="row ">
                    <label className="form-label">Name of the coupon:</label>
                    <div className="col">
                      <input
                        type="text"
                        className={`form-control ${errors.couponName ? 'is-invalid' : ''}`}
                        name="couponName"
                        value={formData.couponName}
                        onChange={handleChange}
                      />
                      {errors.couponName && (
                        <div className="invalid-feedback">{errors.couponName}</div>
                      )}
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <label className="form-label">Discount:</label>
                    <div className="col">
                      <input
                        type="text"
                        className={`form-control ${errors.discountType ? 'is-invalid' : ''}`}
                        name="discountType"
                        value={formData.discountType}
                        onChange={handleChange}
                        placeholder="Enter discount type"
                      />
                      {errors.discountType && (
                        <div className="invalid-feedback">{errors.discountType}</div>
                      )}
                    </div>

                  </div>
                  <br />
                  <div className="row">
                    <label className="form-label">Start Date:</label>
                    <div className="col">
                      <input
                        type="date"
                        className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                      {errors.startDate && (
                        <div className="invalid-feedback">{errors.startDate}</div>
                      )}
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <label className="form-label">Expiry Date:</label>
                    <div className="col">
                      <input
                        type="date"
                        className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                      />
                      {errors.expiryDate && (
                        <div className="invalid-feedback">{errors.expiryDate}</div>
                      )}
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <label className="form-label">Coupons Limits:</label>
                    <div className="col">
                      <input
                        type="number"
                        className={`form-control ${errors.coupanlimit ? 'is-invalid' : ''}`}
                        name="coupanlimit"
                        value={formData.coupanlimit}
                        onChange={handleChange}
                      />
                      {errors.coupanlimit && (
                        <div className="invalid-feedback">{errors.coupanlimit}</div>
                      )}
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <label className="form-label">Status:</label>
                    <div className="col">
                      <select
                        className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      {errors.status && (
                        <div className="invalid-feedback">{errors.status}</div>
                      )}
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
};

export default AddCoupon;
