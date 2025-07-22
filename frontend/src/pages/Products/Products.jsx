import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiStarFill, RiShoppingBagLine } from 'react-icons/ri';
import './Products.css';

const Products = () => {

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/getData')
      .then((res) => {
        setAllData(res.data);

      });
  }, []);

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="hero-content">
          <h1>Our Premium Collection</h1>
          <p className="hero-subtitle">Handcrafted excellence for the discerning customer</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-container">
        <div className="section-header">
          <span className="section-tag">Featured Products</span>
          <h2>Discover Our Range</h2>
          <p className="section-description">
            Each piece reflects our commitment to quality and craftsmanship
          </p>
        </div>

        <div className="products-grid">
          {allData.map((item) => (
            <Link to={`/products/${item._id}`} className="product-card" key={item._id}>
              <div className="product-image-container">
                <img src={item.image} alt={item.name} className="product-image" />
                {item.discount !== 0 && (
                  <div className="discount-badge">
                    {Math.round((item.discount / item.price) * 100)}% OFF
                  </div>
                )}
                <button className="quick-view-btn">
                  <RiShoppingBagLine /> Quick View
                </button>
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{item.name}</h3>
                <p className="product-description">{item.description}</p>
                
                <div className="price-container">
                  {item.discount !== 0 ? (
                    <>
                      <span className="original-price">Rs-{item.price}</span>
                      <span className="discounted-price">Rs {(item.price - item.discount)}</span>
                    </>
                  ) : (
                    <span className="normal-price">Rs {item.price.toFixed(2)}</span>
                  )}

                </div>
                
            
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products;