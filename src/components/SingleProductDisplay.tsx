import React from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface SingleProductDisplayProps {
  product: Product;
  onAddToCart: (id: number) => void;
}

const SingleProductDisplay: React.FC<SingleProductDisplayProps> = ({ product, onAddToCart }) => (
  <div className="product-details">
    <h1 className="text-3xl font-bold">{product.name}</h1>
    <img className="w-full h-auto mt-4" src={product.imageUrl} alt={product.name} />
    <p className="mt-4">{product.description}</p>
    <p className="mt-4 text-xl font-bold">${product.price}</p>
    <button
      className="bg-green-500 text-white py-2 px-4 rounded mt-6"
      onClick={() => onAddToCart(product.id)}
    >
      Add to Cart
    </button>
  </div>
);

export default SingleProductDisplay;
