// src/pages/AboutUsPage.tsx
import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">About Us</h1>
      <p className="text-lg text-gray-700 mb-6">
        Welcome to <span className="font-semibold text-blue-600">[Your Store Name]</span>, your one-stop shop for high-quality products at affordable prices. Our mission is to provide customers with a seamless and enjoyable shopping experience.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
      <p className="text-lg text-gray-700 mb-6">
        Founded in [Year], [Your Store Name] was born out of a desire to offer top-notch products and exceptional customer service. We started as a small business with a dream to make online shopping easier and more accessible. Today, we're proud to serve customers across the country and around the world.
      </p>
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
      <p className="text-lg text-gray-700 mb-6">
        Our mission is simple: to offer the best products at the best prices, while providing outstanding customer support. Whether you're shopping for electronics, fashion, home goods, or more, we want to be your trusted partner for all your online shopping needs.
      </p>
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Sets Us Apart</h2>
      <ul className="list-disc pl-6 text-lg text-gray-700 mb-6 space-y-4">
        <li><strong>Quality Products:</strong> We handpick each product to ensure it's of the highest quality, meeting the needs of our customers.</li>
        <li><strong>Fast Shipping:</strong> We offer fast and reliable shipping, so your orders arrive quickly and safely at your doorstep.</li>
        <li><strong>Customer Satisfaction:</strong> Our dedicated support team is here to help you with any questions or concerns, ensuring a smooth shopping experience from start to finish.</li>
        <li><strong>Affordable Prices:</strong> We believe that quality should be affordable, and we strive to offer competitive prices on every product we sell.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meet the Team</h2>
      <p className="text-lg text-gray-700 mb-6">
        Behind <span className="font-semibold text-blue-600">[Your Store Name]</span> is a passionate team dedicated to making online shopping better for everyone. From curating our product selection to ensuring timely deliveries, we're here to serve you!
      </p>
      <ul className="list-none space-y-2 text-lg text-gray-700 mb-6">
        <li><strong>Jane Doe</strong> - Founder & CEO</li>
        <li><strong>John Smith</strong> - Head of Operations</li>
        <li><strong>Mary Johnson</strong> - Customer Support Lead</li>
        <li><strong>David Lee</strong> - Marketing Director</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
      <p className="text-lg text-gray-700">
        If you have any questions or need assistance, feel free to reach out to us at <strong className="text-blue-600">support@[yourstorename].com</strong>.
      </p>
    </div>
  );
};

export default AboutUsPage;
