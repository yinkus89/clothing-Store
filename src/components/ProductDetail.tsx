import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/products/${id}`)
        .then(response => setProduct(response.data))
        .catch(error => console.error('Error fetching product', error));
    }
  }, [id]);

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <div className="flex flex-col md:flex-row items-center">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full md:w-1/2 h-auto object-cover rounded-lg mb-6 md:mb-0"
        />
        <div className="md:ml-8 flex flex-col">
          <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
          <p className="text-lg text-gray-600 mt-4">{product.description}</p>
          <p className="text-xl font-semibold text-gray-900 mt-4">${product.price}</p>
          <button 
            className="mt-6 py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
