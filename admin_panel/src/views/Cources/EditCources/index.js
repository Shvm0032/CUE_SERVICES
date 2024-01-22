import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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




const EditCourseDetail = () => {
  const { course_id } = useParams();

  const [course, setCourse] = useState({
    Industries: '',
    Speaker: '',
    Name: '',
    Description: '',
    Duration: '',
    Time: '',
    Date: '',
  });

  const [sellingOptions, setSellingOptions] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [speakers, setSpeakers] = useState([]);
  const [industries, setIndustries] = useState([]); // Added state for industries

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const responseCourse = await axios.get(`http://localhost:8000/api/edit/${course_id}`);
        if (responseCourse.status === 200) {
          const dataCourse = responseCourse.data[0];
          setCourse({
            Industries: dataCourse.industries,
            Speaker: dataCourse.speaker,
            Title: dataCourse.title,
            Description: dataCourse.description,
            Duration: dataCourse.duration,
            Thumbnail: dataCourse.Thumbnail,
            Time: dataCourse.time,
            Date: dataCourse.date,
          });
        } else {
          console.error('Error fetching course details:', responseCourse.statusText);
        }

        const responseSellingOptions = await axios.get('http://localhost:8000/api/GetsellingOptions');
        if (responseSellingOptions.status === 200) {
          setSellingOptions(responseSellingOptions.data);
        } else {
          console.error('Error fetching selling options:', responseSellingOptions.statusText);
        }

        const responseSpeakers = await axios.get('http://127.0.1:8000/api/speaker');
        if (responseSpeakers.status === 200) {
          setSpeakers(responseSpeakers.data.data);
        } else {
          console.error('Error fetching speaker information:', responseSpeakers.statusText);
        }

        // Fetch industries and set the state
        const responseIndustries = await axios.get('http://localhost:8000/api/industry');
        if (responseIndustries.status === 200) {
          setIndustries(responseIndustries.data);
        } else {
          console.error('Error fetching industries:', responseIndustries.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchCourseDetails();
  }, [course_id]);


  const handleSellingOptionChange = (e, index) => {
    let updatedOptions = [...sellingOptions];
    updatedOptions[index][e.target.name] = e.target.value;
    setSellingOptions(updatedOptions);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('industry', course.Industries);
      data.append('speaker', course.Speaker);
      data.append('title', course.Title);
      data.append('description', course.Description);
      data.append('duration', course.Duration);
      data.append('course_thumbnail', course.Thumbnail); // Make sure 'Thumbnail' is a File object
      data.append('time', course.Time);
      data.append('date', course.Date);
      data.append('fields', JSON.stringify(sellingOptions));

      const response = await axios.put(`http://localhost:8000/api/update/${course_id}`, data);

      if (response.status === 200) {
        console.log('Course updated successfully!');
        setShowSuccessModal(true);
      } else {
        console.error('Failed to update course:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating course:', error.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 p-4">
          <h4 className="text-center mt-2">Edit Course</h4>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-2">
                <label htmlFor="industry">Industry</label>
              </div>
              <div className="col">
                <select
                  id="industry"
                  className="form-select"
                  value={course.Industries}
                  onChange={(e) => setCourse({ ...course, Industries: e.target.value })}
                >
                  <option defaultValue>Select an Industry</option>
                  {industries.map((industry) => (
                    <option key={industry.id} value={industry.id}>
                      {industry.industry_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <label>Speaker</label>
              </div>
              <div className="col">
                <select
                  value={course.Speaker}
                  onChange={(e) => setCourse({ ...course, Speaker: e.target.value })}
                  className="form-select"
                >
                  {speakers.map((speaker) => (
                    <option key={speaker.id} value={speaker.id}>
                      {speaker.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <label>Name</label>
              </div>
              <div className="col">
                <input
                  type="text"
                  value={course.Title}
                  onChange={(e) => setCourse({ ...course, Title: e.target.value })}
                  className="form-control"
                  placeholder="Course Name"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-2 mt-4">
                <label>Description</label>
              </div>
              <div className="col">
                <ReactQuill
                  onChange={(e) => {
                    setCourse((previous) => ({
                      ...previous,
                      Description: e,
                    }));
                  }}
                  theme="snow"
                  modules={modules}
                  style={{
                    height: '40vh',
                    marginBottom: '40px',
                  }}
                  value={course.Description}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-2 mt-4'>
                <label>Thumbnail</label>
              </div>
              <div className='col'>
                <input
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setCourse((prevCourse) => ({
                      ...prevCourse,
                      Thumbnail: file,
                    }));
                  }}
                  type="file"
                  name='thumbnail'
                  className="form-control"
                  id="customFile"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <label> Duration</label>
              </div>
              <div className="col">
                <input
                  type="text"
                  value={course.Duration}
                  onChange={(e) => setCourse({ ...course, Duration: e.target.value })}
                  className="form-control"
                  placeholder="Course Name"
                />
              </div>
            </div>



            <div className="row">
              <div className="col-2">
                <label>Time</label>
              </div>
              <div className="col">
                <input
                  type="time"
                  value={course.Time}
                  onChange={(e) => setCourse({ ...course, Time: e.target.value })}
                  className="form-control"
                  placeholder="time"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <label>Date</label>
              </div>
              <div className="col">
                <input
                  type="date"
                  value={course.Date}
                  onChange={(e) => setCourse({ ...course, Date: e.target.value })}
                  className="form-control"
                  placeholder="date "
                />
              </div>
            </div>

            {/* ... rest of the form ... */}
            <div className='row'>
              <div className='col-2'>
                <label>Selling Option</label>
              </div>
              <div className='col'>
                <table className='table table-active table-hover'>
                  <thead>
                    <tr className='fw-bold'>
                      <td>Category</td>
                      <td>Name</td>
                      <td>Price</td>
                    </tr>
                  </thead>
                  <tbody>
                    {sellingOptions.map((option, index) => (
                      <tr key={index}>
                        <td><input type='hidden' name="category[]" value={option.selling_category} />{option.selling_category}</td>
                        <td><input type='text' className='form-control' name="name" value={option.name} onChange={(e) => handleSellingOptionChange(e, index)} /></td>
                        <td><input type='text' className='form-control' name="price" value={option.price} onChange={(e) => handleSellingOptionChange(e, index)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col text-center">
                <button type="submit" className="btn btn-primary">
                  Update Course
                </button>
              </div>
            </div>
          </form>
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: showSuccessModal ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Success!</h5>
                  <button type="button" className="close" onClick={() => setShowSuccessModal(false)} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  Course updated successfully!
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={() => setShowSuccessModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditCourseDetail;
