import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, locationAPI, hospitalAPI } from '../services/api';
import loginImage from '../assets/login-split-image.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: '',
    state: '',
    hospital: '',
    userId: '', // Changed from staffId to match backend
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  // Load data from backend on component mount
  React.useEffect(() => {
    loadCountries();
  }, []);

  React.useEffect(() => {
    if (formData.country) {
      loadStates();
    }
  }, [formData.country]);

  React.useEffect(() => {
    if (formData.state) {
      loadHospitals();
    }
  }, [formData.state]);

  const loadCountries = async () => {
    try {
      const response = await locationAPI.getCountries();
      if (response.success) {
        setCountries(response.data || []);
      }
    } catch (error) {
      console.error('Failed to load countries:', error);
      // Fallback to hardcoded data
      setCountries([
        { id: 1, name: 'India', code: 'IN' },
        { id: 2, name: 'United States', code: 'US' }
      ]);
    }
  };

  const loadStates = async () => {
    try {
      const selectedCountry = countries.find(c => c.name === formData.country);
      if (selectedCountry) {
        const response = await locationAPI.getStates(selectedCountry.id);
        if (response.success) {
          setStates(response.data || []);
        }
      }
    } catch (error) {
      console.error('Failed to load states:', error);
      // Fallback to hardcoded data
      if (formData.country === 'India') {
        setStates([
          { id: 1, name: 'Maharashtra', code: 'MH' },
          { id: 2, name: 'Tamil Nadu', code: 'TN' }
        ]);
      }
    }
  };

  const loadHospitals = async () => {
    try {
      const response = await hospitalAPI.getHospitals();
      if (response.success) {
        // Filter hospitals by selected state
        const selectedState = states.find(s => s.name === formData.state);
        const filteredHospitals = response.data.content?.filter(h =>
          h.stateId === selectedState?.id
        ) || [];
        setHospitals(filteredHospitals);
      }
    } catch (error) {
      console.error('Failed to load hospitals:', error);
      // Fallback to hardcoded data - show both hospitals for demo
      const allHospitals = [
        { id: 1, name: 'Apollo Hospital Mumbai', tenantId: 'apollo-mumbai', userId: 'mb-001' },
        { id: 2, name: 'Apollo Hospital Chennai', tenantId: 'apollo-chennai', userId: 'ch-001' }
      ];

      if (formData.state === 'Maharashtra') {
        setHospitals([allHospitals[0]]);
      } else if (formData.state === 'Tamil Nadu') {
        setHospitals([allHospitals[1]]);
      } else {
        // Show all hospitals if no state selected
        setHospitals(allHospitals);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset dependent dropdowns
      ...(name === 'country' && { state: '', hospital: '' }),
      ...(name === 'state' && { hospital: '' })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form data
      if (!formData.userId || !formData.password) {
        throw new Error('Please enter both User ID and Password');
      }

      // Prepare login credentials
      const credentials = {
        userId: formData.userId,
        password: formData.password
      };

      // Call login API
      const response = await authAPI.login(credentials);

      if (response.success) {
        // Store authentication data
        localStorage.setItem('hospital_token', response.data.token);
        localStorage.setItem('hospital_tenant_id', response.data.tenantId);
        localStorage.setItem('hospital_info', JSON.stringify(response.data.hospital));

        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please check your credentials.');
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
              Hospital Staff Portal
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
                  <h1 className="heading-2 mb-1">Staff Login</h1>
                  <p className="text-large">Access your hospital management dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                  {/* Country selection */}
                  <div className="form-group">
                    <label className="form-label">Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Country</option>
                      {countries.map(country => (
                        <option key={country.id || country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* State selection */}
                  <div className="form-group">
                    <label className="form-label">State/Province *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                      disabled={!formData.country}
                    >
                      <option value="">Select State/Province</option>
                      {states.map(state => (
                        <option key={state.id || state.name} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Hospital selection */}
                  <div className="form-group">
                    <label className="form-label">Hospital *</label>
                    <select
                      name="hospital"
                      value={formData.hospital}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                      disabled={!formData.state}
                    >
                      <option value="">Select Hospital</option>
                      {hospitals.map(hospital => (
                        <option key={hospital.id || hospital.name} value={hospital.name}>
                          {hospital.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* User ID */}
                  <div className="form-group">
                    <label className="form-label">User ID *</label>
                    <input
                      type="text"
                      name="userId"
                      value={formData.userId}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your user ID (e.g., ch-001)"
                      required
                    />
                    <small className="form-help">
                      Chennai Hospital: ch-001 | Mumbai Hospital: mb-001
                    </small>
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
                        placeholder="Enter your password"
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

                  {/* Forgot password link */}
                  <div className="forgot-password">
                    <Link to="/forgot-password" className="forgot-password-link">
                      Forgot your password?
                    </Link>
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
                <h3 className="heading-3 text-white">Connecting Lives Through Technology</h3>
                <p className="text-large text-white">
                  Advanced organ donation management system helping save lives worldwide
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

        .forgot-password {
          text-align: right;
          margin-top: calc(-1 * var(--spacing-sm));
        }

        .forgot-password-link {
          color: var(--primary-blue);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .forgot-password-link:hover {
          text-decoration: underline;
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
          background: var(--gradient-hero);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: var(--spacing-2xl);
          text-align: center;
        }

        .image-overlay h3 {
          margin-bottom: var(--spacing-lg);
        }

        .login-footer {
          background-color: var(--white);
          border-top: 1px solid var(--gray-200);
          padding: var(--spacing-lg) 0;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--spacing-md);
        }

        .footer-links {
          display: flex;
          gap: var(--spacing-lg);
        }

        .footer-links a {
          color: var(--gray-600);
          text-decoration: none;
          font-size: 0.875rem;
        }

        .footer-links a:hover {
          color: var(--primary-blue);
        }

        .text-white {
          color: var(--white) !important;
        }

        @media (max-width: 768px) {
          .login-content {
            grid-template-columns: 1fr;
            margin: var(--spacing-md);
          }

          .login-image-section {
            order: -1;
            min-height: 200px;
          }

          .login-form-section {
            padding: var(--spacing-xl);
          }

          .footer-content {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .header-content {
            flex-direction: column;
            gap: var(--spacing-sm);
            text-align: center;
          }

          .login-form-section {
            padding: var(--spacing-lg);
          }

          .footer-links {
            flex-direction: column;
            gap: var(--spacing-sm);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;