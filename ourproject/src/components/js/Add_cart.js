import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Add_cart() {

  var [Add_cart, setAdd_cart] = useState([]);
  var getData = async () => {
    try {
      var res = await axios.get("http://localhost:8000/api/Add_cart");
      console.log(res);
      setAdd_cart(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>

      <div className='container mt-5 pt-5'>
        <div className='row'>
          <div className='col p-5 '>

            <table class="table table-striped table-hover table-light  ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Course Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Add_cart.map((Add_cart) => (
                  <tr key={Add_cart.id}>
                    <th scope="row">{Add_cart.id}</th>
                    <td>{Add_cart.course_name}</td>
                    <td>{Add_cart.price}</td>
                    <td><button type='button' className='btn btn-danger'><i className="fas fa-trash-alt"></i></button></td>
                  </tr>
                ))}

              </tbody>
            </table>

          </div>
        </div>
        <div className='row'>
          <div className='col-4 offset-8'>
            <table className='table table-striped table-hover'>
              <tr>
                <td className='col'>Course</td>
                <td className='col'></td>
              </tr>
              <tr>
                <td className='col'>Order Total</td>
                <td className='fs-bold col'></td>
              </tr>
            </table>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Add_cart
