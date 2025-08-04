<<<<<<< HEAD
export default function AdminLogin() {
  return <div>Admin Login Placeholder</div>;
}
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../../assets/login-split-image.jpg';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Hardcoded admin credentials for demo
      if (formData.username === 'admin' && formData.password === 'admin123') {
        localStorage.setItem('admin_token', 'dummy-admin-token');
        localStorage.setItem('admin_user', JSON.stringify({ username: 'admin', role: 'super_admin' }));
        navigate('/admin/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Header */}
      <header className="login-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="url(#gradient1)"/>
                <path d="M20 12C16.686 12 14 14.686 14 18s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 8c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" fill="white"/>
                <path d="M20 26c-3.314 0-6 2.686-6 6v2h12v-2c0-3.314-2.686-6-6-6z" fill="white"/>
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="40" y2="40">
                    <stop stopColor="#2c5aa0"/>
                    <stop offset="1" stopColor="#2d9cdb"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="logo-text">OrganLink</span>
            </div>
            <div className="header-subtitle">
              Administrator Panel
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="login-main">
        <div className="container">
          <div className="login-content">
            {/* Form side */}
            <div className="login-form-section">
              <div className="form-container">
                <div className="form-header">
                  <h1 className="heading-2 mb-1">Admin Login</h1>
                  <p className="text-large">Access OrganLink administrative panel</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                  {/* Username */}
                  <div className="form-group">
                    <label className="form-label">Username *</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter admin username"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="form-group">
                    <label className="form-label">Password *</label>
                    <div className="password-input-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="form-input password-input"
                        placeholder="Enter admin password"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2"/>
                            <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Error display */}
                  {error && (
                    <div className="error-message" style={{
                      color: '#dc2626',
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '6px',
                      padding: '12px',
                      marginBottom: '16px',
                      fontSize: '14px'
                    }}>
                      {error}
                    </div>
                  )}

                  {/* Demo credentials info */}
                  <div style={{
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #bae6fd',
                    borderRadius: '6px',
                    padding: '12px',
                    marginBottom: '16px',
                    fontSize: '14px',
                    color: '#0369a1'
                  }}>
                    Demo credentials: admin / admin123
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-large w-full"
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </button>
                </form>
              </div>
            </div>

            {/* Image side */}
            <div className="login-image-section">
              <img src={loginImage} alt="Medical professionals" className="login-image" />
              <div className="image-overlay">
                <h3 className="heading-3 text-white">Administrative Control Center</h3>
                <p className="text-large text-white">
                  Manage hospitals, organizations, and oversee the OrganLink platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="login-footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2024 OrganLink. All rights reserved.</p>
            <div className="footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/support">Support</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--gray-50);
        }

        .login-header {
          background-color: var(--white);
          box-shadow: var(--shadow-sm);
          padding: var(--spacing-lg) 0;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .logo-text {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-blue);
        }

        .header-subtitle {
          color: var(--gray-600);
          font-weight: 500;
        }

        .login-main {
          flex: 1;
          display: flex;
          align-items: center;
          padding: var(--spacing-3xl) 0;
        }

        .login-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1200px;
          margin: 0 auto;
          background-color: var(--white);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
          overflow: hidden;
          min-height: 600px;
        }

        .login-form-section {
          padding: var(--spacing-3xl);
          display: flex;
          align-items: center;
        }

        .form-container {
          width: 100%;
          max-width: 400px;
        }

        .form-header {
          margin-bottom: var(--spacing-2xl);
          text-align: center;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .password-input-container {
          position: relative;
        }

        .password-input {
          padding-right: 3rem !important;
        }

        .password-toggle {
          position: absolute;
          right: var(--spacing-md);
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--gray-500);
          cursor: pointer;
          padding: var(--spacing-xs);
        }

        .password-toggle:hover {
          color: var(--primary-blue);
        }

        .login-image-section {
          position: relative;
          background: var(--gradient-hero);
        }

        .login-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.8;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(44, 90, 160, 0.2);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: var(--spacing-2xl);
        }

        .text-white {
          color: var(--white) !important;
        }

        .login-footer {
          background-color: var(--gray-800);
          color: var(--white);
          padding: var(--spacing-lg) 0;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-links {
          display: flex;
          gap: var(--spacing-lg);
        }

        .footer-links a {
          color: var(--white);
          text-decoration: none;
          font-size: 0.875rem;
        }

        .footer-links a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .login-content {
            grid-template-columns: 1fr;
          }
          
          .login-image-section {
            display: none;
          }
          
          .login-form-section {
            padding: var(--spacing-xl);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
>>>>>>> 0e15532b5b16b17ef53afe25efc32be2ef97388d
