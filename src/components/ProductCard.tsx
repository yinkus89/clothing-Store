import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

// Define the Product interface
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover mb-4" />
      <h3 className="text-xl font-semibold">
        <Link to={`/product/${product.id}`} className="text-blue-600 hover:underline">
          {product.name}
        </Link>
      </h3>
      <p>{product.description}</p>
      <p className="font-bold text-xl">${product.price}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;


