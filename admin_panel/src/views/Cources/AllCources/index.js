import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from "../../../utils/http-client";
import {CTooltip } from "@coreui/coreui";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const getData = async () => {
    try {
      var res = await http.get("/Course");
     // console.log(res);
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  const exportPdf = async () => {
    const doc = new jsPDF({
      orientation: "landscape"
    });
    doc.autoTable({
      html: "#my-table"
    })
    doc.save("data.pdf");
  }

  async function deleteFunc(r) {
    console.log("hii")
    console.log(r)
    try {
      const res = await http.Delete(`/delete_course?id=${r.id}`);
      console.log(res);
      if (res.status === 200) {
        setCourses(courses.filter((ele) => { if (ele.id !== r.id) { return true } else { return false } }))
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  return (
    <div>
      <div className='container overflow-scroll'>
        <div className='d-flex'>
          <h3>All Courses</h3>
          <button onClick={exportPdf} className='ms-auto btn btn-outline-primary'>Convert to pdf</button>
        </div><br />
        {courses.length > 0 ? (
          <table className="table table-striped overflow-scroll table-hover shadow" id='my-table'>
            <thead>
              <tr className='table-dark'>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                {/* <th scope="col">Description</th> */}
                {/* <th scope="col">CST-Date-time</th>
                <th scope="col">Time</th> */}
                {/* <th scope="col">price</th> */}
                {/* <th scope="col">Thumbnail</th> */}
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((row, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>

                  <td>
                    <Link to={`/Cources/CourseDetails/${row.id}`} className=' data-bs-toggle '> {row.title} </Link>
                  </td>
                  {/* <td>{row.description}</td> */}
                  {/* <td>{row.date}</td>
                  <td>{row.time}</td> */}
                  {/* <td>{row.selling_option}</td> */}
                  {/* <td>{row.course_thumbail}</td> */}
                  <td  className='d-flex' >
                    <Link to={`/Cources/EditCources/${row.id}`} className='btn btn-outline-success'>
                      <i className="fa fa-edit"></i>
                    </Link> &emsp;
                    <button onClick={() => deleteFunc(row)} type="submit" className="btn btn-outline-danger">
                      <i className="fa fa-trash-alt"></i>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )
        }
      </div >
    </div >
  );
}

export default AllCourses;
