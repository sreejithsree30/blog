import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import BlogCard from '../../components/BlogCard';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/posts', {
        withCredentials: true
      });
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setError('Failed to load blog posts. Please try again later.');
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`, {
        withCredentials: true
      });
      
      fetchPosts();
    } catch (err) {
      console.error('Failed to delete post:', err);
      alert('Failed to delete the post. Please try again.');
    }
  };

  return (
    <div className="admin-dashboard">
      <Navbar />
      
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </div>
      
      <main className="dashboard-content">
        <div className="posts-section">
          <h2>Manage Blog Posts</h2>
          
          {loading ? (
            <div className="loading-spinner">Loading posts...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : posts.length === 0 ? (
            <div className="no-posts-message">
              <p>No blog posts available. Create your first post!</p>
              <Link to="/admin/create" className="create-first-post-button">
                Create First Post
              </Link>
            </div>
          ) : (
            <div className="admin-blog-grid">
              {posts.map(post => (
                <BlogCard 
                  key={post._id} 
                  post={post} 
                  isAdmin={true}
                  onDelete={handleDeletePost}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
