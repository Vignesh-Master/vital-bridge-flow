import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { apiUtils } from '../services/api';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('hospital_data');
    localStorage.removeItem('user_data');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Link to="/dashboard" className="logo-link">
              <div className="logo-icon">
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
              </div>
              <span className="logo-text">OrganLink</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <Link 
              to="/dashboard" 
              className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/register-donor" 
              className={`nav-link ${isActive('/register-donor') ? 'active' : ''}`}
            >
              Register Donor
            </Link>
            <Link 
              to="/register-patient" 
              className={`nav-link ${isActive('/register-patient') ? 'active' : ''}`}
            >
              Register Patient
            </Link>
            <Link 
              to="/donor-status" 
              className={`nav-link ${isActive('/donor-status') ? 'active' : ''}`}
            >
              Donor Status
            </Link>
            <Link 
              to="/patient-status" 
              className={`nav-link ${isActive('/patient-status') ? 'active' : ''}`}
            >
              Patient Status
            </Link>
            <Link 
              to="/matching-dashboard" 
              className={`nav-link ${isActive('/matching-dashboard') ? 'active' : ''}`}
            >
              Matching
            </Link>
            <Link 
              to="/faqs" 
              className={`nav-link ${isActive('/faqs') ? 'active' : ''}`}
            >
              FAQs
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="header-actions">
            {/* Notifications */}
            <button className="notification-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="notification-badge">3</span>
            </button>

            {/* Logout */}
            <button className="logout-btn" onClick={handleLogout}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Logout
            </button>

            {/* Mobile menu button */}
            <button className="mobile-menu-btn" onClick={toggleMenu}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/dashboard" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </Link>
          <Link to="/register-donor" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
            Register Donor
          </Link>
          <Link to="/register-patient" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
            Register Patient
          </Link>
          <Link to="/donor-status" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
            Donor Status
          </Link>
          <Link to="/patient-status" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
            Patient Status
          </Link>
          <Link to="/matching-dashboard" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
            Matching
          </Link>
          <Link to="/faqs" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
            FAQs
          </Link>
        </nav>
      </div>

      <style jsx>{`
        .header {
          background-color: var(--white);
          box-shadow: var(--shadow-md);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-md) 0;
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: var(--gray-900);
        }

        .logo-icon {
          margin-right: var(--spacing-sm);
        }

        .logo-text {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-blue);
        }

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
        }

        .nav-link {
          text-decoration: none;
          color: var(--gray-600);
          font-weight: 500;
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-md);
          transition: all var(--transition-normal);
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--primary-blue);
          background-color: rgba(44, 90, 160, 0.1);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .notification-btn {
          position: relative;
          background: none;
          border: none;
          padding: var(--spacing-sm);
          border-radius: var(--radius-md);
          color: var(--gray-600);
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .notification-btn:hover {
          background-color: var(--gray-100);
          color: var(--primary-blue);
        }

        .notification-badge {
          position: absolute;
          top: 0;
          right: 0;
          background-color: var(--accent-red);
          color: var(--white);
          font-size: 0.75rem;
          padding: 0.125rem 0.375rem;
          border-radius: 50px;
          min-width: 1.25rem;
          text-align: center;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          background: none;
          border: 1px solid var(--gray-300);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-md);
          color: var(--gray-600);
          cursor: pointer;
          font-weight: 500;
          transition: all var(--transition-normal);
        }

        .logout-btn:hover {
          background-color: var(--accent-red);
          border-color: var(--accent-red);
          color: var(--white);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          padding: var(--spacing-sm);
          color: var(--gray-600);
          cursor: pointer;
        }

        .nav-mobile {
          display: none;
          flex-direction: column;
          background-color: var(--white);
          border-top: 1px solid var(--gray-200);
          padding: var(--spacing-md) 0;
        }

        .nav-mobile.open {
          display: flex;
        }

        .nav-link-mobile {
          text-decoration: none;
          color: var(--gray-600);
          padding: var(--spacing-md) 0;
          border-bottom: 1px solid var(--gray-100);
          font-weight: 500;
          transition: color var(--transition-normal);
        }

        .nav-link-mobile:hover {
          color: var(--primary-blue);
        }

        @media (max-width: 768px) {
          .nav-desktop {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .logout-btn span {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .logo-text {
            font-size: 1.25rem;
          }

          .header-actions {
            gap: var(--spacing-sm);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;