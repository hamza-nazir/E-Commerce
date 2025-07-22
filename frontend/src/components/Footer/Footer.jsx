import { useState } from 'react';
import './Footer.css';
import { FaInstagram, FaTwitter, FaPinterest, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
const[email,setEmail]=useState('')
  function handleFun(e){
    setEmail(e.target.value);
  }
function submit(){
  console.log(email);
}

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <h3 className="footer-logo">
              <span>TAILOR</span>
              <span className="logo-symbol">✂</span>
            </h3>
            <p className="footer-tagline">
              Crafting exceptional garments with precision and passion since 2010.
            </p>
            <div className="social-links">
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaPinterest /></a>
              <a href="#"><FaEnvelope /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Collections</a></li>
              <li><a href="#">Custom Tailoring</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><a href="#">Bespoke Suiting</a></li>
              <li><a href="#">Shirt Making</a></li>
              <li><a href="#">Alterations</a></li>
              <li><a href="#">Fabric Selection</a></li>
              <li><a href="#">Virtual Consultations</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-column">
            <h4 className="footer-heading">Stay Updated</h4>
            <p className="footer-newsletter-text">
              Subscribe to receive our latest collections and exclusive offers.
            </p>
            <div className="newsletter-form">
              <input onChange={handleFun} type="email" placeholder="Your email address" />
              <button onClick={submit}>Subscribe</button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} Tailor. All rights reserved.
          </div>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;