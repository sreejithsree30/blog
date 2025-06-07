import React from 'react';
import { Link } from 'react-router-dom';

import "../styles/BlogCard.css"

const BlogCard = ({ post }) => {
  return (
    <div className="blog-card">
      <img src={post.image} alt={post.title} className="blog-image" />
      <h3 className="blog-title">{post.title}</h3>
      <p className="blog-snippet">{post.content.substring(0, 100)}...</p>
      <Link to={`/blog/${post._id}`} className="read-more-button">Read More</Link>
    </div>
  );
};

export default BlogCard;
