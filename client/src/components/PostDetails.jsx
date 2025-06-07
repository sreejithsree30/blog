import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/PostDetails.css';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts`);
        const found = response.data.find((p) => p._id === id);
        setPost(found);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading post...</div>;

  return (
    <div className="post-details-page">
      <Navbar />
      <div className="post-details-container">
        <h1>{post.title}</h1>
        <img src={post.image} alt={post.title} className="post-image" />
        <p className="post-content">{post.content}</p>
        <p className="post-author">Written by: {post.author?.email || 'Anonymous'}</p>
      </div>
    </div>
  );
};

export default PostDetails;