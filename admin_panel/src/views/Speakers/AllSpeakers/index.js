import React, { useEffect, useState } from 'react';

import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import { Link } from 'react-router-dom';
import http from "../../../utils/http-client";


export default function AllSpeakers() {
  const IMGurl = process.env.REACT_APP_IMG_URL;
  var [speakers, setSpeakers] = useState([]);
  var getData = async () => {
    try {
      var res = await http.get("/Speaker");
      console.log(res);
      setSpeakers(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  async function deleteFunc(r) {
    console.log("hii")
    console.log(r)
    try {
      const res = await http.Delete(`/delete_speaker?id=${r.speaker_id}`);
      console.log(res);
      if (res.data.success) {
        setSpeakers(speakers.filter((ele) => ele.speaker_id !== r.speaker_id))
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const exportPdf = async () => {
    const doc = new jsPDF({
      orientation: "landscape"
    });
    doc.autoTable({
      html: "#my-table"
    })
    doc.save("data.pdf");
  }
  console.log(speakers,'speakers');
  return (
    <div>
      <section>
        <div className='container overflow-scroll'>
          <div className='d-flex'>
            <h3>All Speakers </h3>
            <button onClick={exportPdf} className='ms-auto btn btn-outline-primary'><i className="fa-solid fa-file-pdf"></i> Convert to pdf</button>
          </div><br />
          {speakers.length > 0 ? (
            <div style={{ height: '60vh', overflowY: 'auto' }}>
              <table className="table table-striped table-hover table-responsive shadow  table-scroll text-center" id='my-table'>
                <thead>
                  <tr className='table-dark'>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Email</th>
                    <th scope="col">phone_no</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Action</th>
                    {/*  <th scope="col">Bio</th>*/}
                    {/* <th scope="col">Designation</th>*/}

                    {/* <th scope="col">Bio</th> */}


                    {/* <th scope="col">Experience</th> */}

                    {/* <th scope="col">Resume</th> */}
                    {/* <th scope="col">Status</th> */}

                  </tr>
                </thead>
                <tbody>
                  {speakers.map((row, index) => (
                    <tr key={index}>
                      <th >{index + 1}</th>
                      <td>
                        <Link to={`/Speakers/SpeakerDetails/${row.speaker_id}`}>
                          {row.name}
                        </Link>
                        
                      </td>
                      <td><img src={`${IMGurl}/${row.images}`} width={50} height={50} alt='speaker' /></td>
                      <td>{row.email}</td>
                      <td>{row.phone_no}</td>

                      {/* <td>{row.bio}</td>*/}
                      {/* <td>{row.designation}</td>*/}

                      {/* <td>{row.bio}</td> */}
                      <td>{row.designation}</td>

                      {/* <td>{row.experience}</td> */}
                      {/* <td>{row.resume}</td> */}
                      {/* <td>{row.status}</td> */}
                      <td>
                        {/* <button type="submit" onClick={() => deleteFunc(row)} className="btn btn-outline-danger">
                        <i className="fa-solid fa-trash-can"></i>&nbsp;Delete
                      </button>
                      &nbsp;&nbsp;&emsp;
                     <Link to= {`/Speakers/EditSpeakers/${row.speaker_id}`} className='btn btn-outline-success'>
                        <i className="fa fa-edit"></i>&nbsp;Edit
                      </Link> */}


                        <Link to={`/Speakers/EditSpeakers/${row.speaker_id}`} className="btn btn-outline-success">
                          <i className="fa fa-edit"></i>
                        </Link>
                        &nbsp;&nbsp;
                        <button type="submit" onClick={() => deleteFunc(row)} className="btn btn-outline-danger">
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>

                  ))}

                </tbody>

              </table>
            </div>
          ) : (
            <p>Loading data.....</p>
          )}
        </div>
      </section>
    </div>
  )
}
