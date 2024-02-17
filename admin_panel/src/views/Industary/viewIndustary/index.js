import React, { useEffect, useState } from 'react';
import http from "../../../utils/http-client";
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';


export default function ViewIndustary() {
  const IMGurl = process.env.REACT_APP_IMG_URL;
  const [industries, setIndustries] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const handleClose = async () => {
    try {
      const updatedIndustryData = {
        id: selectedIndustry.id,
        industry_name: document.getElementById('industryName').value,
        // Add other fields as needed
      };

      const res = await http.put(`/update_industry?id=${updatedIndustryData.id}`, updatedIndustryData);

      if (res.data.success) {
        setIndustries(prevIndustries => prevIndustries.map(industry => {
          if (industry.id === updatedIndustryData.id) {
            return { ...industry, ...updatedIndustryData };
          }
          return industry;
        }));

        setShow(false);
      } else {
        console.error('Failed to update industry:', res.data.error);
      }
    } catch (error) {
      console.error('Error updating industry:', error);
    } finally {
      setSelectedIndustry(null);
    }
  };

  const handleShow = () => setShow(true);

  const getData = async () => {
    try {
      const res = await http.get("/Industary");
      setIndustries(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  async function handleDeleteIndustry(industry) {
    try {
      const res = await http.Delete(`/delete_industry?id=${industry.id}`);
      if (res.data.success) {
        setIndustries(industries.filter((ele) => ele.id !== industry.id));
        console.log(res.data.message);
      } else {
        console.error('Industry not found or not deleted:', res.data.error);
      }
    } catch (error) {
      console.error('Error deleting industry:', error);
    }
  };

  const handleEditIndustry = (industry) => {
    setSelectedIndustry(industry);
    handleShow();
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
                  <th>{index + 1}</th>
                  <td>{industry.industry_name}</td>
                  <td><img src={`${IMGurl}/${industry.image}`} width={50} height={50} alt='speaker' /></td>
                  <td>
                    <Button variant="primary" onClick={() => handleEditIndustry(industry)}>
                      Edit
                    </Button>
                    &emsp;
                    <button type='button' className='btn btn-danger' onClick={() => handleDeleteIndustry(industry)}>
                      Delete
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
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Industry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedIndustry && (
            <Form>
              <Form.Group controlId="industryName">
                <Form.Label>Industry Name</Form.Label>
                <Form.Control type="text" defaultValue={selectedIndustry.industry_name} />
              </Form.Group>
              <Form.Group controlId="industryImage">
                <Form.Label>Industry Image</Form.Label>
                <Form.Control type="file" />
                <img src={`${IMGurl}/${selectedIndustry.image}`} style={{ maxHeight: '100px' }} alt='INDUSTRY' />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button variant="primary" onClick={handleClose}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
