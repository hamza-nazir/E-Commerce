import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { RiShoppingCartLine } from 'react-icons/ri';
import './ProductsDetails.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Rating, Star } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Link } from 'react-router-dom';
const ProductsDetails = () => {
  const navigate = useNavigate();
  const [auth, SetAuth] = useState(false);
  const [fullUser, setFullUser] = useState();
  const [currentUser, setCurrentUser] = useState();
  const owner = import.meta.env.VITE_OWNER_ID;
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState({
    range: 0,
    comment: ""
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`, { withCredentials: true });
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:3000/auth`, { withCredentials: true })
      .then((res) => {
        if (res.data.currentUser) {
          setCurrentUser(res.data.currentUser._id);
          SetAuth(true);
        } else {
          SetAuth(false);
        }
      })
      .catch((err) => {
        SetAuth(false);
      })
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3000/auth`, { withCredentials: true })
      .then((res) => {
        setFullUser(res.data.currentUser?.username);
      })
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading product details...</div>;
  }

  function delFun(id) {
    axios.get(`http://localhost:3000/products/${id}/delete`, { withCredentials: true })
      .then((res) => {
        if (res.data.success == true) {
          toast.success('Deleted Successfully');
          navigate('/');
        }
      })
  }

  function increarseFun() {
    setQty(qty + 1);
  }

  function decreaseFun() {
    if (qty > 1) {
      setQty(qty - 1);
    }
  }

  function handleReviews(e) {
    setReviews((curr) => {
      return {
        ...curr,
        [e.target.name]: e.target.value
      }
    })
  }

  function submitReviews(productId) {
    const object = {
      reviews,
      productId,
      currentUser
    }

    axios.post('http://localhost:3000/reviews', object, { withCredentials: true })
      .then((res) => {
        if (res.data.success == true) {
          toast.success("Review Added Successfully");
          setProduct(res.data.product);
          setReviews({ range: 0, comment: "" }); // Reset form
        }
      })
      .catch((err) => {
        toast.error("Error submitting review");
      })
  }


function cartFun(){


const existingCart=JSON.parse(localStorage.getItem('cart'))||[]

const newItem={

    quantity: qty,
    productPrice:product.price*qty,
    productDetails:product
}
existingCart.push(newItem);
localStorage.setItem('cart',JSON.stringify(existingCart))
toast.success("Added to Cart")
}

  return (
    <div className="product-details-page">
      {/* Product Hero Section */}
      <section className="product-hero">
        <div className="container">
          <h1>{product.name}</h1>
          <p className="breadcrumb">Home / Products / {product.category} / {product.name}</p>
        </div>
      </section>

      {/* Product Main Content */}
      <section className="product-main container">
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        <div className="product-info">
          <h2>{product.name}</h2>
          
          <div className="price-container">
            {product.discount > 0 ? (
              <>
                <span className="original-price">${product.price.toFixed(2)}</span>
                <span className="discounted-price">${(product.price - product.discount).toFixed(2)}</span>
                <span className="discount-badge">
                  Save {Math.round((product.discount / product.price) * 100)}%
                </span>
              </>
            ) : (
              <span className="price">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="product-description">
            <p>{product.description || "No detailed description available."}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button onClick={decreaseFun}>-</button>
              <span>{qty}</span>
              <button onClick={increarseFun}>+</button>
            </div>
            <button onClick={cartFun} className="add-to-cart">
              <RiShoppingCartLine /> Add to Cart
            </button>
             <button className="add-to-cart">
              <RiShoppingCartLine /> <Link to='/cart' style={{color:'white', textDecoration:'none'}}> View Cart</Link>
            </button>
          </div>

          <div className="product-meta">
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Availability:</strong> In Stock</p>

            {owner == currentUser && (
              <button onClick={() => delFun(product._id)} className="delete-btn">Delete Product</button>
            )}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section container">
        <h2>Customer Reviews</h2>
        
        {product.reviews?.length > 0 ? (
          <div className="reviews-container">
            {product.reviews.map((item, index) => (
              <div className="review-card" key={index}>
                <div className="review-header">
                  <div className="user-info">
                    <div className="user-avatar">
                      {item.commentedBy?.username?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="user-name">{item.commentedBy?.username}</div>
                      <div className="review-date">
                        
                      </div>
                    </div>
                  </div>
                  <div className="review-rating">
                    <Rating
                      style={{ maxWidth: 100 }}
                      value={item.rating}
                      readOnly
                      itemStyles={{
                        itemShapes: Star,
                        activeFillColor: '#D3A171',
                        inactiveFillColor: '#ddd',
                      }}
                    />
                  </div>
                </div>
                <div className="review-comment">
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        )}

        {auth ? (
          <div className="add-review">
            <h3>Write a Review</h3>
            <div className="form-group">
              <label>Your Rating</label>
              <div className="rating-input">
                <Rating
                  style={{ maxWidth: 180 }}
                  value={reviews.range}
                  onChange={(e) => setReviews(curr => ({ ...curr, range: e }))}
                  itemStyles={{
                    itemShapes: Star,
                    activeFillColor: '#D3A171',
                    inactiveFillColor: '#ddd',
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Your Review</label>
              <textarea 
                value={reviews.comment} 
                name="comment" 
                onChange={handleReviews}
                placeholder="Share your thoughts about this product..."
                rows="4"
              ></textarea>
            </div>
            <button 
              onClick={() => submitReviews(product._id)} 
              className="submit-review"
              disabled={!reviews.comment || reviews.range === 0}
            >
              Submit Review
            </button>
          </div>
        ) : (
          <div className="login-prompt">
            <p>Please <a href="/login">login</a> to leave a review.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductsDetails;