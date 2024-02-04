import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Index() {
  const [questions, setQuestions] = useState([]);
  const [faqCategories, setFaqCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editQuestion, setEditQuestion] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [newCategory, setNewCategory] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const getData = async () => {
    try {
      // Fetch FAQ categories
      const categoriesResponse = await axios.get('http://localhost:8000/api/Faq_Category');
      setFaqCategories(categoriesResponse.data);

      // Fetch FAQ questions
      const questionsResponse = await axios.get('http://localhost:8000/api/Faq_Question');
      setQuestions(questionsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleAddQuestion = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/Add_Question', {
        category_id: newCategory,
        question: newQuestion,
        answer: newAnswer,
      });

      if (response.status === 200) {
        console.log('Data inserted successfully');
        setSuccessMessage('Question added successfully');
        setShowModal(false);
        getData();
        // Reset the form data
        setNewCategory('');
        setNewQuestion('');
        setNewAnswer('');
      } else {
        console.error('Error inserting data:', response.statusText);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error inserting data:', error.message);
      setSuccessMessage('');
    }
  };

  const handleEditQuestion = (question) => {
    setEditQuestion(question);
    setNewCategory(question.category_id);
    setNewQuestion(question.question);
    setNewAnswer(question.answer);
    setShowModal(true);
  };

  const handleUpdateQuestion = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/Update_Question/${editQuestion.id}`, {
        category_id: newCategory,
        question: newQuestion,
        answer: newAnswer,
      });

      if (response.status === 200) {
        console.log('Data updated successfully');
        setSuccessMessage('Question updated successfully');
        setShowModal(false);
        getData();
        // Reset the form data
        setEditQuestion(null);
        setNewCategory('');
        setNewQuestion('');
        setNewAnswer('');
      } else {
        console.error('Error updating data:', response.statusText);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error updating data:', error.message);
      setSuccessMessage('');
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/Delete_Question/${questionId}`);

      if (response.status === 200) {
        console.log('Data deleted successfully');
        setSuccessMessage('Question deleted successfully');
        getData();
      } else {
        console.error('Error deleting data:', response.statusText);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error deleting data:', error.message);
      setSuccessMessage('');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h3>Faq question</h3>
          </div>

          <div className="col-6">
            <button className="btn btn-success" onClick={() => setShowModal(true)}>
              Add question
            </button>
          </div>
        </div>
      </div>
      <hr />
      <br />

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category_id</th>
                  <th scope="col">Question</th>
                  <th scope="col">Answer</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr key={question.id}>
                    <td scope="row">{question.id}</td>
                    <td>{question.category_id}</td>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handleEditQuestion(question)}
                      >
                        <i className="fas fa-edit"></i>Edit
                      </button>
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        <i className="fas fa-trash-alt"></i>Delete
                      </button>
                      &nbsp;
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editQuestion ? 'Edit Question' : 'Add Question'}</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="col">
                  <label>Select Category</label>
                  <select
                    className="form-select"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  >
                    <option value="" disabled>Select a category</option>
                    {faqCategories.map((category) => (
                      <option key={category.category} value={category.id}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                </div>
                <br />
                <div className="col">
                  <label>Title/Question</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                  />
                </div>
                <br />
                <div className="col">
                  <label>Answer</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                {editQuestion ? (
                  <button type="button" className="btn btn-success" onClick={handleUpdateQuestion}>
                    Update
                  </button>
                ) : (
                  <button type="button" className="btn btn-success" onClick={handleAddQuestion}>
                    Add
                  </button>
                )}
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default Index;
