import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, } from 'react-router-dom';
import { removeFromCart } from '../../redux/cartSlice';
import { selectCartItems } from '../../redux/cartSlice';
import http from "../../utils/http-client";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AddToCart = () => {


  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const navigate = useNavigate();
  const [applied, setApplied] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const cartItems = useSelector(selectCartItems);
  console.log(cartItems);
  // console.log();
  const dispatch = useDispatch();

  const handleRemove = (itemId, itemName) => {
    dispatch(removeFromCart(itemId));
    // Show toast message using react-hot-toast
    toast.error(`"${itemName}" has been removed from the cart!`, {
      duration: 6000,
      style: {
        fontSize: '16px',
        whiteSpace: 'pre-line', // Enables multiline
      },
    });
  };

  const handleApplyCoupon = async () => {
    // try{
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
    // }
    // catch(error){
    //   console.error('Error updating category:', error);
    //   res.status(502).json({ error: 'Internal Server Error' });
    // }
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
    console.log(discount, 'discount-price')

    const discountedPrice = totalPrice - parseInt(discount);
    return discountedPrice >= 0 ? discountedPrice : 0;

  };

  console.log(getTotalPrice)

  const ItemComponent = ({ itemName, itemPrice }) => (
    <table className='table '>
      <tbody>
        <tr>
          <td className='col  border-0 fs-5 text-start'>{itemName}</td>
          <td className='col  border-0 text-primary fs-5 text-end'>${itemPrice}</td>
        </tr>
      </tbody>
    </table>
  );



  return (
    <>
      <section className="WaveHeaderBox">
        <div className='row  faq-heads'>
          <div className='row faq-headers p-5 mt-5'>
            <div className='col-md-12 faq mains '>
              <h1 className="mt-5  text-white" style={{ fontSize: "80px", marginBottom: "5px", fontWeight: '500' }}>Cart</h1>
              <Link to='/' className='text-white'><i class="fa-solid fa-house" style={{ "color": "#719dea;" }}></i> CuService - Cart</Link>
            </div>
          </div>
          <div className='wave wave1'></div>
          <div className='wave wave5'></div>
        </div>
      </section >




      {cartItems?.length ?
        (
          <div className="container-fluid px-5 my-5 clearfix ">

            <div className='row'>
              <div className="table-responsive">
                <table className="table table-striped table-bordered m-0" >
                  <thead className='fs-6' style={{ background: '#FFAA33', borderRadius: '10px', borderBottom: '2px solid #ff9b24' }}>
                    <tr>
                      {/* Set columns width */}
                      <th className="text-center fs-4 " style={{ minWidth: 220 }}>Product Name </th>
                      <th className="text-center fs-4" style={{ minWidth: 500 }}>Selling option</th>
                      <th className="text-right fs-4 " style={{ width: 120 }}>Price</th>
                      {/* <th className="text-center py-3 px-4" style={{ width: 120 }}>Quantity</th> */}
                      {/* <th className="text-right py-3 px-4" style={{ width: 120 }}>Total</th> */}
                      <th className="text-center fs-4 align-middle py-3 px-0" style={{ width: 170 }}>Remove</th>
                    </tr>
                  </thead>
                  {cartItems?.map((item) => (
                    <tbody key={item.id}>
                      <tr>

                        <td className="p-4" >
                          <div className="media align-items-center">
                            <div className="media-body">
                              <Link to={`/Course_Detail/${item.course_id}`} onClick={() => {
                                setSelectedCourseId(item.course_id); navigate(`/Course_Detail/${item.course_id}`);
                              }} className="d-block fs-5 fw-4 ">{item?.course_title}</Link>
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

                        <td className="text-center align-middle  px-0"><button className='btn ' onClick={() => handleRemove(item.course_id, item.course_title)}><i class="fa-solid fa-xmark fa-3x"></i></button></td>
                      </tr>

                    </tbody>

                  ))}
                </table>
              </div>
            </div>


            <div className='row mt-5'>
              {/* / Shopping cart table */}
              <div className="d-flex flex-wrap  flex-column justify-content-center align-items-end pb-4">
                <div className='row'>
                  <h3 className='mb-3'>Cart Total</h3>
                  <div className='row border p-3 rounded-3'>
                    <div className='col-6  text-start'><label className="text-muted fs-4 font-weight-normal m-0">Subtotal price</label></div>
                    <div className='col-6 text-end'><div className="text-center text-danger fs-4" style={{ fontWeight: '500' }}>${sum}</div></div>
                  </div>
                  <div className='row border p-3 border-top-0 rounded-3'>
                    <div className='col-6 text-start'><label className="text-muted fs-4 font-weight-normal m-0" >Total price</label></div>
                    <div className='col-6 text-end'><div className="text-center text-danger fs-4" style={{ fontWeight: '500' }}>${sum}</div></div>
                  </div>
                </div>
                {/* coupan section  */}
              </div>
              <div className="d-flex flex-wrap justify-content-between">
                <div className='row  p-3 text-center '>
                  <Link to='/course' className="button2addtocark"> <i className="fas fa-arrow-left"></i>&emsp; Back to shopping</Link>
                </div>
                <div className='row p-3 text-center'>
                  <Link to='/Checkout' className=" button2addtocark" ><i className="fas fa-money-check-alt"></i>&emsp; Proceed to Checkout</Link>
                </div>
              </div>
            </div>

          </div>
        ) : (
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
        )}
    </>
  );
};

export default AddToCart;




