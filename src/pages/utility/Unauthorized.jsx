import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="error-page">
      <div className="container">
        <div className="error-content">
          <div className="error-icon">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="var(--accent-red)" strokeWidth="2"/>
              <path d="M15 9L9 15" stroke="var(--accent-red)" strokeWidth="2"/>
              <path d="M9 9L15 15" stroke="var(--accent-red)" strokeWidth="2"/>
            </svg>
          </div>
          
          <div className="error-text">
            <h1 className="error-title">403</h1>
            <h2 className="error-subtitle">Access Denied</h2>
            <p className="error-description">
              You don't have permission to view this page. Please contact your administrator 
              if you believe this is an error.
            </p>
          </div>
          
          <div className="error-actions">
            <Link to="/" className="btn btn-primary">
              Go to Home
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .error-page {
          min-height: 100vh;
          background: var(--gradient-hero);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-lg);
        }

        .error-content {
          text-align: center;
          background: var(--white);
          padding: var(--spacing-3xl);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
          max-width: 600px;
          width: 100%;
        }

        .error-icon {
          margin-bottom: var(--spacing-2xl);
        }

        .error-title {
          font-size: 4rem;
          font-weight: 700;
          color: var(--accent-red);
          margin: 0;
          margin-bottom: var(--spacing-md);
          font-family: var(--font-heading);
        }

        .error-subtitle {
          color: var(--gray-900);
          font-size: 2rem;
          margin: 0;
          margin-bottom: var(--spacing-lg);
          font-family: var(--font-heading);
        }

        .error-description {
          color: var(--gray-600);
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: var(--spacing-2xl);
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        .error-actions {
          display: flex;
          gap: var(--spacing-lg);
          justify-content: center;
        }

        @media (max-width: 768px) {
          .error-content {
            padding: var(--spacing-2xl);
          }

          .error-title {
            font-size: 3rem;
          }

          .error-subtitle {
            font-size: 1.5rem;
          }

          .error-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Unauthorized;