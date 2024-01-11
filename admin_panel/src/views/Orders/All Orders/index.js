import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

export default function AllOrders() {

  var [Orders, setOrders] = useState([]);
  var getData = async () => {
    try {
      var res = await axios.get("http://localhost:8000/api/Order_Details");
      console.log(res);
      setOrders(res.data);
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
    doc.save("Orders Details.pdf");
}

  return (
    <div>
      <div className='container-fluid overflow-scroll'>
        <div className='d-flex'>
          <h3>All Orders  </h3>
          <button onClick={exportPdf} className='ms-auto btn btn-outline-primary'><i className="fa-solid fa-file-pdf"></i> Convert to pdf</button>
        </div><br />
        {Orders.length > 0 ? (
          <table className="table table-striped table-hover shadow overflow-scroll" id='my-table'>
            <thead>
              <tr className='table-dark'>
                <th scope="col">#</th>
                <th scope="col">User_Id</th>
                <th scope="col">Course_Id</th>
                <th scope="col">Order_Id</th>
                <th scope="col">Tracking_Id</th>
                <th scope="col">Bank_ref_no</th>
                <th scope="col">Order_status</th>
                <th scope="col">Card_name</th>
                <th scope="col">Status_message</th>
                <th scope="col">amount</th>
                <th scope="col">Selling_options</th>
                <th scope="col">Trans_date</th>
                <th scope="col">hash</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {Orders.map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.user_id}</td>
                  <td>{row.course_id}</td>
                  <td>{row.order_id}</td>
                  <td>{row.tracking_id}</td>
                  <td>{row.bank_ref_no}</td>
                  <td>{row.order_status}</td>
                  <td>{row.card_name}</td>
                  <td>{row.status_message}</td>
                  <td>{row.amount}</td>
                  <td>{row.selling_options}</td>
                  <td>{row.trans_date}</td>
                  <td>{row.hash_id}</td>
                  <td>
                    <button type="submit" className="btn btn-outline-danger">
                    <i className="fa-solid fa-trash-can"></i>&emsp;Delete
                    </button>
                    &nbsp;&nbsp;
                    <button type="submit" className="btn btn-outline-success">
                      <i className="fa fa-edit"></i>&nbsp;Edit
                    </button>
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
  )
}
