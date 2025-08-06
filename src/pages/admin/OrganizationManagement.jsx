import React, { useState } from 'react';
import { countries } from '@/lib/locationData';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import OrganizationForm from './OrganizationForm';
import ResetOrganizationPasswordForm from './ResetOrganizationPasswordForm';

const OrganizationManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [organizations, setOrganizations] = useState([
    {
      id: 1,
      name: 'Heart Foundation India',
      code: 'NGO-001',
      type: 'NGO',
      country: 'IN',
      state: 'TN',
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
      country: 'IN',
      state: 'DL',
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
      country: 'US',
      state: 'CA',
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

  // Modal state
  const [modal, setModal] = useState({ open: false, mode: '', org: null });
  const [resetModal, setResetModal] = useState({ open: false, org: null });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !countryFilter || org.country === countryFilter;
    const matchesState = !stateFilter || org.state === stateFilter;
    return matchesSearch && matchesCountry && matchesState;
  });

  const [exportModal, setExportModal] = useState(false);
  const handleExport = (type) => {
    if (type === 'excel') {
      const header = ['Name','Code','Type','Country','State','Contact','Email','Phone'];
      const rows = filteredOrganizations.map(o => [o.name,o.code,o.type,o.country||'',o.state||'',o.contactPerson,o.email,o.phone]);
      const csv = [header, ...rows].map(r => r.map(x => `"${x||''}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'organizations.csv';
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === 'pdf') {
      window.print(); // Placeholder for PDF export
    }
    setExportModal(false);
  };

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

  // Dummy unique check (simulate API)
  const checkUnique = async (field, value) => {
    // Simulate uniqueness check
    await new Promise(r => setTimeout(r, 200));
    if (field === 'orgId') return !organizations.some(o => o.orgId === value);
    if (field === 'name') return !organizations.some(o => o.name === value);
    if (field === 'username') return !organizations.some(o => o.username === value);
    return true;
  };

  // Modal handlers
  const openAddModal = () => navigate('/admin/create-organization');
  const openEditModal = (org) => setModal({ open: true, mode: 'update', org });
  const closeModal = () => { setModal({ open: false, mode: '', org: null }); setFormError(''); };
  const openResetModal = (org) => setResetModal({ open: true, org });
  const closeResetModal = () => setResetModal({ open: false, org: null });

  // Form submit handlers
  const handleOrgSubmit = async (data) => {
    setFormLoading(true); setFormError('');
    try {
      if (modal.mode === 'create') {
        setOrganizations(prev => [...prev, { ...data, id: Date.now(), status: 'active', proposalCount: 0, voteCount: 0, createdAt: new Date().toISOString().slice(0,10) }]);
      } else if (modal.mode === 'update') {
        setOrganizations(prev => prev.map(o => o.id === modal.org.id ? { ...o, ...data } : o));
      }
      closeModal();
    } catch (e) { setFormError('Failed to save.'); }
    setFormLoading(false);
  };
  const handleResetSubmit = async (data) => {
    setFormLoading(true); setFormError('');
    try {
      // Simulate reset
      closeResetModal();
    } catch (e) { setFormError('Failed to reset password.'); }
    setFormLoading(false);
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
            <button className="btn btn-primary" onClick={openAddModal}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14m-7-7h14"/>
              </svg>
              Add Organization
            </button>
          </div>

          {/* Search and Filters + Export */}
          <div className="search-card card">
            <div className="card-header">
              <h3 className="heading-3">Search, Filter & Export</h3>
            </div>
            <div className="search-content" style={{ flexWrap: 'wrap', gap: 16 }}>
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
              <div style={{ minWidth: 180 }}>
                <Select value={countryFilter} onValueChange={val => { setCountryFilter(val); setStateFilter(''); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Countries</SelectItem>
        <SelectItem value="__all__">All Countries</SelectItem>
                    {countries.map(c => (
                      <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div style={{ minWidth: 180 }}>
                <Select value={stateFilter} onValueChange={setStateFilter} disabled={!countryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All States</SelectItem>
        <SelectItem value="__all__">All States</SelectItem>
    const matchesCountry = countryFilter === "__all__" || !countryFilter || org.country === countryFilter;
    const matchesState = stateFilter === "__all__" || !stateFilter || org.state === stateFilter;
                    {countries.find(c => c.code === countryFilter)?.states.map(s => (
                      <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <button className="btn btn-secondary" onClick={() => setExportModal(true)} type="button">
                Export
              </button>
              {exportModal && (
                <div className="modal-overlay">
                  <div className="modal-content" style={{ maxWidth: 340, padding: 32 }}>
                    <h3 className="heading-3 mb-4">Export Data</h3>
                    <button className="btn btn-primary w-full mb-2" onClick={() => handleExport('excel')}>Export as Excel</button>
                    <button className="btn btn-secondary w-full mb-4" onClick={() => handleExport('pdf')}>Export as PDF</button>
                    <button className="btn btn-link w-full" onClick={() => setExportModal(false)}>Cancel</button>
                  </div>
                </div>
              )}
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
                            <button className="dropdown-item" onClick={() => openEditModal(org)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                              View Details
                            </button>
                            <button className="dropdown-item" onClick={() => openResetModal(org)}>
      {/* Modal for Add/Edit Organization */}
      {modal.open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <OrganizationForm
              mode={modal.mode}
              initialData={modal.org || {}}
              onSubmit={handleOrgSubmit}
              onCancel={closeModal}
              loading={formLoading}
              error={formError}
              checkUnique={checkUnique}
            />
          </div>
        </div>
      )}
      {/* Modal for Reset Password */}
      {resetModal.open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ResetOrganizationPasswordForm
              onSubmit={handleResetSubmit}
              onCancel={closeResetModal}
              loading={formLoading}
              error={formError}
            />
          </div>
        </div>
      )}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(44,90,160,0.15);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background: var(--white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          padding: 0;
          max-width: 700px;
          width: 100%;
        }
      `}</style>
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