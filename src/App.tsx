import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  const [products, setProducts] = useState<any[]>([]); // Ensure you're using correct types
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Fetch products from API
  useEffect(() => {
    axios
      .get('http://localhost:5000/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));

    // Check if the user is authenticated on mount
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
  }, []);

  // Add product to cart, preventing duplicates
  const addToCart = (product: any) => {
    setCartItems((prevItems) => {
      if (!prevItems.some(item => item.id === product.id)) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  // Remove product from cart
  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (
    <CartProvider>
      <Router>
        <Header isAuthenticated={isAuthenticated} cartItems={cartItems} />
        
        <Routes>
          <Route path="/" element={<Home products={products} onAddToCart={addToCart} />} />
          <Route path="/products" element={<Home products={products} onAddToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
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