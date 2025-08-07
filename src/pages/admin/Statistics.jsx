import React from 'react';
import AdminLayout from '@/components/AdminLayout';

const Statistics = () => {
  const platformStats = [
    { name: 'Hospitals', value: 12, color: '#3b82f6' },
    { name: 'Organizations', value: 8, color: '#10b981' },
    { name: 'Active Policies', value: 15, color: '#8b5cf6' },
    { name: 'Pending Proposals', value: 3, color: '#f59e0b' }
  ];

  const hospitalsByRegion = [
    { region: 'North', hospitals: 4 },
    { region: 'South', hospitals: 3 },
    { region: 'East', hospitals: 2 },
    { region: 'West', hospitals: 3 }
  ];

  const monthlyActivity = [
    { month: 'Jan', hospitals: 8, organizations: 5, policies: 10 },
    { month: 'Feb', hospitals: 10, organizations: 6, policies: 12 },
    { month: 'Mar', hospitals: 12, organizations: 8, policies: 15 }
  ];

  const policyVotes = [
    { policy: 'Kidney Priority', yesVotes: 85, noVotes: 15 },
    { policy: 'Liver Allocation', yesVotes: 72, noVotes: 28 },
    { policy: 'Heart Protocol', yesVotes: 91, noVotes: 9 },
    { policy: 'Age Restrictions', yesVotes: 63, noVotes: 37 }
  ];

  return (
    <AdminLayout>
      <div className="statistics-page">
        <div className="container">
          {/* Header */}
          <div className="page-header">
            <h1 className="heading-1">Platform Statistics</h1>
            <p className="text-large">Comprehensive analytics and insights for the OrganLink platform</p>
          </div>

          {/* Key Metrics */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon blue">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 21h18V9l-9-7-9 7v12z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-change increase">+2</div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">12</h3>
                <p className="stat-title">Total Hospitals</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-change increase">+1</div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">8</h3>
                <p className="stat-title">Organizations</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon purple">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2"/>
                    <path d="M15 3h6v6" stroke="currentColor" strokeWidth="2"/>
                    <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-change pending">3</div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">15</h3>
                <p className="stat-title">Active Policies</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon orange">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-change increase">+23</div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">142</h3>
                <p className="stat-title">Total Votes</p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            {/* Regional Distribution */}
            <div className="chart-card card">
              <div className="card-header">
                <h3 className="heading-3">Hospitals by Region</h3>
                <p className="text-normal">Geographic distribution of hospitals</p>
              </div>
              <div className="chart-content">
                <div className="bar-chart">
                  {hospitalsByRegion.map((region, index) => (
                    <div key={region.region} className="bar-item">
                      <div className="bar-label">{region.region}</div>
                      <div className="bar-container">
                        <div 
                          className="bar-fill" 
                          style={{ 
                            width: `${(region.hospitals / 4) * 100}%`,
                            backgroundColor: '#3b82f6'
                          }}
                        ></div>
                      </div>
                      <div className="bar-value">{region.hospitals}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Policy Voting Results */}
            <div className="chart-card card">
              <div className="card-header">
                <h3 className="heading-3">Policy Voting Results</h3>
                <p className="text-normal">Yes vs No votes for recent policies</p>
              </div>
              <div className="chart-content">
                <div className="voting-chart">
                  {policyVotes.map((policy, index) => (
                    <div key={policy.policy} className="vote-item">
                      <div className="vote-policy">{policy.policy}</div>
                      <div className="vote-bar">
                        <div 
                          className="vote-yes" 
                          style={{ width: `${policy.yesVotes}%` }}
                          title={`Yes: ${policy.yesVotes}%`}
                        ></div>
                        <div 
                          className="vote-no" 
                          style={{ width: `${policy.noVotes}%` }}
                          title={`No: ${policy.noVotes}%`}
                        ></div>
                      </div>
                      <div className="vote-stats">
                        <span className="yes-stat">{policy.yesVotes}% Yes</span>
                        <span className="no-stat">{policy.noVotes}% No</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Monthly Growth */}
            <div className="chart-card card full-width">
              <div className="card-header">
                <h3 className="heading-3">Monthly Growth</h3>
                <p className="text-normal">Platform growth over time</p>
              </div>
              <div className="chart-content">
                <div className="line-chart">
                  <div className="chart-legend">
                    <div className="legend-item">
                      <div className="legend-color blue"></div>
                      <span>Hospitals</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color green"></div>
                      <span>Organizations</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color purple"></div>
                      <span>Policies</span>
                    </div>
                  </div>
                  <div className="chart-data">
                    {monthlyActivity.map((month, index) => (
                      <div key={month.month} className="month-data">
                        <div className="month-label">{month.month}</div>
                        <div className="month-bars">
                          <div className="data-bar blue" style={{ height: `${month.hospitals * 8}px` }}></div>
                          <div className="data-bar green" style={{ height: `${month.organizations * 12}px` }}></div>
                          <div className="data-bar purple" style={{ height: `${month.policies * 6}px` }}></div>
                        </div>
                        <div className="month-values">
                          <small>{month.hospitals}</small>
                          <small>{month.organizations}</small>
                          <small>{month.policies}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="system-health card">
            <div className="card-header">
              <h3 className="heading-3">System Health & Performance</h3>
              <p className="text-normal">Real-time system metrics and performance indicators</p>
            </div>
            <div className="health-grid">
              <div className="health-item healthy">
                <div className="health-label">API Response Time</div>
                <div className="health-value">124ms</div>
                <div className="health-status">Excellent</div>
              </div>
              <div className="health-item healthy">
                <div className="health-label">Database Connections</div>
                <div className="health-value">23/50</div>
                <div className="health-status">Healthy</div>
              </div>
              <div className="health-item healthy">
                <div className="health-label">Blockchain Sync</div>
                <div className="health-value">100%</div>
                <div className="health-status">Synchronized</div>
              </div>
              <div className="health-item normal">
                <div className="health-label">Storage Usage</div>
                <div className="health-value">67%</div>
                <div className="health-status">Normal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Statistics;
export default Statistics;