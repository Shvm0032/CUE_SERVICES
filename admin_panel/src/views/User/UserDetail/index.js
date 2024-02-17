import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import http from "../../../utils/http-client";
// import parse from 'html-react-parser';
function UserDetail() {
  const IMGurl = process.env.REACT_APP_IMG_URL;
  const { id } = useParams();
  const [userData, setuserData] = useState(null);
  const [sellingOption, setSellingOption] = useState(null);
  console.log(userData);
  console.log(sellingOption);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await http.get(`/Registration/${id}`); // Corrected route path
        setuserData(response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    fetchCourseData();
  }, [id]);
  //  const selling_option = courseData.selling_option;
  //  console.log(selling_option);

  useEffect(() => {
    if (userData && userData.selling_option) {
      setSellingOption(JSON.parse(userData.selling_option));
    }
  }, [userData]);

  return (
    <div>
      <h2 className='mb-5'>User Detail</h2>
      {userData ? (
        <div className='row'>
          <div className='col'>
            <table className='table '>
              <tbody>
                 
                <tr className='table-secondary'>
                  <td className='text-primary'>Course Name:</td>
                  <td className='text-end'><h5>{userData.fname} {userData.lname}</h5></td>
                </tr>
                 <tr>
                  <td className='text-primary'>User Name</td>
                  <td className='text-end'>{userData.uname}</td>
                </tr>
                <tr>
                  <td className='text-primary'>Email</td>
                  <td className='text-end'><h5>{userData.email}</h5></td>
                </tr>

                <tr className='text-primary'>
                  <td className='text-primary'>Phone</td>
                  <td className='text-end'>{userData.phone}</td>
                </tr>
              
                <tr>
                  <td className='text-primary'>Gender</td>
                  <td className='text-end'>{userData.gender}</td>
                </tr>

              </tbody>
            </table>
          </div>
          <div className='col-md-3'>
            {/* <p>Course ID: {course_id}</p> */}
            < img src={`${IMGurl}/${userData.image}`} width={250} height={150} alt='user' />
          </div>
          <div className='col-12 p-md-5 p-1'>
             <h5> User Address:</h5>
            <div className='row'>
              <div className='col'>

                <table className='table'>
                  <thead>
                      <th>Address 1</th>
                    </thead>
                  <tbody>
                    
                    <tr>
                      <td> <strong>Street:&nbsp;</strong></td>
                      <td>{userData.address1}</td>
                    </tr>
                    <tr>
                      <td> <strong>Country:&nbsp;</strong></td>
                      <td>{userData.country}</td>
                    </tr>
                    <tr>
                      <td> <strong>State:&nbsp;</strong></td>
                      <td>{userData.state}</td>
                    </tr>
                     <tr>
                      <td> <strong>City:&nbsp;</strong></td>
                      <td>{userData.city}</td>
                    </tr>
                     <tr>
                      <td> <strong>Pincode:&nbsp;</strong></td>
                      <td>{userData.pincode}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='col'>
          <table className='table'>
                    <thead>
                      <th>Address 2</th>
                    </thead>
                  <tbody>
                    <tr>
                      <td> <strong>Street:&nbsp;</strong></td>
                      <td>{userData.address1}</td>
                    </tr>
                    <tr>
                      <td> <strong>Country:&nbsp;</strong></td>
                      <td>{userData.country}</td>
                    </tr>
                    <tr>
                      <td> <strong>State:&nbsp;</strong></td>
                      <td>{userData.state}</td>
                    </tr>
                     <tr>
                      <td> <strong>City:&nbsp;</strong></td>
                      <td>{userData.city}</td>
                    </tr>
                     <tr>
                      <td> <strong>Pincode:&nbsp;</strong></td>
                      <td>{userData.pincode}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
           

          </div>

        </div>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
}

export default UserDetail;
