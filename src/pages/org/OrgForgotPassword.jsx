import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OrgForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: verify, 2: reset
  const [formData, setFormData] = useState({
    orgId: '',
    registrationNumber: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    // Handle verification logic here
    console.log('Organization verify attempt:', { orgId: formData.orgId, registrationNumber: formData.registrationNumber });
    setStep(2); // Move to reset password step
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle password reset logic here
    console.log('Organization password reset attempt:', formData);
  };

  return (
    <div className="forgot-password-container">
      {/* Header */}
      <header className="forgot-header">
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
            <Link to="/org/login" className="back-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="forgot-main">
        <div className="container">
          <div className="forgot-content">
            <div className="form-container">
              {step === 1 ? (
                // Step 1: Verify credentials
                <div className="form-section fade-in">
                  <div className="form-header">
                    <div className="icon-container">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <path d="M17 21V19A4 4 0 0 0 13 15H5A4 4 0 0 0 1 19V21" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                        <path d="M23 21V19A4 4 0 0 0 16 15.13" stroke="currentColor" strokeWidth="2"/>
                        <path d="M16 3.13A4 4 0 0 1 23 7C23 7 23 7 23 7A4 4 0 0 1 16 10.87" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <h1 className="heading-2 mb-1">Reset Organization Password</h1>
                    <p className="text-large">Enter your organization credentials to verify your identity</p>
                  </div>

                  <form onSubmit={handleVerifySubmit} className="form">
                    <div className="form-group">
                      <label className="form-label">Organization ID *</label>
                      <input
                        type="text"
                        name="orgId"
                        value={formData.orgId}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter your organization ID (e.g., who-global)"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Registration Number *</label>
                      <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter your organization registration number"
                        required
                      />
                      <div className="field-help">
                        <small>This is your official healthcare organization registration number</small>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-large w-full">
                      Verify Organization Credentials
                    </button>
                  </form>
                </div>
              ) : (
                // Step 2: Reset password
                <div className="form-section fade-in">
                  <div className="form-header">
                    <div className="icon-container success">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h1 className="heading-2 mb-1">Create New Password</h1>
                    <p className="text-large">Organization credentials verified! Please create a new secure password</p>
                  </div>

                  <form onSubmit={handleResetSubmit} className="form">
                    <div className="form-group">
                      <label className="form-label">New Password *</label>
                      <div className="password-input-container">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="form-input password-input"
                          placeholder="Enter new password"
                          required
                          minLength="8"
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
                      <div className="password-requirements">
                        <small>Password must be at least 8 characters long</small>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Confirm New Password *</label>
                      <div className="password-input-container">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="form-input password-input"
                          placeholder="Confirm new password"
                          required
                          minLength="8"
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
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

                    <button type="submit" className="btn btn-success btn-large w-full">
                      Update Password
                    </button>
                  </form>
                </div>
              )}

              <div className="help-text">
                <p>Need help? Contact OrganLink support team at</p>
                <a href="mailto:support@organlink.org" className="support-link">support@organlink.org</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .forgot-password-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--gradient-hero);
        }

        .forgot-header {
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
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

        .back-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--primary-blue);
          text-decoration: none;
          font-weight: 500;
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-md);
          transition: all var(--transition-normal);
        }

        .back-link:hover {
          background-color: rgba(44, 90, 160, 0.1);
        }

        .forgot-main {
          flex: 1;
          display: flex;
          align-items: center;
          padding: var(--spacing-3xl) 0;
        }

        .forgot-content {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .form-container {
          background-color: var(--white);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
          padding: var(--spacing-3xl);
          width: 100%;
          max-width: 500px;
        }

        .form-section {
          width: 100%;
        }

        .form-header {
          text-align: center;
          margin-bottom: var(--spacing-2xl);
        }

        .icon-container {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(44, 90, 160, 0.1);
          color: var(--primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--spacing-lg);
        }

        .icon-container.success {
          background: rgba(39, 174, 96, 0.1);
          color: var(--accent-green);
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-xl);
        }

        .field-help {
          margin-top: var(--spacing-sm);
        }

        .field-help small {
          color: var(--gray-500);
          font-size: 0.75rem;
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

        .password-requirements {
          margin-top: var(--spacing-sm);
        }

        .password-requirements small {
          color: var(--gray-500);
          font-size: 0.75rem;
        }

        .help-text {
          text-align: center;
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--gray-200);
          color: var(--gray-600);
        }

        .support-link {
          color: var(--primary-blue);
          text-decoration: none;
          font-weight: 500;
        }

        .support-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .form-container {
            margin: var(--spacing-md);
            padding: var(--spacing-xl);
          }

          .header-content {
            flex-direction: column;
            gap: var(--spacing-md);
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .form-container {
            padding: var(--spacing-lg);
          }

          .icon-container {
            width: 60px;
            height: 60px;
          }

          .icon-container svg {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default OrgForgotPassword;