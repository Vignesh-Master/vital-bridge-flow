import React from 'react';
import Layout from '../components/Layout';
import hospitalExterior from '../assets/hospital-exterior.jpg';
import medicalDashboard from '../assets/medical-dashboard.jpg';

const Dashboard = () => {
  const statsData = [
    {
      title: 'Total Donors',
      value: '1,248',
      change: '+12%',
      changeType: 'increase',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: 'Active Patients',
      value: '892',
      change: '+8%',
      changeType: 'increase',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: 'Successful Matches',
      value: '456',
      change: '+15%',
      changeType: 'increase',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: 'Transplants Complete',
      value: '378',
      change: '+9%',
      changeType: 'increase',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2"/>
          <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
  ];

  const recentActivities = [
    { id: 1, type: 'donor', name: 'John Smith', action: 'registered as kidney donor', time: '2 hours ago' },
    { id: 2, type: 'match', name: 'Match found', action: 'Patient #892 matched with Donor #445', time: '4 hours ago' },
    { id: 3, type: 'patient', name: 'Sarah Johnson', action: 'added to heart transplant waitlist', time: '6 hours ago' },
    { id: 4, type: 'transplant', name: 'Transplant Success', action: 'Kidney transplant completed successfully', time: '1 day ago' },
    { id: 5, type: 'donor', name: 'Michael Brown', action: 'registered as liver donor', time: '1 day ago' }
  ];

  const urgentCases = [
    { id: 1, name: 'Emily Davis', organ: 'Heart', urgency: 'Critical', waitTime: '89 days' },
    { id: 2, name: 'Robert Wilson', organ: 'Liver', urgency: 'High', waitTime: '156 days' },
    { id: 3, name: 'Lisa Anderson', organ: 'Kidney', urgency: 'High', waitTime: '234 days' }
  ];

  return (
    <Layout>
      <div className="dashboard">
        <div className="container">
          {/* Header Section */}
          <div className="dashboard-header">
            <div className="header-content">
              <div>
                <h1 className="heading-1">Hospital Dashboard</h1>
                <p className="text-large">Apollo Hospital Mumbai - Overview & Analytics</p>
              </div>
              <div className="header-image">
                <img src={hospitalExterior} alt="Hospital" className="hospital-image" />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {statsData.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon">
                    {stat.icon}
                  </div>
                  <div className={`stat-change ${stat.changeType}`}>
                    {stat.change}
                  </div>
                </div>
                <div className="stat-content">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-title">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="content-grid">
            {/* Recent Activities */}
            <div className="content-card">
              <div className="card-header">
                <h3 className="heading-3">Recent Activities</h3>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="activities-list">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>
                      {activity.type === 'donor' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      )}
                      {activity.type === 'patient' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      )}
                      {activity.type === 'match' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      )}
                      {activity.type === 'transplant' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2"/>
                          <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      )}
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">
                        <span className="activity-name">{activity.name}</span> {activity.action}
                      </p>
                      <p className="activity-time">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Urgent Cases */}
            <div className="content-card">
              <div className="card-header">
                <h3 className="heading-3">Urgent Cases</h3>
                <span className="urgent-badge">3 Critical</span>
              </div>
              <div className="urgent-list">
                {urgentCases.map((case_) => (
                  <div key={case_.id} className="urgent-item">
                    <div className="urgent-info">
                      <h4 className="urgent-name">{case_.name}</h4>
                      <p className="urgent-details">{case_.organ} • {case_.waitTime} waiting</p>
                    </div>
                    <div className={`urgency-badge ${case_.urgency.toLowerCase()}`}>
                      {case_.urgency}
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-danger w-full mt-3">
                View All Urgent Cases
              </button>
            </div>

            {/* Analytics Visualization */}
            <div className="content-card analytics-card">
              <div className="card-header">
                <h3 className="heading-3">Monthly Analytics</h3>
                <select className="analytics-filter">
                  <option>Last 6 months</option>
                  <option>Last 12 months</option>
                  <option>Last 24 months</option>
                </select>
              </div>
              <div className="analytics-image">
                <img src={medicalDashboard} alt="Analytics Dashboard" />
              </div>
              <div className="analytics-summary">
                <div className="summary-item">
                  <span className="summary-label">Success Rate</span>
                  <span className="summary-value">94.2%</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Avg. Wait Time</span>
                  <span className="summary-value">127 days</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Monthly Growth</span>
                  <span className="summary-value">+12.5%</span>
                </div>
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Register New Donor
                </button>
                <button className="action-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Register New Patient
                </button>
                <button className="action-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Check Matches
                </button>
                <button className="action-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Generate Report
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

        .hospital-image {
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

        .urgent-badge {
          background-color: rgba(231, 76, 60, 0.1);
          color: var(--accent-red);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-xl);
          font-size: 0.875rem;
          font-weight: 600;
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
          flex-shrink: 0;
        }

        .activity-icon.donor {
          background-color: rgba(44, 90, 160, 0.1);
          color: var(--primary-blue);
        }

        .activity-icon.patient {
          background-color: rgba(45, 156, 219, 0.1);
          color: var(--secondary-teal);
        }

        .activity-icon.match {
          background-color: rgba(39, 174, 96, 0.1);
          color: var(--accent-green);
        }

        .activity-icon.transplant {
          background-color: rgba(243, 156, 18, 0.1);
          color: var(--warning-orange);
        }

        .activity-content {
          flex: 1;
        }

        .activity-text {
          margin: 0 0 var(--spacing-xs);
          color: var(--gray-700);
        }

        .activity-name {
          font-weight: 600;
        }

        .activity-time {
          margin: 0;
          font-size: 0.875rem;
          color: var(--gray-500);
        }

        .urgent-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }

        .urgent-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-md);
        }

        .urgent-name {
          margin: 0 0 var(--spacing-xs);
          font-size: 1rem;
          font-weight: 600;
        }

        .urgent-details {
          margin: 0;
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .urgency-badge {
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-xl);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .urgency-badge.critical {
          background-color: rgba(231, 76, 60, 0.1);
          color: var(--accent-red);
        }

        .urgency-badge.high {
          background-color: rgba(243, 156, 18, 0.1);
          color: var(--warning-orange);
        }

        .analytics-card {
          grid-column: span 2;
        }

        .analytics-filter {
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-md);
          padding: var(--spacing-sm) var(--spacing-md);
          background-color: var(--white);
          cursor: pointer;
        }

        .analytics-image {
          margin: var(--spacing-lg) 0;
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .analytics-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .analytics-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-lg);
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--gray-200);
        }

        .summary-item {
          text-align: center;
        }

        .summary-label {
          display: block;
          font-size: 0.875rem;
          color: var(--gray-600);
          margin-bottom: var(--spacing-xs);
        }

        .summary-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-blue);
        }

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
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

          .analytics-card {
            grid-column: span 1;
          }

          .analytics-summary {
            grid-template-columns: 1fr;
          }

          .quick-actions {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .dashboard-header {
            padding: var(--spacing-lg);
          }

          .content-card {
            padding: var(--spacing-lg);
          }
        }
      `}</style>
    </Layout>
  );
};

export default Dashboard;