import { RiLockPasswordLine } from 'react-icons/ri';
import './ChangePassword.css';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'
const ChangePassword = () => {
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false)
    const [passwordMatch,setPasswordMatch]=useState(false)
    const [formData,setFormData]=useState({
        currentPassword:"",
        newPassword:"",
        confirmPassword:"",
    })


function hanldeFun(e){
setFormData((curr)=>{
    return{
        ...curr,
        [e.target.name]:e.target.value,
    }
})
}



useEffect(()=>{
if(formData.newPassword===formData.confirmPassword){
    setPasswordMatch(true)
}else{
      setPasswordMatch(false) 
}
}, [formData.newPassword, formData.confirmPassword]);

async function submitFun(e){
    setLoading(true);
e.preventDefault();


let response=await axios.post('http://localhost:3000/change-password',{formData},{withCredentials:true});
if(response.data.success==true){
    toast.success("Password Change Successfully")
    navigate('/')
}else{
    setLoading(false);
    toast.error("Old Password is Incorrect") 
}
}
  return (
    <div className="static-change-password">
      <div className="password-card">
        <div className="password-header">
          <RiLockPasswordLine className="password-icon" />
          <h2>Change Password</h2>
          <p>Update your account password</p>
        </div>

        <form onSubmit={submitFun} className="password-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
            onChange={hanldeFun}
              type="password"
              id="currentPassword"
              name="currentPassword"
              placeholder="Enter current password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
                 onChange={hanldeFun}
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
            />
            <div className="password-hint">
              Password must be at least 8 characters
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
                 onChange={hanldeFun}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new password"
            />
          </div>

    {formData.newPassword && formData.confirmPassword && (
  <p className='password-hint' >
    {passwordMatch ? 'Passwords match' : 'Passwords do not match'}
  </p>
)}

          <button type="submit" className="submit-btn" disabled={!passwordMatch}>
         
           {loading?"Updating Password...":'Update Password'}
         
          </button>
        </form>

        <div className="password-footer">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;