
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';


export default function Speaker() {
  const IMGurl = process.env.REACT_APP_IMG_URL;
  console.log(IMGurl);
  const { id } = useParams();
  const speakers = useSelector((state) => state.speaker.speakers);
  // Find the speaker with the specified id
  const speaker = speakers.find((s) => s.speaker_id.toString() === id);

  if (!speaker) {
    return <div>Speaker not found</div>;
  }

  console.log(speakers);
  return (
    <div>


      <section style={{ paddingTop: '55px' }}>
        <div className="conatiner">

          <div className="d-inline-flex flex-lg-row flex-column align-item-center gap-5 justify-content-start p-5" >
            <div className="offset-lg-1 offset-0">
              <div
                className=""
                style={{ width: "500px", height: "500px" }}
              >
                <img
                  src={`${IMGurl}/${speaker.images}`}
                  className="w-100 rounded-circle"
                  alt=""
                />
              </div>
            </div>

            <div className="col-lg-6 col-12 mt-3 ">
              <h5 style={{ color: "#00bbae" }}>INSTRUCTOR</h5>
              <h3 className="fs-2 text-start my-3 ">{speaker.name}</h3>
              <h6 className='text-secondary'> {speaker.designation}</h6>


              <h3 className="mt-lg-4  text-dark my-4 fw-4">About me</h3>
              <p className='text-secondary' style={{ textAlign: 'justify' }}>{parse(speaker.bio)}</p>

              <table className="table">
                <tr>
                  <td>
                    <h3 className="fw-4">Contact</h3>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h5>Email :</h5>
                  </td>
                  <td>
                    <p className="text-secondary">{speaker.email}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Phone :</h5>
                  </td>
                  <td>
                    <p className="text-secondary">{speaker.phone_no}</p>
                  </td>
                </tr>
              </table>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
