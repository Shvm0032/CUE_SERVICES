import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

// import Dropify from 'dropify';
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

export default function AddCourse() {
    const [slug, setSlug] = useState('');
    const [speaker, setSpeaker] = useState([]);
    const [industry, setIndustry] = useState([]);

    // Function to generate URL slug from the title
    const generateSlug = (input) => {
        return input
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric characters with dashes
            .replace(/-+/g, '-') // Replace multiple dashes with a single dash
            .replace(/^-|-$/g, ''); // Trim dashes from start and end
    };

    // Event handler for title input change
    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        // setTitle(newTitle);
        setCourse((previous) => ({
            ...previous,
            Name: newTitle
        }));
        const newSlug = generateSlug(newTitle);
        setSlug(newSlug);
    };


    const [formFields, setFormFields] = useState([
        { category: '', name: '', price: '' },
    ]);
    const [filedata, setFiledata] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [sellingOptions, setSellingOptions] = useState([]);
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

   
 
    //console.log(industry);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.get('/Industary');
                console.log(response);
                if (response?.status == '200') {
                    // const responseData = await response.json();
                    setIndustry(response.data); 
                    //console.log(responseData);
                } else {
                    console.error('Error fetching data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);   
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.get('/speaker');
                console.log(response.data);
                if (response?.status == '200') {
                    // const responseData = await response.json();
                    setSpeaker(response.data?.data);
                    //console.log(responseData);
                } else {
                    console.error('Error fetching data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     fetch('http://127.0.1:8000/api/speaker')
    //         .then(response => response.json())
    //         .then(data => {
    //             setSpeaker(data.data);
    //         })
    //         .catch(error => console.error('Error fetching speaker information:', error));
    // }, []);

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

        console.log("Selling Options:", sellingOptions);
        const result = Object.groupBy(sellingOptions, ({ selling_category }) => selling_category);
        const lp = result["Live Options"]
        const ssp = result["Super Saver Options"]
        const rc = result["Recording & Combos"]

        console.log("Live Option")
        console.log(lp)
        console.log("SS Option")
        console.log(ssp)
        console.log("Recording")
        console.log(rc)



      

        console.log("Pussing data")
        

        let selling = sellingOptions.map((ele) => ({
            id: ele.id,
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
        data.append('slug', slug);
        console.log(data, 'data');
        http.post('/Course_add', data)

            .then(response => {
                if (response.status === 200) {
                    console.log('Course added successfully!');
                    setShowSuccessModal(true);
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
                            <form className='shadow p-5 bg-light ' onSubmit={submitForm}>
                                <div className='row'>
                                    <div className='col-2'>
                                        <label>Industry</label>
                                    </div>
                                    <div className='col'>
                                        <select required={true} onChange={(e) => {
                                            setCourse((previous) => ({
                                                ...previous,
                                                Industry: e.target.value,
                                            
                                            }))
                                        }} className="form-select" name='Industry' aria-label="Industry Select">
                                            <option defaultValue>Select an Industry</option>
                                            {industry.map((ele) => (
                                                <option key={ele.id} value={ele.id}>{ele.industry_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div><br />
                                <div className='row'>
                                    <div className='col-2'>
                                        <label>Speaker</label>
                                    </div>
                                    <div className='col'>
                                        <select required={true} onChange={(e) => {
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
                                </div><br />
                                <div className='row'>
                                    <div className='col-2'>
                                        <label>Name</label>
                                    </div>
                                    <div className='col'>
                                        <input
                                            onChange={handleTitleChange}
                                            type="text"
                                            name='courseName'
                                            className="form-control"
                                            placeholder="Course Name"
                                            required
                                        />
                                    </div>
                                </div><br />
                                <div className='row'>
                                    <div className='col-2'>
                                        <label>Url</label>
                                    </div>
                                    <div className='col'>

                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">http://localhost:3000/course</div>
                                            </div>
                                            <input
                                                type="text"
                                                id="url"
                                                className="form-control"
                                                value={slug}
                                                readOnly
                                                placeholder="Course Name"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div><br />
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
                                </div><br />
                                <div className='row'>
                                    <div className='col-2 mt-4'>
                                        <label>Thumbnail</label>
                                    </div>
                                    <div className='col'>
                                        <input
                                            onChange={(e) => { setFiledata(e.target.files[0]) }}
                                            type="file"
                                            name='thumbnail'
                                            className="dropify"
                                            id="customFile" 
                                            required
                                        />

                                        {/* <Dropify
                                            onChange={(e) => { setFiledata(e.target.files[0]) }} name='thumbnail' id="customFile"
                                            maxFileSize={2}
                                            allowedFileFormats={['portrait', 'square']}
                                            maxFileHeight={2000}
                                            style={{
                                                border: '1px solid #ced4da',
                                                borderRadius: '.25rem',
                                                padding: '.375rem .75rem',
                                                fontSize: '1rem',
                                                lineHeight: '1.5',
                                                color: '#495057',
                                                backgroundColor: '#fff',
                                                backgroundClip: 'padding-box',
                                                boxShadow: 'none',
                                                cursor: 'pointer',
                                            }}
                                        /> */}



                                    </div>
                                </div><br />
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
                                            required
                                        />
                                    </div>
                                </div><br />
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
                                            required
                                        />
                                    </div>
                                </div><br />
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
                                            required
                                        />
                                    </div>
                                </div><br />
                                <div className='row'>
                                    <div className='col-2'>
                                        <label>Selling Option</label>
                                    </div>
                                    <div className='col'>
                                        <table className='table  table-striped table-light shadow  table-hover'>
                                            <thead>
                                                <tr className='fw-bold'>
                                                    <td></td>
                                                    <td>Category</td>
                                                    <td>Name</td>
                                                    <td>Price</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sellingOptions.map((option, index) => (
                                                    <tr key={option.id}>
                                                        <td>
                                                            <input type='hidden' name="id[]" value={option.id} />
                                                        </td>
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
                                    <button type='submit' className="btn btn-primary ">Submit</button>
                                </center>
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
            </section>
        </>
    );
}
