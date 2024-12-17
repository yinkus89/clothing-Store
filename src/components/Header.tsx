import React from "react";
import { Link } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface HeaderProps {
  cartItems: CartItem[];
  isAuthenticated: boolean;
  onLogout?: () => void; // Optional: Logout handler
}

const Header: React.FC<HeaderProps> = ({ cartItems, isAuthenticated, onLogout }) => {
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <header className="bg-gray-800 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-orange-400">
          Clothing Store
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link to="/" className="hover:text-orange-400">Home</Link>
          <Link to="/products" className="hover:text-orange-400">Products</Link>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative flex items-center hover:text-orange-400"
            aria-label="Shopping Cart"
          >
            <span className="material-icons">shopping_cart</span>
            {cartItemCount > 0 && (
              <span
                className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1"
                aria-live="polite"
              >
                {cartItemCount}
              </span>
            )}
            {cartItemCount > 0 && (
              <span className="ml-2 text-sm">${totalPrice}</span>
            )}
          </Link>

          {/* Authentication Links */}
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="hover:text-orange-400">Profile</Link>
              <button
                onClick={onLogout}
                className="hover:text-orange-400 focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/about" className="hover:text-orange-400">About Us</Link>
              <Link to="/register" className="hover:text-orange-400">Register</Link>
              <Link to="/login" className="hover:text-orange-400">Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
