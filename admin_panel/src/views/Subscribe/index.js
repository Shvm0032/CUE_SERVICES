import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

export default function Index() {
    var [Subscribe, setSubscribe] = useState([]);
    var getData = async () => {
        try {
            var res = await axios.get("http://localhost:8000/api/Subscribe");
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


    return (
        <div>
            <div className='container'>
                <div className='d-flex'>
                    <h3>All Subscribe Email </h3>
                    <button onClick={exportPdf} className='ms-auto btn btn-outline-primary'><i className="fa-solid fa-file-pdf"></i> Convert to pdf</button>
                </div><br />

                {Subscribe.length > 0 ? (
                    <table className="table table-striped table-hover shadow" id='my-table'>
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">#</th>
                                <th scope="col">Subscribe Email</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Subscribe.map((row, index) => (
                                <tr key={index}>
                                    <th >{row.id}</th>
                                    <th >{row.subscribe}</th>
                                    <td>
                                        <button type="submit" className="btn btn-outline-danger">
                                        <i className="fa-solid fa-trash-can"></i>&nbsp;Delete
                                        </button>
                                    </td>
                                </tr>

                            ))}

                        </tbody>

                    </table>
                ) : (
                    <p>Loading data.....</p>
                )}
            </div>
        </div>
    )
}
