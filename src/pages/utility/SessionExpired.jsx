import React from 'react';
import { Link } from 'react-router-dom';

const SessionExpired = () => {
  return (
    <div className="error-page">
      <div className="container">
        <div className="error-content">
          <div className="error-icon">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="var(--warning-orange)" strokeWidth="2"/>
              <polyline points="12,6 12,12 16,14" stroke="var(--warning-orange)" strokeWidth="2"/>
            </svg>
          </div>
          
          <div className="error-text">
            <h1 className="error-title">Session Expired</h1>
            <h2 className="error-subtitle">Please Login Again</h2>
            <p className="error-description">
              Your session has expired for security reasons. Please log in again to continue 
              using the OrganLink platform.
            </p>
          </div>
          
          <div className="error-actions">
            <p className="login-note">Please visit the appropriate domain to log in:</p>
            <div className="domain-info">
              <div className="domain-item">
                <strong>Public Site:</strong> organlink.org
              </div>
              <div className="domain-item">
                <strong>Hospital Portal:</strong> hospitals.organlink.org
              </div>
              <div className="domain-item">
                <strong>Organization Portal:</strong> orgs.organlink.org
              </div>
              <div className="domain-item">
                <strong>Admin Portal:</strong> admin.organlink.org
              </div>
            </div>
          </div>
          
          <div className="additional-links">
            <Link to="/" className="back-link">← Back to Home</Link>
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
          font-size: 3rem;
          font-weight: 700;
          color: var(--warning-orange);
          margin: 0;
          margin-bottom: var(--spacing-md);
          font-family: var(--font-heading);
        }

        .error-subtitle {
          color: var(--gray-900);
          font-size: 1.5rem;
          margin: 0;
          margin-bottom: var(--spacing-lg);
          font-family: var(--font-heading);
        }

        .error-description {
          color: var(--gray-600);
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: var(--spacing-2xl);
          max-width: 450px;
          margin-left: auto;
          margin-right: auto;
        }

        .error-actions {
          text-align: center;
          margin-bottom: var(--spacing-xl);
        }

        .login-note {
          color: var(--gray-700);
          font-weight: 500;
          margin-bottom: var(--spacing-lg);
        }

        .domain-info {
          background: var(--gray-50);
          padding: var(--spacing-lg);
          border-radius: var(--radius-md);
          text-align: left;
          max-width: 400px;
          margin: 0 auto;
        }

        .domain-item {
          margin-bottom: var(--spacing-md);
          color: var(--gray-600);
        }

        .domain-item:last-child {
          margin-bottom: 0;
        }

        .domain-item strong {
          color: var(--primary-blue);
        }

        .additional-links {
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--gray-200);
        }

        .back-link {
          color: var(--secondary-teal);
          text-decoration: none;
          font-weight: 500;
        }

        .back-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .error-content {
            padding: var(--spacing-2xl);
          }

          .error-title {
            font-size: 2.5rem;
          }

          .error-subtitle {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SessionExpired;