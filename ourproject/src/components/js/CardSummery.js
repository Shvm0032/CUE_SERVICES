import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
// import http from "../utils/http-client";
function CardSummary() {
    const { course, payment } = useParams()
    console.log(course, payment)
    // State to control the visibility of the registration form
    const [showRegistration, setShowRegistration] = useState(false);

    // Function to handle the registration form display logic
    const showRegistrationForm = () => {
        // Update the state to show the registration form
        setShowRegistration(true);
    };

    const [ammount, setAmmount] = useState(payment)
    const [courseName, setCourseName] = useState("")
    const [quantity, setquantity] = useState(1);
    const [finalAmount, setfinalAmount] = useState(ammount);
    const [coupon, setCoupon] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [formData, setFormData] = useState({
        Name: "",
        CompanyName: "",
        JobTitle: "",
        Country: "",
        Address1: "",
        Address2: "",
        City: "",
        State: "",
        Zip: "",
        Phone: "",
        Email: ""
    })
    console.log(formData.Email)
    useEffect(() => {
        // Fetch user information from the server
        fetch(`http://127.0.1:8000/api/Selling?id=${course}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setAmmount(payment);
                setCourseName(data[0][0].title)
            })
            .catch(error => console.error('Error fetching user information:', error));
    }, []);

    
    useEffect(() => {
        // Fetch user information from the server
        fetch(`http://127.0.1:8000/api/Coupan`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCoupon(data)
                console.log(coupon)
            })
            .catch(error => console.error('Error fetching user information:', error));
    }, []);

    // decrement quantaty button
    const decrement = () => {
        if (quantity <= 1) {

            setquantity(1)
            setfinalAmount(ammount * quantity)

        } else if (quantity > 1) {

            setquantity(quantity - 1)
            setfinalAmount(finalAmount - ammount);

        }
    }
    // increment quantaty button
    const increment = () => {
        setquantity(quantity + 1)
        setfinalAmount(Number(finalAmount) + Number(ammount));
    }

    const checkout = async () => {
        // try {
        
            try {
                if (formData.Email !== "") 
                {
                const resp = await fetch('http://localhost:8000/api/add_user', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const resp2 = await resp.json()
                console.log(resp2)

                const resp3 = await fetch('http://localhost:8000/api/sending_email', {
                    method: 'POST',
                    body: JSON.stringify({ email: formData.Email }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const resp4 = await resp3.json()
                console.log(resp4)



                const stripe = await loadStripe('pk_test_51OGHZSSA3p9Dwv0NaccoiuEfDXTNtWgvxuPleUcdSBFVbnBTwoa1KZcXPVzBxmNRXW1GNwpPZcX5YGY8FfiBSdpH00ZkIQDWaC');

                const body = {
                    products: [
                        {
                            userId: resp2.id,
                            courseId: course,
                            name: courseName,
                            quantity: quantity,
                            price: ammount,
                        },
                    ],
                };

                const headers = {
                    'Content-Type': 'application/json',
                };


                const response = await fetch('http://localhost:8000/api/create-checkout-session', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body),
                });

                const session = await response.json();

                const result = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });
                console.log(result)
                if (result.error) {
                    console.log(result.error);
                }
                
            }
            else
            {
            alert("Cant Cheeck Out")
            console.log("Cant check out")
            }
            }
       
        
            catch (error) {
                console.error('Error during checkout:', error);
            }
        };
        function couponExists() {
            coupon.map((ele) => {
                if (ele.coupon_code === inputValue) {
                    setfinalAmount(finalAmount - Number(ele.discount))
                }
            })
        }
        function inputValueFunc(e) {
            setInputValue(e.target.value)
            console.log(inputValue)
        }
        return (
            <div>
                <section className="h-100 gradient-custom " style={{ marginTop: '100px', marginBottom: "200px" }}>
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center my-4">
                            <div className="col-md-7">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="mb-0"><i className="fa-solid fa-cart-shopping"></i> Your Cart List</h5>
                                    </div>
                                    <div className="card-body">
                                        {/* Single item */}
                                        <div className="row">
                                            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                {/* Image */}
                                                <div
                                                    className="bg-image hover-overlay hover-zoom ripple rounded"
                                                    data-mdb-ripple-color="light"
                                                >
                                                    <img
                                                        src="img/img4.jpg"
                                                        className="w-100"
                                                        alt="Blue Jeans Jacket"
                                                    />
                                                    <a href="#!">
                                                        <div
                                                            className="mask"
                                                            style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                                                        />
                                                    </a>
                                                </div>
                                                {/* Image */}
                                            </div>
                                            <div className="col-lg-5 col-md-6 mt-5 mb-lg-0">
                                                {/* Data */}
                                                <h5>
                                                    <strong>{courseName}</strong>
                                                </h5>

                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-sm me-1 mb-2"
                                                    data-mdb-toggle="tooltip"
                                                    title="Remove item"
                                                >
                                                    <i className="fas fa-trash" />
                                                </button>

                                                {/* Data */}
                                            </div>
                                            <div className="col-lg-4 col-md-6 mt-5 mb-lg-0">
                                                {/* Quantity */}
                                                <div className="d-flex mb-4" style={{ maxWidth: 300 }}>
                                                    <button
                                                        className="btn btn-primary px-3 me-2"
                                                        onClick={decrement}
                                                    >
                                                        <i className="fas fa-minus" />
                                                    </button>
                                                    <div className="p-3 row text-center border ms-1 me-1  fs-4 fw-bold">

                                                        <span>{quantity}</span>

                                                    </div>
                                                    <button
                                                        className="btn btn-primary px-3 me-2"
                                                        onClick={increment}
                                                    >
                                                        <i className="fa-solid fa-plus"></i>
                                                    </button>
                                                </div>
                                                {/* Quantity */}
                                                {/* Price */}
                                                <p className="text-start text-md-center">
                                                    <strong> $ {finalAmount}</strong>
                                                </p>
                                                {/* Price */}
                                                {/* <button onClick={checkout} className='btn btn-success'>buy now</button> */}
                                            </div>
                                        </div>
                                        {/* Single item */}
                                        <hr className="my-4" />
                                        {/* Single item */}
                                        <div className="row">
                                            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                {/* Image */}
                                                <div
                                                    className="bg-image hover-overlay hover-zoom ripple rounded"
                                                    data-mdb-ripple-color="light"
                                                >
                                                    <img
                                                        src="img/girl2.jpg"
                                                        className="w-100" alt=''
                                                    />
                                                    <a href="#!">
                                                        <div
                                                            className="mask"
                                                            style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                                                        />
                                                    </a>
                                                </div>
                                                {/* Image */}
                                            </div>


                                        </div>
                                        {/* Single item */}
                                    </div>
                                </div>

                                <div className="card mb-4">
                                    <div className="card-body p-4 d-flex flex-row">
                                        <div className="form-outline flex-fill">
                                            <input onChange={inputValueFunc} type="text" id="form1" className="form-control form-control-lg" placeholder='  Discound code' />
                                            <label className="form-label" htmlFor="form1" >

                                            </label>
                                            <button onClick={couponExists} type="button" className="btn btn-warning ms-3 mt-2">
                                                Apply
                                            </button>
                                        </div>

                                    </div>

                                </div>


                            </div>
                            <div className="col-md-5 col-12">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="mb-0">Summary</h5>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                Products
                                                <span>${finalAmount}</span>
                                            </li>

                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                <div>
                                                    <strong>Total amount</strong>
                                                    <strong>
                                                        <p className="mb-0">(including VAT)</p>
                                                    </strong>
                                                </div>
                                                <span>
                                                    <strong>${finalAmount}</strong>
                                                </span>
                                            </li>
                                        </ul>
                                        {/* <button type="button" className="btn btn-primary btn-lg btn-block" onClick={showRegistrationForm}>
                                        Go to checkout
                                    </button> */}
                                        {/* {showRegistration && ( */}


                                        <div className="card mb-4">
                                            <from >
                                                <div className="card-header py-3">
                                                    <h5 className="mb-0">Registration Form</h5><br />
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <label for="inputEmail4" class="form-label"> First Name</label>
                                                            <input type="text" onChange={(e) => { setFormData((pre) => ({ ...pre, Name: e.target.value })) }} required class="form-control" id="inputEmail4"></input></div>
                                                        <div className='col'>
                                                            <label for="inputEmail4" class="form-label"> last Name</label>
                                                            <input type="text" required class="form-control" id="inputEmail4"></input>
                                                        </div>

                                                    </div><br />
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <label for="inputEmail4" class="form-label">Company Name</label>
                                                            <input type="text" onChange={(e) => { setFormData((pre) => ({ ...pre, CompanyName: e.target.value })) }} required class="form-control" id="inputEmail4"></input>
                                                        </div>
                                                    </div><br />
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <label for="inputEmail4" class="form-label"> JOB TITLE*</label>
                                                            <input type="text" onChange={(e) => { setFormData((pre) => ({ ...pre, JobTitle: e.target.value })) }} required class="form-control" id="inputEmail4"></input>
                                                        </div>
                                                    </div><br />
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <label for="inputEmail4" class="form-label"> Country/REGION</label>
                                                            <input type="text" onChange={(e) => { setFormData((pre) => ({ ...pre, Country: e.target.value })) }} required class="form-control" id="inputEmail4"></input>
                                                        </div>
                                                    </div><br />
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <label for="inputEmail4" class="form-label">STREET ADDRESS *</label>
                                                            <input type="text" onChange={(e) => { setFormData((pre) => ({ ...pre, Address1: e.target.value })) }} required class="form-control" id="inputEmail4"></input>
                                                        </div>
                                                        <div className='col'>
                                                            <label for="inputEmail4" class="form-label">APARTMENT, SUITE, UNIT,</label>
                                                            <input type="text" onChange={(e) => { setFormData((pre) => ({ ...pre, Address2: e.target.value })) }} required class="form-control" id="inputEmail4"></input>
                                                        </div>
                                                    </div><br />
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <label for="inputEmail4" class="form-label">City</label>
                                                            <input type="text" onChange={(e) => { setFormData((pre) => ({ ...pre, City: e.target.value })) }} required class="form-control" id="inputEmail4"></input>
                                                        </div>
                                                        <div className='col'>
                                                            <label for="inputEmail4" class="form-label">State/Country</label>
                                                            <input type="text" onChange={(e) => { setFormData((pre) => ({ ...pre, State: e.target.value })) }} required class="form-control" id="inputEmail4"></input>
                                                        </div>
                                                        <div className='col'>
                                                            <label for="inputEmail4" class="form-label">Zip</label>
                                                            <input type="text" onChange={(e) => { setFormData((pre) => ({ ...pre, Zip: e.target.value })) }} required class="form-control" id="inputEmail4"></input>
                                                        </div>
                                                    </div><br />
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <label for="inputEmail4" class="form-label">Phone</label>
                                                            <input type="Phone" onChange={(e) => { setFormData((pre) => ({ ...pre, Phone: e.target.value })) }} required class="form-control" id="inputEmail4"></input>
                                                        </div>
                                                        <div className='col'>
                                                            <label for="inputEmail4" class="form-label">Email</label>
                                                            <input type="email" onChange={(e) => { setFormData((pre) => ({ ...pre, Email: e.target.value })) }} required class="form-control" id="inputEmail4"></input>
                                                        </div>
                                                    </div><br />
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <button type='button' className='btn btn-warning' onClick={checkout}>checkout</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </from>


                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="card mb-4 mb-lg-0">
                                    <div className="card-body">
                                        <p>
                                            <strong>We accept</strong>
                                        </p>
                                        <img
                                            className="me-2"
                                            width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                            alt="Visa"
                                        />
                                        <img
                                            className="me-2"
                                            width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                            alt="American Express"
                                        />
                                        <img
                                            className="me-2"
                                            width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                            alt="Mastercard"
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }

    export default CardSummary