import LoadingOverlay from 'react-loading-overlay-ts';
import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, removeFromCart, removeAllItemsFromCart, } from '../../redux/cartSlice';
import http from "../../utils/http-client";
import FadeLoader from "react-spinners/FadeLoader";
import { selectIsLoggedIn } from '../../redux/authSlice';
const stripePromise = loadStripe('pk_test_51OGHZSSA3p9Dwv0NaccoiuEfDXTNtWgvxuPleUcdSBFVbnBTwoa1KZcXPVzBxmNRXW1GNwpPZcX5YGY8FfiBSdpH00ZkIQDWaC'); // Replace with your Stripe public key

function Checkout() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const navigate = useNavigate();
    const [applied, setApplied] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const cartItems = useSelector(selectCartItems);
    const [emailExists, setEmailExists] = useState(false);
    // console.log(cartItems);
    // console.log();
    const dispatch = useDispatch();

    const handleRemove = (itemId) => {
        dispatch(removeFromCart(itemId));
    };
    const handleremoveAllItemsFromCart = (cartItems) => {
        dispatch(removeAllItemsFromCart(cartItems));
    };

    const handleApplyCoupon = async () => {
        // Make a request to your backend to check the coupon code and get the discount
        // Update 'your-backend-endpoint' with the actual endpoint
        const response = await http.post('/check-coupon', { couponCode });

        console.log(response, 'response----')
        if (response?.status === 200) {
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
                    <td className='col border-0 text-primary text-end fs-5'>${itemPrice}</td>
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
        console.log(errors);
        return Object.keys(errors).length === 0;
    };

    // useEffect to perform email existence check
    useEffect(() => {
        // Perform the check only if the user is not logged in
        if (!isLoggedIn) {
            //   checkEmailExists(formData.email);
        }
    }, [formData.email, isLoggedIn]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState, [name]: value
        }));
        console.log(isLoggedIn, 'isLoggedIn');
        if (name == 'email') {
            checkEmailExists(value);
        }
    };


    const checkEmailExists = async (email) => {
        setIsLoading(true);
        try {
            const response = await http.post('/check-email', { email });
            setEmailExists(response?.data?.exists);

            console.log(response);

        } catch (error) {
            console.error('Error checking email:', error);
        }
        setIsLoading(false);
    };




    // console.log(getTotalPrice(), 'gt');
    // console.log(sum);
    // console.log(discount, 'discount-price');
    // console.log(couponCode);
    // console.log(cartItems);
    // console.log(cartItems.length);
    // console.log(formData, 'fd');

    const [orderId, setOrderId] = useState('');
    useEffect(() => {
        const generateRandomOrderId = () => {
            const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let orderId = '';

            for (let i = 0; i < 7; i++) {
                orderId += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
            }

            return orderId;
        };

        // Generate and set the random order ID when the component mounts
        setOrderId(generateRandomOrderId());
    }, []);

    // console.log(orderId, 'hellow')

    const purchaseDetails = {
        'OrderID': orderId,
        'Grand_Total': getTotalPrice(),
        'Subtotal': sum,
        'Discount': discount,
        'Coupon_Code': couponCode,
        'Course_Quantity': cartItems.length,
        'card_detail': cartItems,
        'detail': formData
    };
    // console.log(purchaseDetails);

    const stripe = stripePromise;

    const handleCheckout = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // console.log(validateForm())
        if (!validateForm()) {
            console.log('validateForm');
            // Form validation failed
            return;
        }
        try {
            const response = await http.post('/create-checkout-session', { ...purchaseDetails });
            console.log(response, 'response');
            const stripe = await loadStripe('pk_test_51OGHZSSA3p9Dwv0NaccoiuEfDXTNtWgvxuPleUcdSBFVbnBTwoa1KZcXPVzBxmNRXW1GNwpPZcX5YGY8FfiBSdpH00ZkIQDWaC');
            setIsLoading(false);
            handleremoveAllItemsFromCart();

            // Redirect to Stripe Checkout page
            const result = await stripe.redirectToCheckout({
                sessionId: response.data.id,
            });

            console.log(response.payment_status);
            if (result.error) {
                console.error(result.error.message);
                // Handle error
            }

        } catch (error) {
            console.error('Error during checkout:', error);

            // Handle error
        }

    };



    //    {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     mode: 'cors',
    //     body: JSON.stringify({
    //         purchaseDetails: [
    //             {
    //                 amount: getTotalPrice(),
    //                 quantity: cartItems.length,
    //                 DiscountAmount: discount,
    //             }
    //         ]
    //     })
    // })
    //     .then(res => {
    //         if (res.ok) return res.json()
    //         return res.json().then(json => Promise.reject(json))

    //     })
    //     .then(({ url }) => {
    //         window.location = url
    //     }).catch(e => {
    //         console.log(e.errors)
    //     })

    if(cartItems.length === 0){

        return <div>
             <section className="h-100 gradient-custom " style={{ marginTop: '100px', marginBottom: "200px" }}>
             <div class="container-fluid  mt-100">
            <div class="row">

              <div class="col-md-12">

                <div class="row">

                  <div class=" cart">
                    <div class="col-sm-12 empty-cart-cls text-center">
                      <img src="https://i.imgur.com/dCdflKN.png" width="130" alt='' height="130" class="img-fluid mb-4 mr-3" />
                      <h3><strong>Your Cart is Empty</strong></h3>
                      <h4>Add something to make me happy</h4>
                      <Link to="/course" className=" button2addtocark" data-abc="true">continue shopping</Link>


                    </div>
                  </div>
                </div>


              </div>

            </div>

          </div>
            </section>
        </div>
    }
    return (
        <div><LoadingOverlay
            active={isLoading}
            spinner={<FadeLoader color="#36d7b7" />}
            text="Loading..."
        >

            <section className="h-100 gradient-custom " style={{ marginTop: '100px', marginBottom: "200px" }}>
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-5  col-12" >
                            <div className="card-body" >
                                <div className="card mb-4  " style={{ border: '2px solid #ff9b24' }} >
                                    <form onSubmit={handleCheckout}>
                                        <div className="card-header p-5">
                                            <h5 className="text-center display-6 fw-bold" style={{ borderBottom: '2px solid #ff9b24' }}>Checkout Form</h5><br />
                                            <div className='row'>
                                                <div className='col'>
                                                    <label htmlFor="firstName" class="form-label">First Name</label>
                                                    <input type="text" required className="form-control form-control-lg" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                                                    {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
                                                </div>
                                                <div className='col'>
                                                    <label htmlFor="lastname" class="form-label"> last Name</label>
                                                    <input type="text" required className="form-control form-control-lg" id="lastName" name='lastName' value={formData.lastName} onChange={handleInputChange} />
                                                    {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
                                                </div>


                                            </div><br />
                                            <div className='row'>
                                                <div className='col'>
                                                    <label htmlFor="Companyname" class="form-label">Company Name</label>
                                                    <input type="text" required class="form-control form-control-lg" id="companyName" name='companyName' value={formData.companyName} onChange={handleInputChange} />
                                                    {formErrors.companyName && <span className="error">{formErrors.companyName}</span>}
                                                </div>
                                                <div className='col'>
                                                    <label htmlFor="email" class="form-label">Email</label>
                                                    <input type="email" required class="form-control form-control-lg" id="email" name='email' value={formData.email} onChange={handleInputChange} />
                                                    {emailExists && !isLoggedIn ? (<span className="text-danger">Email has already been used.</span>) : null}
                                                    {formErrors.email && <span className="error">{formErrors.email}</span>}
                                                </div>
                                            </div><br />
                                            <div className='row'>
                                                <div className='col'>
                                                    <label htmlFor="jobTitle" class="form-label"> JOB TITLE*</label>
                                                    <input type="text" required class="form-control form-control-lg" id="jobTitle" name='jobTitle' value={formData.jobTitle} onChange={handleInputChange} />
                                                    {formErrors.jobTitle && <span className="error">{formErrors.jobTitle}</span>}
                                                </div>
                                            </div><br />
                                            <div className='row'>
                                                <div className='col'>
                                                    <label htmlFor="Country" class="form-label"> Country/REGION</label>
                                                    <input type="text" required class="form-control form-control-lg" id="country" name='country' value={formData.country} onChange={handleInputChange} />
                                                    {formErrors.country && <span className="error">{formErrors.country}</span>}
                                                </div>
                                            </div><br />
                                            <div className='row'>
                                                <div className='col'>
                                                    <label htmlFor="streetAddress" class="form-label">STREET ADDRESS *</label>
                                                    <input type="text" required class="form-control form-control-lg" id="streetAddress" name='streetAddress' value={formData.streetAddress} onChange={handleInputChange} />
                                                    {formErrors.streetAddress && <span className="error">{formErrors.streetAddress}</span>}
                                                </div>

                                            </div><br />
                                            <div className='row'>
                                                <div className='col'>
                                                    <label htmlFor="city" class="form-label">City</label>
                                                    <input type="text" required class="form-control form-control-lg" id="city" name='city' value={formData.city} onChange={handleInputChange} />
                                                    {formErrors.city && <span className="error">{formErrors.city}</span>}
                                                </div>
                                                <div className='col'>
                                                    <label htmlFor="state" class="form-label">State/Country</label>
                                                    <input type="text" required class="form-control form-control-lg" id="state" name='state' value={formData.state} onChange={handleInputChange} />
                                                    {formErrors.state && <span className="error">{formErrors.state}</span>}
                                                </div>

                                            </div><br />
                                            <div className='row'>
                                                <div className='col'>
                                                    <label htmlFor="zip" class="form-label">Zip</label>
                                                    <input type="text" required class="form-control form-control-lg" id="zip" name='zip' value={formData.zip} onChange={handleInputChange} />
                                                    {formErrors.zip && <span className="error">{formErrors.zip}</span>}
                                                </div>
                                                <div className='col'>

                                                    <label htmlFor="phone" class="form-label">Phone</label>
                                                    <input type="Phone" required class="form-control form-control-lg" id="phone" name='phone' value={formData.phone} onChange={handleInputChange} />
                                                    {formErrors.phone && <span className="error">{formErrors.phone}</span>}
                                                </div>

                                            </div><br />

                                            <div className='row'>
                                                <div className='col text-center mt-4'>
                                                    {emailExists && !isLoggedIn ? (
                                                        <button className="button2addtocark" onClick={() => navigate('/login')}>Login</button>
                                                    ) : (
                                                        <button type="submit" className="button2addtocark" disabled={cartItems.length === 0}>Checkout</button>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>

                        <div className="col-md-7 p-2 ">
                            <div className="card-body bg-body ">
                                <div className="table-responsive shadow">
                                    <table className="table table-bordered m-0" >
                                        <thead className=' fs-5' style={{ background: '#FFAA33', borderRadius: '10px', borderBottom: '2px solid #ff9b24' }}>
                                            <tr>
                                                {/* Set columns width */}
                                                <th className="text-center py-3 px-4" style={{ minWidth: 300 }}>Product Name</th>
                                                <th className="text-center py-3 px-4" style={{ minWidth: 350 }}>selling option</th>
                                                <th className="text-right py-3 px-4" style={{ width: 120 }}>Price</th>
                                                {/* <th className="text-center py-3 px-4" style={{ width: 120 }}>Quantity</th> */}
                                                {/* <th className="text-right py-3 px-4" style={{ width: 120 }}>Total</th> */}
                                                {/* <th className="text-center align-middle py-3 px-0" style={{ width: 140 }}>Remove </th> */}
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

                                                    {/* <td className="text-center align-middle  px-0"><button className='btn btn-danger' onClick={() => handleRemove(item.course_id)}><i className="fas fa-trash-alt fa-lg"></i></button></td> */}
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>



                                {/* coupan section  */}
                                <div className='row m-1 shadow border my-5 justify-content-end'>
                                    <div className='row'>
                                        <div className='col mt-4'>
                                            {!applied ? (
                                                <div className="row p-2">
                                                    {/* <label className="text-end fs-3 form-check-label-lg font-weight-normal">Promocode</label> */}
                                                    <input type="text" placeholder="ABC" className="form-control form-control-lg" value={couponCode}
                                                        onChange={(e) => setCouponCode(e.target.value)} />
                                                </div>


                                            ) : null}
                                            {!applied ? (

                                                <div className='row p-2'>

                                                    <button className=" button2addtocark" onClick={handleApplyCoupon}  >
                                                        Apply coupon
                                                    </button>
                                                </div>

                                            ) : null}
                                        </div>
                                        <div className='col mb-4 p-3'>

                                            <div className='row  border-bottom-1 p-3'>
                                                <div className='col-6  text-start'><label className="text-muted fs-4 font-weight-normal m-0">Subtotal price</label></div>
                                                <div className='col-6 text-end'><div className="text-center text-danger fs-4" style={{ fontWeight: '500' }}>${sum}</div></div>
                                            </div>
                                            <div className='row  p-3'>
                                                <div className='col-6  text-start'><label className="text-muted fs-4 font-weight-normal m-0">Discount price</label></div>
                                                <div className='col-6 text-end'><div className="text-center text-danger fs-4" style={{ fontWeight: '500' }}>${discount}</div></div>
                                            </div>
                                            <div className='row p-3 border-top-0 rounded-3'>
                                                <div className='col-6 text-start'><label className="text-muted fs-4 font-weight-normal m-0" >Total price</label></div>
                                                <div className='col-6 text-end'><div className="text-center text-danger fs-4" style={{ fontWeight: '500' }}>${getTotalPrice()}</div></div>
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
                                {applied ? (
                                    <div className="d-flex">
                                        <table className=" table  text-end mt-4 ml-5">
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
                                        <button className="btn btn-success" onClick={handleCancelCoupon}>
                                            Cancel
                                        </button>
                                    </div>
                                ) : null}



                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </LoadingOverlay>
        </div >
    )
}

export default Checkout