import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
}

interface CartPageProps {
  cartItems: CartItem[];
  removeItem: (productId: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, removeItem }) => {
  const navigate = useNavigate(); // Initialize the navigate function from react-router-dom

  // Form state for checkout
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const isFormValid =
    shippingAddress.name &&
    shippingAddress.street &&
    shippingAddress.city &&
    shippingAddress.state &&
    shippingAddress.country &&
    paymentMethod &&
    (paymentMethod !== 'credit-card' ||
      (paymentDetails.cardNumber &&
        paymentDetails.expDate &&
        paymentDetails.cvv));

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // After successful form submission, navigate to the confirmation page
    if (isFormValid) {
      navigate('/confirmation');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-gray-100 p-8 shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Checkout</h2>

      {/* Shipping Address Fields */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          type="text"
          value={shippingAddress.name}
          onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Street Address</label>
        <input
          type="text"
          value={shippingAddress.street}
          onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">City</label>
        <input
          type="text"
          value={shippingAddress.city}
          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">State</label>
        <input
          type="text"
          value={shippingAddress.state}
          onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Country</label>
        <input
          type="text"
          value={shippingAddress.country}
          onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Payment Method</option>
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      {/* Payment Details for Credit Card */}
      {paymentMethod === 'credit-card' && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
            <input
              type="text"
              value={paymentDetails.cardNumber}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Expiration Date</label>
            <input
              type="text"
              value={paymentDetails.expDate}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, expDate: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">CVV</label>
            <input
              type="text"
              value={paymentDetails.cvv}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </>
      )}

      {/* Cart Items */}
      <div className="my-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Cart</h3>
        {cartItems.length > 0 ? (
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded">
                <span>
                  {item.name} - ${item.price}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Your cart is empty</p>
        )}

        {/* Cart Total */}
        <div className="mt-4 flex justify-between items-center font-semibold text-lg">
          <span>Total:</span>
          <span>${totalAmount}</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={!isFormValid}
      >
        Submit Order
      </button>
    </form>
  );
};

export default CartPage;
