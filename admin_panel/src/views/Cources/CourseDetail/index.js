import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import http from "../../../utils/http-client";
import parse from 'html-react-parser';
function CourseDetail() {
  const IMGurl = process.env.REACT_APP_IMG_URL;
  const { course_id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [sellingOption, setSellingOption] = useState(null);
  console.log(courseData);
  console.log(sellingOption);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await http.get(`/coursesData/${course_id}`); // Corrected route path
        setCourseData(response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    fetchCourseData();
  }, [course_id]);
  //  const selling_option = courseData.selling_option;
  //  console.log(selling_option);

  useEffect(() => {
    if (courseData && courseData.selling_option) {
      setSellingOption(JSON.parse(courseData.selling_option));
    }
  }, [courseData]);

  return (
    <div>
      <h2>Course Detail</h2>
      {courseData ? (
        <div className='row'>
          <div className='col'>
            <table className='table '>
              <tbody>
                <tr className='table-secondary'>
                  <td className='text-primary'>Course Name:</td>
                  <td className='text-end'><h5>{courseData.title}</h5></td>
                </tr>
                <tr>
                  <td className='text-primary'>Speaker</td>
                  <td className='text-end'><h5>{courseData.name}</h5></td>
                </tr>

                <tr className='text-primary'>
                  <td className='text-primary'>Time</td>
                  <td className='text-end'>{courseData.time}</td>
                </tr>
                <tr>
                  <td className='text-primary'>Duration</td>
                  <td className='text-end'>{courseData.duration}</td>
                </tr>
                {/* <tr>
                  <td>Time</td>
                  <td>{courseData.time}</td>
                </tr> */}

              </tbody>
            </table>
            <h3> </h3>

          </div>
          <div className='col-md-3'>
            {/* <p>Course ID: {course_id}</p> */}
            < img src={`${IMGurl}/${courseData.course_thumbail}`} width={250} height={150} alt='speaker' />
          </div>
          <div className='col-12 p-md-5 p-1'>
            <h5> Course Description:</h5>
            <p> {courseData.description ? parse(courseData.description) : ''}</p>
          </div>

          <div className='col-12 p-md-5 p-1 '>
            {sellingOption ? (
              <table className="table table-striped table-hover table-responsive shadow  table-scroll text-center">
                <thead>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {sellingOption.map((option, index) => (
                    <tr key={option.id}>
                      <td>{index + 1}</td>
                      <td>{option.category}</td>
                      <td>{option.name}</td>
                      <td className='text-danger'>${option.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No selling options available.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
}

export default CourseDetail;
