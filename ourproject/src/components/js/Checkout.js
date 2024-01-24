import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Link, json, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../redux/cartSlice';
import { removeFromCart } from '../../redux/cartSlice';
import http from "../../utils/http-client";
// import { checkout } from '../../../../node_server/router';

function Checkout() {

    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const navigate = useNavigate();
    const [applied, setApplied] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const cartItems = useSelector(selectCartItems);
    console.log(cartItems);
    // console.log();
    const dispatch = useDispatch();

    const handleRemove = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const handleApplyCoupon = async () => {
        // Make a request to your backend to check the coupon code and get the discount
        // Update 'your-backend-endpoint' with the actual endpoint
        const response = await http.post('/check-coupon', { couponCode });

        console.log(response, 'response----')
        if (response?.status == 200) {
            const data = response.data;
            console.log(data);
            if (data.valid) {
                // Set the discount if the coupon is valid
                setDiscount(data.discount);
                setApplied(true);


            } else {
                // Handle invalid coupon code
                console.log('Invalid coupon code');
                setDiscount(0);
                setApplied(false);
            }
        } else {
            // Handle server error
            console.log('Server error');
            setDiscount(0);
            setApplied(false);
        }
    };

    const handleCancelCoupon = () => {
        // Reset coupon-related states and show the input form again
        setCouponCode('');
        setDiscount(0);
        setApplied(false);
    };



    function calculateTotalPriceSum(data) {
        let totalPriceSum = 0;
        data.forEach(course => {
            totalPriceSum += course.totalPrice;
        });
        return totalPriceSum;
    } // Empty dependency array means this effect runs once when the component mounts
    const sum = calculateTotalPriceSum(cartItems);


    const getTotalPrice = () => {
        // Calculate total price with discount

        const totalPrice = cartItems.reduce(
            (total, item) => total + item.totalPrice * item.qty,
            0
        );

        const discountedPrice = totalPrice - parseInt(discount);
        return discountedPrice >= 0 ? discountedPrice : 0;

    };




    const ItemComponent = ({ itemName, itemPrice }) => (
        <table className='table  table-hover '>
            <tbody>
                <tr>
                    <td className='col border-0 fs-5'>{itemName}</td>
                    <td className='col border-0 text-primary fs-5'>${itemPrice}</td>
                </tr>
            </tbody>
        </table>
    );


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        jobTitle: '',
        country: '',
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: '',
    });

    console.log(formData)
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        for (const key in formData) {
            if (!formData[key]) {
                errors[key] = 'This field is  required';
            }
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };



    console.log(getTotalPrice(), 'gt');
    console.log(sum);
    console.log(discount, 'discount-price');
    console.log(couponCode);
    console.log(cartItems);
    console.log(cartItems.length);
    console.log(formData, 'fd');

    const purchaseDetails = [
        { label: 'Grand Total', amount: getTotalPrice() },
        { label: 'Subtotal', amount: sum },
        { label: 'Discount', amount: discount },
        { label: 'Coupon Code', value: couponCode },
        { label: 'course detail', value: cartItems.length },
        { label: 'caard detail', value: cartItems },
        { label: 'FormData detail', value: formData },
        // Add other details as needed
        { label: 'Item 1', amount: cartItems[0]?.course_title },
        { label: 'Item 2', amount: cartItems[1]?.totalPrice },

    ];
    console.log(purchaseDetails);

    const handleCheckout = () => {
        fetch(" http://127.0.1:8000/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors',
            body: JSON.stringify({
                purchaseDetails: [
                    {
                        amount: getTotalPrice(),
                        quantity: cartItems.length,
                        DiscountAmount: discount,
                    }
                ]
            })
        })
            .then(res => {
                if (res.ok) return res.json()
                return res.json().then(json => Promise.reject(json))

            })
            .then(({ url }) => {
                window.location = url
            }).catch(e => {
                console.log(e.errors)
            })
    }

    return (
        <div>
            <section className="h-100 gradient-custom " style={{ marginTop: '100px', marginBottom: "200px" }}>
                <div className="container-fluid py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-7">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0"><i className="fa-solid fa-cart-shopping"></i> Your Cart List</h5>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered m-0" >
                                            <thead className=' fs-5' style={{ background: '#FFAA33', borderRadius: '10px' }}>
                                                <tr>
                                                    {/* Set columns width */}
                                                    <th className="text-center py-3 px-4" style={{ minWidth: 300 }}>Product Name</th>
                                                    <th className="text-center py-3 px-4" style={{ minWidth: 300 }}>selling option</th>
                                                    <th className="text-right py-3 px-4" style={{ width: 120 }}>Price</th>
                                                    {/* <th className="text-center py-3 px-4" style={{ width: 120 }}>Quantity</th> */}
                                                    {/* <th className="text-right py-3 px-4" style={{ width: 120 }}>Total</th> */}
                                                    <th className="text-center align-middle py-3 px-0" style={{ width: 140 }}>Remove </th>
                                                </tr>
                                            </thead>
                                            {cartItems?.map((item) => (
                                                <tbody key={item.id}>
                                                    <tr>
                                                        <td className="p-4">
                                                            <div className="media align-items-center">
                                                                {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="d-block ui-w-40 ui-bordered mr-4" alt /> */}
                                                                <div className="media-body">
                                                                    <Link to={`/Course_Detail/${item.course_id}`} onClick={() => { setSelectedCourseId(item.course_id); navigate(`/Course_Detail/${item.course_id}`); }} className="d-block fs-5 fw-4 card-link">{item?.course_title}</Link>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='p-2'>
                                                            {item.courseItems.map((item, index) => (
                                                                <ItemComponent
                                                                    key={index}
                                                                    {...item}
                                                                    id={item.id}
                                                                />
                                                            ))}
                                                        </td>
                                                        <td className="text-right fs-4 font-weight-semibold align-middle p-4"> ${item?.totalPrice}</td>
                                                        {/*
                                                            <td className="align-middle  d-flex p-4">
                                                            <button onClick={() => handleIncreaseQuantity(item?.course_id)}>+</button>
                                                            <input type="text" className="form-control text-center" placeholder={item?.qty} value={item?.qty} />
                                                            <button onClick={() => handleDecreaseQuantity(item?.course_id)}>-</button></td>
                                                            <td className="text-right fs-4 font-weight-semibold align-middle p-4"> ${item.totalPrice * item.qty}  </td>
                                                             */}

                                                        <td className="text-center align-middle  px-0"><button className='btn btn-danger' onClick={() => handleRemove(item.course_id)}><i className="fas fa-trash-alt fa-lg"></i></button></td>
                                                    </tr>

                                                </tbody>

                                            ))}
                                        </table>
                                    </div>
                                    {/* / Shopping cart table */}
                                    <div className="d-flex= flex-wrap flex-column justify-content-end align-items-center pb-4">
                                        <div className='row pt-5'>
                                            <div className='d-flex justify-content-end'>
                                                <table className='table table-striped'>
                                                    <tr>
                                                        <td colSpan={3}>
                                                            <label className="text-muted  mt-0">Total price</label>
                                                        </td>
                                                        <td><div className="text-large"><strong>{sum}</strong></div></td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>

                                        {/* coupan section  */}
                                        <div className='row justify-content-end'>
                                            <div className='d-flex  gap-2'>
                                                {!applied ? (
                                                    <div className=" col mt-4">
                                                        <label className="text-muted font-weight-normal">Promocode</label>
                                                        <input type="text" placeholder="ABC" className="form-control" value={couponCode}
                                                            onChange={(e) => setCouponCode(e.target.value)} />
                                                    </div>


                                                ) : null}
                                                {!applied ? (

                                                    <div className='col mt-4'>
                                                        <button className='btn btn-success mt-4' onClick={handleApplyCoupon}  >
                                                            Apply coupon
                                                        </button>
                                                    </div>

                                                ) : null}

                                            </div>
                                        </div>
                                        {applied ? (
                                            <div className="d-flex">
                                                <table className=" table table-success text-end mt-4 ml-5">
                                                    <tbody>
                                                        <tr>
                                                            <td className='col'>
                                                                <label className="fs-4 form-label m-0">Discount</label>
                                                            </td>
                                                            <td className='col'>
                                                                <div className="text-large">
                                                                    <strong>${discount}</strong>
                                                                </div></td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label className="fs-5 form-label m-0">Total price</label>
                                                            </td>
                                                            <td>
                                                                <div className="text-large">
                                                                    <strong>${getTotalPrice()}</strong>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : null}
                                        {applied ? (
                                            <div className="d-flex justify-content-end mt-3">
                                                <button className="btn btn-outline-secondary" onClick={handleCancelCoupon}>
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : null}

                                    </div>
                                    {/* <div className="  d-flex justify-content-between">
                                        <Link to='/course'> <button type="button" className="btn btn-sm btn-outline-dark  mt-2 mr-3">Back to shopping</button></Link>
                                        <Link to='/CardSummary'><button type="button" className="btn btn-lg btn-outline-primary mt-2">Checkout</button></Link>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4  col-12">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Summary</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            <strong>Products</strong>
                                            <span className='fs-4'>{cartItems?.length}</span>
                                        </li>

                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <strong>Total amount</strong><span className='fs-4'>${getTotalPrice()}</span>
                                        </li>
                                    </ul>
                                    {/* <button type="button" className="btn btn-primary btn-lg btn-block" onClick={showRegistrationForm}>
                                        Go to checkout
                                    </button> */}
                                    {/* showRegistration &&  */}


                                    <div className="card mb-4">
                                        <from >
                                            <div className="card-header py-3">
                                                <h5 className="mb-0">Registration Form</h5><br />
                                                <div className='row'>
                                                    <div className='col'>
                                                        <label htmlFor="firstName" class="form-label">First Name</label>
                                                        <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                                                        {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
                                                    </div>
                                                    <div className='col'>
                                                        <label htmlFor="lastname" class="form-label"> last Name</label>
                                                        <input type="text" className="form-control" id="lastName" name='lastName' value={formData.lastName} onChange={handleInputChange} />
                                                        {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
                                                    </div>

                                                </div><br />
                                                <div className='row'>
                                                    <div className='col'>
                                                        <label htmlFor="Companyname" class="form-label">Company Name</label>
                                                        <input type="text" class="form-control" id="companyName" name='companyName' value={formData.companyName} onChange={handleInputChange} />
                                                        {formErrors.companyName && <span className="error">{formErrors.companyName}</span>}
                                                    </div>
                                                </div><br />
                                                <div className='row'>
                                                    <div className='col'>
                                                        <label htmlFor="jobTitle" class="form-label"> JOB TITLE*</label>
                                                        <input type="text" class="form-control" id="jobTitle" name='jobTitle' value={formData.jobTitle} onChange={handleInputChange} />
                                                        {formErrors.jobTitle && <span className="error">{formErrors.jobTitle}</span>}
                                                    </div>
                                                </div><br />
                                                <div className='row'>
                                                    <div className='col'>
                                                        <label htmlFor="Country" class="form-label"> Country/REGION</label>
                                                        <input type="text" class="form-control" id="country" name='country' value={formData.country} onChange={handleInputChange} />
                                                        {formErrors.country && <span className="error">{formErrors.country}</span>}
                                                    </div>
                                                </div><br />
                                                <div className='row'>
                                                    <div className='col'>
                                                        <label htmlFor="streetAddress" class="form-label">STREET ADDRESS *</label>
                                                        <input type="text" class="form-control" id="streetAddress" name='streetAddress' value={formData.streetAddress} onChange={handleInputChange} />
                                                        {formErrors.streetAddress && <span className="error">{formErrors.streetAddress}</span>}
                                                    </div>

                                                </div><br />
                                                <div className='row'>
                                                    <div className='col'>
                                                        <label htmlFor="city" class="form-label">City</label>
                                                        <input type="text" class="form-control" id="city" name='city' value={formData.city} onChange={handleInputChange} />
                                                        {formErrors.city && <span className="error">{formErrors.city}</span>}
                                                    </div>
                                                    <div className='col'>
                                                        <label htmlFor="country" class="form-label">State/Country</label>
                                                        <input type="text" class="form-control" id="country" name='country' value={formData.country} onChange={handleInputChange} />
                                                        {formErrors.country && <span className="error">{formErrors.country}</span>}
                                                    </div>
                                                    <div className='col'>
                                                        <label htmlFor="zip" class="form-label">Zip</label>
                                                        <input type="text" class="form-control" id="zip" name='zip' value={formData.zip} onChange={handleInputChange} />
                                                        {formErrors.zip && <span className="error">{formErrors.zip}</span>}
                                                    </div>
                                                </div><br />
                                                <div className='row'>
                                                    <div className='col'>
                                                        <label htmlFor="phone" class="form-label">Phone</label>
                                                        <input type="Phone" class="form-control" id="phone" name='phone' value={formData.phone} onChange={handleInputChange} />
                                                        {formErrors.phone && <span className="error">{formErrors.phone}</span>}
                                                    </div>
                                                    <div className='col'>
                                                        <label htmlFor="email" class="form-label">Email</label>
                                                        <input type="email" class="form-control" id="email" name='email' value={formData.email} onChange={handleInputChange} />
                                                        {formErrors.email && <span className="error">{formErrors.email}</span>}
                                                    </div>
                                                </div><br />
                                                <div className='row'>
                                                    <div className='col'>
                                                        <button type='button' className='btn btn-warning' onClick={handleCheckout}>checkout</button>
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

export default Checkout