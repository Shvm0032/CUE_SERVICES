import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import http from "../../../utils/http-client";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const EditSpeakersComponent = () => {
 // const IMGurl = process.env.REACT_APP_IMG_URL;
  const { speaker_id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_no, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [designation, setDesignation] = useState('');
  const [experience, setExperience] = useState('');
  const [file, setFile] = useState(null);
  console.log(file);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    http.get(`/speaker/edit/${speaker_id}`)
      .then((res) => {
        setName(res.data[0].name);
        setEmail(res.data[0].email);
        setPhone(res.data[0].phone_no);
        setBio(res.data[0].bio);
        setDesignation(res.data[0].designation);
        setExperience(res.data[0].experience);
      })
      .catch((err) => console.log(err));
  }, [speaker_id]);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
 
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/Speakers/AllSpeakers');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone_no', phone_no);
    formData.append('bio', bio);
    formData.append('designation', designation);
    formData.append('experience', experience);
    formData.append('image', file);

    try {
      const response = await http.put(`/update_speaker/${speaker_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);

      // Show the success modal
      handleShowModal();
    } catch (error) {
      console.error('Error updating speaker:', error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Speaker Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" className="form-control" value={phone_no} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="row">
          <div className="col-2">
            <label>Bio</label>
          </div>
          <div className="col">
            <ReactQuill value={bio} theme="snow" modules={modules} onChange={(value) => setBio(value)} />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Designation</label>
          <input type="text" className="form-control" value={designation} onChange={(e) => setDesignation(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Experience</label>
          <input type="text" className="form-control" value={experience} onChange={(e) => setExperience(e.target.value)} />
        </div>

        <div className="row">
          <div className="col-2 mt-4">
            <label>Image</label>
          </div>
          <div className="col">
            {/* <img src={`${IMGurl}/${images}`} width={100} height={50} alt='speaker' /> */}
            <img src={file ? URL.createObjectURL(file) : ''} alt="Speaker" style={{ height: "200px", width: "100%" }} className="img-fluid" />
            <input type="file" name="image" className="form-control" onChange={handleFileChange} />
          </div>
        </div>

        <button type="submit" className="btn btn-danger mt-3">
          Update
        </button>
      </form>

      {/* Modal for success message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Speaker updated successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditSpeakersComponent;
