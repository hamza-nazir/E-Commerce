import { RiMailLine, RiArrowRightLine } from 'react-icons/ri';
import './ForgotPassword.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
const ForgotPassword = () => {
  const [loading,setLoading]=useState(false)
const [email,setEmail]=useState("")
    function handleChange(e){
setEmail(e.target.value)
    }

function submit(e) {
  setLoading(true)
  e.preventDefault();

  axios.post('http://localhost:3000/forgot-password', { email })
    .then(res => {
      if (res.data.success) {
         setLoading(false)
        toast.success('Reset link sent to your email')
        
      } else {
        toast.error(res.data.message)
          setLoading(false)
      }
    })
    .catch(err => {
       toast.error('Something went wrong')
      setLoading(false)
    });
}

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="password-reset-icon">
          <RiMailLine />
        </div>
        
        <h2>Forgot Your Password?</h2>
        <p className="instruction-text">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        <form onSubmit={submit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              onChange={handleChange}
              id="email"
              name="email"
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <button type="submit" disabled={loading} className="submit-button">
            {loading==true?"Sending Link....":"Send Reset Link" }
            
           
          </button>
        </form>
        
        <p className="back-to-login">
          Remember your password? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;