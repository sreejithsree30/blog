import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/public/HomePage';
import BlogPostPage from './pages/public/BlogPostPage';
import LoginPage from './pages/admin/LoginPage';
import RegisterPage from './pages/admin/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreatePost from './pages/admin/CreatePost';
import NotFound from './pages/public/NotFound';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
         
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

  
          <Route
            path="/admin"
            element={ 
                <AdminDashboard /> 
            }
          />
          <Route
            path="/admin/create"
            element={
              
                <CreatePost />
              
            }
          />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
