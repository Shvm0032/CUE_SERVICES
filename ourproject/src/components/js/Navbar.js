
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { selectCartItems } from '../../redux/cartSlice';
import { v4 as uuid } from "uuid";
// Navbar.js
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, logout } from '../../redux/authSlice'; // Update the path
import authService from '../../services/auth.service';
// Update the path
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, NavDropdown, Offcanvas } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import logo from '../../assets/Logo.png';
import { useLocation } from 'react-router-dom';


export default function NavbarP() {

    const cartItems = useSelector(selectCartItems);
    const location = useLocation();
    const unique_id = uuid();
    if (localStorage.getItem('unique_id')) {

    }
    else {
        localStorage.setItem('unique_id', unique_id);
    }
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();


    const handleLogout = async () => {
        authService.logout();
        dispatch(logout()); // Dispatch the logout action
        navigate('/login', { replace: true });
        // in this when userlogout there is no way to go back to the dashboard

    };


    const isMobile = useMediaQuery({ query: '(max-width: 991px)' }); // Mobile and tablet breakpoint


    const dropdownData = [
        {
            title: 'Industry',
            sublinks: [
                { title: 'Human Resource', link: '/course' },
                { title: 'Payroll & Taxation', link: '/course' },
                { title: 'BFSI & Accounting', link: '/course' },
                { title: 'Housing & Construction', link: '/course' }
            ]
        },
        {
            title: 'Webinar',
            sublinks: [
                { title: 'Live', link: '/course' },
                { title: 'On Demand', link: '/course' },
                { title: 'e Transcript', link: '/course' }
            ]
        },
        { title: 'Speakers', link: '/speakers' },
        {
            title: 'Helps',
            sublinks: [
                { title: 'Contact Us', link: '/Contactus' },
                { title: 'FAQs', link: '/Faqrear' },
            ]
        }
    ];

    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const createDropdownHandler = (index, isOpen, setOpen) => ({
        onMouseEnter: () => setOpen(index),
        onMouseLeave: () => setOpen(null),
    });
    const hideHeaderForPathsRegex = /^\/Invoice\/.*$/;
    if (hideHeaderForPathsRegex.test(location.pathname)) {
        return <></>;
    }


    return (
        <>
            <section style={{ background: '#13bbaf' }}>
                <div className='container p-2'>
                    <div sticky="top" className="d-flex justify-content-between p-2" >
                        {/* Left */}
                        <div className="me-5">
                            <Link className='text-dark' href="tel:+ (702)-605-0095"><i class="icon-phone"></i>Call:(702)-605-0095</Link>

                        </div>
                        {/* Left */}
                        {/* Right */}
                        <div>
                            <Link className='text-dark'  href="mailto:info@ceutrainers.com" target="_blank"><i class="icon-envelope"></i>Email:
                                support@ceutrainers.com</Link>
                        </div>
                        {/* Right */}
                    </div>
                </div>

            </section>
            {(isMobile) ? (
                // Mobile and Tablet Navbar with Sidebar

                <Navbar bg="light" className='fixed-top' expand={false}>
                    <Container fluid>
                        <Navbar.Brand href="/"><img src={logo} width={170} height={70} alt='logo' /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="offcanvasNavbar" />
                        <Navbar.Offcanvas
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                            placement="end"
                        >
                            <Offcanvas.Header closeButton className='fs-3'>
                                <Offcanvas.Title className='d-flex justify-content-center align-items-center' id="offcanvasNavbarLabel">
                                    <img src={logo} width={170} height={70} alt='logo' />
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3" style={{ fontSize: '1.2rem' }}>
                                    <Nav.Link href="/" style={{ marginLeft: '10px', marginTop: '10px', borderBottom: '1px black solid', position: 'relative' }}>Home</Nav.Link>

                                    <Nav.Link href="/about" style={{ marginLeft: '10px', marginTop: '10px', borderBottom: '1px black solid', position: 'relative' }}>About</Nav.Link>

                                    {dropdownData.map((dropdown, index) => (
                                        <React.Fragment key={index} >
                                            {index > 0 && <span className="divider"></span>}
                                            {dropdown.sublinks ? (
                                                <NavDropdown

                                                    title={dropdown.title}
                                                    id={`collapsible-nav-${dropdown.title.toLowerCase()}`}
                                                    show={openDropdownIndex === index}
                                                    {...createDropdownHandler(index, openDropdownIndex, setOpenDropdownIndex)}
                                                    style={{ marginLeft: '12px', marginTop: '10px', background: 'transparent', borderBottom: '1px black solid' }}

                                                >

                                                    {dropdown.sublinks.map((sublink, subindex) => (
                                                        <NavDropdown.Item className=' animated-text bg-transparent text-white' style={{ width: '200px', fontSize: '0.9rem' }} key={subindex} href={sublink.link}>
                                                            <span className="arrow">→</span>  {sublink.title}
                                                        </NavDropdown.Item>
                                                    ))}

                                                </NavDropdown>



                                            ) : (
                                                <Nav.Link style={{ marginLeft: '12px', marginTop: '10px', borderBottom: '1px black solid' }} href={dropdown.link}>{dropdown.title}</Nav.Link>
                                            )}
                                        </React.Fragment>
                                    ))}

                                </Nav>
                                <Nav className="me-auto mx-auto d-flex flex-row align-item-center mt-4 gap-4 " style={{ marginTop: '10px', fontSize: '1.2rem' }}>
                                    <Nav.Link href="/cart" className='position-relative'>
                                        <span className="badge bg-danger  position-absolute  top-0 start-50 translate-middle rounded-circle" style={{ fontSize: '0.8rem' }}> {cartItems.length}</span>
                                        <i className="fas fa-cart-arrow-down fa-lg " style={{ color: '#00bbae' }}></i>
                                    </Nav.Link>
                                    {isLoggedIn ? (
                                        <>
                                            <Nav.Link eventKey={2} href="/Dashboard" style={{ marginLeft: '15px' }}>
                                                <i class="far fa-user fa-lg"></i>
                                            </Nav.Link>
                                            <Nav.Link href="/login" eventKey={2} style={{ marginLeft: '15px' }} onClick={handleLogout}>
                                                <div className="button">
                                                    <div className="button-wrapper">
                                                        <div className="text">Logout</div>
                                                        <span className="icon">
                                                            Logout
                                                        </span>
                                                    </div>
                                                </div>
                                            </Nav.Link>
                                        </>
                                    ) : (
                                        <Nav.Link eventKey={2} style={{ marginLeft: '15px' }}>
                                            <div className="button">
                                                <div className="button-wrapper">
                                                    <div className="text">Login</div>
                                                    <span className="icon">
                                                        Login
                                                    </span>
                                                </div>
                                            </div>
                                        </Nav.Link>
                                    )}

                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ) : (
                // Desktop Navbar



                <Navbar sticky="top"
                    collapseOnSelect expand="lg" bg="light" variant="light" style={{ height: '70px' }}>
                    <Container>
                        <Navbar.Brand href="/"><img src={logo} width={170} height={70} alt='logo' /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto mx-auto" style={{ fontSize: '1.2rem' }}>
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/About" style={{ marginLeft: '12px' }}>About</Nav.Link>
                                {dropdownData.map((dropdown, index) => (
                                    <React.Fragment key={index} >
                                        {index > 0 && <span className="divider"></span>}
                                        {dropdown.sublinks ? (
                                            <NavDropdown

                                                title={dropdown.title}
                                                id={`collapsible-nav-${dropdown.title.toLowerCase()}`}
                                                show={openDropdownIndex === index}
                                                {...createDropdownHandler(index, openDropdownIndex, setOpenDropdownIndex)}
                                                style={{ marginLeft: '12px', background: 'transparent', textAlign: 'center' }}

                                            >
                                                {dropdown.sublinks.map((sublink, subindex) => (
                                                    <NavDropdown.Item className='animated-text bg-transparent text-white' style={{ width: '250px' }} key={subindex} href={sublink.link}>
                                                        <span className="arrow">→</span>  {sublink.title}
                                                    </NavDropdown.Item>
                                                ))}

                                            </NavDropdown>
                                        ) : (
                                            <Nav.Link style={{ marginLeft: '12px' }} href={dropdown.link}>{dropdown.title}</Nav.Link>
                                        )}
                                    </React.Fragment>
                                ))}
                            </Nav>
                            <Nav className='me-auto mx-auto ' style={{ fontSize: '1.2rem' }}>
                                <Nav.Link href="/Add_cart" className="cart-icon">
                                    <i className="fas fa-shopping-cart fa-lg" style={{ color: '#00bbae' }}></i>
                                    <span class="badge badge-primary cart-badge">{cartItems.length}</span>
                                </Nav.Link>
                                {isLoggedIn ? (
                                    <>
                                        <Nav.Link eventKey={2} href="/Dashboard" style={{ marginLeft: '15px' }}>
                                            <i class="far fa-user fa-lg"></i>
                                        </Nav.Link>
                                        <Nav.Link href="/login" eventKey={2} style={{ marginLeft: '15px' }} onClick={handleLogout}>
                                            <div className="button">
                                                <div className="button-wrapper">
                                                    <div className="text">Logout</div>
                                                    <span className="icon">
                                                        Logout
                                                    </span>
                                                </div>
                                            </div>
                                        </Nav.Link>
                                    </>
                                ) : (
                                    <Nav.Link href="/login" eventKey={2} style={{ marginLeft: '15px' }}>
                                        <div className="button">
                                            <div className="button-wrapper">
                                                <div className="text">Login</div>
                                                <span className="icon">
                                                    Login
                                                </span>
                                            </div>
                                        </div>
                                    </Nav.Link>
                                )}


                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            )}

        </>
    );
}

