import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router';
import http from "../../../utils/http-client";

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
  const [validationMessages, setValidationMessages] = useState({
    name: '',
    phone: '',
    email: '',
    bio: '',
    image: '',
    designation: '',
    experience: ''
  });
  const navigate = useNavigate(); // Correct useNavigate call

  function submitForm(e) {
    e.preventDefault();

    // Check if all required fields are filled
    const messages = {};
    Object.keys(formValue).forEach(key => {
      if (formValue[key].trim() === '') {
        messages[key] = 'This field is required';
      } else {
        messages[key] = '';
      }
    });
   
    // Check if filedata is not null
    if (!filedata) {
      messages.image = 'Please select an image';
    } else {
      messages.image = '';
    }

    
    // Adding validation for the bio field
    if (formValue.bio.trim() === '') {
      messages.bio = 'Please fill Bio field ';
    } else {
      messages.bio = '';
    }

    setValidationMessages(messages);

    if (Object.values(messages).some(message => message !== '')) {
      setReturnMessage('Please fill out all required fields.');
      return;
    }

    const data = new FormData();
    data.append('name', formValue.name);
    data.append('email', formValue.email);
    data.append('phone', formValue.phone);
    data.append('designation', formValue.designation);
    data.append('experience', formValue.experience);
    data.append('bio', formValue.bio);
    data.append("file", filedata);

    http.post('/Speaker_add', data)
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
              {/* {returnMessage && <p className="text-success">{returnMessage}</p>} */}
              <form>
                <div className='row'>
                  <div className='col'>
                    <div className='row'>
                      <div className='col-2'><label className="form-label"> Name :</label></div>
                      <div className='col'><input type='text' className='form-control' name='name' value={formValue.name} onChange={(e) => { setFormValue((pre) => ({ ...pre, name: e.target.value })) }} placeholder='Enter Name...' required /> </div>
                      <div className='col'><p className="text-danger">{validationMessages.name}</p></div>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='row'>
                      <div className='col-2 text-end'><label>Email :</label></div>
                      <div className='col'><input type='text' className='form-control' name='email' value={formValue.email} onChange={(e) => { setFormValue((pre) => ({ ...pre, email: e.target.value })) }} placeholder='Email id...' required /> </div>
                      <div className='col'><p className="text-danger">{validationMessages.email}</p></div>
                    </div>
                  </div>
                </div><br />
                <div className='row'>
                  <div className='col-2'><label>Phone Number:</label></div>
                  <div className='col'> <input type="text" className="form-control" name='phone' value={formValue.phone} onChange={(e) => { setFormValue((pre) => ({ ...pre, phone: e.target.value })) }} placeholder="Phone Number" required /></div>
                  <div className='col'><p className="text-danger">{validationMessages.phone}</p></div>
                </div><br />
                <div className='row'>
                  <div className='col-2'><label>Designation:</label></div>
                  <div className='col'> <input type="text" className="form-control" name='designation' value={formValue.designation} onChange={(e) => { setFormValue((pre) => ({ ...pre, designation: e.target.value })) }} placeholder="Designation" required /></div>
                  <div className='col'><p className="text-danger">{validationMessages.designation}</p></div>
                </div><br />
                <div className='row'>
                  <div className='col-2'><label>Experience:</label></div>
                  <div className='col'> <input type="text" className="form-control" name='experience' value={formValue.experience} onChange={(e) => { setFormValue((pre) => ({ ...pre, experience: e.target.value })) }} placeholder="Working Experience" required /></div>
                  <div className='col'><p className="text-danger">{validationMessages.experience}</p></div>
                </div><br />
                <div className='row'>
                  <div className='col-2 mt-3'><label>Speaker Image :</label></div>
                  <div className='col'>
                  <input type="file" className="form-control" name='image' onChange={(e) => { setFiledata(e.target.files[0]) }} id="customFile" required />
                    <p className="text-danger">{validationMessages.image}</p> {/* Display image validation message */} </div>
                   
                


                </div> <br />

                <div className='row'>
                  <div className='col-2'> <label className='form-label'>Bio :</label></div>
                  <div className='col'>
                    <ReactQuill onChange={(e) => { setFormValue((pre) => ({ ...pre, bio: e })) }} theme="snow"
                      modules={modules}
                      style={{
                        height: '40vh',
                      }}
                      required
                    />
                    <center> <p className="text-danger">{validationMessages.bio}</p></center> {/* Display bio validation message */}
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
