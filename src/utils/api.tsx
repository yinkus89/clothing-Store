import axios from 'axios';

// Define the base URL for your API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // Use environment variable or default

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Timeout for API requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Product interface definition
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products'); // Make sure to use 'api' instance
    return response.data;
  } catch (error: any) {
    console.error('Error fetching products:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Error fetching products');
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`); // Corrected endpoint
    return response.data;
  } catch (error: any) {
    console.error('Error fetching product by ID:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Error fetching product');
  }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<{ token: string }> => {
  try {
    const response = await api.post('/api/auth/login', { email, password }); // Ensure correct path for login
    return response.data; // Save the token for authenticated requests
  } catch (error: any) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Error logging in');
  }
};

// Register user
export const registerUser = async (userData: { email: string; password: string; username: string }): Promise<any> => {
  try {
    const response = await api.post('/api/auth/register', userData); // Ensure correct path for registration
    return response.data;
  } catch (error: any) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Error registering user');
  }
};

export default api;
