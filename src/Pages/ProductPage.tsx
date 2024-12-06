import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import the useCart hook

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductPageProps {
  products: Product[];
}

const ProductPage: React.FC<ProductPageProps> = ({ products }) => {
  const { id } = useParams();
  const { cartItems, addToCart, getCartItemCount } = useCart(); // Access cart context here
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const product = products.find((product) => product.id === Number(id));

  if (!id) {
    return <p>No product ID provided</p>;
  }

  if (!product) {
    return (
      <div>
        <p>Product not found</p>
        <Link to="/">Go back to homepage</Link>
      </div>
    );
  }

  return (
    <div className="product-page container mx-auto p-4">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img className="w-full h-auto" src={product.imageUrl} alt={product.name} />
      <p className="mt-2">{product.description}</p>
      <p className="mt-4 text-xl font-bold">${product.price}</p>

      {/* Cart Item Count */}
      <div className="mt-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Cart ({getCartItemCount()})
        </button>
      </div>

      {/* Search Bar */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display filtered products */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Search Results:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.length === 0 ? (
            <p>No products found</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card p-4 border rounded-md">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <img src={product.imageUrl} alt={product.name} className="w-full h-auto" />
                <p className="mt-2">{product.description}</p>
                <p className="mt-4 text-xl font-bold">${product.price}</p>
                <button
                  className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
                  onClick={() => addToCart(product.id)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
