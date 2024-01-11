import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';// import the styles
import { useEffect } from 'react';
import axios from 'axios';
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

export default function EditCources() {
  const [formFields, setFormFields] = useState([
    { category: '', name: '', price: '' },
  ])
  const [filedata, setFiledata] = useState([])
  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
    console.log(formFields)
  }
  const addFields = () => {
    let object = {
      category: "",
      name: "",
      price: ""
    }
    setFormFields([...formFields, object])
    console.log(formFields)
  }

  const [industry, setIndustry] = useState([])
  const [speaker, setSpeaker] = useState([])

  useEffect(() => {
    // Fetch user information from the server
    fetch(`http://127.0.1:8000/api/industry`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setIndustry(data);

      })
      .catch(error => console.error('Error fetching user information:', error));
  }, []);
  useEffect(() => {
    // Fetch user information from the server
    fetch(`http://127.0.1:8000/api/speaker`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setSpeaker(data);

      })
      .catch(error => console.error('Error fetching user information:', error));
  }, []);
  const [Course, setCourse] = useState(
    {
      Industary: "",
      Speaker: "",
      Name: '',
      Description: "",
      Duration: "",
      Time: '',
      CSTDate: '',
    }
  )

  function submitForm(e) {
    e.preventDefault()
    const data = new FormData();
    data.append('industry', Course.Industary);
    data.append('speaker', Course.Speaker);
    data.append('name', Course.Name);
    data.append('description', Course.Description);
    data.append('duration', Course.Duration);
    data.append('time', Course.Time);
    data.append('cstdate', Course.CSTDate);
    data.append("fields", JSON.stringify(formFields))
    data.append("file", filedata)
    console.log(filedata, data)

    axios.post('http://localhost:8000/api/Course_add', data)
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }
  console.log(Course, filedata)

  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-4">
              <h4 className="text-center mt-2">Edit Course</h4>
              <form >
                {/* industary */}
                <div className='row'>
                  <div className='col-2'>
                    <label>Industry</label>
                  </div>
                  <div className='col'>
                    <select onChange={(e) => {
                      setCourse((previous) => ({
                        ...previous,
                        Industary: e.target.value
                      }))
                    }} className="form-select" name='Industry' aria-label="Default select example">
                      <option selected>Open this select menu</option>
                      {industry.map((ele) => (
                        <option key={ele.id} value={ele.id}>{ele.industry_name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <br />
                {/* Seaker */}
                <div className='row'>
                  <div className='col-2'>
                    <label>Speaker</label>
                  </div>
                  <div className='col'>
                    <select onChange={(e) => {
                      setCourse((previous) => ({
                        ...previous,
                        Speaker: e.target.value
                      }))
                    }} className="form-select" name='Speaker' aria-label="Default select example">
                      <option selected>Open this select menu</option>

                      {speaker.map((ele) => (
                        <option key={ele.id} value={ele.name}>{ele.name}</option>
                      ))}
                    </select>
                  </div>
                </div><br />
                {/* hide or display */}

                {/* COURSE NAME */}
                <div className='row'>
                  <div className='col-2'><label>Name</label></div>
                  <div className='col'> <input onChange={(e) => {
                    setCourse((previous) => ({
                      ...previous,
                      Name: e.target.value
                    }))
                  }} type="text" name='courseName' className="form-control" placeholder="name" /></div>
                </div><br />

                {/* Description */}
                <div className='row'>
                  <div className='col-2'> <label> Description</label></div>
                  <div className='col'> <ReactQuill onChange={(e) => {
                    setCourse((previous) => ({
                      ...previous,
                      Description: e,
                    }))
                  }} theme="snow"
                    modules={modules}
                    style={{
                      height: '40vh',
                      marginBottom: '40px'
                    }}
                  />
                  </div>
                </div>
                {/* thumbnail */}
                <br />
                <div className='row'>
                  <div className='col-2 mt-4'><label>Thumbnail</label></div>
                  <div className='col'><input onChange={(e) => { setFiledata(e.target.files[0]) }} type="file" name='thumbnail' className="form-control" id="customFile" /></div>
                </div>
                {/* duration */}
                <br />
                <div className='row'>
                  <div className='col-2'>  <label>Duration</label></div>
                  <div className='col'><input onChange={(e) => {
                    setCourse((previous) => ({
                      ...previous,
                      Duration: e.target.value,
                    }))
                  }} type="text" name='duration' className="form-control" placeholder="duration" /></div>
                </div>



                <br />
                {/* cst time date */}
                <div className='row'>
                  <div className='col-2'><label>CST Date </label></div>
                  <div className='col'><input onChange={(e) => {
                    setCourse((previous) => ({
                      ...previous,
                      CSTDate: e.target.value,
                    }))
                  }} type="date" name='date' className="form-control" /></div>
                </div>
                <br />

                {/* time */}
                <div className='row'>
                  <div className='col-2'><label> Time</label></div>
                  <div className='col'><input onChange={(e) => {
                    setCourse((previous) => ({
                      ...previous,
                      Time: e.target.value,
                    }))
                  }} type="time" name='time' className="form-control" /></div>
                </div>
                <br />


                {/* selling opection */}
                <div className='row'>
                  <div className='col-2'> <label>Selling option</label></div>
                  <div className='col'>

                    <div className="accordion accordion-flush" id="accordionFlushExample">

                    </div>
                    <div name='speaker'>
                      <h6 className='text-seconday'>Selling option</h6>
                      <table id="mytable" className='table border tab-content table-hover table-striped'>
                        <thead>
                          <tr className="table-secondary">
                            <th>Catagory</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {formFields.map((row, index) => (
                            <tr key={index}>
                              <td><input name='category' onChange={(event) => handleFormChange(event, index)} type="text" className="form-control" /></td>
                              <td><input name='name' onChange={(event) => handleFormChange(event, index)} type="text" className="form-control" /></td>
                              <td><input name='price' onChange={(event) => handleFormChange(event, index)} type="number" className="form-control" /></td>
                              <td><button className='border-0' onClick={addFields}>+</button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div><br />
                <center>
                  <button onClick={submitForm} type='submit' className="btn btn-primary ">Submit</button>
                </center>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
