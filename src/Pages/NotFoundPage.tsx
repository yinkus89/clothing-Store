import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
      Go Back to Home
    </Link>
  </div>
);

export default NotFoundPage;
