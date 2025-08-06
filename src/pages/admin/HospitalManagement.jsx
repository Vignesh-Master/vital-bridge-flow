import React, { useState } from 'react';
import { countries } from '@/lib/locationData';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import HospitalForm from './HospitalForm';
import ResetHospitalPasswordForm from './ResetHospitalPasswordForm';

const HospitalManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: 'Apollo Hospital Chennai',
      code: 'CH-001',
      country: 'IN',
      state: 'TN',
      city: 'Chennai',
      contactPersonName: 'Dr. Raj Kumar',
      email: 'admin@apollo-chennai.com',
      phone: '+91 9876543210',
      licenseNumber: 'LIC001',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Fortis Hospital Mumbai',
      code: 'MB-001',
      country: 'IN',
      state: 'MH',
      city: 'Mumbai',
      contactPersonName: 'Dr. Priya Sharma',
      email: 'admin@fortis-mumbai.com',
      phone: '+91 9876543211',
      licenseNumber: 'LIC002',
      status: 'active',
      createdAt: '2024-01-20'
    },
    {
      id: 3,
      name: 'AIIMS Delhi',
      code: 'DL-001',
      country: 'IN',
      state: 'DL',
      city: 'New Delhi',
      contactPersonName: 'Dr. Amit Singh',
      email: 'admin@aiims-delhi.com',
      phone: '+91 9876543212',
      licenseNumber: 'LIC003',
      status: 'inactive',
      createdAt: '2024-02-01'
    },
    {
      id: 4,
      name: 'Mayo Clinic',
      code: 'US-001',
      country: 'US',
      state: 'CA',
      city: 'Rochester',
      contactPersonName: 'Dr. John Doe',
      email: 'admin@mayoclinic.com',
      phone: '+1 555-123-4567',
      licenseNumber: 'USLIC001',
      status: 'active',
      createdAt: '2024-03-01'
    }
  ]);

  // Modal state
  const [modal, setModal] = useState({ open: false, mode: '', hospital: null });
  const [resetModal, setResetModal] = useState({ open: false, hospital: null });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  // Dummy state options
  const stateOptions = [
    { id: 'tn', name: 'Tamil Nadu' },
    { id: 'mh', name: 'Maharashtra' },
    { id: 'dl', name: 'Delhi' },
    { id: 'ka', name: 'Karnataka' }
  ];

  // Dummy unique check (simulate API)
  const checkUnique = async (field, value) => {
    await new Promise(r => setTimeout(r, 200));
    if (field === 'code') return !hospitals.some(h => h.code === value);
    return true;
  };

  // Modal handlers
  const openAddModal = () => navigate('/admin/create-hospital');
  const openEditModal = (hospital) => setModal({ open: true, mode: 'update', hospital });
  const closeModal = () => { setModal({ open: false, mode: '', hospital: null }); setFormError(''); };
  const openResetModal = (hospital) => setResetModal({ open: true, hospital });
  const closeResetModal = () => setResetModal({ open: false, hospital: null });

  // Form submit handlers
  const handleHospitalSubmit = async (data) => {
    setFormLoading(true); setFormError('');
    try {
      if (modal.mode === 'create') {
        setHospitals(prev => [...prev, { ...data, id: Date.now(), status: 'active', createdAt: new Date().toISOString().slice(0,10) }]);
      } else if (modal.mode === 'update') {
        setHospitals(prev => prev.map(h => h.id === modal.hospital.id ? { ...h, ...data } : h));
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

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !countryFilter || hospital.country === countryFilter;
    const matchesState = !stateFilter || hospital.state === stateFilter;
    return matchesSearch && matchesCountry && matchesState;
  });

  const [exportModal, setExportModal] = useState(false);
  const handleExport = (type) => {
    if (type === 'excel') {
      const header = ['Name','Code','Country','State','City','Contact','Email','Phone'];
      const rows = filteredHospitals.map(h => [h.name,h.code,h.country||'',h.state||'',h.city||'',h.contactPersonName||'',h.email||'',h.phone||'']);
      const csv = [header, ...rows].map(r => r.map(x => `"${x||''}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'hospitals.csv';
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

  return (
    <AdminLayout>
      <div className="hospital-management-page">
        <div className="container">
          {/* Header */}
          <div className="page-header">
            <div className="header-content">
              <h1 className="heading-1">Hospital Management</h1>
              <p className="text-large">Manage hospitals, their details, and access permissions</p>
            </div>
            <button className="btn btn-primary" onClick={openAddModal}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14m-7-7h14"/>
              </svg>
              Add Hospital
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
                  placeholder="Search hospitals by name, code, or location..."
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
    const matchesCountry = countryFilter === "__all__" || !countryFilter || hospital.country === countryFilter;
    const matchesState = stateFilter === "__all__" || !stateFilter || hospital.state === stateFilter;
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

          {/* Hospitals Table */}
          <div className="table-card card">
            <div className="card-header">
              <div className="table-header">
                <div>
                  <h3 className="heading-3">Hospitals ({filteredHospitals.length})</h3>
                  <p className="text-normal">Complete list of registered hospitals in the system</p>
                </div>
              </div>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Hospital Details</th>
                    <th>Code</th>
                    <th>Contact Person</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHospitals.map((hospital) => (
                    <tr key={hospital.id}>
                      <td>
                        <div className="hospital-details">
                          <div className="hospital-name">{hospital.name}</div>
                          <div className="hospital-email">{hospital.email}</div>
                          <div className="hospital-phone">{hospital.phone}</div>
                        </div>
                      </td>
                      <td>
                        <span className="code-badge">{hospital.code}</span>
                      </td>
                      <td>{hospital.contactPerson}</td>
                      <td>{hospital.location}</td>
                      <td>{getStatusBadge(hospital.status)}</td>
                      <td className="created-date">{hospital.createdAt}</td>
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
                            <button className="dropdown-item" onClick={() => openEditModal(hospital)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                              View Details
                            </button>
                            <button className="dropdown-item" onClick={() => openResetModal(hospital)}>
      {/* Modal for Add/Edit Hospital */}
      {modal.open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <HospitalForm
              mode={modal.mode}
              initialData={modal.hospital || {}}
              stateOptions={stateOptions}
              onSubmit={handleHospitalSubmit}
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
            <ResetHospitalPasswordForm
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
                              Edit Hospital
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
                              Delete Hospital
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
                <p className="summary-label">Active Hospitals</p>
                <h3 className="summary-value">{hospitals.filter(h => h.status === 'active').length}</h3>
              </div>
              <div className="summary-icon active">🏥</div>
            </div>
            <div className="summary-card card">
              <div className="summary-content">
                <p className="summary-label">Inactive Hospitals</p>
                <h3 className="summary-value">{hospitals.filter(h => h.status === 'inactive').length}</h3>
              </div>
              <div className="summary-icon inactive">🚫</div>
            </div>
            <div className="summary-card card">
              <div className="summary-content">
                <p className="summary-label">Total Hospitals</p>
                <h3 className="summary-value">{hospitals.length}</h3>
              </div>
              <div className="summary-icon total">📊</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hospital-management-page {
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

        .hospital-details {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .hospital-name {
          font-weight: 600;
          color: var(--gray-900);
        }

        .hospital-email,
        .hospital-phone {
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

        .created-date {
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
          min-width: 180px;
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
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AdminLayout>
  );
};

export default HospitalManagement;