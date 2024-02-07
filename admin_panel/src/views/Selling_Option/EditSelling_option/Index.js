import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import http from "../../../utils/http-client";

function Index() {
  const { id } = useParams();
  const navigate =  useNavigate();
  const [selling_category, setSellingCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [apiError, setApiError] = useState('');


  useEffect(() => {
    http.get(`/selling_edit/${id}`)
      .then((res) => {
        if (res.data[0]) {
          setSellingCategory(res.data[0].selling_category);
          setName(res.data[0].name);
          setPrice(res.data[0].price);
        } else {
          setApiError('Selling option not found');
        }
      })
      .catch((err) => {
        console.error('Error fetching selling option details:', err);
        setApiError('Error fetching selling option details');
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await http.put(`/update_option/${id}`, {
        selling_category,
        name,
        price,
      });

      console.log(response.data);

      if (response.status === 200) {
        // Use navigate without .then()
        navigate('/Selling_Option/AddSelling_option');

        // Wait until the next render cycle to show the modal
        setTimeout(() => {
          setShowModal(true);
        });
      } else {
        console.error('Error updating selling option. Status:', response.status);
        setApiError('Error updating selling option');
      }
    } catch (error) {
      console.error('Error updating selling option:', error);
      setApiError('Error updating selling option');
    }
  };

  return (
    <div>
      <h3>Edit Selling option</h3>
      <div className='container'>
        <div className='row '>
          <div className='col-md-6 offset-3 p-3 mt-5 shadow border border-primary rounded-4'>
            <h5 className='mb-3'>Edit Selling options</h5>
            {apiError && <div className="alert alert-danger">{apiError}</div>}
            <form onSubmit={handleSubmit}>
              <label className="form-label">Category</label>
              <select className="form-select" name="category" value={selling_category} onChange={(e) => setSellingCategory(e.target.value)} aria-label="Default select example">
                <option value="">Select a category</option>
                <option value="Live Options">Live Options</option>
                <option value="Super Saver Options">Super Saver Options</option>
                <option value="Recording & Combos">Recording & Combos</option>
              </select><br />
              <label className='form-label'>Name</label>
              <input className='form-control' name="name" value={name} onChange={(e) => setName(e.target.value)} /><br />
              <label className='form-label'>Price</label>
              <input className='form-control' name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
              <button type="submit" className="btn btn-primary mt-4 w-100">Update</button>
            </form>

            {/* Modal for success message */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Success!</Modal.Title>
              </Modal.Header>
              <Modal.Body>Selling option updated successfully</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
