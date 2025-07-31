import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { aiMatchingAPI, apiUtils } from '../services/api';

const MatchingDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Check authentication
    if (!apiUtils.isAuthenticated()) {
      navigate('/login');
      return;
    }

    loadMatchingData();
  }, [navigate]);

  const loadMatchingData = async () => {
    try {
      setLoading(true);
      
      // Load notifications and unread count
      const [notificationsResponse, unreadResponse] = await Promise.all([
        aiMatchingAPI.getNotifications(),
        aiMatchingAPI.getUnreadCount()
      ]);

      if (notificationsResponse.success) {
        setNotifications(notificationsResponse.data || []);
      }

      if (unreadResponse.success) {
        setUnreadCount(unreadResponse.data || 0);
      }

    } catch (error) {
      console.error('Failed to load matching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerMatching = async () => {
    try {
      const response = await aiMatchingAPI.triggerMatching();
      if (response.success) {
        alert('AI matching triggered successfully!');
        loadMatchingData(); // Reload data
      }
    } catch (error) {
      console.error('Failed to trigger matching:', error);
      alert('Failed to trigger matching. Please try again.');
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await aiMatchingAPI.markAsRead(notificationId);
      loadMatchingData(); // Reload to update unread count
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  // Mock data for demo - in production this would come from the API
  const compatibleMatches = [
    {
      donorId: 1,
      patientId: 2,
      compatibility: 95,
      donor: { name: 'John Smith', bloodType: 'O+', organ: 'Kidney' },
      patient: { name: 'Sarah Wilson', bloodType: 'O+', urgency: 'HIGH' }
    },
    {
      donorId: 2,
      patientId: 3,
      compatibility: 88,
      donor: { name: 'Maria Garcia', bloodType: 'A+', organ: 'Liver' },
      patient: { name: 'David Brown', bloodType: 'A+', urgency: 'CRITICAL' }
    }
  ];

  return (
    <Layout>
      <div className="matching-dashboard">
        <div className="container">
          <div className="page-header">
            <div className="header-content">
              <div>
                <h1 className="heading-1">AI Matching Dashboard</h1>
                <p className="text-large">Real-time organ compatibility analysis and cross-hospital matching</p>
              </div>
              <div className="header-actions">
                <button 
                  className="btn btn-primary"
                  onClick={handleTriggerMatching}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Trigger AI Matching
                </button>
                <div className="notification-indicator">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* AI Matching Status */}
          <div className="matching-status">
            <div className="status-card">
              <div className="status-icon online">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="status-info">
                <h3>AI Matching Service</h3>
                <p>Online and processing matches</p>
                <span className="status-detail">Last run: 2 minutes ago</span>
              </div>
            </div>
            
            <div className="matching-stats">
              <div className="stat-item">
                <span className="stat-value">15</span>
                <span className="stat-label">Active Patients</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">8</span>
                <span className="stat-label">Available Donors</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">3</span>
                <span className="stat-label">New Matches</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">94.2%</span>
                <span className="stat-label">AI Accuracy</span>
              </div>
            </div>
          </div>

          {/* Notifications Panel */}
          {notifications.length > 0 && (
            <div className="notifications-panel">
              <div className="panel-header">
                <h3 className="heading-3">Recent Match Notifications</h3>
                <span className="notification-count">{notifications.length} notifications</span>
              </div>
              <div className="notifications-list">
                {notifications.slice(0, 5).map((notification, index) => (
                  <div 
                    key={index} 
                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                    onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                  >
                    <div className="notification-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="notification-content">
                      <p className="notification-text">
                        {notification.message || `New match found: ${notification.compatibility}% compatibility`}
                      </p>
                      <p className="notification-time">
                        {notification.createdAt || '5 minutes ago'}
                      </p>
                    </div>
                    {!notification.read && <div className="unread-indicator"></div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="matches-grid">
            {compatibleMatches.map((match, index) => (
              <div key={index} className="match-card">
                <div className="compatibility-score">
                  <span className="score">{match.compatibility}%</span>
                  <span className="label">Compatible</span>
                </div>
                
                <div className="match-details">
                  <div className="donor-section">
                    <h4>Donor</h4>
                    <p>{match.donor.name}</p>
                    <span className="blood-type">{match.donor.bloodType}</span>
                    <span className="organ">{match.donor.organ}</span>
                  </div>
                  
                  <div className="patient-section">
                    <h4>Patient</h4>
                    <p>{match.patient.name}</p>
                    <span className="blood-type">{match.patient.bloodType}</span>
                    <span className={`urgency ${match.patient.urgency.toLowerCase()}`}>
                      {match.patient.urgency}
                    </span>
                  </div>
                </div>

                <button className="btn btn-primary w-full">
                  Proceed with Match
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .matching-dashboard {
          min-height: calc(100vh - 200px);
        }

        .page-header {
          margin-bottom: var(--spacing-2xl);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-xl);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
        }

        .notification-indicator {
          position: relative;
          padding: var(--spacing-md);
          background-color: var(--white);
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .notification-indicator:hover {
          background-color: var(--gray-50);
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background-color: var(--accent-red);
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 18px;
          text-align: center;
        }

        .matching-status {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-2xl);
          padding: var(--spacing-xl);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: var(--radius-xl);
          color: white;
        }

        .status-card {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .status-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .status-icon.online {
          background-color: rgba(34, 197, 94, 0.2);
          color: #22C55E;
        }

        .status-info h3 {
          margin: 0 0 var(--spacing-xs) 0;
          font-weight: 600;
        }

        .status-info p {
          margin: 0;
          opacity: 0.9;
        }

        .status-detail {
          font-size: 0.875rem;
          opacity: 0.7;
        }

        .matching-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: var(--spacing-lg);
        }

        .stat-item {
          text-align: center;
          padding: var(--spacing-md);
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
        }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: var(--spacing-xs);
        }

        .stat-label {
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .notifications-panel {
          background-color: var(--white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          margin-bottom: var(--spacing-2xl);
          overflow: hidden;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-xl);
          border-bottom: 1px solid var(--gray-200);
          background-color: var(--gray-50);
        }

        .notification-count {
          background-color: rgba(59, 130, 246, 0.1);
          color: #3B82F6;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-xl);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .notifications-list {
          max-height: 300px;
          overflow-y: auto;
        }

        .notification-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-lg);
          border-bottom: 1px solid var(--gray-200);
          cursor: pointer;
          transition: background-color var(--transition-normal);
          position: relative;
        }

        .notification-item:hover {
          background-color: var(--gray-50);
        }

        .notification-item.unread {
          background-color: rgba(59, 130, 246, 0.05);
          border-left: 3px solid #3B82F6;
        }

        .notification-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: rgba(34, 197, 94, 0.1);
          color: #22C55E;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notification-text {
          font-weight: 500;
          margin: 0;
        }

        .notification-time {
          color: var(--gray-500);
          font-size: 0.875rem;
          margin: 0;
        }

        .unread-indicator {
          position: absolute;
          right: var(--spacing-lg);
          width: 8px;
          height: 8px;
          background-color: #3B82F6;
          border-radius: 50%;
        }

        .matches-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--spacing-xl);
        }

        .match-card {
          background-color: var(--white);
          border-radius: var(--radius-xl);
          padding: var(--spacing-xl);
          box-shadow: var(--shadow-lg);
          border: 2px solid var(--accent-green);
        }

        .compatibility-score {
          text-align: center;
          margin-bottom: var(--spacing-lg);
        }

        .score {
          display: block;
          font-size: 3rem;
          font-weight: 700;
          color: var(--accent-green);
        }

        .match-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-xl);
        }

        .donor-section, .patient-section {
          padding: var(--spacing-lg);
          background-color: var(--gray-50);
          border-radius: var(--radius-md);
        }

        .urgency.critical {
          background-color: rgba(231, 76, 60, 0.1);
          color: var(--accent-red);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .urgency.high {
          background-color: rgba(243, 156, 18, 0.1);
          color: var(--warning-orange);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
        }
      `}</style>
    </Layout>
  );
};

export default MatchingDashboard;