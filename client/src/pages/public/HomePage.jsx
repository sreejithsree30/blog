import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import '../../styles/HomePage.css';

function HomePage() {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    
    setLoading(false);
  }, []);

  return (
    <div className="home-page">
      <Navbar />

      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to BlogHub</h1>
          <p>Discover insights, stories, and expertise from our writers</p>
          <button
            className="explore-button"
            onClick={() => navigate('/admin')}
            aria-label="Explore all posts"
          >
            Explore Now
          </button>
        </div>
      </header>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} BlogHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
