import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [faqCategories, setFaqCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [editCategory, setEditCategory] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/Faq_Category');
            setFaqCategories(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAddCategory = async () => {
        try {
            let response;

            if (editCategory) {
                // Update existing category
                response = await axios.put(`http://localhost:8000/api/Update_Category/${editCategory.id}`, {
                    category: newCategory,
                });
            } else {
                // Add new category
                response = await axios.post('http://localhost:8000/api/Add_Category', { category: newCategory });
            }

            if (response.status === 200) {
                setSuccessMessage(editCategory ? 'Category updated successfully' : 'Category added successfully');
            } else {
                console.error('Error inserting/updating data:', response.statusText);
                setSuccessMessage(''); // Clear success message if there was an error
            }

            setNewCategory('');
            setEditCategory(null);
            setShowModal(false);
            getData();
        } catch (error) {
            console.error('Error inserting/updating data:', error.message);
            setSuccessMessage(''); // Clear success message if there was an error
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleEditCategory = (category) => {
        setEditCategory(category);
        setNewCategory(category.category);
        setShowModal(true);
    };

    return (
        <div>
            <div className="container">
                <h3>Faq Categories</h3>
                <button className="btn btn-success" onClick={() => setShowModal(true)}>
                    Add Category
                </button>
            </div>
            <hr />
            <br />

            <div className="container mt-4">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faqCategories.map((category) => (
                            <tr key={category.id}>
                                <th scope="row">{category.id}</th>
                                <td>{category.category}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => handleEditCategory(category)}
                                    >
                                        <i className="fas fa-edit"></i>Edit
                                    </button>
                                    &nbsp;
                                    <button type="button" className="btn btn-danger">
                                        <i className="fas fa-trash-alt"></i>delete
                                    </button>
                                    &nbsp;
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for adding/editing a category */}
            {showModal && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editCategory ? 'Edit Category' : 'Add Category'}
                                </h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <label>New Category</label>
                                <input
                                className='form-control'
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleAddCategory}
                                >
                                    {editCategory ? 'Update' : 'Add'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Display success message */}
            {successMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    {successMessage}
                </div>
            )}
        </div>
    );
}

export default App;
