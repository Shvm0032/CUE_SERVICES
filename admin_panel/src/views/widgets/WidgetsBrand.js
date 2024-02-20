import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilSpeak, cilCalculator, cilCommand, cilCalendar, cilStar } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'
import http from "../../utils/http-client";
const WidgetsBrand = ({ withCharts }) => {
  const [Summary, setsummary] = useState([]);
  console.log(Summary);

  const getSummary = async () => {
    try {
      var res = await http.get("/get_total_lengths");
      console.log(res);
      setsummary(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getSummary();
  }, []);

  const chartOptions = {
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  }

  return (
    <CRow>
      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          className="mb-4"
          style={{ "backgroundColor": "#c9b8b8" }}
          {...(withCharts && {
            chart: (
              <CChart
                className="position-absolute w-100 h-50"
                type="line"
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      backgroundColor: 'rgba(255,255,255,.1)',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointHoverBackgroundColor: '#fff',
                      borderWidth: 2,
                      data: [65, 59, 84, 84, 51, 55, 40],
                      fill: true,
                    },
                  ],
                }}
                options={chartOptions}
              />
            ),
          })}
          icon={<CIcon icon={cilUser} height={52} className="my-4 text-danger" />}
          values={[
            { title: 'Course', },
            { value: Summary.total_Course_table1 },
          ]}

        />
      </CCol>

      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          className="mb-4"
          style={{ "backgroundColor": "#CFF4FC" }}
          {...(withCharts && {
            chart: (
              <CChart
                className="position-absolute w-100 h-50"
                type="line"
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      backgroundColor: 'rgba(255,255,255,.1)',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointHoverBackgroundColor: '#fff',
                      borderWidth: 2,
                      data: [1, 13, 9, 17, 34, 41, 38],
                      fill: true,
                    },
                  ],
                }}
                options={chartOptions}
              />
            ),
          })}
          icon={<CIcon icon={cilSpeak} height={52} className="my-4 text-success" />}
          values={[
            { title: 'SPEAKER', },
            { value: Summary.total_Speaker_table4  },
          ]}

        />
      </CCol>

      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          className="mb-4"
          style={{ "backgroundColor": "#c9b8b8" }}
          {...(withCharts && {
            chart: (
              <CChart
                className="position-absolute w-100 h-50"
                type="line"
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      backgroundColor: 'rgba(255,255,255,.1)',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointHoverBackgroundColor: '#fff',
                      borderWidth: 2,
                      data: [78, 81, 80, 45, 34, 12, 40],
                      fill: true,
                    },
                  ],
                }}
                options={chartOptions}
              />
            ),
          })}
          icon={<CIcon icon={cilCommand} height={52} className="my-4 text-info" />}
          values={[
            { title: 'User', },
            { value: Summary.total_Register_users_table3 },
          ]}
        
        />
      </CCol>

      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          className="mb-4"
          style={{ "backgroundColor": "#CFF4FC" }}
          {...(withCharts && {
            chart: (
              <CChart
                className="position-absolute w-100 h-50"
                type="line"
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      backgroundColor: 'rgba(255,255,255,.1)',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointHoverBackgroundColor: '#fff',
                      borderWidth: 2,
                      data: [35, 23, 56, 22, 97, 23, 64],
                      fill: true,
                    },
                  ],
                }}
                options={chartOptions}
              />
            ),
          })}
          icon={<CIcon icon={cilCalendar} height={52} className="my-4 text-Primary" />}
          values={[
            { title: 'Subscriber', },
            { value: Summary.total_New_Subscribe_table6 },
          ]}
        />
      </CCol>

      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          className="mb-4"
          style={{ "backgroundColor": "#c9b8b8" }}
          {...(withCharts && {
            chart: (
              <CChart
                className="position-absolute w-100 h-50"
                type="line"
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      backgroundColor: 'rgba(255,255,255,.1)',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointHoverBackgroundColor: '#fff',
                      borderWidth: 2,
                      data: [35, 23, 56, 22, 97, 23, 64],
                      fill: true,
                    },
                  ],
                }}
                options={chartOptions}
              />
            ),
          })}
          icon={<CIcon icon={cilCalculator} height={52} className="my-4 text-Light" />}
          values={[
            { title: 'Total Order', },
            { value: Summary.total_Orders_table2_ },
          ]}
        />
      </CCol>

      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          className="mb-4"
          style={{ "backgroundColor": "#CFF4FC" }}
          {...(withCharts && {
            chart: (
              <CChart
                className="position-absolute w-100 h-50"
                type="line"
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      backgroundColor: 'rgba(255,255,255,.1)',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointHoverBackgroundColor: '#fff',
                      borderWidth: 2,
                      data: [35, 23, 56, 22, 97, 23, 64],
                      fill: true,
                    },
                  ],
                }}
                options={chartOptions}
              />
            ),
          })}
          icon={<CIcon icon={cilStar} height={52} className="my-4 text-warning" />}
          values={[
            { title: 'Total Sale', },
            { value: "$" + Summary.total_Amount_of_items_ordered_today__  },
          ]}
        />
      </CCol>
    </CRow>
  )
}

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
}

export default WidgetsBrand
