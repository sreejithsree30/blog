
import React from 'react';
import { Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Book } from 'lucide-react';
import '../styles/Navbar.css';


const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Book className="logo-icon" />
          <span>BlogHub</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/admin" className="nav-link">Dashboard</Link>
          <Link to="/admin/create" className="nav-link">New Post</Link>
          {user ? (
            <button onClick={logout} className="nav-button logout-button">Logout</button>
          ) : (
            <Link to="/login" className="nav-button login-button">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
