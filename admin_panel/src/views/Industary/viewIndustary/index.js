import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function ViewIndustary() {
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState({
    industry_name: '',
    image: null, // New field for image
  });
  const [successMessage, setSuccessMessage] = useState('');

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/Industary");
      setIndustries(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEditClick = (industry) => {
    setSelectedIndustry(industry);
    setEditForm({
      industry_name: industry.industry_name,
      image: null, // Reset image field when opening the modal
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedIndustry(null);
    setEditForm({
      industry_name: '',
      image: null,
    });
    setShowModal(false);
    setSuccessMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    setEditForm((prev) => ({
      ...prev,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleUpdateIndustry = async () => {
    try {
      const formData = new FormData();
      formData.append('industry_name', editForm.industry_name);
      formData.append('image', editForm.image);

      const response = await axios.put(`http://localhost:8000/api/update_industry/${selectedIndustry.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      getData();
      handleCloseModal();
      setSuccessMessage('Industry updated successfully');
    } catch (error) {
      console.error('Error updating industry:', error);
    }
  };

  return (
    <div>
      <h3 className='text-center'>View all Industry</h3>
      <div className='container mt-5'>
        {industries.length > 0 ? (
          <table className="table table-striped table-hover shadow">
            <thead>
              <tr className='table-dark'>
                <th scope="col">#</th>
                <th scope="col">Industry Name</th>
                <th scope="col">Image</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {industries.map((industry, index) => (
                <tr key={index}>
                  <th>{industry.id}</th>
                  <td>{industry.industry_name}</td>
                  <td>{industry.image}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleEditClick(industry)}
                    >
                      <i className="fa fa-edit"></i>&nbsp;Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading data.....</p>
        )}
      </div>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Industry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdateIndustry(); }}>
            <label>Industry Name:</label>
            <input
              type="text"
              name="industry_name"
              value={editForm.industry_name}
              onChange={handleInputChange}
            />
            <br />
            <label>Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
            />
            <br />
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={successMessage !== ''} onHide={() => setSuccessMessage('')}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setSuccessMessage('')}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
