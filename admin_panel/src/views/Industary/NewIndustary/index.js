import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function NewIndustary() {
  const [formValue, setFormValue] = useState({ industry_name: '', image: '' });
  const [Returnmessage, setReturnmessage] = useState();
  const [filedata, setFiledata] = useState([]);
  const navigate = useNavigate();

  console.log(formValue, filedata);

  function submitForm(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('industry_name', formValue.industry_name);
    data.append('file', filedata); // Updated this line to match the field name expected by the backend

    console.log(filedata, data);

    axios.post('http://localhost:8000/api/Industary_add', data)
      .then(response => {
        console.log(response.data);
        setReturnmessage(response.data.message);
        navigate('/industary/viewindustary');
        // Assuming your backend sends a 'message' field in the response
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-6 offset-3 border p-4 shadow'>
            <form onSubmit={submitForm}> {/* Updated this line */}
              <h3>Add New Industry</h3>
              <div className='row mt-5'>
                <div className='col-4'>
                  <label htmlFor='name'>Industry Name: </label>
                </div>
                <div className='col'>
                  <input type='text' className='form-control' onChange={(e) => { setFormValue((prev) => ({ ...prev, industry_name: e.target.value })) }} name='name' />
                </div>
                
              </div><br/>
              <div className='col'>
                  <input type="file" className="form-control" name='image' onChange={(e) => { setFiledata(e.target.files[0]) }} id="customFile" />
                </div>
              <br />
              <div className='row'>
                <div className='col text-center'>
                  <button type='submit' className="btn btn-primary">Submit</button>
                </div>
              </div>
            </form>
            {Returnmessage && <p>{Returnmessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
