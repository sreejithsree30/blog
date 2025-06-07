import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../../styles/BlogPostPage.css';

function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
        setError('');
      } catch (err) {
        setError('Post not found.');
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="post-container">
        {error ? (
          <div className="error-message">{error}</div>
        ) : post ? (
          <>
            <h2>{post.title}</h2>
            <img src={post.image} alt={post.title} className="post-image" />
            <p className="post-content">{post.content}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default BlogPostPage;
