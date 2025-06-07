import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <Navbar />
      
      <div className="not-found-container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for doesn't exist or has been moved.</p>
          <Link to="/" className="home-button">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
