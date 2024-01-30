
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { selectCartItems } from '../../redux/cartSlice';
import { v4 as uuid } from "uuid";
// Navbar.js
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, logout } from '../../redux/authSlice'; // Update the path
import authService from '../../services/auth.service';
// Update the path

export default function Navbar() {
    const cartItems = useSelector(selectCartItems);
    console.log(cartItems.length)
    console.log(cartItems);
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
        navigate('/login',{ replace: true });
        // in this when userlogout there is no way to go back to the dashboard

    };
    return (
        <>  <div className='sticky-top'>
            <section className="d-flex justify-content-between p-2" style={{ background: '#13bbaf' }}>
                {/* Left */}
                <div className="me-5">
                    <span>Get connected with us on social networks:</span>
                </div>
                {/* Left */}
                {/* Right */}
                <div>

                </div>
                {/* Right */}
            </section>


            {/*----------------- main nav bar start here---------------------------------------- */}

            <nav class="navbar navbar-expand-lg navbar-light bg-light shadow p-3">

                <div class="container-fluid">

                    <a class="navbar-brand" href="/Home">
                        <svg id="logo-28" width="151" height="44" viewBox="0 0 161 44" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M54.196 29H57.715V12.44H54.196V29Z" class="ccustom" fill="#55AE36"></path> <path d="M64.9338 29.368C68.6138 29.368 71.0288 26.999 71.0288 22.813C71.0288 18.765 68.6828 16.235 64.9338 16.235C61.2538 16.235 58.8618 18.604 58.8618 22.813C58.8618 26.884 61.1848 29.368 64.9338 29.368ZM64.9338 26.516C63.3468 26.516 62.4728 25.205 62.4728 22.813C62.4728 20.398 63.3238 19.087 64.9338 19.087C66.5438 19.087 67.4178 20.421 67.4178 22.813C67.4178 25.228 66.5668 26.516 64.9338 26.516Z" class="ccustom" fill="#55AE36"></path> <path d="M76.7538 29.023C78.0878 29.023 79.1918 28.471 79.9738 27.39V29.46C79.9738 31.185 79.1228 31.76 77.8578 31.76C76.6388 31.76 75.6958 31.162 75.5578 30.058H72.0388C72.4758 33.071 74.7528 34.451 77.9038 34.451C81.1468 34.451 83.4928 32.726 83.4928 29.414V16.626H79.9738V17.776C79.2148 16.764 78.1338 16.235 76.7538 16.235C73.6718 16.235 71.6708 18.535 71.6708 22.652C71.6708 26.585 73.6258 29.023 76.7538 29.023ZM77.6048 26.171C76.0868 26.171 75.2818 24.906 75.2818 22.652C75.2818 20.329 76.0868 19.087 77.6048 19.087C79.1458 19.087 79.9738 20.352 79.9738 22.629C79.9738 24.929 79.1688 26.171 77.6048 26.171Z" class="ccustom" fill="#55AE36"></path> <path d="M90.7315 29.368C94.4115 29.368 96.8265 26.999 96.8265 22.813C96.8265 18.765 94.4805 16.235 90.7315 16.235C87.0515 16.235 84.6595 18.604 84.6595 22.813C84.6595 26.884 86.9825 29.368 90.7315 29.368ZM90.7315 26.516C89.1445 26.516 88.2705 25.205 88.2705 22.813C88.2705 20.398 89.1215 19.087 90.7315 19.087C92.3415 19.087 93.2155 20.421 93.2155 22.813C93.2155 25.228 92.3645 26.516 90.7315 26.516Z" class="ccustom" fill="#55AE36"></path> <path d="M97.9976 15.384H101.517V12.44H97.9976V15.384ZM97.9976 29H101.517V16.626H97.9976V29Z" class="ccustom" fill="#55AE36"></path> <path d="M106.711 34.083V27.758C107.447 28.816 108.505 29.368 109.816 29.368C112.967 29.368 115.014 26.999 115.014 22.79C115.014 18.742 113.013 16.235 109.816 16.235C108.528 16.235 107.47 16.833 106.711 17.914V16.626H103.192V34.083H106.711ZM109.08 19.087C110.575 19.087 111.403 20.398 111.403 22.79C111.403 25.205 110.598 26.516 109.08 26.516C107.539 26.516 106.711 25.182 106.711 22.79C106.711 20.398 107.516 19.087 109.08 19.087Z" class="ccustom" fill="#55AE36"></path> <path d="M119.24 20.053C119.24 19.386 119.838 18.926 120.758 18.926C122 18.926 122.736 19.455 122.943 20.72H126.439C126.094 17.592 123.84 16.235 120.873 16.235C117.561 16.235 115.882 18.167 115.882 20.237C115.882 25.205 123.38 23.066 123.38 25.458C123.38 26.217 122.759 26.7 121.517 26.7C120.206 26.7 119.263 26.079 119.102 24.929H115.583C116.043 27.988 118.297 29.368 121.425 29.368C124.645 29.368 126.899 27.689 126.899 25.251C126.899 20.352 119.24 22.491 119.24 20.053Z" class="ccustom" fill="#55AE36"></path> <path d="M135.569 23.733C135.569 25.32 134.695 26.516 133.338 26.516C132.096 26.516 131.498 25.734 131.498 24.147V16.626H127.979V24.86C127.979 27.942 129.704 29.368 132.05 29.368C133.545 29.368 134.764 28.724 135.569 27.344V29H139.088V16.626H135.569V23.733Z" class="ccustom" fill="#55AE36"></path> <path d="M140.788 29H144.307V21.893C144.307 20.306 145.112 19.087 146.331 19.087C147.458 19.087 148.01 19.892 148.01 21.456V29H151.506V21.893C151.506 20.306 152.334 19.087 153.553 19.087C154.68 19.087 155.209 19.892 155.209 21.456V29H158.728V20.743C158.728 17.684 157.026 16.235 154.726 16.235C153.185 16.235 151.874 16.879 151.023 18.282C150.402 16.902 149.16 16.235 147.688 16.235C146.262 16.235 145.089 16.856 144.307 18.19V16.626H140.788V29Z" class="ccustom" fill="#55AE36"></path> <path d="M40.8504 34.0526C44.6624 30.6486 47 26.0548 47 21C47 10.5066 36.9264 2 24.5 2C12.0736 2 2 10.5066 2 21C2 31.4934 12.0736 40 24.5 40C28.0253 40 31.3613 39.3154 34.3316 38.0949C37.8208 40.2486 42.0957 41.7967 46.8169 41.4702C44.3227 40.8362 42.1773 38.2679 40.8504 34.0526Z" class="ccompli2" fill="#B6EFA2"></path> <path d="M41 21C41 28.732 33.6127 35 24.5 35C15.3873 35 8 28.732 8 21C8 13.268 15.3873 7 24.5 7C33.6127 7 41 13.268 41 21Z" class="ccompli1" fill="#88E169"></path> <path d="M35 21C35 25.9706 30.299 30 24.5 30C18.701 30 14 25.9706 14 21C14 16.0294 18.701 12 24.5 12C30.299 12 35 16.0294 35 21Z" class="ccustom" fill="#55AE36"></path> </svg>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation" style={{ backgroundColor: '#ff9b24', color: 'white' }} >
                        <span class="navbar-toggler-icon" ></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <Link class="nav-link mx-2 active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link mx-2" aria-current="page" to="/About">About</Link>
                            </li>
                            <li class="nav-item dropdown"> {/* Webinar dropdown */}
                                <Link class="nav-link mx-2 dropdown-toggle" to="/course" >
                                    Industury
                                </Link>
                                <ul class="dropdown-menu col-4" aria-labelledby="navbarDarkDropdownMenuLink">
                                    <li><Link class="dropdown-item  p-2" to="/course">Human Resource</Link></li>
                                    <li><Link class="dropdown-item  p-2" to="/course">Payroll & Taxation</Link></li>
                                    <li><Link class="dropdown-item  p-2" to="/course">BFSI & Accounting</Link></li>
                                    <li><Link class="dropdown-item p-2" to="/course">Housing & Construction</Link></li>
                                </ul>
                            </li>

                            <li class="nav-item dropdown ">{/* SPEAKER DROPDOWN */}
                                <Link class="nav-link dropdown-toggle" to="/course">
                                    Webinars
                                </Link>
                                <ul class="dropdown-menu p-3 " aria-labelledby="navbarDarkDropdownMenuLink">
                                    <li><Link class="dropdown-item  p-2" to="/course">Live</Link></li>
                                    <li><Link class="dropdown-item  p-2" to="/course">On Demand</Link></li>
                                    <li><Link class="dropdown-item  p-2" to="/course">e Transcript</Link></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link mx-2" to="/Speakers" tabindex="-1" aria-disabled="true">
                                    Speakers
                                </Link>
                            </li>

                            <li class="nav-item dropdown">{/* Help DROPDOWN */}
                                <Link class="nav-link mx-2 dropdown-toggle" to="/">
                                    Help
                                </Link>
                                <ul class="dropdown-menu  p-3" aria-labelledby="navbarDarkDropdownMenuLink ">
                                    <li ><Link class="dropdown-item  p-2" to="/Contactus">Contact Us</Link></li>
                                    {/* <li className='text-center'><Link class="dropdown-item  p-2" to="/Dashboard">Dashboard</Link></li> */}
                                    <li ><Link class="dropdown-item  p-2" to="/Faqrear"> FAQ</Link></li>
                                </ul>
                            </li>

                            <li className='nav-item'>
                                <button class="btn p-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                                    <i class="fas fa-search fa-lg" style={{ color: '#ff9b24' }}></i>
                                </button>
                            </li>

                        </ul>
                        <ul className="navbar-nav ms-auto d-none d-lg-inline-flex">
                            <li>
                                <Link class="nav-link mx-2  position-relative " to="/Add_cart" tabindex="-1" aria-disabled="true">
                                    <button type="button" class="btn  d-inline-flex  position-relative">
                                        <i class="fas fa-cart-arrow-down fa-2 me-2 mt-1" style={{ color: '#ff9b24' }}></i>Cart
                                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {cartItems.length}

                                            <span class="visually-hidden">unread messages</span>
                                        </span>
                                    </button>
                                </Link>
                            </li>
                            {/* <li><Link to="/login"><button className='buttonLogIn'> Log-in</button></Link></li> */}

                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <Link className="nav-link mx-2" to="/Dashboard">
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button className='buttonLogIn' onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/login">
                                        <button className='buttonLogIn'>Log-in</button>
                                    </Link>
                                </li>
                            )}
                        </ul>
                        
                    </div>

                </div>
            </nav>
            {/*----------------- main nav bar end here---------------------------------------- */}

            {/*-------- --------------small screee menu start here----------------------------------- */}
        </div>
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">
                        <svg id="logo-28" width="161" height="44" viewBox="0 0 161 44" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M54.196 29H57.715V12.44H54.196V29Z" class="ccustom" fill="#55AE36"></path> <path d="M64.9338 29.368C68.6138 29.368 71.0288 26.999 71.0288 22.813C71.0288 18.765 68.6828 16.235 64.9338 16.235C61.2538 16.235 58.8618 18.604 58.8618 22.813C58.8618 26.884 61.1848 29.368 64.9338 29.368ZM64.9338 26.516C63.3468 26.516 62.4728 25.205 62.4728 22.813C62.4728 20.398 63.3238 19.087 64.9338 19.087C66.5438 19.087 67.4178 20.421 67.4178 22.813C67.4178 25.228 66.5668 26.516 64.9338 26.516Z" class="ccustom" fill="#55AE36"></path> <path d="M76.7538 29.023C78.0878 29.023 79.1918 28.471 79.9738 27.39V29.46C79.9738 31.185 79.1228 31.76 77.8578 31.76C76.6388 31.76 75.6958 31.162 75.5578 30.058H72.0388C72.4758 33.071 74.7528 34.451 77.9038 34.451C81.1468 34.451 83.4928 32.726 83.4928 29.414V16.626H79.9738V17.776C79.2148 16.764 78.1338 16.235 76.7538 16.235C73.6718 16.235 71.6708 18.535 71.6708 22.652C71.6708 26.585 73.6258 29.023 76.7538 29.023ZM77.6048 26.171C76.0868 26.171 75.2818 24.906 75.2818 22.652C75.2818 20.329 76.0868 19.087 77.6048 19.087C79.1458 19.087 79.9738 20.352 79.9738 22.629C79.9738 24.929 79.1688 26.171 77.6048 26.171Z" class="ccustom" fill="#55AE36"></path> <path d="M90.7315 29.368C94.4115 29.368 96.8265 26.999 96.8265 22.813C96.8265 18.765 94.4805 16.235 90.7315 16.235C87.0515 16.235 84.6595 18.604 84.6595 22.813C84.6595 26.884 86.9825 29.368 90.7315 29.368ZM90.7315 26.516C89.1445 26.516 88.2705 25.205 88.2705 22.813C88.2705 20.398 89.1215 19.087 90.7315 19.087C92.3415 19.087 93.2155 20.421 93.2155 22.813C93.2155 25.228 92.3645 26.516 90.7315 26.516Z" class="ccustom" fill="#55AE36"></path> <path d="M97.9976 15.384H101.517V12.44H97.9976V15.384ZM97.9976 29H101.517V16.626H97.9976V29Z" class="ccustom" fill="#55AE36"></path> <path d="M106.711 34.083V27.758C107.447 28.816 108.505 29.368 109.816 29.368C112.967 29.368 115.014 26.999 115.014 22.79C115.014 18.742 113.013 16.235 109.816 16.235C108.528 16.235 107.47 16.833 106.711 17.914V16.626H103.192V34.083H106.711ZM109.08 19.087C110.575 19.087 111.403 20.398 111.403 22.79C111.403 25.205 110.598 26.516 109.08 26.516C107.539 26.516 106.711 25.182 106.711 22.79C106.711 20.398 107.516 19.087 109.08 19.087Z" class="ccustom" fill="#55AE36"></path> <path d="M119.24 20.053C119.24 19.386 119.838 18.926 120.758 18.926C122 18.926 122.736 19.455 122.943 20.72H126.439C126.094 17.592 123.84 16.235 120.873 16.235C117.561 16.235 115.882 18.167 115.882 20.237C115.882 25.205 123.38 23.066 123.38 25.458C123.38 26.217 122.759 26.7 121.517 26.7C120.206 26.7 119.263 26.079 119.102 24.929H115.583C116.043 27.988 118.297 29.368 121.425 29.368C124.645 29.368 126.899 27.689 126.899 25.251C126.899 20.352 119.24 22.491 119.24 20.053Z" class="ccustom" fill="#55AE36"></path> <path d="M135.569 23.733C135.569 25.32 134.695 26.516 133.338 26.516C132.096 26.516 131.498 25.734 131.498 24.147V16.626H127.979V24.86C127.979 27.942 129.704 29.368 132.05 29.368C133.545 29.368 134.764 28.724 135.569 27.344V29H139.088V16.626H135.569V23.733Z" class="ccustom" fill="#55AE36"></path> <path d="M140.788 29H144.307V21.893C144.307 20.306 145.112 19.087 146.331 19.087C147.458 19.087 148.01 19.892 148.01 21.456V29H151.506V21.893C151.506 20.306 152.334 19.087 153.553 19.087C154.68 19.087 155.209 19.892 155.209 21.456V29H158.728V20.743C158.728 17.684 157.026 16.235 154.726 16.235C153.185 16.235 151.874 16.879 151.023 18.282C150.402 16.902 149.16 16.235 147.688 16.235C146.262 16.235 145.089 16.856 144.307 18.19V16.626H140.788V29Z" class="ccustom" fill="#55AE36"></path> <path d="M40.8504 34.0526C44.6624 30.6486 47 26.0548 47 21C47 10.5066 36.9264 2 24.5 2C12.0736 2 2 10.5066 2 21C2 31.4934 12.0736 40 24.5 40C28.0253 40 31.3613 39.3154 34.3316 38.0949C37.8208 40.2486 42.0957 41.7967 46.8169 41.4702C44.3227 40.8362 42.1773 38.2679 40.8504 34.0526Z" class="ccompli2" fill="#B6EFA2"></path> <path d="M41 21C41 28.732 33.6127 35 24.5 35C15.3873 35 8 28.732 8 21C8 13.268 15.3873 7 24.5 7C33.6127 7 41 13.268 41 21Z" class="ccompli1" fill="#88E169"></path> <path d="M35 21C35 25.9706 30.299 30 24.5 30C18.701 30 14 25.9706 14 21C14 16.0294 18.701 12 24.5 12C30.299 12 35 16.0294 35 21Z" class="ccustom" fill="#55AE36"></path> </svg>
                    </h5>
                    <button type="button " class="btn-close btn-lg text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body backgroundColor">
                    <ul class="nav d-flex flex-column justify-content-center align-item-center  fs-4 boder border-bottom ">

                        <li class="nav-item">
                            <Link class="nav-link active text-dark" aria-current="page" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to="/About">About-Us</Link>
                        </li>

                        <li class="nav-item dropdown">{/* Webinar  DROPDOWN */}
                            <Link class="nav-link dropdown-toggle" to="/Webinar" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Webinar
                            </Link>
                            <ul class="dropdown-menu dropdown-menu-dark  ms-5" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><Link class="dropdown-item" to="/Webinar">Live</Link></li>
                                <li><Link class="dropdown-item" to="/Webinar">On Demand</Link></li>
                                <li><Link class="dropdown-item" to="/Webinar">e Transcript</Link></li>

                            </ul>
                        </li>


                        <li class="nav-item dropdown">{/* INDUSTRY  DROPDOWN */}
                            <Link class="nav-link dropdown-toggle" to="/Webinar" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Industry
                            </Link>
                            <ul class="dropdown-menu dropdown-menu-dark  ms-5" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><Link class="dropdown-item" to="/Webinar">Human Resource</Link></li>
                                <li><Link class="dropdown-item" to="/Webinar">Payroll & Taxation</Link></li>
                                <li><Link class="dropdown-item" to="/Webinar">BFSI & Accounting</Link></li>
                                <li><Link class="dropdown-item" to="/Webinar">Housing & Construction</Link></li>
                            </ul>
                        </li>

                        <li class="nav-item dropdown">{/* SPEAKER DROPDOWN */}
                            <Link class="nav-link dropdown-toggle" to="/Webinar" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Speakers
                            </Link>
                            <ul class="dropdown-menu dropdown-menu-dark  ms-5" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><Link class="dropdown-item" to="/Ourspeaker">Our Speakers</Link></li>
                                <li><Link class="dropdown-item" to="/Becomespeaker">Become Speaker</Link></li>
                            </ul>
                        </li>

                        <li class="nav-item dropdown">{/* Help DROPDOWN */}
                            <Link class="nav-link dropdown-toggle" to="/Webinar" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Help
                            </Link>
                            <ul class="dropdown-menu dropdown-menu-dark mt-2 ms-5" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><Link class="dropdown-item" to="/Contactus">Contact Us</Link></li>
                                <li><Link class="dropdown-item" to="/Dashboard">Dashboard</Link></li>
                                <li><Link class="dropdown-item" to="/Faq"> FAQs</Link></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/cart" tabindex="-1" aria-disabled="true">
                                Cart&emsp;<i class="fas fa-cart-arrow-down" style={{ color: '#ff9b24' }}></i>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <button class="btn text-primary " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                                Search&emsp;<i class="fas fa-search fa-lg " style={{ color: '#ff9b24' }}></i>
                            </button>
                        </li>
                    </ul>
                    <form class="d-flex mt-5 fs-4">
                        <Link className='logBtn' to="/login"> <span>Log-In</span></Link>&emsp;
                        <Link className='signUp' to="/register"> Sign up<div class="arrow-wrapper"><div class="arrow"></div></div></Link>

                    </form>
                </div>
            </div>
            {/* ----------========small screee menu end here==========-------------- */}

            {/*-------======== sharch bar off canvas==========---------------------- */}
            <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel" style={{ background: '#00bbae' }}>
                <div class="offcanvas-header m-5">
                    <div className="input-group input-group-lg">
                        <span className="input-group-text" id="inputGroup-sizing-lg"><i class="fas fa-search fa-lg"></i></span>
                        <input type="text" placeholder='Search here' className="form-control border-0" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    </div>&emsp;
                    <button type="button" class="btn-close text-reset btn-lg" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
            </div>
        </>
    )
}
