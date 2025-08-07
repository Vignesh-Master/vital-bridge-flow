        /* Responsive styles moved to App.css */
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);

  // Responsive sidebar toggle
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/admin/dashboard', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
        </svg>
      )
    },
    { 
      name: 'Create Hospital', 
      href: '/admin/create-hospital', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7 7-7z"/>
        </svg>
      )
    },
    { 
      name: 'Create Organization', 
      href: '/admin/create-organization', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    { 
      name: 'View Hospitals', 
      href: '/admin/hospitals', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4"/>
        </svg>
      )
    },
    { 
      name: 'View Organizations', 
      href: '/admin/organizations', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    { 
      name: 'View Locations', 
      href: '/admin/locations', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      )
    },
    { 
      name: 'Reset Password', 
      href: '/admin/reset-password', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
          <circle cx="12" cy="16" r="1"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      )
    },
    { 
      name: 'Statistics', 
      href: '/admin/statistics', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      )
    },
  ];

  const isCurrentPage = (href) => location.pathname === href;

  return (
    <div className="admin-layout">
      {/* Modern Professional Navbar */}
      <header className="admin-navbar">
        <div className="navbar-container">
          {/* Logo Section */}
          <div className="navbar-brand">
            <div className="brand-logo">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="url(#gradient1)"/>
                <path d="M20 12C16.686 12 14 14.686 14 18s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 8c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" fill="white"/>
                <path d="M20 26c-3.314 0-6 2.686-6 6v2h12v-2c0-3.314-2.686-6-6-6z" fill="white"/>
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="40" y2="40">
                    <stop stopColor="#2563eb"/>
                    <stop offset="1" stopColor="#1d4ed8"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="brand-text">
              <h1 className="brand-title">OrganLink</h1>
              <span className="brand-subtitle">Admin Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="navbar-nav">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-item ${isCurrentPage(item.href) ? 'nav-item-active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="navbar-user">
            <div className="user-info">
              <div className="user-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div className="user-details">
                <span className="user-name">{adminUser.username || 'Administrator'}</span>
                <span className="user-role">System Admin</span>
              </div>
            </div>
            
            <div className="user-actions">
              <button className="action-btn" title="Notifications">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <span className="notification-dot"></span>
              </button>
              
              <button className="action-btn" title="Settings">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </button>
              
              <button onClick={handleLogout} className="logout-btn" title="Logout">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main">
        <div className="content-wrapper">
          {children}
        </div>
      </main>

      <style jsx>{`
        .admin-layout {
          min-height: 100vh;
          background: #f8fafc;
        }

        .admin-navbar {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          line-height: 1.2;
        }

        .brand-subtitle {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          color: #64748b;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.875rem;
          transition: all 0.2s ease;
          position: relative;
        }

        .nav-item:hover {
          background: #f1f5f9;
          color: #334155;
        }

        .nav-item-active {
          background: #dbeafe;
          color: #1d4ed8;
          font-weight: 600;
        }

        .nav-item-active::before {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: #1d4ed8;
          border-radius: 1px;
        }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
        }

        .nav-label {
          font-size: 0.875rem;
        }

        .navbar-user {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          background: #e0e7ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1d4ed8;
        }

        .user-details {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e293b;
          line-height: 1.2;
        }

        .user-role {
          font-size: 0.75rem;
          color: #64748b;
          line-height: 1.2;
        }

        .user-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .action-btn {
          position: relative;
          background: none;
          border: none;
          color: #64748b;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn:hover {
          background: #f1f5f9;
          color: #334155;
        }

        .notification-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 6px;
          height: 6px;
          background: #ef4444;
          border-radius: 50%;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: #fee2e2;
          border-color: #fca5a5;
        }

        .admin-main {
          flex: 1;
          padding: 24px;
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .navbar-container {
            padding: 0 16px;
          }
          
          .nav-label {
            display: none;
          }
          
          .navbar-nav {
            gap: 2px;
          }
          
          .nav-item {
            padding: 10px 12px;
          }
          
          .user-details {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 0 12px;
          }
          
          .brand-subtitle {
            display: none;
          }
          
          .navbar-nav {
            display: none;
          }
          
          .user-actions {
            gap: 4px;
          }
          
          .logout-btn span {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
