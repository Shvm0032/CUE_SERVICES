import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import { Link } from 'react-router-dom';


export default function AllSpeakers() {
  var [Speakers, setSpeakers] = useState([]);
  var getData = async () => {
    try {
      var res = await axios.get("http://localhost:8000/api/Speaker");
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
      var res = await axios.delete(`http://localhost:8000/api/delete_speaker?id=${r.id}`);
      console.log(res);
      if (res.status === 200) {
        setSpeakers(Speakers.filter((ele) => { if (ele.id !== r.id) { return true } else { return false } }))
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
  
  return (
    <div>
      <section>
        <div className='container overflow-scroll'>
          <div className='d-flex'>
            <h3>All Speakers </h3>
            <button onClick={exportPdf} className='ms-auto btn btn-outline-primary'><i className="fa-solid fa-file-pdf"></i> Convert to pdf</button>
          </div><br />
          {Speakers.length > 0 ? (
            <table className="table table-striped table-hover table-responsive shadow" id='my-table'>
              <thead>
                <tr className='table-dark'>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">phone_no</th>

                {/*  <th scope="col">Bio</th>*/}
                  {/* <th scope="col">Designation</th>*/}

                  {/* <th scope="col">Bio</th> */}
                  <th scope="col">Designation</th>

                  <th scope="col">Experience</th>
                  <th scope="col">Image</th>
                  {/* <th scope="col">Resume</th> */}
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Speakers.map((row, index) => (
                  <tr key={index}>
                    <th >{row.id}</th>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.phone_no}</td>

                    {/* <td>{row.bio}</td>*/}
                      {/* <td>{row.designation}</td>*/}

                    {/* <td>{row.bio}</td> */}
                    <td>{row.designation}</td>

                    <td>{row.experience}</td>
                    <td>{row.images}</td>
                    {/* <td>{row.resume}</td> */}
                    <td>{row.status}</td>
                    <td>
                      <button type="submit" onClick={() => deleteFunc(row)} className="btn btn-outline-danger">
                        <i className="fa-solid fa-trash-can"></i>&nbsp;Delete
                      </button>
                      &nbsp;&nbsp;
                     <Link to= {`/Speakers/EditSpeakers/${row.speaker_id}`} className='btn btn-outline-success'>
                        <i className="fa fa-edit"></i>&nbsp;Edit
                      </Link>
                    </td>
                  </tr>

                ))}

              </tbody>

            </table>
          ) : (
            <p>Loading data.....</p>
          )}
        </div>
      </section>
    </div>
  )
}
