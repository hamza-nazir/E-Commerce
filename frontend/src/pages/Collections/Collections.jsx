import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Collections.css';

const Collections = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="collections-page">
      {/* Hero Section with reliable image */}
      <section className="collections-hero">
        <div className="hero-image-container">
          <img 
            src="/images/photo-1.avif"
            alt="Bespoke Tailoring Background"
            className="hero-background-image"
            loading="eager"
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Bespoke Tailoring Collections</h1>
          <p className="hero-subtitle">Crafting timeless elegance since 1985</p>

       

        </div>
      </section>

      {/* Collection Categories */}
      <section className="collection-categories">
        <div className="section-header">
          <span className="section-tag">Our Offerings</span>
          <h2>Masterfully Tailored Collections</h2>
          <p className="section-description">
            Each piece reflects our commitment to precision and luxury
          </p>
        </div>

        <div className="category-grid">
          <Link to="/collections/category/Male" className="category-card">
            <div className="category-image">
              <img
                      className='img-vor'
                 src="/images/male-model.jpg" 
                alt="Premium Suits Collection"
                loading="lazy"
              />
              <div className="category-overlay"></div>
            </div>
            <div className="category-info">
              <span className="category-number">01</span>
              <h3>Male Collections</h3>
              <p>Hand-stitched perfection for the modern gentleman</p>
              <span className="view-collection">Explore Collection</span>
            </div>
          </Link>

          <Link to="/collections/category/Female" className="category-card">
            <div className="category-image">
              <img 
                    className='img-vor'
                src="/images/female-model.jpg" 
                alt="ladies Collection"
                loading="lazy"
              />
              <div className="category-overlay"></div>
            </div>
            <div className="category-info">
              <span className="category-number">02</span>
              <h3>Female Collections</h3>
              <p>Premium fabrics with unparalleled comfort</p>
              <span className="view-collection">Explore Collection</span>
            </div>
          </Link>

          <Link to="/collections/category/Kids" className="category-card">
            <div className="category-image">
              <img 
              className='img-vor'
               src="/images/kids-model.jpg" 

                alt="Tailored Accessories"
                loading="lazy"
              />
              <div className="category-overlay"></div>
            </div>
            <div className="category-info">
              <span className="category-number">03</span>
              <h3>Kids Collection</h3>
              <p>The perfect finishing touches for your ensemble</p>
              <span className="view-collection">Explore Collection</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="featured-collection">
        <div className="featured-content">
          <div className="featured-text">
            <span className="featured-tag">New Arrivals</span>
            <h2>Spring/Summer 2025 Collection</h2>
            <p className="featured-description">
              Experience our latest seasonal designs featuring lightweight Italian wools and innovative breathable fabrics, perfect for warmer weather while maintaining impeccable structure.
            </p>
            <div className="featured-stats">
              <div className="stat-item">
                <span className="stat-number">150+</span>
                <span className="stat-label">New Pieces</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">Exclusive Fabrics</span>
              </div>
            </div>
            <Link to="/products" className="cta-button">
              Browse All
            </Link>
          </div>
          <div className="featured-image">
            <img 
                src="/images/photo-5.avif" 

              alt="Spring Summer Collection"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="collections-testimonials">
        <div className="section-header">
          <span className="section-tag">Client Voices</span>
          <h2>Experiences That Speak Volumes</h2>
          <p className="section-description">
            Don't just take our word for it - hear from our distinguished clients
          </p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <div className="testimonial-text">
              "The attention to detail in my bespoke suit is extraordinary. I've received countless compliments at every board meeting this quarter."
            </div>
            <div className="client-info">
              <img 
                src="/images/photo-6.jpg" 

                alt="James Wilson" 
                className="client-avatar"
              />
              <div className="client-details">
                <div className="client-name">James Wilson</div>
                <div className="client-title">CEO, Fortitude Capital</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <div className="testimonial-text">
              "As someone who travels constantly, the wrinkle-resistant fabrics and perfect fit have revolutionized my professional wardrobe."
            </div>
            <div className="client-info">
              <img 
                    src="/images/photo-8.jpg" 
                alt="Michael Chen" 
                className="client-avatar"
              />
              <div className="client-details">
                <div className="client-name">Michael Chen</div>
                <div className="client-title">Founder, TechNova</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="collections-cta">
        <div className="cta-content">
          <h2>Ready for Your Bespoke Experience?</h2>
          <p>Schedule a consultation with our master tailors today</p>
          <Link  className="cta-button secondary">
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Collections;