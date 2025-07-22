import './Login.css';
import { RiScissors2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
  const  [loading,setLoading]=useState(false)
  const [formData,setFormData]=useState({
      username:"",
      password:""
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
try{
await axios.post('http://localhost:3000/login',formData,{withCredentials:true});

 window.location.href = '/';

}catch(err){

   toast.error("Invalid Username or Password")
}finally{
    setLoading(false)
}

}

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <RiScissors2Line className="login-logo" />
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your Bespoke Tailor account</p>
        </div>

        <form onSubmit={submitFun} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input 
              type="username" 
              id="username" 
              name="username"
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your username"

            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              name="password"
              onChange={handleChange}
              id="password" 
              className="form-input"
              placeholder="Enter your password"
            />
      
          </div>

          <button  disabled={loading==true} type="submit" className="login-button">
            {loading?'Signin in...':'Sign in'}
          </button>

          <div className="login-footer">
            <p className="signup-text">
              Don't have an account? <Link to="/signup" className="signup-link">Create one</Link>
            </p>
              <p className="signup-text">
              Forget Password? <Link to="/forgot-password" className="signup-link">Reset from here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;