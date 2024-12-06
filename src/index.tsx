import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartProvider } from './context/CartContext';
import App from './App'; // Assuming App is in the same directory

// The root element where the app will be rendered
const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <CartProvider>
    <App />
  </CartProvider>
);
