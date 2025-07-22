import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RiShoppingBagLine, RiStarFill } from 'react-icons/ri';
import './Category.css';
import { Link } from 'react-router-dom';
const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/collections/category/${category}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="category-page">
      {/* Hero Section */}
      <section className="category-hero">
        <div className="hero-content">
          <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Collection</h1>
          <p className="hero-subtitle">Premium quality for your lifestyle</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-container">
        <div className="section-header">
          <span className="section-tag">Featured Collection</span>
          <h2>Our {category} Selection</h2>
          <p className="section-description">
            Carefully curated items that combine style and comfort
          </p>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                <Link to={`/products/${product._id}`} className="product-link">
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-image" 
                    />
                    {product.discount > 0 && (
                      <div className="discount-badge">
                        {Math.round((product.discount / product.price) * 100)}% OFF
                      </div>
                    )}
                    <button className="quick-view-btn">
                      <RiShoppingBagLine /> Quick View
                    </button>
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    
                    <div className="price-container">
                      {product.discount > 0 ? (
                        <>
                          <span className="original-price">${product.price.toFixed(2)}</span>
                          <span className="discounted-price">
                            ${(product.price - product.discount).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="normal-price">Rs {product.price.toFixed(2)}</span>
                      )}
                    </div>
                 
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Category;