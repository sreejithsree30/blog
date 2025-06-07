import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BlogForm from '../../components/BlogForm';
import Navbar from '../../components/Navbar';

const CreatePost = () => {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      const res = await axios.post('/api/posts', formData, { withCredentials: true });
      console.log('Post created:', res.data);
      navigate('/admin');
    } catch (err) {
      console.error('Failed to create post:', err);
      alert('Failed to create post. Try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="create-post-page">
        <BlogForm onSubmit={handleCreate} />
      </div>
    </div>
  );
};

export default CreatePost;
