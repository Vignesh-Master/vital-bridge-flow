import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'Create Hospital', href: '/admin/create-hospital', icon: '🏥' },
    { name: 'Create Organization', href: '/admin/create-org', icon: '🏢' },
    { name: 'View Hospitals', href: '/admin/hospitals', icon: '📋' },
    { name: 'View Organizations', href: '/admin/organizations', icon: '🌐' },
    { name: 'Reset Password', href: '/admin/reset-password', icon: '🔑' },
    { name: 'Statistics', href: '/admin/statistics', icon: '📈' },
  ];

  const isCurrentPage = (href) => location.pathname === href;

  return (
    <div className="admin-layout">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
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
            <span className="sidebar-logo-text">OrganLink Admin</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-link ${isCurrentPage(item.href) ? 'nav-link-active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Admin User Info */}
        <div className="sidebar-footer">
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
          <button onClick={handleLogout} className="btn btn-danger btn-small w-full">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="admin-main">
        {/* Top bar */}
        <div className="admin-header">
          <button onClick={() => setSidebarOpen(true)} className="mobile-menu-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="header-actions">
            <button className="header-action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="m13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="notification-badge"></span>
            </button>
            <button className="header-action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="m12 1 1.09 3.26L16 5.64l-1.64 2.73L16 12l-2.73 1.64L16 16l-1.64 1.64L12 18.36l-1.09 3.26L8 20l-1.64-2.73L4 16l1.64-1.64L4 12l2.73-1.64L4 8l1.64-1.64L8 4l1.09-3.26"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="admin-content">
          {children}
        </main>
      </div>

      <style jsx>{`
        .admin-layout {
          min-height: 100vh;
          display: flex;
          background-color: var(--gray-50);
        }

        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 40;
          display: none;
        }

        .admin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 280px;
          background-color: var(--white);
          box-shadow: var(--shadow-lg);
          z-index: 50;
          transform: translateX(-100%);
          transition: transform var(--transition-normal);
          display: flex;
          flex-direction: column;
        }

        .sidebar-open {
          transform: translateX(0);
        }

        .sidebar-header {
          padding: var(--spacing-lg);
          border-bottom: 1px solid var(--gray-200);
          background: var(--gradient-primary);
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .sidebar-logo-text {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--white);
        }

        .sidebar-nav {
          flex: 1;
          padding: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          color: var(--gray-700);
          text-decoration: none;
          border-radius: var(--radius-md);
          font-weight: 500;
          transition: all var(--transition-normal);
        }

        .nav-link:hover {
          background-color: var(--gray-50);
          color: var(--primary-blue);
        }

        .nav-link-active {
          background-color: rgba(44, 90, 160, 0.1);
          color: var(--primary-blue);
          border-left: 4px solid var(--primary-blue);
        }

        .nav-icon {
          font-size: 1.2rem;
        }

        .sidebar-footer {
          padding: var(--spacing-lg);
          border-top: 1px solid var(--gray-200);
        }

        .admin-user-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }

        .admin-avatar {
          width: 40px;
          height: 40px;
          background-color: rgba(44, 90, 160, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-blue);
        }

        .admin-details {
          flex: 1;
        }

        .admin-name {
          font-weight: 600;
          color: var(--gray-900);
          margin: 0;
          font-size: 0.875rem;
        }

        .admin-role {
          font-size: 0.75rem;
          color: var(--gray-500);
          margin: 0;
        }

        .admin-main {
          flex: 1;
          margin-left: 280px;
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

        @media (max-width: 1024px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }

          .sidebar-overlay {
            display: block;
          }

          .admin-main {
            margin-left: 0;
          }

          .mobile-menu-btn {
            display: block;
          }
        }
      `}</style>
    </div>
};

export default AdminLayout;
