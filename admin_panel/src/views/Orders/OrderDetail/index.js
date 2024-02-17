import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import http from "../../../utils/http-client";
// import parse from 'html-react-parser';
function OrderDetail() {

  const IMGurl = process.env.REACT_APP_IMG_URL;
  const { id } = useParams();
  const [orderData, setorderData] = useState(null);
  const [Course, setCourse] = useState(null);
  const [sellingOption, setSellingOption] = useState(null);
  console.log(orderData);
  console.log(sellingOption);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await http.get(`/order_details/${id}`); // Corrected route path
        setorderData(response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    fetchCourseData();
  }, [id]);
  //  const selling_option = courseData.selling_option;
  //  console.log(selling_option);

  useEffect(() => {
    if (orderData && orderData.card_detail) {
      setCourse(JSON.parse(orderData.card_detail));
      // setSellingOption(JSON.parse(Course.courseItems));
    }
  }, [orderData]);

  useEffect(() => {
    if (Course && Course.courseItems) {
      // setCourse(JSON.parse(orderData.card_detail));
      setSellingOption(JSON.parse(Course.courseItems));
    }
  }, [Course]);



  return (
    <div>
      <h2 className='mb-5'>Order Detail</h2>
      {orderData ? (
        <div className='row'>
          <div className='col'>
            <table className='table '>
              <tbody>

                <tr className='table-secondary'>
                  <td className='text-primary'>Costamer Name:</td>
                  <td className='text-end'><h5>{orderData.FName} {orderData.lName}</h5></td>
                </tr>
                <tr>
                  <td className='text-primary'>Order Id</td>
                  <td className='text-end'>{orderData.order_id}</td>
                </tr>
                <tr>
                  <td className='text-primary'>Email</td>
                  <td className='text-end'><h5>{orderData.Email}</h5></td>
                </tr>

                <tr className='text-primary'>
                  <td className='text-primary'>Phone</td>
                  <td className='text-end'>{orderData.Phone}</td>
                </tr>

                <tr>
                  <td className='text-primary'>Order Date</td>
                  <td className='text-end'>{orderData.trans_date}</td>
                </tr>
                <tr>
                  <td className='text-primary'>Order Status</td>
                  <td className='text-end'>{orderData.order_status}</td>
                </tr>

              </tbody>
            </table>
          </div>
          <div className='col'>
            <table className='table'>
              <tbody>
                <tr className='table-secondary'>
                  <td colSpan={2} className='text-dark'>
                    <h5> Address:</h5></td>
                </tr>
                <tr>
                  <td> <strong>Street:&nbsp;</strong></td>
                  <td>{orderData.Street_Address}</td>
                </tr>
                <tr>
                  <td> <strong>Country:&nbsp;</strong></td>
                  <td>{orderData.Country}</td>
                </tr>
                <tr>
                  <td> <strong>State:&nbsp;</strong></td>
                  <td>{orderData.State}</td>
                </tr>
                <tr>
                  <td> <strong>City:&nbsp;</strong></td>
                  <td>{orderData.City}</td>
                </tr>
                <tr>
                  <td> <strong>Pincode:&nbsp;</strong></td>
                  <td>{orderData.Zip}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='col-12 p-md-5 p-1'>
            <h5> Order Summury</h5>
            <div className='row'>
              {Course ? (
                <table className="table table-striped table-hover table-responsive shadow  table-scroll text-center">
                  <thead>
                    <tr className='table-dark'>
                      <th>ID</th>
                      <th width={500}>Name</th>
                      <th width={500} colSpan="3">Category</th>
                      <th width={100} >Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Course.map((option, index) => (
                      <React.Fragment key={option.id}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{option.course_title}</td>
                          <td colSpan="3">
                            <table>
                              <thead>
                                <tr>
                                  <th>Item Name</th>
                                  <th>Item Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {option.courseItems.map(item => (

                                  <tr key={item.itemId}>
                                    <td>{item.itemName}</td>
                                    <td>{item.itemPrice}</td>
                                  </tr>

                                ))}
                              </tbody>
                            </table>

                          </td>
                          <td className='text-danger'>${option.totalPrice}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No selling options available.</p>
              )}

            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
}

export default OrderDetail;
