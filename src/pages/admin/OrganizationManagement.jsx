import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';

const OrganizationManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [organizations] = useState([
    {
      id: 1,
      name: 'Heart Foundation India',
      code: 'NGO-001',
      type: 'NGO',
      contactPerson: 'Dr. Sarah Johnson',
      email: 'contact@heartfoundation.org',
      phone: '+91 9876543210',
      canPropose: true,
      canVote: true,
      status: 'active',
      proposalCount: 5,
      voteCount: 23,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Ministry of Health',
      code: 'GOV-001',
      type: 'Government',
      contactPerson: 'Mr. Rajesh Kumar',
      email: 'health@gov.in',
      phone: '+91 9876543211',
      canPropose: true,
      canVote: true,
      status: 'active',
      proposalCount: 12,
      voteCount: 45,
      createdAt: '2024-01-20'
    },
    {
      id: 3,
      name: 'Medical Research Institute',
      code: 'RES-001',
      type: 'Research',
      contactPerson: 'Dr. Priya Sharma',
      email: 'research@mri.edu',
      phone: '+91 9876543212',
      canPropose: false,
      canVote: true,
      status: 'active',
      proposalCount: 0,
      voteCount: 18,
      createdAt: '2024-02-01'
    }
  ]);

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? <span className="status-badge status-matched">Active</span>
      : <span className="status-badge status-high">Inactive</span>;
  };

  const getTypeBadge = (type) => {
    const typeClasses = {
      'NGO': 'type-badge type-ngo',
      'Government': 'type-badge type-government',
      'Research': 'type-badge type-research',
      'Medical': 'type-badge type-medical'
    };
    
    return (
      <span className={typeClasses[type] || 'type-badge type-default'}>
        {type}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="organization-management-page">
        <div className="container">
          {/* Header */}
          <div className="page-header">
            <div className="header-content">
              <h1 className="heading-1">Organization Management</h1>
              <p className="text-large">Manage organizations, their permissions, and policy participation</p>
            </div>
            <button className="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14m-7-7h14"/>
              </svg>
              Add Organization
            </button>
          </div>

          {/* Search and Filters */}
          <div className="search-card card">
            <div className="card-header">
              <h3 className="heading-3">Search & Filter</h3>
            </div>
            <div className="search-content">
              <div className="search-input-container">
                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  className="form-input search-input"
                  placeholder="Search organizations by name, code, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="btn btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
                </svg>
                Filter
              </button>
            </div>
          </div>

          {/* Organizations Table */}
          <div className="table-card card">
            <div className="card-header">
              <div className="table-header">
                <div>
                  <h3 className="heading-3">Organizations ({filteredOrganizations.length})</h3>
                  <p className="text-normal">Complete list of registered organizations in the system</p>
                </div>
              </div>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Organization Details</th>
                    <th>Code</th>
                    <th>Type</th>
                    <th>Contact Person</th>
                    <th>Permissions</th>
                    <th>Activity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrganizations.map((org) => (
                    <tr key={org.id}>
                      <td>
                        <div className="org-details">
                          <div className="org-name">{org.name}</div>
                          <div className="org-email">{org.email}</div>
                          <div className="org-phone">{org.phone}</div>
                        </div>
                      </td>
                      <td>
                        <span className="code-badge">{org.code}</span>
                      </td>
                      <td>{getTypeBadge(org.type)}</td>
                      <td>{org.contactPerson}</td>
                      <td>
                        <div className="permissions-list">
                          {org.canPropose && (
                            <span className="permission-badge propose">
                              📝 Can Propose
                            </span>
                          )}
                          {org.canVote && (
                            <span className="permission-badge vote">
                              🗳️ Can Vote
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="activity-stats">
                          <div className="stat-item">{org.proposalCount} proposals</div>
                          <div className="stat-item secondary">{org.voteCount} votes cast</div>
                        </div>
                      </td>
                      <td>{getStatusBadge(org.status)}</td>
                      <td>
                        <div className="actions-dropdown">
                          <button className="action-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="1"/>
                              <circle cx="19" cy="12" r="1"/>
                              <circle cx="5" cy="12" r="1"/>
                            </svg>
                          </button>
                          <div className="dropdown-menu">
                            <button className="dropdown-item">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                              View Details
                            </button>
                            <button className="dropdown-item">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="m18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/>
                              </svg>
                              Edit Organization
                            </button>
                            <button className="dropdown-item">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="m9 12 2 2 4-4"/>
                                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                              </svg>
                              Manage Permissions
                            </button>
                            <button className="dropdown-item">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <circle cx="12" cy="16" r="1"/>
                                <path d="m7 11V7a5 5 0 0 1 10 0v4"/>
                              </svg>
                              Reset Password
                            </button>
                            <button className="dropdown-item danger">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="m3 6 3 18h12l3-18"/>
                                <path d="M19 6V4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2"/>
                              </svg>
                              Delete Organization
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="summary-grid">
            <div className="summary-card card">
              <div className="summary-content">
                <p className="summary-label">Total Organizations</p>
                <h3 className="summary-value">{organizations.length}</h3>
              </div>
              <div className="summary-icon">🏢</div>
            </div>
            <div className="summary-card card">
              <div className="summary-content">
                <p className="summary-label">Can Propose</p>
                <h3 className="summary-value">{organizations.filter(o => o.canPropose).length}</h3>
              </div>
              <div className="summary-icon">📝</div>
            </div>
            <div className="summary-card card">
              <div className="summary-content">
                <p className="summary-label">Can Vote</p>
                <h3 className="summary-value">{organizations.filter(o => o.canVote).length}</h3>
              </div>
              <div className="summary-icon">🗳️</div>
            </div>
            <div className="summary-card card">
              <div className="summary-content">
                <p className="summary-label">Total Proposals</p>
                <h3 className="summary-value">{organizations.reduce((sum, o) => sum + o.proposalCount, 0)}</h3>
              </div>
              <div className="summary-icon">📊</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .organization-management-page {
          min-height: calc(100vh - 200px);
          padding: var(--spacing-xl) 0;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-2xl);
        }

        .header-content {
          flex: 1;
        }

        .search-card {
          margin-bottom: var(--spacing-xl);
        }

        .search-content {
          display: flex;
          gap: var(--spacing-md);
          align-items: center;
        }

        .search-input-container {
          position: relative;
          flex: 1;
        }

        .search-icon {
          position: absolute;
          left: var(--spacing-md);
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-500);
        }

        .search-input {
          padding-left: 3rem !important;
        }

        .table-card {
          margin-bottom: var(--spacing-xl);
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .table-container {
          overflow-x: auto;
        }

        .org-details {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .org-name {
          font-weight: 600;
          color: var(--gray-900);
        }

        .org-email,
        .org-phone {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .code-badge {
          display: inline-block;
          padding: var(--spacing-xs) var(--spacing-sm);
          background-color: rgba(44, 90, 160, 0.1);
          color: var(--primary-blue);
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .type-badge {
          display: inline-block;
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .type-ngo {
          background-color: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .type-government {
          background-color: rgba(139, 92, 246, 0.1);
          color: #8b5cf6;
        }

        .type-research {
          background-color: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .type-medical {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .type-default {
          background-color: var(--gray-100);
          color: var(--gray-600);
        }

        .permissions-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .permission-badge {
          display: inline-block;
          padding: 2px var(--spacing-sm);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 500;
          white-space: nowrap;
        }

        .permission-badge.propose {
          background-color: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .permission-badge.vote {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .activity-stats {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .stat-item {
          font-size: 0.875rem;
          color: var(--gray-900);
        }

        .stat-item.secondary {
          color: var(--gray-600);
        }

        .actions-dropdown {
          position: relative;
          display: inline-block;
        }

        .action-btn {
          background: none;
          border: none;
          color: var(--gray-500);
          cursor: pointer;
          padding: var(--spacing-sm);
          border-radius: var(--radius-md);
          transition: all var(--transition-normal);
        }

        .action-btn:hover {
          background-color: var(--gray-50);
          color: var(--gray-700);
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          top: 100%;
          background-color: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          min-width: 200px;
          z-index: 50;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all var(--transition-normal);
        }

        .actions-dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          width: 100%;
          padding: var(--spacing-md);
          background: none;
          border: none;
          text-align: left;
          color: var(--gray-700);
          font-size: 0.875rem;
          cursor: pointer;
          transition: background-color var(--transition-normal);
        }

        .dropdown-item:hover {
          background-color: var(--gray-50);
        }

        .dropdown-item.danger {
          color: var(--accent-red);
        }

        .dropdown-item.danger:hover {
          background-color: rgba(231, 76, 60, 0.1);
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-lg);
        }

        .summary-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-lg);
        }

        .summary-content {
          flex: 1;
        }

        .summary-label {
          color: var(--gray-600);
          font-size: 0.875rem;
          margin: 0 0 var(--spacing-xs) 0;
        }

        .summary-value {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 700;
          color: var(--gray-900);
          margin: 0;
        }

        .summary-icon {
          font-size: 2.5rem;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: var(--spacing-lg);
          }

          .search-content {
            flex-direction: column;
          }

          .table-container {
            font-size: 0.875rem;
          }

          .summary-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }

          .permissions-list {
            flex-direction: row;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </AdminLayout>
  );
};

export default OrganizationManagement;