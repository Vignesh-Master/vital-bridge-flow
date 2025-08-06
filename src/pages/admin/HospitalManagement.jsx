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
  const [countryFilter, setCountryFilter] = useState('__all__');
  const [stateFilter, setStateFilter] = useState('__all__');
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: 'Apollo Hospital Chennai',
      code: 'CH-001',
      country: 'IN',
      state: 'TN',
      city: 'Chennai',
      contactPersonName: 'Dr. Raj Kumar',
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
    const header = ['Name','Code','Country','State','City','Contact','Email','Phone'];
    const rows = filteredHospitals.map(h => [h.name,h.code,h.country||'',h.state||'',h.city||'',h.contactPersonName||'',h.email||'',h.phone||'']);
    if (type === 'csv') {
      const csv = [header, ...rows].map(r => r.map(x => `"${x||''}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'hospitals.csv';
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === 'excel') {
      const csv = [header, ...rows].map(r => r.map(x => `"${x||''}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'application/vnd.ms-excel' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'hospitals.xls';
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
        </div>
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
                        {/* Actions dropdown or buttons here - placeholder for now */}
                        <button className="btn btn-sm">Actions</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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