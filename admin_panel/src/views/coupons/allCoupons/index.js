import React, { useEffect, useState } from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import { Link } from 'react-router-dom';
import http from "../../../utils/http-client";

export default function AllCopons() {
 // var [Coupan, setCoupan] = useState([]);
  var [Coupans, setCoupans] = useState([]);
  var getData = async () => {
    try {
      const res = await http.get("/Coupan");
     // console.log(res);
      setCoupans(res.data);
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
      const res = await http.Delete(`/delete_Coupans?id=${r.id}`);
      console.log(res);
      if (res.data.success) {
        setCoupans(Coupans.filter((ele) => (ele.id !== r.id)))
      } else {
        console.error('Coupan not found or not deleted:', res.data.error);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
  return (
    <div>
      <div className='container'>
        <div className='d-flex'>
          <h3>All Coupans </h3>
          <button onClick={exportPdf} className='ms-auto btn btn-outline-primary'><i className="fa-solid fa-file-pdf"></i> Convert to pdf</button>
        </div><br />
        {Coupans.length > 0 ? (
          <div style={{ height: '60vh', overflowY: 'auto' }}>
            <table className="table table-striped table-hover table-responsive shadow  table-scroll text-center" id='my-table'>
              <thead>
                <tr className='table-dark'>
                  <th scope="col">ID</th>
                  <th scope="col">Coupon Code</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">Expire_Date</th>
                  <th scope="col">Coupons_Status</th>
                  <th scope="col">Coupons_Limit</th>
                  {/* <th scope="col">Hashid</th> */}
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Coupans.map((row, index) => (
                  
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{row.coupon_code}</td>
                    <td>{row.discount}</td>
                    <td>{row.start_date}</td>
                    <td>{row.expire_date}</td>
                    <td>{row.coupons_status}</td>
                    <td>{row.coupons_limit}</td>
                    {/* <td>{row.hashid}</td> */}
                    <td>
                      <Link to={`/Copons/EditCopons/${row.id}`} className="btn btn-outline-success">
                        <i className="fa fa-edit"></i>
                      </Link>&nbsp;&nbsp;
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
    </div>
  )
}
