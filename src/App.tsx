import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './Pages/Home';
import Header from './components/Header';
import ProductPage from './Pages/ProductPage';
import LoginPage from './Pages/LoginPage';
import CartPage from './Pages/CartPage';
import Footer from './components/Footer';
import AboutUsPage from './components/AboutUs';
import RegisterPage from './Pages/RegisterPage';
import NotFoundPage from './Pages/NotFoundPage'; 
import { CartProvider } from './context/CartContext';
import ConfirmationPage from './Pages/ConfirmationPage';
import './index.css';

const App: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]); // State for products
  const [cart, setCart] = useState<any[]>([]); // State for cart items
  const [showMessage, setShowMessage] = useState<boolean>(false); // State for showing item added message

  // Fetch products from API
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Handle adding products to cart
  const handleAddToCart = (product: any) => {
    setCart([...cart, product]);
    setShowMessage(true); // Show the "Item added" message
    setTimeout(() => setShowMessage(false), 3000); // Hide the message after 3 seconds
  };

  // Handle removing products from cart
  const handleRemoveItem = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  return (
    <CartProvider>
      <Router>
        {/* Pass cartItems to Header to display cart count */}
        <Header cartItems={cart} />
        
        {/* Display the message when an item is added to the cart */}
        {showMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full shadow-lg">
            Item added to cart!
          </div>
        )}
        
        <Routes>
          {/* Home page - Pass products and onAddToCart function to Home component */}
          <Route path="/" element={<Home products={products} onAddToCart={handleAddToCart} />} />
          
          {/* Other routes */}
          <Route path="/products" element={<Home products={products} onAddToCart={handleAddToCart} />} />
          <Route path="/product/:id" element={<ProductPage products={products} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage cartItems={cart} removeItem={handleRemoveItem} />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
