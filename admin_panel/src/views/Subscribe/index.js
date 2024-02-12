import React, { useEffect, useState } from 'react';

import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import http from "../../utils/http-client";

export default function Index() {
    var [Subscribe, setSubscribe] = useState([]);
    var getData = async () => {
        try {
            var res = await http.get("/Subscribe");
            console.log(res);
            setSubscribe(res.data);
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
        doc.save("Subscribe Email.pdf");
    }
    async function deleteFunc(r) {
        console.log("hii")
        console.log(r)
        try {
            const res = await http.Delete(`/delete_Subscribe?id=${r.id}`);
            console.log(res);
            if (res.data.success) {
                setSubscribe(Subscribe.filter((ele) => (ele.id !== r.id)))
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
                    <h3>All Subscribe Email </h3>
                    <button onClick={exportPdf} className='ms-auto btn btn-outline-primary'><i className="fa-solid fa-file-pdf"></i> Convert to pdf</button>
                </div><br />

                {Subscribe.length > 0 ? (
                    <div className='col-md-6 col-12 offset-3' >
                        <table className="table table-striped table-hover shadow" id='my-table'>
                            <thead>
                                <tr className='table-dark'>
                                    <th scope="col">#</th>
                                    <th scope="col">Subscribe Email</th>
                                    {/* <th scope="col">Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {Subscribe.map((row, index) => (
                                    <tr key={index}>
                                        <th >{index + 1}</th>
                                        <th >{row.email}</th>
                                        {/* <td>
                                            <button type="submit" onClick={() => deleteFunc(row)} className="btn btn-outline-danger">
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </td> */}
                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>
                ) : (

                    <div className='container'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <h5>No Record found....</h5>
                        </div>

                    </div>

                )}
            </div>
        </div>
    )
}
