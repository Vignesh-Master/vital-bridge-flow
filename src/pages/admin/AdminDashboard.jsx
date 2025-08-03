import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <div className="admin-logo">
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
              <h1 className="admin-title">OrganLink Admin</h1>
            </div>
            <div className="admin-nav">
              <button onClick={() => navigate('/admin/hospitals')} className="nav-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9L12 2L21 9V20A2 2 0 0 1 19 22H5A2 2 0 0 1 3 20V9Z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Hospitals
              </button>
              <button onClick={handleLogout} className="logout-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H9" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 12H9" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="admin-main">
        <div className="container">
          <div className="dashboard-welcome">
            <h2 className="dashboard-title">System Overview</h2>
            <p className="dashboard-subtitle">Monitor and manage the OrganLink platform</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon hospitals">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9L12 2L21 9V20A2 2 0 0 1 19 22H5A2 2 0 0 1 3 20V9Z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="stat-content">
                <h3 className="stat-number">12</h3>
                <p className="stat-label">Total Hospitals</p>
                <p className="stat-change">+2 this month</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon users">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21V19A4 4 0 0 0 13 15H5A4 4 0 0 0 1 19V21" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M23 21V19A4 4 0 0 0 16 15.13" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 3.13A4 4 0 0 1 23 7C23 7 23 7 23 7A4 4 0 0 1 16 10.87" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="stat-content">
                <h3 className="stat-number">25</h3>
                <p className="stat-label">Active Users</p>
                <p className="stat-change">+5 this week</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon transplants">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="stat-content">
                <h3 className="stat-number">67</h3>
                <p className="stat-label">Total Transplants</p>
                <p className="stat-change">+3 today</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon matches">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.09 6.26L18 7L13.09 7.74L12 12L10.91 7.74L6 7L10.91 6.26L12 2Z" fill="currentColor"/>
                  <path d="M19 15L20.09 17.26L23 18L20.09 18.74L19 21L17.91 18.74L15 18L17.91 17.26L19 15Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="stat-content">
                <h3 className="stat-number">145</h3>
                <p className="stat-label">AI Matches</p>
                <p className="stat-change">+12 today</p>
              </div>
            </div>
          </div>
          
          <div className="system-status-card">
            <h3 className="status-title">System Status</h3>
            <div className="status-grid">
              <div className="status-item online">
                <div className="status-indicator"></div>
                <span>All services operational</span>
              </div>
              <div className="status-item online">
                <div className="status-indicator"></div>
                <span>AI Matching Engine</span>
              </div>
              <div className="status-item online">
                <div className="status-indicator"></div>
                <span>Blockchain Network</span>
              </div>
              <div className="status-item online">
                <div className="status-indicator"></div>
                <span>IPFS Storage</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh;
          background: var(--gray-50);
        }

        .admin-header {
          background: var(--gradient-primary);
          color: var(--white);
          padding: var(--spacing-lg) 0;
          box-shadow: var(--shadow-md);
        }

        .admin-header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .admin-logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .admin-title {
          color: var(--white);
          font-family: var(--font-heading);
          font-size: 1.5rem;
          margin: 0;
        }

        .admin-nav {
          display: flex;
          gap: var(--spacing-md);
        }

        .nav-btn, .logout-btn {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm) var(--spacing-md);
          border: none;
          border-radius: var(--radius-md);
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .nav-btn {
          background: rgba(255, 255, 255, 0.2);
          color: var(--white);
        }

        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .logout-btn {
          background: var(--danger-red);
          color: var(--white);
        }

        .logout-btn:hover {
          background: hsl(0, 84%, 45%);
        }

        .admin-main {
          padding: var(--spacing-2xl) 0;
        }

        .dashboard-welcome {
          text-align: center;
          margin-bottom: var(--spacing-3xl);
        }

        .dashboard-title {
          color: var(--gray-900);
          font-family: var(--font-heading);
          font-size: 2.5rem;
          margin-bottom: var(--spacing-sm);
        }

        .dashboard-subtitle {
          color: var(--gray-600);
          font-size: 1.125rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-3xl);
        }

        .stat-card {
          background: var(--white);
          padding: var(--spacing-xl);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
          transition: transform var(--transition-normal);
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
        }

        .stat-icon.hospitals {
          background: var(--primary-blue);
        }

        .stat-icon.users {
          background: var(--accent-green);
        }

        .stat-icon.transplants {
          background: var(--secondary-teal);
        }

        .stat-icon.matches {
          background: var(--warning-orange);
        }

        .stat-content {
          flex: 1;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--gray-900);
          margin: 0 0 var(--spacing-xs);
        }

        .stat-label {
          color: var(--gray-600);
          font-size: 1rem;
          margin: 0 0 var(--spacing-xs);
        }

        .stat-change {
          color: var(--accent-green);
          font-size: 0.875rem;
          font-weight: 500;
          margin: 0;
        }

        .system-status-card {
          background: var(--white);
          padding: var(--spacing-2xl);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
        }

        .status-title {
          color: var(--gray-900);
          font-family: var(--font-heading);
          font-size: 1.5rem;
          margin-bottom: var(--spacing-lg);
        }

        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-lg);
        }

        .status-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          background: var(--gray-50);
        }

        .status-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent-green);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .status-item.online span {
          color: var(--gray-700);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .admin-header-content {
            flex-direction: column;
            gap: var(--spacing-md);
          }

          .admin-nav {
            width: 100%;
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-card {
            text-align: center;
            flex-direction: column;
          }

          .dashboard-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;