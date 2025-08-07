import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

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

  // Chart data for visualizations
  const [chartData] = useState({
    monthlyGrowth: [
      { month: 'Jan', hospitals: 8, organizations: 5, policies: 10 },
      { month: 'Feb', hospitals: 9, organizations: 6, policies: 12 },
      { month: 'Mar', hospitals: 10, organizations: 7, policies: 13 },
      { month: 'Apr', hospitals: 11, organizations: 7, policies: 14 },
      { month: 'May', hospitals: 12, organizations: 8, policies: 15 },
      { month: 'Jun', hospitals: 12, organizations: 8, policies: 15 }
    ],
    systemMetrics: {
      apiResponse: 98.5,
      databaseUptime: 99.9,
      blockchainSync: 100,
      aiAccuracy: 94.2
    }
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
      case 'info': return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
      case 'pending': return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
      default: return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
    }
  };

  const StatCard = ({ title, value, change, icon, color, trend }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          {icon}
        </div>
        <div className={`text-sm font-semibold px-2 py-1 rounded-full ${
          trend === 'up' ? 'bg-green-100 text-green-600' : 
          trend === 'down' ? 'bg-red-100 text-red-600' : 
          'bg-blue-100 text-blue-600'
        }`}>
          {change}
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-gray-600 font-medium">{title}</p>
      </div>
    </div>
  );

  const ProgressBar = ({ label, value, color, max = 100 }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
        activity.status === 'success' ? 'bg-green-100 text-green-600' :
        activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
        activity.status === 'info' ? 'bg-blue-100 text-blue-600' :
        'bg-gray-100 text-gray-600'
      }`}>
        {getStatusIcon(activity.status)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 mb-1">{activity.message}</p>
        <p className="text-xs text-gray-500">{activity.time}</p>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold mb-3">Admin Dashboard</h1>
                <p className="text-xl text-blue-100 mb-4">OrganLink Platform - System Overview & Management</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">All Systems Operational</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-sm">Last updated: 2 minutes ago</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">142</div>
                    <div className="text-blue-200 text-sm">Total Votes Today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Hospitals"
              value={stats.totalHospitals}
              change="+2"
              trend="up"
              color="bg-blue-100 text-blue-600"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18V9l-9-7-9 7v12z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="2"/>
                </svg>
              }
            />
            <StatCard
              title="Organizations"
              value={stats.totalOrganizations}
              change="+1"
              trend="up"
              color="bg-green-100 text-green-600"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
                </svg>
              }
            />
            <StatCard
              title="Active Policies"
              value={stats.activePolicies}
              change={stats.pendingProposals}
              trend="neutral"
              color="bg-purple-100 text-purple-600"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2"/>
                  <path d="M15 3h6v6" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              }
            />
            <StatCard
              title="Total Votes"
              value={stats.totalVotes}
              change="+23"
              trend="up"
              color="bg-orange-100 text-orange-600"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              }
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* System Performance */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">System Performance</h3>
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">All Systems Online</span>
              </div>
              <div className="space-y-6">
                <ProgressBar label="API Response Time" value={chartData.systemMetrics.apiResponse} color="bg-green-500" />
                <ProgressBar label="Database Uptime" value={chartData.systemMetrics.databaseUptime} color="bg-blue-500" />
                <ProgressBar label="Blockchain Sync" value={chartData.systemMetrics.blockchainSync} color="bg-purple-500" />
                <ProgressBar label="AI Matching Accuracy" value={chartData.systemMetrics.aiAccuracy} color="bg-orange-500" />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Growth Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Monthly Growth</h3>
              <div className="space-y-4">
                {chartData.monthlyGrowth.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="font-medium text-gray-700">{item.month}</span>
                    <div className="flex space-x-4">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-blue-600">{item.hospitals}</div>
                        <div className="text-xs text-gray-500">Hospitals</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-green-600">{item.organizations}</div>
                        <div className="text-xs text-gray-500">Organizations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-purple-600">{item.policies}</div>
                        <div className="text-xs text-gray-500">Policies</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">98.5%</div>
                  <div className="text-sm text-gray-600">System Uptime</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">1.2s</div>
                  <div className="text-sm text-gray-600">Avg Response</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-1">99.9%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
              <p className="text-gray-600 mt-1">Manage your platform efficiently</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/admin/create-hospital" className="group">
                <div className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group-hover:shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-200">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 21h18V9l-9-7-9 7v12z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-blue-700">Create Hospital</span>
                </div>
              </Link>
              <Link to="/admin/create-organization" className="group">
                <div className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group-hover:shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center group-hover:bg-green-200">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-green-700">Create Organization</span>
                </div>
              </Link>
              <Link to="/admin/reset-password" className="group">
                <div className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-200 group-hover:shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center group-hover:bg-yellow-200">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-yellow-700">Reset Password</span>
                </div>
              </Link>
              <Link to="/admin/statistics" className="group">
                <div className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group-hover:shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-200">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2"/>
                      <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
                      <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-purple-700">View Statistics</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;