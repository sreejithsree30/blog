import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import '../../styles/BlogPostPage.css';

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get('/api/posts');
        const found = res.data.find(p => p._id === id);
        setPost(found);
      } catch (err) {
        console.error('Error loading post', err);
        setError('Failed to load post');
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${id}`, { withCredentials: true });
      navigate('/');
    } catch (err) {
      console.error('Failed to delete post', err);
      alert('Failed to delete post');
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="post-container">
        <div className="post-header">
          <h1>{post.title}</h1>
          <button className="delete-button" onClick={handleDelete}>🗑 Delete</button>
        </div>
        <img src={post.image} alt={post.title} style={{ maxWidth: '100%' }} />
        <p><strong>By:</strong> {post.author?.email || 'Unknown Author'}</p>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default BlogPostPage;