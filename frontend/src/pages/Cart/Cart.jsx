import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiShoppingBag } from 'react-icons/fi';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(existingCart);
    calculateTotal(existingCart);
  }, []);

  const calculateTotal = (cartItems) => {
    const sum = cartItems.reduce((acc, item) => {
      return acc + (item.productDetails.price * item.quantity);
    }, 0);
    setTotal(sum);
  };

  const removeCartItem = (indexToRemove) => {
    const updatedCart = cart.filter((item, index) => index !== indexToRemove);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
    toast.success('Item removed from cart');
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };
const handleCheckout = () => {
  localStorage.setItem('confirmCart', JSON.stringify(cart));
  localStorage.setItem('confirmTotal', JSON.stringify(total));
};
  if (cart.length === 0) {
    return (
      <div className="cart-empty-state">
        <div className="cart-empty-container">
          <div className="cart-empty-content">
            <FiShoppingBag size={60} className="cart-empty-icon" />
            <h2 className="cart-empty-title">Your cart is empty</h2>
            <p className="cart-empty-message">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/" className="cart-continue-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      {/* Cart Hero Section */}

      <section className="cart-hero-section">
        <div className="cart-hero-container">
          <h1 className="cart-hero-title">Your Shopping Cart</h1>
          <p className="cart-breadcrumb">Home / Cart</p>
        </div>
      </section>

      <section className="cart-main-container">
        <div className="cart-items-wrapper">
          <div className="cart-items-header">
            <h3 className="cart-header-item">Product</h3>
            <h3 className="cart-header-price">Price</h3>
            <h3 className="cart-header-qty">Quantity</h3>
            <h3 className="cart-header-subtotal">Subtotal</h3>
            <h3 className="cart-header-action">Action</h3>
          </div>

          {cart.map((item, index) => (
            <div className="cart-item-card" key={index}>
              <div className="cart-item-info">
                <img 
                  src={item.productDetails.image} 
                  alt={item.productDetails.name} 
                  className="cart-item-img" 
                />
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.productDetails.name}</h4>
                  <p className="cart-item-category">{item.productDetails.category}</p>
                </div>
              </div>
              
              <div className="cart-item-price">
                Rs {item.productDetails.price.toFixed(2)}
              </div>
              
              <div className="cart-qty-selector">
                <button 
                  className="cart-qty-decrement"
                  onClick={() => updateQuantity(index, item.quantity - 1)}
                >
                  -
                </button>
                <span className="cart-qty-value">{item.quantity}</span>
                <button 
                  className="cart-qty-increment"
                  onClick={() => updateQuantity(index, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              
              <div className="cart-item-subtotal">
                Rs {(item.productDetails.price * item.quantity).toFixed(2)}
              </div>
              
              <button 
                onClick={() => removeCartItem(index)} 
                className="cart-remove-btn"
              >
                <RiDeleteBin6Line className="cart-remove-icon" />
              </button>
                    
            </div>
          ))}
        </div>

        <div className="cart-summary-box">
          <h3 className="cart-summary-title">Cart Summary</h3>
          <div className="cart-summary-details">
            <div className="cart-summary-row">
              <span className="cart-summary-label">Subtotal</span>
              <span className="cart-summary-value">Rs {total.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span className="cart-summary-label">Shipping</span>
              <span className="cart-summary-value">Free</span>
            </div>
            <div className="cart-summary-total">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-value">Rs {total.toFixed(2)}</span>
            </div>
          </div>
     
        
          <Link to="/checkout" className="cart-checkout-btn" onClick={handleCheckout}>
            Confirm Order
          </Link>
         
          <Link to="/" className="cart-continue-btn">
            Continue Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Cart;