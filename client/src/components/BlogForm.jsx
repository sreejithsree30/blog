import React, { useState } from 'react';
import '../styles/BlogForm.css';

const BlogForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    content: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <h2>Create New Blog Post</h2>

      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="image">Image URL</label>
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        required
      />

      <label htmlFor="content">Content</label>
      <textarea
        name="content"
        rows="10"
        value={formData.content}
        onChange={handleChange}
        required
      />

      <button type="submit">Publish Post</button>
    </form>
  );
};

export default BlogForm;
