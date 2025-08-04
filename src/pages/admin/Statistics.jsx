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

      <style jsx>{`
        .statistics-page {
          min-height: calc(100vh - 200px);
          padding: var(--spacing-xl) 0;
        }

        .page-header {
          margin-bottom: var(--spacing-2xl);
          text-align: center;
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
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-icon.blue { background-color: #3b82f6; }
        .stat-icon.green { background-color: #10b981; }
        .stat-icon.purple { background-color: #8b5cf6; }
        .stat-icon.orange { background-color: #f59e0b; }

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

        .stat-change.pending {
          background-color: rgba(243, 156, 18, 0.1);
          color: var(--warning-orange);
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

        .charts-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-2xl);
        }

        .chart-card.full-width {
          grid-column: 1 / -1;
        }

        .chart-content {
          padding: var(--spacing-lg) 0;
        }

        .bar-chart {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .bar-item {
          display: grid;
          grid-template-columns: 80px 1fr 40px;
          gap: var(--spacing-md);
          align-items: center;
        }

        .bar-label {
          font-weight: 500;
          color: var(--gray-700);
        }

        .bar-container {
          height: 24px;
          background-color: var(--gray-200);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          border-radius: var(--radius-sm);
          transition: width var(--transition-normal);
        }

        .bar-value {
          text-align: center;
          font-weight: 600;
          color: var(--gray-700);
        }

        .voting-chart {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .vote-item {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .vote-policy {
          font-weight: 600;
          color: var(--gray-800);
        }

        .vote-bar {
          display: flex;
          height: 24px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background-color: var(--gray-200);
        }

        .vote-yes {
          background-color: var(--accent-green);
        }

        .vote-no {
          background-color: var(--accent-red);
        }

        .vote-stats {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
        }

        .yes-stat {
          color: var(--accent-green);
          font-weight: 600;
        }

        .no-stat {
          color: var(--accent-red);
          font-weight: 600;
        }

        .line-chart {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .chart-legend {
          display: flex;
          gap: var(--spacing-lg);
          justify-content: center;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 2px;
        }

        .legend-color.blue { background-color: #3b82f6; }
        .legend-color.green { background-color: #10b981; }
        .legend-color.purple { background-color: #8b5cf6; }

        .chart-data {
          display: flex;
          justify-content: space-around;
          align-items: end;
          height: 200px;
          padding: var(--spacing-lg);
          background-color: var(--gray-50);
          border-radius: var(--radius-md);
        }

        .month-data {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .month-bars {
          display: flex;
          gap: 4px;
          align-items: end;
        }

        .data-bar {
          width: 12px;
          border-radius: 2px 2px 0 0;
          min-height: 20px;
        }

        .data-bar.blue { background-color: #3b82f6; }
        .data-bar.green { background-color: #10b981; }
        .data-bar.purple { background-color: #8b5cf6; }

        .month-values {
          display: flex;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--gray-600);
        }

        .system-health {
          margin-bottom: var(--spacing-2xl);
        }

        .health-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-lg);
        }

        .health-item {
          padding: var(--spacing-lg);
          border-radius: var(--radius-md);
          text-align: center;
          border: 2px solid;
        }

        .health-item.healthy {
          background-color: rgba(39, 174, 96, 0.1);
          border-color: rgba(39, 174, 96, 0.2);
        }

        .health-item.normal {
          background-color: rgba(243, 156, 18, 0.1);
          border-color: rgba(243, 156, 18, 0.2);
        }

        .health-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-700);
          margin-bottom: var(--spacing-sm);
        }

        .health-value {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: var(--spacing-xs);
        }

        .health-item.healthy .health-value {
          color: var(--accent-green);
        }

        .health-item.normal .health-value {
          color: var(--warning-orange);
        }

        .health-status {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .health-item.healthy .health-status {
          color: var(--accent-green);
        }

        .health-item.normal .health-status {
          color: var(--warning-orange);
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .charts-section {
            grid-template-columns: 1fr;
          }
          
          .health-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AdminLayout>
  );
};

export default Statistics;