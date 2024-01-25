import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ "list": "ordered" },
    { "list": 'bullet' },
    { 'indent': '-1' },
    { 'indent': '+1' }],
    ["link", "image", "video"],
    ["clean"]
  ],
};

export default function AddSpeakers() {
  const [formValue, setFormValue] = useState({
    name: '',
    phone: '',
    email: '',
    bio: '',
    image: '',
    designation: '',
    experience: ''
  });
  const [returnMessage, setReturnMessage] = useState('');
  const [filedata, setFiledata] = useState([]);
  const navigate = useNavigate(); // Correct useNavigate call

  function submitForm(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formValue.name);
    data.append('email', formValue.email);
    data.append('phone', formValue.phone);
    data.append('designation', formValue.designation);
    data.append('experience', formValue.experience);
    data.append('bio', formValue.bio);
    data.append("file", filedata);

    axios.post('http://localhost:8000/api/Speaker_add', data)
      .then(response => {
        console.log(response.data);
        setReturnMessage(response.data.message);
        navigate('/Speakers/AllSpeakers');
      })
      .catch(error => {
        console.error('Error:', error);
        setReturnMessage('Failed to add speaker. Please try again.');
      });
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-12 bg-light p-4 border shadow">
              <h3 className="text-start my-3 mb-5">Add New Speaker</h3>
              {returnMessage && <p className="text-success">{returnMessage}</p>}
              <form>
                <div className='row'>
                  <div className='col'>
                    <div className='row'>
                      <div className='col-2'><label className="form-label"> Name :</label></div>
                      <div className='col'><input type='text' className='form-control' name='username' onChange={(e) => { setFormValue((pre) => ({ ...pre, name: e.target.value })) }} placeholder='Enter Name...' /> </div>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='row'>
                      <div className='col-2 text-end'><label>Email :</label></div>
                      <div className='col'><input type='text' className='form-control' name='email' onChange={(e) => { setFormValue((pre) => ({ ...pre, email: e.target.value })) }} placeholder='Email id...' /> </div>
                    </div>
                  </div>
                </div><br />
                <div className='row'>
                  <div className='col-2'><label>Phone Number:</label></div>
                  <div className='col'> <input type="text" className="form-control" name='phone' onChange={(e) => { setFormValue((pre) => ({ ...pre, phone: e.target.value })) }} placeholder="Phone Number" /></div>
                </div><br />
                <div className='row'>
                  <div className='col-2'><label>Designation:</label></div>
                  <div className='col'> <input type="text" className="form-control" name='designation' onChange={(e) => { setFormValue((pre) => ({ ...pre, designation: e.target.value })) }} placeholder="Designation" /></div>
                </div><br />
                <div className='row'>
                  <div className='col-2'><label>Experience:</label></div>
                  <div className='col'> <input type="text" className="form-control" name='experience' onChange={(e) => { setFormValue((pre) => ({ ...pre, experience: e.target.value })) }} placeholder="Working Experience" /></div>
                </div><br />
                <div className='row'>
                  <div className='col-2 mt-3'><label>Speaker Image :</label></div>
                  <div className='col'>
                    <input type="file" className="form-control" name='image' onChange={(e) => { setFiledata(e.target.files[0]) }} id="customFile" /></div>
                </div> <br />

                <div className='row'>
                  <div className='col-2'> <label className='form-label'>Bio :</label></div>
                  <div className='col'>
                    <ReactQuill onChange={(e) => { setFormValue((pre) => ({ ...pre, bio: e })) }} theme="snow"
                      modules={modules}
                      style={{
                        height: '40vh',
                      }}
                    />
                  </div>
                </div><br /><br />
                <div className='row'>
                  <center>
                    <button onClick={submitForm} type='submit' className="btn btn-primary">Submit</button>
                  </center>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
