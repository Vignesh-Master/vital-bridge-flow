import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { donorAPI, patientAPI, aiMatchingAPI } from '../services/api';
import { 
  FaUserPlus, 
  FaHeartbeat, 
  FaChartLine, 
  FaBell, 
  FaSearch, 
  FaFilter,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaMapMarkerAlt
} from 'react-icons/fa';

const EnhancedDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [hospitalInfo, setHospitalInfo] = useState(null);
  const [stats, setStats] = useState({
    totalDonors: 0,
    activePatients: 0,
    availableDonors: 0,
    transplantsCompleted: 0,
    pendingMatches: 0,
    criticalCases: 0
  });
  const [recentMatches, setRecentMatches] = useState([]);
  const [urgentCases, setUrgentCases] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Chart data
  const [monthlyData, setMonthlyData] = useState([]);
  const [organTypeData, setOrganTypeData] = useState([]);
  const [matchingTrends, setMatchingTrends] = useState([]);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load hospital info
      const hospitalData = JSON.parse(localStorage.getItem('hospital_info') || '{}');
      setHospitalInfo(hospitalData);

      // Load statistics
      const [donorStats, patientStats, criticalPatients, matchNotifications] = await Promise.all([
        donorAPI.getDonorStats().catch(() => ({ success: false, data: {} })),
        patientAPI.getPatientStats().catch(() => ({ success: false, data: {} })),
        patientAPI.getCriticalPatients().catch(() => ({ success: false, data: [] })),
        aiMatchingAPI.getNotifications().catch(() => ({ success: false, data: [] }))
      ]);

      // Update stats
      setStats({
        totalDonors: donorStats.data?.total || 0,
        activePatients: patientStats.data?.waiting || 0,
        availableDonors: donorStats.data?.available || 0,
        transplantsCompleted: donorStats.data?.transplanted || 0,
        pendingMatches: matchNotifications.data?.length || 0,
        criticalCases: criticalPatients.data?.length || 0
      });

      // Load chart data
      loadChartData();
      
      // Load recent matches and urgent cases
      setRecentMatches(generateMockMatches());
      setUrgentCases(criticalPatients.data || []);
      setNotifications(matchNotifications.data || []);

    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadChartData = () => {
    // Mock data for charts - in real app, this would come from API
    setMonthlyData([
      { month: 'Jan', donors: 12, patients: 8, matches: 6 },
      { month: 'Feb', donors: 15, patients: 10, matches: 8 },
      { month: 'Mar', donors: 18, patients: 12, matches: 10 },
      { month: 'Apr', donors: 14, patients: 9, matches: 7 },
      { month: 'May', donors: 20, patients: 15, matches: 12 },
      { month: 'Jun', donors: 22, patients: 18, matches: 14 }
    ]);

    setOrganTypeData([
      { name: 'Kidney', value: 45, color: '#3B82F6' },
      { name: 'Liver', value: 25, color: '#10B981' },
      { name: 'Heart', value: 15, color: '#EF4444' },
      { name: 'Lung', value: 10, color: '#F59E0B' },
      { name: 'Pancreas', value: 5, color: '#8B5CF6' }
    ]);

    setMatchingTrends([
      { day: 'Mon', success: 85, pending: 15 },
      { day: 'Tue', success: 90, pending: 10 },
      { day: 'Wed', success: 88, pending: 12 },
      { day: 'Thu', success: 92, pending: 8 },
      { day: 'Fri', success: 87, pending: 13 },
      { day: 'Sat', success: 82, pending: 18 },
      { day: 'Sun', success: 80, pending: 20 }
    ]);
  };

  const generateMockMatches = () => [
    {
      id: 1,
      donorName: 'John Smith',
      patientName: 'Sarah Johnson',
      organType: 'Kidney',
      matchScore: 95,
      status: 'Pending',
      date: '2024-01-15',
      urgency: 'High'
    },
    {
      id: 2,
      donorName: 'Maria Garcia',
      patientName: 'Robert Wilson',
      organType: 'Liver',
      matchScore: 88,
      status: 'Approved',
      date: '2024-01-14',
      urgency: 'Critical'
    },
    {
      id: 3,
      donorName: 'David Chen',
      patientName: 'Emily Davis',
      organType: 'Heart',
      matchScore: 92,
      status: 'In Progress',
      date: '2024-01-13',
      urgency: 'Critical'
    }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6'];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="enhanced-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-info">
            <h1 className="dashboard-title">Hospital Dashboard</h1>
            <p className="hospital-name">{hospitalInfo.name || 'Apollo Hospital'}</p>
            <div className="hospital-meta">
              <span className="meta-item">
                <FaMapMarkerAlt className="meta-icon" />
                {hospitalInfo.city || 'Mumbai'}, {hospitalInfo.stateName || 'Maharashtra'}
              </span>
              <span className="meta-item">
                <FaClock className="meta-icon" />
                Last updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => navigate('/hospital/donor-register')}>
              <FaUserPlus className="btn-icon" />
              Register Donor
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/hospital/patient-register')}>
              <FaHeartbeat className="btn-icon" />
              Register Patient
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <FaUserPlus />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalDonors}</h3>
            <p className="stat-label">Total Donors</p>
            <span className="stat-change positive">+12% from last month</span>
          </div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-icon">
            <FaHeartbeat />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.activePatients}</h3>
            <p className="stat-label">Active Patients</p>
            <span className="stat-change positive">+8% from last month</span>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.transplantsCompleted}</h3>
            <p className="stat-label">Transplants Completed</p>
            <span className="stat-change positive">+15% from last month</span>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <FaExclamationTriangle />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.criticalCases}</h3>
            <p className="stat-label">Critical Cases</p>
            <span className="stat-change negative">+3 from yesterday</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'matches' ? 'active' : ''}`}
          onClick={() => setActiveTab('matches')}
        >
          Recent Matches
        </button>
        <button 
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button 
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-grid">
            {/* Monthly Trends Chart */}
            <div className="chart-card">
              <div className="chart-header">
                <h3>Monthly Trends</h3>
                <div className="chart-actions">
                  <button className="chart-btn">
                    <FaDownload />
                  </button>
                  <button className="chart-btn">
                    <FaEye />
                  </button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="donors" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="patients" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="matches" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Organ Type Distribution */}
            <div className="chart-card">
              <div className="chart-header">
                <h3>Organ Type Distribution</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={organTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {organTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Matches */}
            <div className="matches-card">
              <div className="card-header">
                <h3>Recent Matches</h3>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="matches-list">
                {recentMatches.map((match) => (
                  <div key={match.id} className="match-item">
                    <div className="match-info">
                      <div className="match-participants">
                        <span className="donor">{match.donorName}</span>
                        <span className="arrow">→</span>
                        <span className="patient">{match.patientName}</span>
                      </div>
                      <div className="match-details">
                        <span className="organ-type">{match.organType}</span>
                        <span className={`urgency ${match.urgency.toLowerCase()}`}>
                          {match.urgency}
                        </span>
                      </div>
                    </div>
                    <div className="match-score">
                      <span className="score">{match.matchScore}%</span>
                      <span className={`status ${match.status.toLowerCase()}`}>
                        {match.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Urgent Cases */}
            <div className="urgent-card">
              <div className="card-header">
                <h3>Urgent Cases</h3>
                <span className="urgent-count">{urgentCases.length} Critical</span>
              </div>
              <div className="urgent-list">
                {urgentCases.slice(0, 3).map((case_, index) => (
                  <div key={index} className="urgent-item">
                    <div className="urgent-info">
                      <h4>{case_.name || `Patient ${index + 1}`}</h4>
                      <p>{case_.organType || 'Heart'} • {case_.waitTime || '89 days'} waiting</p>
                    </div>
                    <div className="urgency-badge critical">Critical</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'matches' && (
          <div className="matches-tab">
            <div className="matches-header">
              <h2>Recent Matches</h2>
              <div className="matches-filters">
                <div className="search-box">
                  <FaSearch className="search-icon" />
                  <input type="text" placeholder="Search matches..." />
                </div>
                <select className="filter-select">
                  <option>All Organs</option>
                  <option>Kidney</option>
                  <option>Liver</option>
                  <option>Heart</option>
                </select>
                <select className="filter-select">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>In Progress</option>
                </select>
              </div>
            </div>
            <div className="matches-table">
              <table>
                <thead>
                  <tr>
                    <th>Donor</th>
                    <th>Patient</th>
                    <th>Organ</th>
                    <th>Match Score</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMatches.map((match) => (
                    <tr key={match.id}>
                      <td>{match.donorName}</td>
                      <td>{match.patientName}</td>
                      <td>
                        <span className="organ-badge">{match.organType}</span>
                      </td>
                      <td>
                        <div className="score-bar">
                          <div 
                            className="score-fill" 
                            style={{ width: `${match.matchScore}%` }}
                          ></div>
                          <span>{match.matchScore}%</span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${match.status.toLowerCase()}`}>
                          {match.status}
                        </span>
                      </td>
                      <td>{match.date}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view">
                            <FaEye />
                          </button>
                          <button className="action-btn edit">
                            <FaEdit />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-tab">
            <div className="analytics-grid">
              <div className="chart-card full-width">
                <div className="chart-header">
                  <h3>Matching Success Trends</h3>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={matchingTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="success" fill="#10B981" />
                    <Bar dataKey="pending" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="notifications-tab">
            <div className="notifications-header">
              <h2>Notifications</h2>
              <button className="mark-all-read">Mark All as Read</button>
            </div>
            <div className="notifications-list">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={index} className="notification-item">
                    <div className="notification-icon">
                      <FaBell />
                    </div>
                    <div className="notification-content">
                      <h4>{notification.title || 'New Match Found'}</h4>
                      <p>{notification.message || 'A potential match has been identified for your patient.'}</p>
                      <span className="notification-time">2 hours ago</span>
                    </div>
                    <button className="notification-action">View</button>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <FaBell className="empty-icon" />
                  <h3>No new notifications</h3>
                  <p>You're all caught up!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .enhanced-dashboard {
          padding: 2rem;
          background: #f8fafc;
          min-height: 100vh;
        }

        .dashboard-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
          color: white;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dashboard-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .hospital-name {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 1rem;
        }

        .hospital-meta {
          display: flex;
          gap: 1rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .meta-icon {
          font-size: 0.8rem;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-4px);
        }

        .stat-card.primary { border-left: 4px solid #3b82f6; }
        .stat-card.secondary { border-left: 4px solid #10b981; }
        .stat-card.success { border-left: 4px solid #f59e0b; }
        .stat-card.warning { border-left: 4px solid #ef4444; }

        .stat-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .stat-card.primary .stat-icon { background: #dbeafe; color: #3b82f6; }
        .stat-card.secondary .stat-icon { background: #d1fae5; color: #10b981; }
        .stat-card.success .stat-icon { background: #fef3c7; color: #f59e0b; }
        .stat-card.warning .stat-icon { background: #fee2e2; color: #ef4444; }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          color: #6b7280;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .stat-change {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .stat-change.positive { color: #10b981; }
        .stat-change.negative { color: #ef4444; }

        .dashboard-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          background: white;
          padding: 0.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .tab-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          background: none;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn.active {
          background: #3b82f6;
          color: white;
        }

        .tab-content {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .overview-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .chart-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .chart-actions {
          display: flex;
          gap: 0.5rem;
        }

        .chart-btn {
          padding: 0.5rem;
          border: none;
          background: #f3f4f6;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .chart-btn:hover {
          background: #e5e7eb;
        }

        .matches-card, .urgent-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .view-all-btn {
          color: #3b82f6;
          background: none;
          border: none;
          font-weight: 500;
          cursor: pointer;
        }

        .matches-list, .urgent-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .match-item, .urgent-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
        }

        .match-participants {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
        }

        .arrow {
          color: #6b7280;
        }

        .match-details {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }

        .organ-type {
          background: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }

        .urgency {
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .urgency.high { background: #fef3c7; color: #d97706; }
        .urgency.critical { background: #fee2e2; color: #dc2626; }

        .match-score {
          text-align: right;
        }

        .score {
          font-size: 1.25rem;
          font-weight: 700;
          color: #3b82f6;
        }

        .status {
          display: block;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        .status.pending { color: #f59e0b; }
        .status.approved { color: #10b981; }
        .status.in-progress { color: #3b82f6; }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
          gap: 1rem;
        }

        .loading-spinner {
          width: 3rem;
          height: 3rem;
          border: 3px solid #e5e7eb;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .enhanced-dashboard {
            padding: 1rem;
          }

          .header-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .overview-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-tabs {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedDashboard;
