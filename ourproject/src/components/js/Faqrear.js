import '../css/Faqrear.modules.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const togglePanel = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div>
            <section className="WaveHeaderBox">
                <div className='row  faq-heads'>
                    <div className='row faq-headers p-5 mt-5'>
                        <div className='col-md-12 faq mains '>
                            <h1 className="mt-5  text-white" style={{ fontSize: "80px", marginBottom: "5px", fontWeight: '500' }}>FAQ</h1>
                            <Link to='/' className='text-white'><i class="fa-solid fa-house" style={{ "color": "#719dea;" }}></i> CuService - FAQ</Link>
                        </div>
                    </div>
                    <div className='wave wave1'></div>
                    <div className='wave wave5'></div>
                </div>
            </section >

            <section style={{ paddingTop: '100px' }}>

                <div className='container'>
                    <div className='row'>
                        <div className='col text-center'>
                            <h2>Frequently Asked Questions</h2>
                            <p>View classes by age, program, or subject. Check out upcoming camps and
                                <br /> special events too!</p>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col'>
                            <div class="d-flex gap-2 flex-column flex-lg-row align-items-start mt-3">
                                <div class="col-lg-2 col-12 mb-2 nav justify-content-center align-items-center flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <button class="nav-link active fs-4 text-start" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">General Question</button>
                                    <button class="nav-link fs-4 text-start" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Regular Questions</button>
                                    <button class="nav-link fs-4 text-start" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Company Policess</button>
                                    <button class="nav-link fs-4 text-start" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Payment Options </button>
                                    <button class="nav-link fs-4 text-start" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Terms & Conditions </button>
                                    <button class="nav-link fs-4 text-start" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Advanced Questions</button>
                                </div>
                                <div class="tab-content" id="v-pills-tabContent">
                                    <div class="tab-pane fade show active border-0 " id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">

                                        <div style={{ border: '0px solid lightgray' }}>
                                            {accordionData.map((section, index) => (
                                                <div key={index}>
                                                    <h5
                                                        className={`Faq-Accordion ${activeIndex === index ? 'Faqactive' : ''}`}
                                                        onClick={() => togglePanel(index)}
                                                    >
                                                        <b>  {section.title}</b>
                                                    </h5>
                                                    <div
                                                        className="Faq-Accordion-panel"
                                                        style={{
                                                            maxHeight: activeIndex === index ? '1000px' : '0',
                                                        }}
                                                    >
                                                        <i class="fas fa-arrow-circle-right fa-lg"></i>
                                                        <p>
                                                            {section.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <details>
                                            <summary>this is first Detail page</summary>
                                            <p>lorem12 sdbasdkjnasdjkfadsnakljsdfalskd asdkj casdvnakjsdsdfjklasjdl</p>
                                        </details>

                                    </div>
                                    <div class="tab-pane fade overflow-scroll" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                        <div style={{ border: '1px solid lightgray' }}>
                                            {accordionData.map((section, index) => (
                                                <div key={index}>
                                                    <h5
                                                        className={`Faq-Accordion ${activeIndex === index ? 'Faqactive' : ''}`}
                                                        onClick={() => togglePanel(index)}
                                                    >
                                                        <b>  {section.title}</b>
                                                    </h5>
                                                    <div
                                                        className="Faq-Accordion-panel"
                                                        style={{
                                                            maxHeight: activeIndex === index ? '1000px' : '0',
                                                        }}
                                                    >
                                                        <i class="fas fa-arrow-circle-right fa-lg"></i>
                                                        <p>
                                                            {section.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                        <div style={{ border: '1px solid lightgray' }}>
                                            {accordionData.map((section, index) => (
                                                <div key={index}>
                                                    <h5
                                                        className={`Faq-Accordion ${activeIndex === index ? 'Faqactive' : ''}`}
                                                        onClick={() => togglePanel(index)}
                                                    >
                                                        <b>  {section.title}</b>
                                                    </h5>
                                                    <div
                                                        className="Faq-Accordion-panel"
                                                        style={{
                                                            maxHeight: activeIndex === index ? '1000px' : '0',
                                                        }}
                                                    >
                                                        <i class="fas fa-arrow-circle-right fa-lg"></i>
                                                        <p>
                                                            {section.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>


                                    </div>
                                    <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                        
                                    </div>
                                </div>
                            </div>


                        </div>



                    </div>
                </div>

            </section>

        </div>
    );
};

const accordionData = [
    {
        title: 'What is a Webinar and how it works?',
        content:
            'A Webinar is simply a web-based seminar, where a participant can interact directly with the presenter and can ask questions during Q&A.',
    },
    {
        title: 'Section 2',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
        title: 'Section 3',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
        title: 'Section 4',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
];

export default Accordion;

// import React, { useState } from 'react';
// // import './YourComponent.css'; // Make sure to import your styles

// const FaqSection = () => {
//     const [isSlideIn, setIsSlideIn] = useState(false);

//     const toggleSlideIn = () => {
//         setIsSlideIn(!isSlideIn);
//     };

//     return (
//         <section className={`cd-faq ${isSlideIn ? 'cd-faq__items--slide-in' : ''}`}>
//             <ul className="cd-faq__categories">
//                 <li>
//                     <a className="cd-faq__category cd-faq__category-selected truncate" href="#basics">
//                         Basics
//                     </a>
//                 </li>
//                 <li>
//                     <a className="cd-faq__category truncate" href="#mobile">
//                         Mobile
//                     </a>
//                 </li>
//                 {/* Add more categories if needed */}
//             </ul>

//             <div className="cd-faq__items">
//                 <ul id="basics" className="cd-faq__group">
//                     <li className="cd-faq__title">
//                         <h2>Basics</h2>
//                     </li>
//                     <li className="cd-faq__item">
//                         <a className="cd-faq__trigger" href="#0">
//                             <span>How do I change my password?</span>
//                         </a>
//                         <div className="cd-faq__content">
//                             <div className="text-component">{/* content here */}</div>
//                         </div>
//                     </li>

//                     <li className="cd-faq__item">
//                         <a className="cd-faq__trigger" href="#0">
//                             <span>How do I sign up?</span>
//                         </a>
//                         <div className="cd-faq__content">
//                             <div className="text-component">{/* content here */}</div>
//                         </div>
//                     </li>

//                     {/* Add more FAQ items if needed */}
//                 </ul>

//                 {/* Add more FAQ groups if needed */}
//             </div>

//             <a href="#0" className="cd-faq__close-panel text-replace" onClick={toggleSlideIn}>
//                 Close
//             </a>

//             <div className="cd-faq__overlay" aria-hidden="true"></div>
//         </section>
//     );
// };

// export default FaqSection;
