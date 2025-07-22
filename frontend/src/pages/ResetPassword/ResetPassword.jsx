
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css'
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/reset-password', {
        token,
        newPassword
      });
      if (res.data.success) {
        toast.success('Password reset successful!')
     
        navigate('/login');
      } else {
          toast.error('Something went wrong')
      }
    } catch (err) {
      console.error(err);
         toast.error('Something went wrong')
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleReset} style={{marginTop:'200px'}}>
        <h2>Reset Your Password</h2>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
