import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OrgLogin = () => {
  const [formData, setFormData] = useState({
    organizationId: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Organization login:', formData);
      
      // Store auth token
      localStorage.setItem('orgToken', 'mock-org-token');
      localStorage.setItem('orgData', JSON.stringify({
        id: formData.organizationId,
        name: 'Global Health Alliance',
        type: 'International NGO'
      }));
      
      navigate('/org/policies');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="org-login">
      <div className="login-container">
        <div className="login-content">
          {/* Left Side - Form */}
          <div className="login-form-section">
            <div className="login-header">
              <div className="logo">
                <h2>OrganLink</h2>
                <span className="logo-subtitle">Organization Portal</span>
              </div>
              <p className="login-subtitle">
                Access the global collaboration platform for organ transplant policies
              </p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label">Organization ID</label>
                <input
                  type="text"
                  name="organizationId"
                  value={formData.organizationId}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., WHO-001, UNOS-USA"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="password-input">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25"/>
                      <path d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z" fill="currentColor"/>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  'Sign In to Organization Portal'
                )}
              </button>

              <div className="login-links">
                <Link to="/org/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </Link>
              </div>

              <div className="login-footer">
                <p>Need access? Contact your organization administrator</p>
                <Link to="/" className="back-home-link">← Back to Home</Link>
              </div>
            </form>
          </div>

          {/* Right Side - Image */}
          <div className="login-image-section">
            <div className="image-content">
              <h3>Global Collaboration</h3>
              <p>
                Join healthcare organizations worldwide in shaping the future of 
                organ transplant policies through democratic voting and evidence-based decisions.
              </p>
              <div className="features-list">
                <div className="feature-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>Democratic Policy Voting</span>
                </div>
                <div className="feature-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>Transparent Governance</span>
                </div>
                <div className="feature-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>Evidence-Based Decisions</span>
                </div>
              </div>
            </div>
            <div className="decorative-element">
              <svg width="300" height="200" viewBox="0 0 300 200" fill="none">
                <circle cx="150" cy="100" r="60" fill="var(--primary-blue)" fillOpacity="0.1"/>
                <circle cx="150" cy="100" r="40" fill="var(--secondary-teal)" fillOpacity="0.2"/>
                <circle cx="120" cy="80" r="8" fill="var(--accent-green)"/>
                <circle cx="180" cy="80" r="8" fill="var(--primary-blue)"/>
                <circle cx="120" cy="120" r="8" fill="var(--secondary-teal)"/>
                <circle cx="180" cy="120" r="8" fill="var(--warning-orange)"/>
                <path d="M100 100h100M150 60v80" stroke="var(--primary-blue)" strokeWidth="2" strokeOpacity="0.3"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .org-login {
          min-height: 100vh;
          background: var(--gradient-hero);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-lg);
        }

        .login-container {
          width: 100%;
          max-width: 1200px;
          background: var(--white);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
          overflow: hidden;
        }

        .login-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 600px;
        }

        .login-form-section {
          padding: var(--spacing-3xl);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-header {
          text-align: center;
          margin-bottom: var(--spacing-2xl);
        }

        .logo h2 {
          color: var(--primary-blue);
          font-family: var(--font-heading);
          font-size: 2rem;
          margin: 0;
        }

        .logo-subtitle {
          color: var(--secondary-teal);
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .login-subtitle {
          color: var(--gray-600);
          margin-top: var(--spacing-md);
          line-height: 1.5;
        }

        .login-form {
          max-width: 400px;
          margin: 0 auto;
          width: 100%;
        }

        .password-input {
          position: relative;
        }

        .login-links {
          text-align: center;
          margin-top: var(--spacing-lg);
        }

        .forgot-password-link {
          color: var(--primary-blue);
          text-decoration: none;
          font-weight: 500;
        }

        .forgot-password-link:hover {
          text-decoration: underline;
        }

        .login-footer {
          text-align: center;
          margin-top: var(--spacing-2xl);
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--gray-200);
        }

        .login-footer p {
          color: var(--gray-500);
          font-size: 0.875rem;
          margin-bottom: var(--spacing-md);
        }

        .back-home-link {
          color: var(--secondary-teal);
          text-decoration: none;
          font-weight: 500;
        }

        .back-home-link:hover {
          text-decoration: underline;
        }

        .login-image-section {
          background: var(--gradient-primary);
          color: var(--white);
          padding: var(--spacing-3xl);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
        }

        .image-content h3 {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: var(--spacing-lg);
        }

        .image-content p {
          font-size: 1.125rem;
          opacity: 0.9;
          margin-bottom: var(--spacing-2xl);
          line-height: 1.6;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-2xl);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          font-weight: 500;
        }

        .feature-item svg {
          stroke: var(--accent-green);
          flex-shrink: 0;
        }

        .decorative-element {
          position: absolute;
          bottom: var(--spacing-lg);
          right: var(--spacing-lg);
          opacity: 0.6;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .login-content {
            grid-template-columns: 1fr;
          }

          .login-image-section {
            order: -1;
            padding: var(--spacing-2xl) var(--spacing-lg);
          }

          .login-form-section {
            padding: var(--spacing-2xl) var(--spacing-lg);
          }

          .decorative-element {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default OrgLogin;