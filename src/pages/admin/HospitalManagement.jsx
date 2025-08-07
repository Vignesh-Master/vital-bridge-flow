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
      email: 'raj.kumar@apollohospitals.com',
      phone: '+91-44-2829-3333',
      location: 'Chennai, Tamil Nadu',
      status: 'Active',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Fortis Hospital Bangalore',
      code: 'BG-002',
      country: 'IN',
      state: 'KA',
      city: 'Bangalore',
      contactPersonName: 'Dr. Priya Sharma',
      email: 'priya.sharma@fortishealthcare.com',
      phone: '+91-80-6621-4444',
      location: 'Bangalore, Karnataka',
      status: 'Active',
      createdAt: '2024-01-20'
    }
  ]);

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
      <div className="hospital-management-page">
        <div className="container">
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
    </AdminLayout>
  );
};

export default HospitalManagement;