import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import medicalDashboard from '../../assets/medical-dashboard.jpg';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalHospitals: 12,
    totalOrganizations: 8,
    activePolicies: 15,
    pendingProposals: 3,
    totalVotes: 142,
    systemStatus: 'healthy'
  });

  const [recentActivity] = useState([
    { id: 1, type: 'hospital', message: 'New hospital "Delhi Medical Center" created', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'organization', message: 'Organization "Heart Foundation" updated voting rights', time: '4 hours ago', status: 'info' },
    { id: 3, type: 'policy', message: 'Policy "Kidney Allocation Priority" approved', time: '6 hours ago', status: 'success' },
    { id: 4, type: 'vote', message: 'New proposal for liver allocation received 5 votes', time: '8 hours ago', status: 'pending' }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'info': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'info': return <Activity className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="dashboard">
        <div className="container">
          {/* Header Section */}
          <div className="dashboard-header">
            <div className="header-content">
              <div>
                <h1 className="heading-1">Admin Dashboard</h1>
                <p className="text-large">OrganLink Platform - System Overview & Management</p>
              </div>
              <div className="header-image">
                <img src={medicalDashboard} alt="Dashboard Analytics" className="dashboard-image" />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 21h18V9l-9-7-9 7v12z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-change increase">+2</div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.totalHospitals}</h3>
                <p className="stat-title">Total Hospitals</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-change increase">+1</div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.totalOrganizations}</h3>
                <p className="stat-title">Organizations</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2"/>
                    <path d="M15 3h6v6" stroke="currentColor" strokeWidth="2"/>
                    <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-change increase">{stats.pendingProposals}</div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.activePolicies}</h3>
                <p className="stat-title">Active Policies</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-change increase">+23</div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.totalVotes}</h3>
                <p className="stat-title">Total Votes</p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="content-grid">
            {/* System Status */}
            <div className="content-card">
              <div className="card-header">
                <h3 className="heading-3">System Status</h3>
                <span className="status-badge status-matched">All Systems Online</span>
              </div>
              <div className="system-status-list">
                <div className="status-item">
                  <div className="status-indicator healthy"></div>
                  <span className="status-label">API Services</span>
                  <span className="status-value">Healthy</span>
                </div>
                <div className="status-item">
                  <div className="status-indicator healthy"></div>
                  <span className="status-label">Database</span>
                  <span className="status-value">Online</span>
                </div>
                <div className="status-item">
                  <div className="status-indicator healthy"></div>
                  <span className="status-label">Blockchain</span>
                  <span className="status-value">Connected</span>
                </div>
                <div className="status-item">
                  <div className="status-indicator healthy"></div>
                  <span className="status-label">AI Matching</span>
                  <span className="status-value">Active</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="content-card">
              <div className="card-header">
                <h3 className="heading-3">Recent Activity</h3>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="activities-list">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.status}`}>
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">{activity.message}</p>
                      <p className="activity-time">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="content-card">
              <div className="card-header">
                <h3 className="heading-3">Quick Actions</h3>
              </div>
              <div className="quick-actions">
                <button className="action-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 21h18V9l-9-7-9 7v12z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Create Hospital
                </button>
                <button className="action-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Create Organization
                </button>
                <button className="action-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Reset Password
                </button>
                <button className="action-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
                    <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  View Statistics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          min-height: calc(100vh - 200px);
        }

        .dashboard-header {
          background: var(--gradient-primary);
          border-radius: var(--radius-xl);
          padding: var(--spacing-2xl);
          margin-bottom: var(--spacing-2xl);
          color: var(--white);
        }

        .header-content {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: var(--spacing-2xl);
          align-items: center;
        }

        .header-image {
          width: 200px;
          height: 120px;
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .dashboard-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-2xl);
        }

        .stat-card {
          background-color: var(--white);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
          box-shadow: var(--shadow-md);
          transition: transform var(--transition-normal);
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background: rgba(44, 90, 160, 0.1);
          color: var(--primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-change {
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .stat-change.increase {
          background-color: rgba(39, 174, 96, 0.1);
          color: var(--accent-green);
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: var(--spacing-xs);
        }

        .stat-title {
          color: var(--gray-600);
          font-weight: 500;
          margin: 0;
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--spacing-xl);
        }

        .content-card {
          background-color: var(--white);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
          box-shadow: var(--shadow-md);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid var(--gray-200);
        }

        .view-all-btn {
          background: none;
          border: none;
          color: var(--primary-blue);
          font-weight: 500;
          cursor: pointer;
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-md);
          transition: background-color var(--transition-normal);
        }

        .view-all-btn:hover {
          background-color: rgba(44, 90, 160, 0.1);
        }

        .system-status-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .status-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          background-color: var(--gray-50);
        }

        .status-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .status-indicator.healthy {
          background-color: var(--accent-green);
        }

        .status-label {
          flex: 1;
          font-weight: 500;
          color: var(--gray-700);
        }

        .status-value {
          font-weight: 600;
          color: var(--accent-green);
        }

        .activities-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .activity-item {
          display: flex;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          transition: background-color var(--transition-normal);
        }

        .activity-item:hover {
          background-color: var(--gray-50);
        }

        .activity-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
        }

        .activity-icon.success {
          background-color: var(--accent-green);
        }

        .activity-icon.info {
          background-color: var(--secondary-teal);
        }

        .activity-icon.pending {
          background-color: var(--warning-orange);
        }

        .activity-content {
          flex: 1;
        }

        .activity-text {
          font-weight: 500;
          color: var(--gray-700);
          margin: 0 0 var(--spacing-xs) 0;
        }

        .activity-time {
          color: var(--gray-500);
          font-size: 0.875rem;
          margin: 0;
        }

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: var(--spacing-md);
        }

        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-lg);
          border: 2px solid var(--gray-200);
          border-radius: var(--radius-md);
          background-color: var(--white);
          color: var(--gray-700);
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .action-btn:hover {
          border-color: var(--primary-blue);
          color: var(--primary-blue);
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .header-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .header-image {
            justify-self: center;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .content-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AdminLayout>
  );
};

export default AdminDashboard;