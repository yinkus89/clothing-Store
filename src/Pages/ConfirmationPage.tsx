import React from 'react';

const ConfirmationPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-green-600 mb-4">Order Confirmed!</h2>
      <p className="text-xl text-gray-700">
        Thank you for your purchase. Your order has been successfully placed, and you'll receive a confirmation email soon.
      </p>
    </div>
  );
};

export default ConfirmationPage;
