import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OrgPolicies = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mockPolicies = [
    {
      id: 'POL-001',
      title: 'Cross-Border Organ Sharing Protocol',
      description: 'Standardized procedures for international organ transfers including documentation and logistics.',
      status: 'Active',
      organType: 'All',
      proposedBy: 'WHO',
      votesFor: 12,
      votesAgainst: 3,
      totalVotes: 15,
      votingDeadline: '2024-02-15',
      createdAt: '2024-01-15'
    },
    {
      id: 'POL-002',
      title: 'Emergency Kidney Allocation Priority',
      description: 'Updated priority system for emergency kidney transplants based on medical urgency and compatibility.',
      status: 'Pending',
      organType: 'Kidney',
      proposedBy: 'UNOS',
      votesFor: 8,
      votesAgainst: 2,
      totalVotes: 10,
      votingDeadline: '2024-02-20',
      createdAt: '2024-01-20'
    },
    {
      id: 'POL-003',
      title: 'Pediatric Heart Transplant Guidelines',
      description: 'Special considerations and priority protocols for pediatric heart transplant cases.',
      status: 'Active',
      organType: 'Heart',
      proposedBy: 'American Heart Association',
      votesFor: 15,
      votesAgainst: 1,
      totalVotes: 16,
      votingDeadline: '2024-01-30',
      createdAt: '2024-01-01'
    },
    {
      id: 'POL-004',
      title: 'Living Donor Protection Standards',
      description: 'Enhanced safety and ethical standards for living donor procedures and follow-up care.',
      status: 'Pending',
      organType: 'All',
      proposedBy: 'International Transplant Society',
      votesFor: 6,
      votesAgainst: 4,
      totalVotes: 10,
      votingDeadline: '2024-02-25',
      createdAt: '2024-01-25'
    },
    {
      id: 'POL-005',
      title: 'Liver Allocation Geographic Boundaries',
      description: 'Revised geographic boundaries for liver allocation to improve equity and reduce wait times.',
      status: 'Rejected',
      organType: 'Liver',
      proposedBy: 'European Liver Transplant Registry',
      votesFor: 4,
      votesAgainst: 11,
      totalVotes: 15,
      votingDeadline: '2024-01-10',
      createdAt: '2023-12-15'
    }
  ];

  const filteredPolicies = mockPolicies.filter(policy => {
    const matchesTab = activeTab === 'all' || 
                     (activeTab === 'active' && policy.status === 'Active') ||
                     (activeTab === 'pending' && policy.status === 'Pending') ||
                     (activeTab === 'my' && policy.proposedBy === 'Global Health Alliance');
    
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.organType.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Active': 'status-badge status-matched',
      'Pending': 'status-badge status-waiting',
      'Rejected': 'status-badge status-high'
    };
    return statusClasses[status] || 'status-badge';
  };

  const getVotePercentage = (votesFor, totalVotes) => {
    return totalVotes > 0 ? Math.round((votesFor / totalVotes) * 100) : 0;
  };

  return (
    <div className="org-policies">
      {/* Header */}
      <header className="org-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h2>OrganLink</h2>
              <span className="org-name">Global Health Alliance</span>
            </div>
            <nav className="org-nav">
              <Link to="/org/policies" className="nav-link active">Policies</Link>
              <Link to="/org/propose" className="nav-link">Propose</Link>
              <Link to="/org/vote" className="nav-link">Vote</Link>
              <Link to="/org/history" className="nav-link">History</Link>
            </nav>
            <div className="header-actions">
              <button className="btn btn-secondary btn-small">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Profile
              </button>
              <Link to="/org/login" className="btn btn-danger btn-small">Logout</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <div>
              <h1 className="heading-1">Global Policies</h1>
              <p className="text-large">View and manage organ transplant policies</p>
            </div>
            <div className="header-actions">
              <Link to="/org/propose" className="btn btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19" stroke="currentColor" strokeWidth="2"/>
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Propose New Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Policies
            </button>
            <button
              className={`tab ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Active
            </button>
            <button
              className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Vote
            </button>
            <button
              className={`tab ${activeTab === 'my' ? 'active' : ''}`}
              onClick={() => setActiveTab('my')}
            >
              My Proposals
            </button>
          </div>
          <div className="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <input
              type="text"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Policies List */}
        <div className="policies-container">
          {filteredPolicies.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 16L12 12L8 8" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 16L12 12L16 8" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <h3>No policies found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="policies-list">
              {filteredPolicies.map(policy => (
                <div key={policy.id} className="policy-card">
                  <div className="policy-header">
                    <div className="policy-meta">
                      <span className="policy-id">{policy.id}</span>
                      <span className={getStatusBadge(policy.status)}>{policy.status}</span>
                      <span className="organ-type">{policy.organType}</span>
                    </div>
                    <div className="policy-actions">
                      {policy.status === 'Pending' && (
                        <Link to={`/org/vote?policy=${policy.id}`} className="btn btn-primary btn-small">
                          Vote
                        </Link>
                      )}
                      <button className="btn btn-secondary btn-small">
                        View Details
                      </button>
                    </div>
                  </div>
                  
                  <div className="policy-content">
                    <h3 className="policy-title">{policy.title}</h3>
                    <p className="policy-description">{policy.description}</p>
                    
                    <div className="policy-footer">
                      <div className="policy-info">
                        <span className="info-item">
                          <strong>Proposed by:</strong> {policy.proposedBy}
                        </span>
                        <span className="info-item">
                          <strong>Created:</strong> {new Date(policy.createdAt).toLocaleDateString()}
                        </span>
                        {policy.status === 'Pending' && (
                          <span className="info-item">
                            <strong>Voting deadline:</strong> {new Date(policy.votingDeadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      
                      <div className="voting-progress">
                        <div className="vote-stats">
                          <span className="votes-for">{policy.votesFor} for</span>
                          <span className="votes-against">{policy.votesAgainst} against</span>
                          <span className="total-votes">({policy.totalVotes} total)</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${getVotePercentage(policy.votesFor, policy.totalVotes)}%` }}
                          ></div>
                        </div>
                        <span className="approval-rate">
                          {getVotePercentage(policy.votesFor, policy.totalVotes)}% approval
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .org-policies {
          min-height: 100vh;
          background: var(--gray-50);
        }

        .org-header {
          background: var(--white);
          border-bottom: 1px solid var(--gray-200);
          padding: var(--spacing-lg) 0;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo h2 {
          color: var(--primary-blue);
          font-family: var(--font-heading);
          margin: 0;
          font-size: 1.5rem;
        }

        .org-name {
          color: var(--secondary-teal);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .org-nav {
          display: flex;
          gap: var(--spacing-2xl);
        }

        .nav-link {
          color: var(--gray-600);
          text-decoration: none;
          font-weight: 500;
          padding-bottom: 4px;
          border-bottom: 2px solid transparent;
          transition: all var(--transition-normal);
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--primary-blue);
          border-bottom-color: var(--primary-blue);
        }

        .header-actions {
          display: flex;
          gap: var(--spacing-md);
          align-items: center;
        }

        .page-header {
          background: var(--gradient-primary);
          border-radius: var(--radius-xl);
          padding: var(--spacing-2xl);
          margin: var(--spacing-2xl) 0;
          color: var(--white);
        }

        .page-header .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .page-header h1 {
          color: var(--white);
        }

        .filters-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-2xl);
          background: var(--white);
          padding: var(--spacing-lg);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }

        .tabs {
          display: flex;
          gap: var(--spacing-lg);
        }

        .tab {
          background: none;
          border: none;
          padding: var(--spacing-sm) var(--spacing-lg);
          border-radius: var(--radius-md);
          font-weight: 500;
          color: var(--gray-600);
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .tab:hover,
        .tab.active {
          background: var(--primary-blue);
          color: var(--white);
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-box svg {
          position: absolute;
          left: var(--spacing-md);
          color: var(--gray-400);
        }

        .search-input {
          padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) var(--spacing-3xl);
          border: 2px solid var(--gray-200);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          min-width: 300px;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary-blue);
        }

        .policies-container {
          background: var(--white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          overflow: hidden;
        }

        .empty-state {
          text-align: center;
          padding: var(--spacing-3xl);
          color: var(--gray-500);
        }

        .empty-state svg {
          margin-bottom: var(--spacing-lg);
          stroke: var(--gray-300);
        }

        .policies-list {
          divide-y: 1px solid var(--gray-200);
        }

        .policy-card {
          padding: var(--spacing-2xl);
          border-bottom: 1px solid var(--gray-100);
        }

        .policy-card:last-child {
          border-bottom: none;
        }

        .policy-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
        }

        .policy-meta {
          display: flex;
          gap: var(--spacing-md);
          align-items: center;
        }

        .policy-id {
          font-family: monospace;
          font-weight: 600;
          color: var(--gray-700);
          background: var(--gray-100);
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
        }

        .organ-type {
          background: var(--secondary-teal);
          color: var(--white);
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .policy-actions {
          display: flex;
          gap: var(--spacing-sm);
        }

        .policy-title {
          color: var(--gray-900);
          font-size: 1.25rem;
          margin-bottom: var(--spacing-md);
        }

        .policy-description {
          color: var(--gray-600);
          line-height: 1.6;
          margin-bottom: var(--spacing-lg);
        }

        .policy-footer {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: var(--spacing-2xl);
        }

        .policy-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .info-item {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .voting-progress {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          min-width: 200px;
        }

        .vote-stats {
          display: flex;
          gap: var(--spacing-md);
          font-size: 0.875rem;
        }

        .votes-for {
          color: var(--accent-green);
          font-weight: 600;
        }

        .votes-against {
          color: var(--accent-red);
          font-weight: 600;
        }

        .total-votes {
          color: var(--gray-500);
        }

        .progress-bar {
          height: 6px;
          background: var(--gray-200);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--accent-green);
          transition: width var(--transition-normal);
        }

        .approval-rate {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gray-700);
          text-align: right;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: var(--spacing-lg);
          }

          .org-nav {
            order: 2;
          }

          .filters-section {
            flex-direction: column;
            gap: var(--spacing-lg);
          }

          .tabs {
            order: 2;
          }

          .search-input {
            min-width: 250px;
          }

          .policy-header {
            flex-direction: column;
            gap: var(--spacing-md);
            align-items: stretch;
          }

          .policy-footer {
            flex-direction: column;
            gap: var(--spacing-lg);
          }

          .voting-progress {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default OrgPolicies;