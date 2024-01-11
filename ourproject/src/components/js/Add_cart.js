import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '../../redux/cartSlice';

const AddToCart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
   <>
      <div className="container px-3 my-5 clearfix">
        {/* Shopping cart table */}
        <div className="card">
          <div className="card-header">
            <h3>Shopping Cart</h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered m-0">
                <thead>
                  <tr>
                    {/* Set columns width */}
                    <th className="text-center py-3 px-4" style={{ minWidth: 300 }}>Product Name &amp; Details</th>
                    <th className="text-right py-3 px-4" style={{ width: 100 }}>Price</th>
                    <th className="text-center py-3 px-4" style={{ width: 120 }}>Quantity</th>
                    <th className="text-right py-3 px-4" style={{ width: 100 }}>Total</th>
                    <th className="text-center align-middle py-3 px-0" style={{ width: 40 }}><a href="#" className="shop-tooltip float-none text-light" title data-original-title="Clear cart"><i className="ino ion-md-trash" /></a></th>
                  </tr>
                </thead>
                {cartItems.map((item) => (
                  <tbody key={item.id}>
                    <tr>
                      <td className="p-4">
                        <div className="media align-items-center">
                          <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="d-block ui-w-40 ui-bordered mr-4" alt />
                          <div className="media-body">
                            <a href="#" className="d-block text-dark">{item.title}</a>
                            <small>
                              <span className="text-muted">Color:</span>
                              <span className="ui-product-color ui-product-color-sm align-text-bottom" style={{ background: '#e81e2c' }} /> &nbsp;
                              <span className="text-muted">Size: </span> EU 37 &nbsp;
                              <span className="text-muted">Ships from: </span> China
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-right font-weight-semibold align-middle p-4">{item.price}</td>
                      <td className="align-middle d-flex p-4">
                        <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                        <input type="text" className="form-control text-center" value={item.quantity} />
                        <button onClick={() => handleDecreaseQuantity(item.id)}>-</button></td>
                      <td className="text-right font-weight-semibold align-middle p-4"> ${item.price * item.quantity}</td>
                      <td className="text-center align-middle px-0"><button onClick={() => handleRemove(item.id)}>Remove</button>X</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
            {/* / Shopping cart table */}
            <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
              <div className="mt-4">
                <label className="text-muted font-weight-normal">Promocode</label>
                <input type="text" placeholder="ABC" className="form-control" />
              </div>
              <div className="d-flex ">
                <div className="text-end mt-4 ml-5">
                  <label className="text-muted font-weight-normal m-0">Discount</label>
                  <div className="text-large"><strong>$20</strong></div>
                </div>
                <div className="text-end mt-4">
                  <label className="text-muted font-weight-normal m-0">Total price</label>
                  <div className="text-large"><strong>${getTotalPrice()}</strong></div>
                </div>
              </div>
            </div>
            <div className="float-end">
              <button type="button" className="btn btn-lg btn-default md-btn-flat mt-2 mr-3">Back to shopping</button>
              <button type="button" className="btn btn-lg btn-primary mt-2">Checkout</button>
            </div>
          </div>
        </div>
      </div>
   </>
  );
};

export default AddToCart;




