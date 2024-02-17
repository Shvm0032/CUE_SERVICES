import React, { useEffect, useState } from 'react';
import http from "../../utils/http-client";
import { Link } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'



import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {

  const [Orders, setOrders] = useState([]);
  const getData = async () => {
    try {
      var res = await http.get("/Order_Details");
      console.log(res);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  
 

  return (
    <>
      <WidgetsDropdown />
<br/><br/>
      <WidgetsBrand withCharts />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader ><b>Recent Transactions</b></CCardHeader>
            <CCardBody>
              <br />

               <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light" className='text-center'>
                  <CTableRow>
                    <CTableHeaderCell className="text-center overflow-auto">
                      <div>Id</div>
                    </CTableHeaderCell>
                    <CTableHeaderCell>Order Id</CTableHeaderCell>
                    <CTableHeaderCell>User Email</CTableHeaderCell>
                    <CTableHeaderCell>Date & Time</CTableHeaderCell>
                    <CTableHeaderCell>Price</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                  
                  </CTableRow>
                </CTableHead>
                <CTableBody className='text-center'>
                
                    {Orders.map((row, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{row.order_id}</td>
                        <td>{row.Email}</td>
                        <td>{row.trans_date}</td>
                        <td>${row.subtotal}</td>
                        <td>{row.order_status}</td>
                        
                        <td>
                          <Link to={`/Orders/OrderDetails/${row.id}`} className="btn btn-outline-primary">
                            <i className="fa fa-eye"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                 
                </CTableBody>
              </CTable> 
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
