import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import the useCart hook
import axios from 'axios';
import SingleProductDisplay from '../components/SingleProductDisplay'; // Import the new SingleProductDisplay component

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const { cartItems, addToCart, getCartItemCount } = useCart();
  const [product, setProduct] = useState<Product | null>(null); // State to store a single product
  const [products, setProducts] = useState<Product[]>([]); // State to store all products
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const [searchQuery, setSearchQuery] = useState(''); // State to handle search input

  useEffect(() => {
    // Fetch all products from the API (or you can fetch a single product based on ID)
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Replace with your API URL
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch specific product by ID
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/${id}`);
          setProduct(response.data);
        } catch (err) {
          setError('Failed to fetch the product');
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!id || isNaN(Number(id))) {
    return <p>Invalid or missing product ID</p>;
  }

  if (!product) {
    return (
      <div>
        <p>Product not found</p>
        <Link to="/">Go back to homepage</Link>
      </div>
    );
  }

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-page container mx-auto p-4">
      <SingleProductDisplay product={product} onAddToCart={addToCart} />

      <div className="mt-4">
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded ${getCartItemCount() === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Cart ({getCartItemCount()})
        </button>
      </div>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Other Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <SingleProductDisplay key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Link to="/" className="text-blue-500 hover:underline">Go back to homepage</Link>
      </div>
    </div>
  );
};

export default ProductPage;
