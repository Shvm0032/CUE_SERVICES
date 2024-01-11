import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewIndustary() {

  var [Industary, setIndustary] = useState([]);
  var getData = async () => {
    try {
      var res = await axios.get("http://localhost:8000/api/Industary");
      console.log(res);
      setIndustary(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>
    <h3 className='text-center'>View all Industary</h3>
    <div className='container mt-5'>
      {Industary.length > 0 ? (
        <table className="table table-striped table-hover shadow">
          <thead>
            <tr className='table-dark'>
              <th scope="col">#</th>
              <th scope="col">Industary_Name</th>
              {/* <th scope="col">Slug</th> */}
              <th scope="col">Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Industary.map((row, index) => (
              <tr key={index}>
                <th >{row.id}</th>
                <td>{row.industry_name}</td>
                <td>{row.image}</td>
                <td>
                  <button type="submit" className="btn btn-primary">
                    <i className="fa fa-eye"></i>&nbsp;Delete
                  </button>
                  &nbsp;&nbsp;
                  <button type="submit" className="btn btn-success">
                    <i className="fa fa-edit"></i>&nbsp;Edit
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
}
