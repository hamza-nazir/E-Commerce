import { useState } from 'react';
import { RiMapPinLine, RiMailLine, RiPhoneLine, RiInstagramLine, RiWhatsappLine } from 'react-icons/ri';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Get In Touch</h1>
          <p className="hero-subtitle">Let's collaborate on your next project</p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="section-header">
          <span className="section-tag">Connect With Me</span>
          <h2>Contact Information</h2>
          <p className="section-description">
            Feel free to reach out through any of these channels
          </p>
        </div>

        <div className="contact-info-grid">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-image">
              <img 
              src='/images/talha-randi.jpg'
                alt="Talha Khalil"
                className="profile-img"
              />
            </div>
            <div className="profile-info">
              <h3>Talha Khalil</h3>
              <p className="profile-title">CS Student & Developer</p>
              <p className="profile-location">
                <RiMapPinLine /> Lahore Cantt, Near New Air Mazahar Lines
              </p>
              <p className="profile-education">LGU University (3rd Year)</p>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon email">
                <RiMailLine />
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>talha.khalil@example.com</p>
                <a href="mailto:talha.khalil@example.com" className="contact-link">
                  Send Message
                </a>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon whatsapp">
                <RiWhatsappLine />
              </div>
              <div className="contact-details">
                <h4>WhatsApp</h4>
                <p>+92 319 5608577</p>
                <a 
                  href="https://wa.me/923195608577" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-link"
                >
                  Chat Now
                </a>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon instagram">
                <RiInstagramLine />
              </div>
              <div className="contact-details">
                <h4>Instagram</h4>
                <p>@kaun._talha_</p>
                <a 
                  href="https://instagram.com/kaun._talha_" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-link"
                >
                  Follow Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="form-container">
          <div className="form-header">
            <h2>Send Me a Message</h2>
            <p>Have a question or want to work together? Fill out the form below.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
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
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="vision-content">
          <div className="vision-text">
            <span className="section-tag">My Vision</span>
            <h2>Building Digital Experiences</h2>
            <p>
              As a computer science student passionate about web development, I aim to create 
              solutions that blend aesthetics with functionality. My focus is on developing 
              user-centric applications that solve real-world problems while maintaining 
              elegant design principles.
            </p>
            <p>
              I believe in continuous learning and applying cutting-edge technologies to 
              deliver exceptional digital experiences.
            </p>
          </div>
          <div className="vision-image">
            <img 
            src='images/contact.avif'
              alt="Vision Illustration"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;