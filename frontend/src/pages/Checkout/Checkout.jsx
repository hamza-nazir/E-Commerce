import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    contact: '',
    city: '',
    address: '',
    paymentMethod: 'cashOnDelivery'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('confirmCart')) || [];
    const storedTotal = JSON.parse(localStorage.getItem('confirmTotal')) || 0;

    setCart(storedCart);
    setTotal(storedTotal);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        buyerDetails: formData,
        products: cart.map(item => ({
          productId: item.productDetails._id,
          name: item.productDetails.name,
          quantity: item.quantity,
          price: item.productDetails.price,
          subtotal: item.productDetails.price * item.quantity
        })),
        totalAmount: total,
        paymentMethod: formData.paymentMethod
      };

      const response = await axios.post('http://localhost:3000/confirmOrder', orderData, {
        withCredentials: true
      });

      if (response.data.success) {
        toast.success('ThankYou you will reciever you Order Soon');
        localStorage.removeItem('confirmCart');
        localStorage.removeItem('confirmTotal');
        localStorage.removeItem('cart');
        navigate('/');
      }
    } catch (error) {
      toast.error('Error placing order. Please try again.');
      console.error('Order submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-summary">
        <h2>Order Summary</h2>
        <div className="order-items">
          {cart.map((item, idx) => (
            <div key={idx} className="order-item">
              <img 
                src={item.productDetails.image} 
                alt={item.productDetails.name} 
                className="item-image" 
              />
              <div className="item-details">
                <h4>{item.productDetails.name}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Rs {item.productDetails.price.toFixed(2)} x {item.quantity} = Rs {(item.productDetails.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="order-total">
          <h3>Total: Rs {total.toFixed(2)}</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <h2>Shipping Information</h2>
        
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            placeholder='Minimum 13'
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="18"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact Number</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            pattern="[0-9]{11}"
            placeholder="03XXXXXXXXX"
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Peshawar">Peshawar</option>
            <option value="Quetta">Quetta</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Multan">Multan</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Gujranwala">Gujranwala</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="address">Complete Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="4"
            placeholder="House #, Street, Area, etc."
          />
        </div>

        <div className="form-group">
          <label>Payment Method</label>
          <div className="payment-options">
            <label style={{border:'1px solid #B08C5E'}} className="payment-option">
             
              Cash on Delivery
            </label>
            <label className="payment-option">
             
              Credit Card (Coming Soon)
            </label>
          </div>
        </div>

        <button type="submit" className="submit-order-btn" disabled={loading}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;