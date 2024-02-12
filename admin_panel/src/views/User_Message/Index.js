import React, { useEffect, useState } from 'react'
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
export default function Index() {
    const [userdata, setUserdata] = useState([]);
    useEffect(() => {
        const getUserdata = async () => {
            const reqData = await fetch("http://localhost:8000/api/user_message");
            const resData = await reqData.json();
            setUserdata(resData);
            console.log(resData);

        }
        getUserdata();
    }, []);
    
    const exportPdf =async()=>{
        const doc = new jsPDF({
          orientation:"landscape"
        });
        doc.autoTable({
          html:"#my-table"
        }) 
        doc.save("Usermassage.pdf");
      }

    return (
        <div>
            <section>
                <div className='container'>
                <div className='d-flex'>
                <h3> User massgage </h3>
                <button onClick={exportPdf} className='ms-auto btn btn-outline-primary'><i className="fa-solid fa-file-pdf"></i> Convert to pdf</button>
                </div><br/>
                    <div className='row'>
                        <table className="table table-border table-striped table-hover table-light shadow  table-scroll text-center" id='my-table'>
                            <thead>
                                <tr className='table-dark'>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Message</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userdata.map((userdata,index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{userdata.Name}</td>
                                        <td>{userdata.Email}</td>
                                        <td>{userdata.Phone}</td>
                                        <td>{userdata.Message}</td>
                                        <td> <button type="submit" className="btn btn-outline-danger">
                                        <i className="fa-solid fa-trash-can"></i>&nbsp;Delete
                                        </button></td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}
