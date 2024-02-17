import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import http from "../../../utils/http-client";

export default function NewIndustary() {
  const [formValue, setFormValue] = useState({ industry_name: '', image: '' });
  const [Returnmessage, setReturnmessage] = useState('');
  const [filedata, setFiledata] = useState([]);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  function submitForm(e) {
    e.preventDefault();

    // Check if required fields are empty
    if (!formValue.industry_name || !filedata) {
      setReturnmessage('Please fill out all required fields.');
      setShowError(true);
      return;
    }

    const data = new FormData();
    data.append('industry_name', formValue.industry_name);
    data.append('file', filedata);

    http.post('/Industary_add', data)
      .then(response => {
        console.log(response.data);
        setReturnmessage(response.data.message);
        navigate('/industary/viewindustary');
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-6 offset-3 border p-4 shadow'>
            <form onSubmit={submitForm}>
              <h3>Add New Industry</h3>
              <div className='row mt-5'>
                <div className='col-4'>
                  <label htmlFor='name'>Industry Name: </label>
                </div>
                <div className='col'>
                  <input type='text' className='form-control' onChange={(e) => { setFormValue((prev) => ({ ...prev, industry_name: e.target.value })) }} name='name' />
                </div>
              </div><br/>
              <div className='row'>
                <div className='col-4'>
                  <label htmlFor='image'>Industry Image: </label>
                </div>
                <div className='col'>
                  <input type="file" className="form-control" name='image' onChange={(e) => { setFiledata(e.target.files[0]) }} id="customFile" />
                </div>
              </div><br />
              <div className='row'>
                <div className='col text-center'>
                  <button type='submit' className="btn btn-primary">Submit</button>
                </div>
              </div>
            </form>
            {showError && (
              <div className="modal" style={{ display: 'block' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Error</h5>
                      <button type="button" className="close" onClick={() => setShowError(false)}>
                        <span>&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p>{Returnmessage}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
