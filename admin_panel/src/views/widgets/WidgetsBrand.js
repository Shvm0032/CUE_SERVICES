import React from 'react'
import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilSpeak,cilCalculator,cilCommand, cilCalendar,cilStar } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'

const WidgetsBrand = ({ withCharts }) => {
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
          style={{"backgroundColor":"#c9b8b8"}}
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
            { title: 'CUSTOMERS',  },
            {  value: '1.792' },
          ]}
  
        />
      </CCol>

      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          className="mb-4"
          style={{"backgroundColor":"#CFF4FC"}}
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
            { title: 'SPEAKER',  },
            {  value: '1.792' },
          ]}
        
        />
      </CCol>

      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          className="mb-4"
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
            { title: 'Top Selling Item',  },
            {  value: '1.792' },
          ]}
          style={{
            '--cui-card-cap-bg': '#4875b4',
          }}
        />
      </CCol>

      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          className="mb-4"
          style={{"backgroundColor":"#CFF4FC"}}
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
            { title: 'WEBINARS',  },
            {  value: '1.792' },
          ]}
        />
      </CCol>

      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          className="mb-4"
          style={{"backgroundColor":"#c9b8b8"}}
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
            { title: 'DAILY AVERAGE SELL',  },
            {  value: '1.792' },
          ]}
        />
      </CCol>

      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          className="mb-4"
          style={{"backgroundColor":"#badbcc"}}
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
            { title: 'TOTAL SELL',  },
            {  value: '$1.792' },
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
