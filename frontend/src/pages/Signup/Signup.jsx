import { useState } from 'react';
import './Signup.css';
import { RiScissors2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useEffect } from 'react';



const Signup = () => {
  const navigate = useNavigate();
  const [same,setSame]=useState(false)
    const  [loading,setLoading]=useState(false)
const [formData,setFormData]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
})

function handleChange(event){
setFormData((curr)=>{
    return {
          ...curr,
    [event.target.name]:event.target.value
    }
  
})
}

async function submitFun(e){
    setLoading(true)
e.preventDefault();
let response=await axios.post('http://localhost:3000/signup',formData,{withCredentials:true})
if(response.data.success==true){
let response= await axios.post('http://localhost:3000/nodemailer',formData,{withCredentials:true})
if(response.data.success){
 window.location.href='/'
}
   
}else{
    toast.error("Email or Username Already Exist")
}
setLoading(false)
}

useEffect(()=>{
  if(formData.password===formData.confirmPassword){
setSame(true);

  }else{
    setSame(false);

  }

},[formData.password,formData.confirmPassword])



  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <RiScissors2Line className="signup-logo" />
          <h1 className="signup-title">Create Your Account</h1>
          <p className="signup-subtitle">Join our community of discerning clients</p>
        </div>

        <form onSubmit={submitFun} noValidate className="signup-form needs-validation">
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Username</label>
            <input 
              type="text" 
              id="fullName"
              required='true' 
              className="form-input"
              onChange={handleChange}
              name='username'
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input 
              type="email" 
              id="email" 
              onChange={handleChange}
              className="form-input"
              name='email'
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              id="password" 
              name='password'
              onChange={handleChange}
              className="form-input"
              placeholder="Create a password"
            />
            <p className="password-hint">At least 8 characters with one number</p>
            
          </div>


     <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name='confirmPassword'
              onChange={handleChange}
              className="form-input"
              placeholder="Confirm password"
            />
            {
              formData.password&&formData.confirmPassword&&(
                <>
                   <p className="password-hint">{same==true?"Nice, you are good too go!!!":"Passwords not match"}</p>
                </>
              )
            }
         

          </div>


          <button disabled={!same} type="submit" className="signup-button">
            {loading?"Creating Account...":"Create Account"}
          </button>

          <div className="signup-footer">
            <p className="login-text">
              Already have an account? <Link to="/login" className="login-link">Log in</Link>
            </p>
            <p className="terms-text">
              By signing up, you agree to our <Link to="/terms" className="terms-link">Terms</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;