import '../css/Ourspeaker.modules.css';
import React, { useEffect, } from 'react';
import { Link, } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpeakers } from '../../redux/speakerSlice';



function Speakers() {

    const dispatch = useDispatch();
    const speakers = useSelector((state) => state.speaker.speakers);
    const status = useSelector((state) => state.speaker.status);
    const error = useSelector((state) => state.speaker.error);

    useEffect(() => {
        dispatch(fetchSpeakers());
    }, [dispatch]);
    // Render based on the status
    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }



    return (
        <>
            <section className="WaveHeaderBox">
                <div className='row  faq-heads'>
                    <div className='row faq-headers p-5 mt-5'>
                        <div className='col-md-12 faq mains'>
                            <h1 className="mt-5 " style={{ fontSize: "80px", marginBottom: "5px", fontWeight: '500' }}>Our Speaker</h1>
                            <Link to='#' className='faq-lnk-main'><i class="fa-solid fa-house" style={{ "color": "#719dea;" }}></i> CuService </Link>
                        </div>

                    </div>
                    <div className='wave wave1'></div>
                    <div className='wave wave5'></div>
                </div>
            </section >
            <section style={{ marginBottom: '300px' }}>
                <div className="container-fluid bg-body p-lg-5 p-3">

                    {/* speaker card  container start here */}
                    <div className="container mt-5">
                        <div className="row p-lg-5">
                            {/* first card */}

                            {speakers.map((speaker) => (

                                <div className="col-lg-4 mb-4" key={speaker.id} >
                                    <div className='wrapper'>

                                        <div className='pcard'>
                                            <img src='/' className="ProfilePicture" alt='ProfilePicture' />
                                            <div className='ProfileName'>
                                                <h5 className="text-center">{speaker.name}</h5>
                                                <p className="text-center">{speaker.title}</p>

                                                <Link to={`/speaker/${speaker?.speaker_id}`}>
                                                    <ul className="SocialIcon ">
                                                        <li><Link className="fab fa-facebook" /></li>
                                                        <li><Link className="fab fa-twitter" /></li>
                                                        <li><Link className="fab fa-google-plus" /></li>
                                                        <li><Link className="fab fa-linkedin" /></li>
                                                    </ul>
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section >
        </>

    )
}
export default Speakers;