import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import http from "../../../utils/http-client";
import parse from 'html-react-parser';

function SpeakerDetail() {
  const IMGurl = process.env.REACT_APP_IMG_URL;
  const { speaker_id } = useParams();
  const [speakerData, setSpeakerData] = useState(null);

  useEffect(() => {
    const fetchSpeakerData = async () => {
      try {
        const response = await http.get(`/speaker/edit/${speaker_id}`);
        setSpeakerData(response.data);
      } catch (error) {
        console.error('Error fetching Speaker data:', error);
      }
    };

    fetchSpeakerData();

    // Cleanup function (optional)
    return () => {
      // Any cleanup code if needed
    };
  }, [speaker_id]);

  return (
    <div>
      <h2 className='mb-4'>Speaker Detail</h2>
      {
        speakerData ? (

          <div className='row'>

            <div className='col'>
              <table className='table '>
                <tbody>
                  <tr className='table-secondary'>
                    <td className='text-primary'>Speaker Name:</td>
                    <td className='text-end'><h5>{speakerData[0].name}</h5></td>
                  </tr>
                  <tr>
                    <td className='text-primary'>Email</td>
                    <td className='text-end'><h5>{speakerData[0].email}</h5></td>
                  </tr>

                  <tr className='text-primary'>
                    <td className='text-primary'>Phone No:</td>
                    <td className='text-end'>{speakerData[0].phone_no}</td>
                  </tr>
                  <tr>
                    <td className='text-primary'>Designation:</td>
                    <td className='text-end'>{speakerData[0].designation}</td>
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
              < img src={`${IMGurl}/${speakerData[0].images}`} width={250} height={150} alt='speaker' />
            </div>
            <div className='col-12 p-md-5 p-1'>
              <h5 className='mb-4'>Speaker Description:</h5>
              <p> {speakerData[0].bio ? parse(speakerData[0].bio) : ''}</p>
            </div>


          </div>
        ) : (
          <p>Loading...</p>
        )
      }
    </div>
  );
}

export default SpeakerDetail;
