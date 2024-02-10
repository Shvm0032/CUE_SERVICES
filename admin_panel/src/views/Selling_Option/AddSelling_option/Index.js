import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Index() {
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        category: '',
        name: '',
        price: '',
    });
    const [sellingOptions, setSellingOptions] = useState([]);

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setSuccessMessage('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/GetsellingOptions');
            if (response.ok) {
                const data = await response.json();
                setSellingOptions(data);
            } else {
                console.error('Error fetching data from MySQL:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data from MySQL:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Simple client-side form validation
        if (!formData.category || !formData.name || !formData.price) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/AddSellingOption', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Data inserted successfully');
                setSuccessMessage('Data inserted successfully');
                handleShow();

                // Fetch the updated selling options data after insertion
                const updatedResponse = await fetch('http://localhost:8000/api/GetsellingOptions');
                if (updatedResponse.ok) {
                    const updatedData = await updatedResponse.json();
                    setSellingOptions(updatedData);
                } else {
                    console.error('Error fetching updated data from MySQL:', updatedResponse.statusText);
                }

                // Perform any additional actions if needed
            } else {
                console.error('Error inserting data:', response.statusText);
            }
        } catch (error) {
            console.error('Error inserting data:', error.message);
        }
    };

    return (
        <div>
            <section>
                <div className='container-fluid'>
                    <h1 className='text-center mb-5'>Selling Options</h1>
                    <div className='row'>
                        <div className="col-lg-3 col-12 mb-5">
                            <div className='row p-3 shadow border border-success rounded-4'>
                                <h5 className='mb-3'>Add Selling options</h5>
                                <form onSubmit={handleSubmit}>
                                    <label className="form-label">Category</label>
                                    <select className="form-select" name="category" onChange={handleInputChange} value={formData.category} aria-label="Default select example">
                                        <option value="">Select a category</option>
                                        <option value="Live Options">Live Options</option>
                                        <option value="Super Saver Options">Super Saver Options</option>
                                        <option value="Recording & Combos">Recording & Combos</option>
                                    </select><br />
                                    <label className='form-label'>Name</label>
                                    <input className='form-control' name="name" onChange={handleInputChange} value={formData.name} /><br />
                                    <label className='form-label'>Price</label>
                                    <input className='form-control' name="price" onChange={handleInputChange} value={formData.price} />
                                    <button type="submit" className="btn btn-primary mt-4 w-100">Submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-8 offset-lg-1 col-12">
                            <div className='row'>
                                <table className='table table-active table-hover'>
                                    <thead>
                                        <tr className='fw-bold'>
                                            <td >Id</td>
                                            <td>Category</td>
                                            <td>Name</td>
                                            <td>Price</td>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sellingOptions.map((option) => (
                                            <tr key={option.id}>
                                                <td>{option.id}</td>
                                                <td>{option.selling_category}</td>
                                                <td>{option.name}</td>
                                                <td>${option.price}</td>
                                                <td>
                                                    <Link to={`/Selling_Option/EditSelling_Option/${option.id}`} className="btn btn-success"><i className="fas fa-edit"></i></Link>&nbsp;
                                                    <button type="submit" className="btn btn-danger"><i className="fas fa-trash-alt"></i></button>&nbsp;
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal for success message */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{successMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
