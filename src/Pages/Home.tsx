import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'; // Corrected import
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface HomeProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ products, onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Replace this with an actual API call to fetch products
  useEffect(() => {
    // Example of how to fetch products using Axios
    axios.get('http://localhost:5000/api/products') // Replace with your actual API URL
      .then((response) => {
        // Handle the response and update products state
        console.log(response.data); // Example: Log the fetched products
        // You would update the products state here if you fetch them from the API
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []); // Empty dependency array to run this only once on component mount

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Home Page</h2>

      {/* Search Bar */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Clear search button */}
        {searchQuery && (
          <button
            className="ml-2 text-gray-500 hover:text-gray-700"
            onClick={() => setSearchQuery('')}
          >
            Clear
          </button>
        )}
      </div>

      {/* Display products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center col-span-full">No products found matching your search criteria.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
