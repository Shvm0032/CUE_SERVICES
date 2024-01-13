import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import http from "../../utils/http-client";

export default function Speaker() {
  const { id } = useParams();
  const [speaker, setSpeaker] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await  http.get(`Selling?id=${id}`);
        const selectedSpeaker = response.data.find((item) => item.id === id);
        setSpeaker(selectedSpeaker);
        console.log(speaker)
      } catch (error) {
        console.error("Error fetching speaker data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <section className="WaveHeaderBox">
        <div className="row  faq-heads">
          <div className="row faq-headers p-5 mt-5">
            <div className="col-md-12 faq mains">
              <h1 className=" pageHeading mt-5 ">Name is {speaker.name}</h1>
              {/* <Link to="#" className="faq-lnk-main">
                <i
                  className="fa-solid fa-house"


                  style={{ color: "#719dea" }}
                ></i>{" "}
                CuService - About-Us
              </Link> */}
            </div>
          </div>
          {/* <div className="wave wave1"></div>
          <div className="wave wave5"></div> */}
        </div>
      </section>

      <section style={{ paddingTop: '55px' }}>
        <div className="conatiner">
          {speaker && (
            <div className="d-inline-flex flex-lg-row flex-column align-item-center gap-5 justify-content-start p-5">
              <div className="offset-lg-1 offset-0">
                <div
                  className=""
                  style={{ width: "500px", height: "500px" }}
                >
                  <img
                    src={speaker.images || './images/defaultImage.jpg'}
                    className="w-100 rounded-circle"
                    alt=""
                  />
                </div>
              </div>

              <div className="col-lg-6 col-12 mt-3 ">
                <h6 style={{ color: "#00bbae" }}>INSTRUCTOR</h6>
                <h3 className="text-start fw-bold">{speaker.name}</h3>
                <h6>{speaker.role}</h6>
                <h3 className="mt-lg-4 mt-3 fw-bold">About me</h3>
                <p>{speaker.bio}</p>

                <table className="table">
                  <tr>
                    <td>
                      <h3 className="fw-bold">Contact</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5>Address :</h5>
                    </td>
                    <td>
                      <p className="text-secondary">{speaker.address}</p>
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
          )}
        </div>
      </section>
    </div>
  );
}
