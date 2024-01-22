import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



import 'bootstrap/dist/css/bootstrap.min.css';


const EditCopons = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState({
    coupon_code: '',
    discount: '',
    start_date: '',
    expire_date: '',
    coupons_status: '',
    coupons_limit: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/cu_edit/${id}`)
      .then((res) => {
        const data = res.data[0];
        if (data) {
          setCoupon({
            coupon_code: data.coupon_code || '',
            discount: data.discount || '',
            start_date: data.start_date || '',
            expire_date: data.expire_date || '',
            coupons_status: data.coupons_status || '',
            coupons_limit: data.coupons_limit || '',
          });
        } else {
          console.error('No data received from the API.');
        }
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon((prevCoupon) => ({
      ...prevCoupon,
      [name]: value,
    }));
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/Copons/AllCopons');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8000/api/update_Coupon/${id}`, coupon);
      console.log(response.data);

      setSuccessMessage('Coupon updated successfully');
      handleShowModal();
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  };

  return (
    <div>
      <h2>Edit Coupons</h2>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Coupon Code</label>
            <input
              type="text"
              className="form-control"
              name="coupon_code"
              value={coupon.coupon_code}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Discount</label>
            <input
              type="text"
              className="form-control"
              name="discount"
              value={coupon.discount}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              name="start_date"
              value={coupon.start_date}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Expire Date</label>
            <input
              type="date"
              className="form-control"
              name="expire_date"
              value={coupon.expire_date}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Coupon Status</label>
            <input
              type="text"
              className="form-control"
              name="coupons_status"
              value={coupon.coupons_status}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Coupon Limit</label>
            <input
              type="text"
              className="form-control"
              name="coupons_limit"
              value={coupon.coupons_limit}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>

      {/* Modal for success message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditCopons;
