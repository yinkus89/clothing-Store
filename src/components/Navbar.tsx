import React from 'react';
import { Link } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number; // Quantity of the item
}

interface NavbarProps {
  cartItems: CartItem[];
}

const Navbar: React.FC<NavbarProps> = ({ cartItems }) => {
  // Calculate total items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price of items in cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-gray-400">Home</Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-gray-400">Login</Link>
        </li>
        <li>
          <Link to="/cart" className="relative flex items-center">
            <span className="material-icons">shopping_cart</span> {/* Cart Icon */}
            
            {/* Cart Item Count */}
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {cartItemCount}
              </span>
            )}
            
            {/* Optional: Display total price */}
            {cartItemCount > 0 && (
              <span className="ml-2 text-sm">${totalPrice}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
