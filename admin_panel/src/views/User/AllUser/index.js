import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from "../../../utils/http-client";

function AllUser() {
  const [user, setuser] = useState([]);
   console.log("user", user)
  const getData = async () => {
    try {
      var res = await http.get("/registration");
      console.log(res);
      setuser(res.data);
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
  return (
    <div>
      <div className='container overflow-scroll'>
        <div className='d-flex'>
          <h3>All User</h3>
          <button onClick={exportPdf} className='ms-auto btn btn-outline-primary'>Convert to pdf</button>
        </div><br />
        {user.length > 0 ? (
          <table className="table table-striped overflow-scroll table-hover shadow" id='my-table'>
            <thead>
              <tr className='table-dark'>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th> 
                <th scope="col">Phone</th>
                <th scope="col">User Name</th> 
                <th scope="col">Action</th> 
              </tr>
            </thead>
            <tbody>
              {user.map((row, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{row.fname} {row.lname} </td>
                  <td>{row.email}</td>
                   <td>{row.phone}</td>
                  <td>{row.uname}</td> 
                  {/* <td>{row.selling_option}</td> */}
                  {/* <td>{row.course_thumbail}</td> */}
                  <td className='d-flex'>
                    <Link to={`/User/UserDetail/${row.id}`} className='btn btn-outline-success'>
                      <i className="fa fa-eye"></i>
                    </Link>&emsp;
                   
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default AllUser;
