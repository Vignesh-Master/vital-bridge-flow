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
  const [countryFilter, setCountryFilter] = useState('__all__');
  const [stateFilter, setStateFilter] = useState('__all__');
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
    const header = ['Name','Code','Type','Country','State','Contact','Email','Phone'];
    const rows = filteredOrganizations.map(o => [o.name,o.code,o.type,o.country||'',o.state||'',o.contactPerson,o.email,o.phone]);
    if (type === 'csv') {
      const csv = [header, ...rows].map(r => r.map(x => `"${x||''}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'organizations.csv';
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === 'excel') {
      const csv = [header, ...rows].map(r => r.map(x => `"${x||''}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'application/vnd.ms-excel' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'organizations.xls';
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
  return (
    <>
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

            {/* Filter/Search Card */}
            <div className="search-card card">
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
                <div style={{ minWidth: 180 }}>
                  <Select value={countryFilter} onValueChange={val => { setCountryFilter(val); setStateFilter(''); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent>
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
                      <SelectItem value="__all__">All States</SelectItem>
                      {countries.find(c => c.code === countryFilter)?.states.map(s => (
                        <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <button className="btn btn-primary export-btn" onClick={() => setExportModal(true)} type="button">
                  Export
                </button>
              </div>
            </div>

            {/* Export Modal - only one instance, outside the table and card */}
            {exportModal && (
              <div className="modal-blur-overlay">
                <div className="modal-center-content">
                  <h3 className="heading-3 mb-4">Export Data</h3>
                  <button className="btn btn-primary w-full mb-2" onClick={() => handleExport('pdf')}>Export as PDF</button>
                  <button className="btn btn-secondary w-full mb-2" onClick={() => handleExport('csv')}>Export as CSV</button>
                  <button className="btn btn-secondary w-full mb-2" onClick={() => handleExport('excel')}>Export as Excel</button>
                  <button className="btn btn-link w-full" onClick={() => setExportModal(false)}>Cancel</button>
                </div>
              </div>
            )}

            {/* Organizations Table */}
            <div className="table-card card">
              <div className="card-header">
                <div className="table-header">
                  <span>Organizations</span>
                </div>
              </div>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Type</th>
                      <th>Country</th>
                      <th>State</th>
                      <th>Contact</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrganizations.map(org => (
                      <tr key={org.id}>
                        <td>
                          <div className="org-details">
                            <span className="org-name">{org.name}</span>
                          </div>
                        </td>
                        <td><span className="code-badge">{org.code}</span></td>
                        <td>{getTypeBadge(org.type)}</td>
                        <td>{org.country}</td>
                        <td>{org.state}</td>
                        <td>{org.contactPerson}</td>
                        <td><span className="org-email">{org.email}</span></td>
                        <td><span className="org-phone">{org.phone}</span></td>
                        <td>{getStatusBadge(org.status)}</td>
                        <td>
                          <button className="btn btn-sm">Actions</button>
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
                  <p className="summary-label">Active</p>
                  <h3 className="summary-value">{organizations.filter(o => o.status === 'active').length}</h3>
                </div>
                <div className="summary-icon">🟢</div>
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
        </div>
      </AdminLayout>
    </>
  );
}

export default OrganizationManagement;
