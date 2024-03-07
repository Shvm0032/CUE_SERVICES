import '../css/Faqrear.modules.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import http from "../../utils/http-client";

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const togglePanel = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    const [activeTab, setActiveTab] = useState(undefined); // Set the default active tab

    const [data, setData] = useState([]);
    console.log(data)
    useEffect(() => {
        // Fetch data from the server
        http.get('/faq/Get')
            .then(response => {
                // Handle the response and update the state
                setData(response.data);
                setActiveTab(response?.data[0].category)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const ItemComponent = ({ category }) => {

        return (
            <Nav.Item className='text-center mb-1'>
                <Nav.Link className='p-3 fs-5' eventKey={category}>{category}</Nav.Link>
            </Nav.Item>
        );
    };

    const ItemComponentItems = ({ category, items }) => {

        return (
            <Tab.Pane eventKey={category}><div style={{ border: '0px solid lightgray' }}>
                {items.map((section, index) => (
                    <div key={index}>
                        <h5
                            className={`Faq-Accordion ${activeIndex === index ? 'Faqactive' : ''}`}
                            onClick={() => togglePanel(index)}
                        >
                            <b>  {section.question}</b>
                        </h5>
                        <div
                            className="Faq-Accordion-panel"
                            style={{
                                maxHeight: activeIndex === index ? '1000px' : '0',
                            }}
                        >
                            <i class="fas fa-arrow-circle-right fa-lg"></i>
                            <p>
                                {section.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
            </Tab.Pane>
        );
    };

    console.log(activeTab, 'activeTab');

    return (
        <div>
            <section className="WaveHeaderBox">
                <div className='row  faq-heads'>
                    <div className='row faq-headers p-5 mt-5'>
                        <div className='col-md-12 faq mains '>
                            <h1 className="mt-5  text-white" style={{ fontSize: "80px", marginBottom: "5px", fontWeight: '500' }}>
                                FAQ
                            </h1>
                            <Link to='/' className='text-white'>
                                <i class="fa-solid fa-house" style={{ "color": "#719dea;" }}></i> CuService - FAQ</Link>
                        </div>
                    </div>
                    <div className='wave wave1'></div>
                    <div className='wave wave5'></div>
                </div>
            </section >

            <section >

                <div className='row fw-bold text-center'>
                    <h3 className='display-3 mb-5 fw-bold'>Have Any  Question?</h3>
                </div>
                <div className='row'>
                    {
                        data.length ?
                            (
                                <Tab.Container id="left-tabs-example" defaultActiveKey={activeTab}>
                                    <Row>
                                        <Col sm={3}>
                                            <Nav variant="pills" className="flex-column border p-3 rounded">
                                                {data.map((item, index) => (
                                                    <ItemComponent
                                                        key={index}
                                                        {...item}
                                                    />
                                                ))}
                                            </Nav>
                                        </Col>
                                        <Col sm={9}>
                                            <Tab.Content className='border p-3 rounded'>
                                                {data.map((item, index) => (
                                                    <ItemComponentItems
                                                        key={index}
                                                        {...item}
                                                    />


                                                ))}
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            ) : null

                    }

                </div>
            </section>
        </div>
    );
};


export default Accordion;
