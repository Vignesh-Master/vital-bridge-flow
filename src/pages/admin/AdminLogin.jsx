import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username === 'admin' && formData.password === 'admin123') {
      localStorage.setItem('admin_token', 'admin-jwt-token');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #8B5CF6, #A855F7)' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', maxWidth: '400px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem' }}
              placeholder="admin"
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem' }}
              placeholder="admin123"
            />
          </div>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#8B5CF6', color: 'white', border: 'none', borderRadius: '0.5rem' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;