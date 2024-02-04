import React from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'



import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {

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
                     <div>No</div>
                    </CTableHeaderCell>
                    <CTableHeaderCell>Order_id</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Webinar</CTableHeaderCell>
                    <CTableHeaderCell>price</CTableHeaderCell>
                    <CTableHeaderCell>Selling_option</CTableHeaderCell>
                    <CTableHeaderCell>Date & Time</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                  
                  </CTableRow>
                </CTableHead>
                <CTableBody className='text-center'>
            <td>id</td>
            <td>Order_id</td>
            <td>id</td>
            <td>id</td>
            <td>id</td>
            <td>id</td>
            <td>id</td>
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
