import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, } from 'react-router-dom';
import { removeFromCart } from '../../redux/cartSlice';
import { selectCartItems } from '../../redux/cartSlice';
import http from "../../utils/http-client";
import { useNavigate } from 'react-router-dom';



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
    console.log(discount, 'discount-price')

    const discountedPrice = totalPrice - parseInt(discount);
    return discountedPrice >= 0 ? discountedPrice : 0;

  };

  console.log(getTotalPrice)

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


      <div className="container px-3 my-5 clearfix ">
        {/* Shopping cart table */}
        <div className="card shadow">
          <div className="card-header">
            <h3>Shopping Cart</h3>
          </div>
          <div className="card-body p-5">
            <div className="table-responsive">
              <table className="table table-bordered m-0" >
                <thead className='  fs-6' style={{ background: '#FFAA33', borderRadius: '10px' }}>
                  <tr>
                    {/* Set columns width */}
                    <th className="text-center fs-4 py-3 px-4" style={{ minWidth: 250 }}>Product Name </th>
                    <th className="text-center fs-4 py-3 px-4" style={{ minWidth: 300 }}>Selling option</th>
                    <th className="text-right fs-4 py-3 px-4" style={{ width: 120 }}>Price</th>
                    {/* <th className="text-center py-3 px-4" style={{ width: 120 }}>Quantity</th> */}
                    {/* <th className="text-right py-3 px-4" style={{ width: 120 }}>Total</th> */}
                    <th className="text-center fs-4 align-middle py-3 px-0" style={{ width: 170 }}>Remove</th>
                  </tr>
                </thead>
                {cartItems?.map((item) => (
                  <tbody key={item.id}>
                    <tr>
                      <td className="p-4">
                        <div className="media align-items-center">
                          {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="d-block ui-w-40 ui-bordered mr-4" alt /> */}
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
                      {/* <td className="align-middle  d-flex p-4">
                        <button onClick={() => handleIncreaseQuantity(item?.course_id)}>+</button>
                        <input type="text" className="form-control text-center" placeholder={item?.qty} value={item?.qty} />
                        <button onClick={() => handleDecreaseQuantity(item?.course_id)}>-</button></td>
                      <td className="text-right fs-4 font-weight-semibold align-middle p-4"> ${item.totalPrice * item.qty}  </td> */}
                      <td className="text-center align-middle  px-0"><button className='btn btn-danger' onClick={() => handleRemove(item.course_id)}><i className="fas fa-trash-alt fa-lg"></i></button></td>
                    </tr>

                  </tbody>

                ))}
              </table>
            </div>
            {/* / Shopping cart table */}
            <div className="d-flex flex-wrap justify-content-end align-items-center pb-4">
              <div className='d-flex'>
                <table className='table border border-success rounded-4  mt-4 table-success'>
                  <tr>
                    <td><label className="text-muted fs-4 font-weight-normal m-0" style={{ width: 140 }}>Total price</label></td>
                    <td><div className="text-center  fs-4" style={{ width: 140, fontWeight: '500' }}>${sum}</div></td>
                  </tr>
                </table>
              </div>

              {/* coupan section  */}


            </div>
            <div className=" d-flex justify-content-between ">
              <div className='row shadow text-center   p-3' style={{ width: 300, background: '#66b2b2', borderRadius: '8px' }}>
                <Link to='/course' className="text-white fs-5"> <i className="fas fa-arrow-left"></i>  &emsp; Back to shopping</Link>
              </div>

              <div className='row p-3 text-center  shadow' style={{ width: 300, background: '#FFAC1C', borderRadius: '8px' }}>
                <Link to='/Checkout' className=" text-white fs-5" > <i className="fas fa-money-check-alt"></i> &emsp;Checkout</Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToCart;




