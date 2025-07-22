import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Details from './pages/Details/Details';
import Error from './pages/Error/Error'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Collections from './pages/Collections/Collections';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Category from './pages/Category/Category'
import ChangePassword from './pages/ChangePassword/ChangePassword';
import AddProducts from './pages/AddProducts/AddProducts';
import Contact from './pages/Contact/Contact';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import { ToastContainer } from 'react-toastify';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ProductsDetails from './pages/ProductsDetails/ProductsDetails'
import 'react-toastify/dist/ReactToastify.css';
import Products from './pages/Products/Products';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
function App() {
  return (
      <>
        <ToastContainer position="bottom-right" autoClose={2000} />
      <Navbar/>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details" element={<Details />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/collections" element={<Collections />} />
           <Route path="/login" element={<Login />} />
          <Route path="/add" element={<AddProducts />} />
          <Route path="/contact" element={<Contact />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
             <Route path="/products" element={<Products />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
             <Route path="/products/:id" element={<ProductsDetails />} />
             <Route path="/collections/category/:category" element={<Category />} />
                  <Route path="/cart" element={<Cart />} />
                   <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Error />} />
    </Routes>

<Footer/>
      </>

  );
}

export default App;
