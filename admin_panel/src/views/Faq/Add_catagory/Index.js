import React, { useEffect, useState } from 'react';
import http from "../../../utils/http-client";

function App() {
    const [faqCategories, setFaqCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [editCategory, setEditCategory] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const getData = async () => {
        try {
            const res = await http.get('/Faq_Category');
            setFaqCategories(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAddCategory = async () => {
        try {

            if (newCategory.trim() === '') {
                setErrorMessage('Category cannot be empty.');
                return;
            }
            let response;

            if (editCategory) {
                // Update existing category
                response = await http.post(`/Update_Category/${editCategory.id}`, {
                    category: newCategory,
                });
            } else {
                // Add new category
                response = await http.post('/Add_Category', { category: newCategory });
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
            setErrorMessage(''); // Clear error message
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

    async function deleteFunc(r) {
        console.log("hii")
        console.log(r)
        try {
            const res = await http.Delete(`/delete_FaqCategory?id=${r.id}`);
            console.log(res);
            if (res.data.success) {
                setFaqCategories(faqCategories.filter((ele) => (ele.id !== r.id)))
            } else {
                console.error('Coupan not found or not deleted:', res.data.error);
            }
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    }

   


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
                <table className="table table-border table-striped table-hover table-light shadow  table-scroll text-center" id='my-table'>

                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">#</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faqCategories.map((category, index) => (
                            <tr key={category.id}>
                                <th>{index + 1}</th>
                                <td>{category.category}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-outline-success"
                                        onClick={() => handleEditCategory(category)}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    &emsp;
                                    <button type='submit' onClick={() => deleteFunc(category)} className="btn btn-outline-danger">
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
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
                                {errorMessage && (
                                    <div className="alert alert-danger mt-3" role="alert">
                                        {errorMessage}
                                    </div>
                                )}
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
