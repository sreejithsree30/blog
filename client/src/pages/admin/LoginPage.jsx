import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/LoginPage.css';
import { useNavigate, Link } from 'react-router-dom'; // Add Link
import { useAuth } from '../../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        '/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      login(response.data.user);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example : sree@gmail.com -> id"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="example : 123456 -> password"
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>

      {/* Register redirect */}
      <p className="register-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
}

export default LoginPage;
