import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
      case 'info': return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
      case 'pending': return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
      default: return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-[calc(100vh-200px)]">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl p-8 mb-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl font-bold font-heading mb-2">Admin Dashboard</h1>
                <p className="text-xl text-blue-100">OrganLink Platform - System Overview & Management</p>
              </div>
              <div className="w-48 h-28 rounded-lg overflow-hidden">
                <img src={medicalDashboard} alt="Dashboard Analytics" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-center mb-4">
                <div className="w-12 h-12 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 21h18V9l-9-7-9 7v12z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="text-sm font-semibold px-2 py-1 rounded-sm bg-green-100 text-green-600">+2</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalHospitals}</h3>
                <p className="text-gray-600 font-medium">Total Hospitals</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-center mb-4">
                <div className="w-12 h-12 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="text-sm font-semibold px-2 py-1 rounded-sm bg-green-100 text-green-600">+1</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalOrganizations}</h3>
                <p className="text-gray-600 font-medium">Organizations</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-center mb-4">
                <div className="w-12 h-12 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2"/>
                    <path d="M15 3h6v6" stroke="currentColor" strokeWidth="2"/>
                    <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="text-sm font-semibold px-2 py-1 rounded-sm bg-green-100 text-green-600">{stats.pendingProposals}</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.activePolicies}</h3>
                <p className="text-gray-600 font-medium">Active Policies</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-center mb-4">
                <div className="w-12 h-12 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="text-sm font-semibold px-2 py-1 rounded-sm bg-green-100 text-green-600">+23</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalVotes}</h3>
                <p className="text-gray-600 font-medium">Total Votes</p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* System Status */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">System Status</h3>
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">All Systems Online</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">API Services</span>
                  </div>
                  <span className="text-sm text-green-600 font-semibold">Healthy</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">Database</span>
                  </div>
                  <span className="text-sm text-green-600 font-semibold">Online</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">Blockchain</span>
                  </div>
                  <span className="text-sm text-green-600 font-semibold">Connected</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">AI Matching</span>
                  </div>
                  <span className="text-sm text-green-600 font-semibold">Active</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.status === 'success' ? 'bg-green-100 text-green-600' :
                      activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      activity.status === 'info' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Actions Section */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/admin/create-hospital" className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 21h18V9l-9-7-9 7v12z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="font-medium text-gray-700 group-hover:text-blue-700">Create Hospital</span>
              </Link>
              <Link to="/admin/create-org" className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center group-hover:bg-green-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="font-medium text-gray-700 group-hover:text-green-700">Create Organization</span>
              </Link>
              <Link to="/admin/reset-password" className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center group-hover:bg-yellow-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="font-medium text-gray-700 group-hover:text-yellow-700">Reset Password</span>
              </Link>
              <Link to="/admin/statistics" className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
                    <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="font-medium text-gray-700 group-hover:text-purple-700">View Statistics</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;