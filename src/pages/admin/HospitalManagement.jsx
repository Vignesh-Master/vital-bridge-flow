import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const HospitalManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hospitals] = useState([
    {
      id: 1,
      name: 'Apollo Hospital Chennai',
      code: 'CH-001',
      location: 'Chennai, Tamil Nadu',
      contactPerson: 'Dr. Raj Kumar',
      email: 'admin@apollo-chennai.com',
      phone: '+91 9876543210',
      license: 'LIC001',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Fortis Hospital Mumbai',
      code: 'MB-001',
      location: 'Mumbai, Maharashtra',
      contactPerson: 'Dr. Priya Sharma',
      email: 'admin@fortis-mumbai.com',
      phone: '+91 9876543211',
      license: 'LIC002',
      status: 'active',
      createdAt: '2024-01-20'
    },
    {
      id: 3,
      name: 'AIIMS Delhi',
      code: 'DL-001',
      location: 'New Delhi, Delhi',
      contactPerson: 'Dr. Amit Singh',
      email: 'admin@aiims-delhi.com',
      phone: '+91 9876543212',
      license: 'LIC003',
      status: 'inactive',
      createdAt: '2024-02-01'
    }
  ]);

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <button className="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14m-7-7h14"/>
              </svg>
              Add Hospital
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
                  placeholder="Search hospitals by name, code, or location..."
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