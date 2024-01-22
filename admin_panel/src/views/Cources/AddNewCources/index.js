import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
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

export default function AddCourse() {
    const [formFields, setFormFields] = useState([
        { category: '', name: '', price: '' },
    ]);
    const [filedata, setFiledata] = useState(null);
    const [sellingOptions, setSellingOptions] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/GetsellingOptions');
            if (response.ok) {
                const data = await response.json();
                setSellingOptions(data);
            } else {
                console.error('Error fetching data from MySQL:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data from MySQL:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    }

    const addFields = () => {
        let object = {
            category: "",
            name: "",
            price: ""
        }
        setFormFields([...formFields, object]);
    }

    const [industry, setIndustry] = useState([]);
    const [speaker, setSpeaker] = useState([]);

    useEffect(() => {
        fetch('http://127.0.1:8000/api/industry')
            .then(response => response.json())
            .then(data => {
                setIndustry(data);
            })
            .catch(error => console.error('Error fetching industry information:', error));
    }, []);

    useEffect(() => {
        fetch('http://127.0.1:8000/api/speaker')
            .then(response => response.json())
            .then(data => {
                setSpeaker(data.data);
            })
            .catch(error => console.error('Error fetching speaker information:', error));
    }, []);

    const [Course, setCourse] = useState({
        Industry: "",
        Speaker: "",
        Name: '',
        Description: "",
        Duration: "",
        Time: '',
        CSTDate: '',
    });

    const handleSellingOptionChange = (event, index) => {
        let data = [...sellingOptions];
        data[index][event.target.name] = event.target.value;
        setSellingOptions(data);
    }

    function submitForm(e) {
        e.preventDefault();

        let selling = sellingOptions.map((ele) => ({
            category: ele.selling_category,
            name: ele.name,
            price: ele.price
        }));

        const data = new FormData();
        data.append('industry', Course.Industry);
        data.append('speaker', Course.Speaker);
        data.append('name', Course.Name);
        data.append('description', Course.Description);
        data.append('duration', Course.Duration);
        data.append('time', Course.Time);
        data.append('cstdate', Course.CSTDate);
        data.append('fields', JSON.stringify(selling));
        data.append('file', filedata);

        axios.post('http://localhost:8000/api/Course_add', data)
        
            .then(response => {
                if (response.status === 200) {
                    setSuccessMessage('Course added successfully!');
                    navigate('/Cources/AllCources');
                } else {
                    console.error('Failed to add course:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error adding course:', error.message);
            });
    }

    return (
        <>
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 p-4">
                            <h4 className="text-center mt-2">Add New Course</h4>
                            <form>
                                <div className='row'>
                                    <div className='col-2'>
                                        <label>Industry</label>
                                    </div>
                                    <div className='col'>
                                        <select onChange={(e) => {
                                            setCourse((previous) => ({
                                                ...previous,
                                                Industry: e.target.value
                                            }))
                                        }} className="form-select" name='Industry' aria-label="Industry Select">
                                            <option defaultValue>Select an Industry</option>
                                            {industry.map((ele) => (
                                                <option key={ele.id} value={ele.id}>{ele.industry_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
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
                                        }} className="form-select" name='Speaker' aria-label="Speaker Select">
                                            <option defaultValue>Select a Speaker</option>
                                            {speaker.map((ele) => (
                                                <option key={ele.id} value={ele.speaker_id}>{ele.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-2'>
                                        <label>Name</label>
                                    </div>
                                    <div className='col'>
                                        <input
                                            onChange={(e) => {
                                                setCourse((previous) => ({
                                                    ...previous,
                                                    Name: e.target.value
                                                }))
                                            }}
                                            type="text"
                                            name='courseName'
                                            className="form-control"
                                            placeholder="Course Name"
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-2'>
                                        <label>Description</label>
                                    </div>
                                    <div className='col'>
                                        <ReactQuill
                                            onChange={(e) => {
                                                setCourse((previous) => ({
                                                    ...previous,
                                                    Description: e,
                                                }))
                                            }}
                                            theme="snow"
                                            modules={modules}
                                            style={{
                                                height: '40vh',
                                                marginBottom: '40px'
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-2 mt-4'>
                                        <label>Thumbnail</label>
                                    </div>
                                    <div className='col'>
                                        <input
                                            onChange={(e) => { setFiledata(e.target.files[0]) }}
                                            type="file"
                                            name='thumbnail'
                                            className="form-control"
                                            id="customFile"
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-2'>
                                        <label>Duration</label>
                                    </div>
                                    <div className='col'>
                                        <input
                                            onChange={(e) => {
                                                setCourse((previous) => ({
                                                    ...previous,
                                                    Duration: e.target.value,
                                                }))
                                            }}
                                            type="text"
                                            name='duration'
                                            className="form-control"
                                            placeholder="Duration"
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-2'>
                                        <label>CST Date</label>
                                    </div>
                                    <div className='col'>
                                        <input
                                            onChange={(e) => {
                                                setCourse((previous) => ({
                                                    ...previous,
                                                    CSTDate: e.target.value,
                                                }))
                                            }}
                                            type="date"
                                            name='date'
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-2'>
                                        <label>Time</label>
                                    </div>
                                    <div className='col'>
                                        <input
                                            onChange={(e) => {
                                                setCourse((previous) => ({
                                                    ...previous,
                                                    Time: e.target.value,
                                                }))
                                            }}
                                            type="time"
                                            name='time'
                                            className="form-control"
                                        />
                                    </div>
                                </div>
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
                                                    <tr key={option.id}>
                                                        <td><input type='hidden' name="category[]" value={option.selling_category} />{option.selling_category}</td>
                                                        <td><input type='text' className='form-control' name="name" value={option.name} onChange={(e) => handleSellingOptionChange(e, index)} /></td>
                                                        <td><input type='text' className='form-control' name="price" value={option.price} onChange={(e) => handleSellingOptionChange(e, index)} /></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <center>
                                    <button onClick={submitForm} type='submit' className="btn btn-primary ">Submit</button>
                                </center>
                                {successMessage && (
                                    <div className="alert alert-success mt-3" role="alert">
                                        {successMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
