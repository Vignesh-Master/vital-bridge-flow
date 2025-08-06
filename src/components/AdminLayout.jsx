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
    { name: 'Dashboard', href: '/admin/dashboard', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )},
    { name: 'Create Hospital', href: '/admin/create-hospital', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7 7-7z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 5L8 21l4-7 4 7-4-16" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )},
    { name: 'Create Organization', href: '/admin/create-organization', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )},
    { name: 'View Hospitals', href: '/admin/hospitals', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h4m0-11V9a2 2 0 1 1 4 0v2m0 0h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4m-8-9h8" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )},
    { name: 'View Organizations', href: '/admin/organizations', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M2 12h20" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )},
    { name: 'View Locations', href: '/admin/locations', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )},
    { name: 'Reset Password', href: '/admin/reset-password', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="11" width="18" height="10" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )},
    { name: 'Statistics', href: '/admin/statistics', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2"/>
        <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
        <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )},
  ];

  const isCurrentPage = (href) => location.pathname === href;

  return (
    <div className="admin-layout">
      {/* Top Navbar (horizontal, like public page) */}
      <header className="admin-top-navbar">
        <div className="admin-navbar-inner">
          <div className="navbar-logo">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
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
            <span className="navbar-logo-text">OrganLink Admin</span>
          </div>
          <nav className="admin-navbar-links">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`navbar-link ${isCurrentPage(item.href) ? 'navbar-link-active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="admin-navbar-right">
            <div className="admin-user-info">
              <div className="admin-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="admin-details">
                <p className="admin-name">{adminUser.username || 'Admin'}</p>
                <p className="admin-role">Administrator</p>
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-danger btn-small">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="admin-main">
        {/* Sticky Top bar */}
        <div className="admin-header sticky-admin-header">
          <button onClick={() => setSidebarOpen((open) => !open)} className="sidebar-toggle-btn" aria-label="Toggle sidebar">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M9 3v18" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          <div className="header-actions">
            <button className="header-action-btn" title="Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11c0-3.07-1.64-5.64-5-6.32V4a2 2 0 1 0-4 0v.68C5.64 5.36 4 7.929 4 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m5 0v1a3 3 0 0 1-6 0v-1m6 0H9"/>
              </svg>
              <span className="notification-badge"></span>
            </button>
            <button className="header-action-btn" title="User Alerts">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4"/>
                <circle cx="12" cy="16" r="1"/>
              </svg>
            </button>
          </div>
        </div>
        {/* Page content */}
        <main className="admin-content">
          {children}
          {/* Scroll to top button (styled like public page) */}
          <button className="scroll-to-top-btn-admin" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} title="Scroll to top">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
              <circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2" fill="#fff"/>
              <path d="M12 16V8" stroke="#2563eb" strokeWidth="2"/>
              <path d="M8 12l4-4 4 4" stroke="#2563eb" strokeWidth="2"/>
            </svg>
          </button>
        </main>
      </div>

      <style jsx>{`
        .sticky-admin-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #f8fafc;
          box-shadow: 0 2px 8px rgba(44,90,160,0.04);
        }
        .scroll-to-top-btn-admin {
          position: fixed;
          right: 24px;
          bottom: 24px;
          background: #fff;
          border: 2px solid #2563eb;
          border-radius: 50%;
          box-shadow: 0 4px 16px rgba(37,99,235,0.10);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: box-shadow 0.2s, background 0.2s;
          z-index: 1200;
        }
        .scroll-to-top-btn-admin:hover {
          box-shadow: 0 8px 32px rgba(37,99,235,0.18);
          background: #e0e7ff;
        }
        .admin-layout {
          min-height: 100vh;
          background-color: var(--gray-50);
        }

        .admin-top-navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          background: #fff;
          box-shadow: 0 6px 32px rgba(44,90,160,0.13);
          border-bottom: 1.5px solid #e5eaf2;
          padding: 0;
        }
        .admin-navbar-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
          padding: 0 36px;
        }
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-right: 44px;
        }
        .navbar-logo-text {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          font-weight: 800;
          color: #1e293b;
          letter-spacing: 0.5px;
        }
        .admin-navbar-links {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
          justify-content: center;
        }
        .navbar-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          color: #1e293b;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.08rem;
          transition: background 0.18s, color 0.18s, box-shadow 0.18s;
          box-shadow: none;
        }
        .navbar-link:hover {
          background: #e0e7ff;
          color: #2563eb;
          box-shadow: 0 2px 8px rgba(44,90,160,0.10);
        }
        .navbar-link-active {
          background: linear-gradient(90deg, #2563eb 0%, #2d9cdb 100%);
          color: #fff;
          box-shadow: 0 4px 16px rgba(44,90,160,0.15);
        }
        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
        }
        .nav-text {
          font-size: 1rem;
          font-weight: 500;
        }
        .admin-navbar-right {
          display: flex;
          align-items: center;
          gap: 22px;
        }
        .admin-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .admin-avatar {
          width: 38px;
          height: 38px;
          background-color: #e0e7ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563eb;
        }
        .admin-details {
          display: flex;
          flex-direction: column;
        }
        .admin-name {
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          font-size: 1rem;
        }
        .admin-role {
          font-size: 0.8rem;
          color: #64748b;
          margin: 0;
        }
        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .admin-header {
          background-color: var(--white);
          box-shadow: var(--shadow-sm);
          padding: 0 var(--spacing-lg);
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--gray-200);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--gray-500);
          cursor: pointer;
          padding: var(--spacing-sm);
          border-radius: var(--radius-md);
        }

        .mobile-menu-btn:hover {
          background-color: var(--gray-50);
          color: var(--gray-700);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .header-action-btn {
          position: relative;
          background: none;
          border: none;
          color: var(--gray-500);
          cursor: pointer;
          padding: var(--spacing-sm);
          border-radius: var(--radius-md);
          transition: all var(--transition-normal);
        }

        .header-action-btn:hover {
          background-color: var(--gray-50);
          color: var(--gray-700);
        }

        .notification-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 8px;
          height: 8px;
          background-color: var(--accent-red);
          border-radius: 50%;
        }

        .admin-content {
          flex: 1;
          padding: var(--spacing-xl);
        }

        .sidebar-toggle-btn {
          display: none;
          background: none;
          border: none;
          color: var(--primary-blue);
          cursor: pointer;
          margin-right: var(--spacing-md);
          padding: var(--spacing-xs);
          border-radius: var(--radius-md);
          transition: background 0.2s;
        }
        .sidebar-toggle-btn:hover {
          background: var(--gray-100);
        }

        @media (max-width: 1280px) {
          .admin-main {
            margin-left: 80px;
          }
          .admin-sidebar {
            width: 80px;
            min-width: 80px;
          }
          .sidebar-logo-text, .nav-text {
            display: none;
          }
        }

        @media (max-width: 1024px) {
          .admin-sidebar {
            transform: translateX(-100%);
            width: 280px;
          }
          .sidebar-open {
            transform: translateX(0);
          }
          .sidebar-overlay {
            display: block;
          }
          .admin-main {
            margin-left: 0;
          }
          .sidebar-toggle-btn {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
