import { useState, useEffect } from 'react';
import { RiScissors2Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
    const owner = import.meta.env.VITE_OWNER_ID;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authUser,setAuthUser]=useState({
    username:"",
    email:"",
    ID:""
  })
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);









  useEffect(()=>{

 axios.get('http://localhost:3000/auth',{withCredentials:true})
 .then((res)=>{
  setAuthUser({
     username:res.data.currentUser.username,
    email:res.data.currentUser.email,
    ID:res.data.currentUser._id
  })
 })
.catch((err)=>{
  if(err){
    return
  }
  
})
},[])

function popFun(){
Swal.fire({
  title: 'Are you sure?',
  text: 'You will be logged out from your account!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#959ca3ff', // dark button like your `.signup-btn`
  cancelButtonColor: '#D4A373',  // gray button
  confirmButtonText: 'Yes, Logout',
  cancelButtonText: 'Cancel'
}).then((result) => {
  if (result.isConfirmed) {
    logoutFun(); 
  }
});
}

async function logoutFun(){
let response=await axios.get('http://localhost:3000/logout',{withCredentials:true})
if(response.data.success==true){
 setAuthUser({ username: "", email: "", ID: "" }); 
 
    navigate('/');
}
}
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);






  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <RiScissors2Line className="logo-icon" />
          <span className="logo-text">BESPOKE TAILOR</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <div className="nav-links">
            <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
            <Link to="/collections" className="nav-link" onClick={closeMenu}>Collections</Link>
            <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
            <Link to="/cart" className="nav-link" onClick={closeMenu}>View Cart</Link>

{
  authUser.ID==owner&&(
            <Link to="/add" className="nav-link" onClick={closeMenu}>Add Product</Link>

  )
}

         
          </div>
          


   <div className="auth-buttons">
          
 { !authUser.username&&!authUser.email&&(
  <>
 <Link to="/login" className="login-btn" onClick={closeMenu}>Login</Link>
  <Link to="/signup" className="signup-btn" onClick={closeMenu}>Sign Up</Link>
</>
 )
  }

  {
   authUser.username&&authUser.email&&(
<>
  <Link onClick={popFun}  className="signup-btn" >Logout</Link>
    <Link to='/change-password'  className="signup-btn" >Change Password</Link>
</>
  )}
 </div>


</div>

 <button 
          className={`mobile-menu-btn ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <Link to="/" className="mobile-nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/collections" className="mobile-nav-link" onClick={closeMenu}>Collections</Link>
          <Link to="/contact" className="mobile-nav-link" onClick={closeMenu}>Contact</Link>
          <Link to="/cart" className="mobile-nav-link" onClick={closeMenu}>View Cart</Link>
         
         {
  authUser.ID==owner&&(
            <Link to="/add" className="mobile-nav-link" onClick={closeMenu}>Add Product</Link>

  )
}
         
         
         
         
          <div className="mobile-auth-buttons">

 { !authUser.username&&!authUser.email&&(
  <>
 <Link to="/login" className="mobile-login-btn fs-6" onClick={closeMenu}>Login</Link>
  <Link to="/signup" className="mobile-signup-btn fs-6" onClick={closeMenu}>Sign Up</Link>
</>
)}


{ authUser.username&&authUser.email&&(
<>
<Link  className="signup-btn text-center fs-6" onClick={()=>{
  closeMenu()
  
  popFun()
}}>Logout</Link>

</>
 )}
           




          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;