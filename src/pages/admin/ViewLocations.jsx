import React, { useMemo, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { countries } from '@/lib/locationData';

// Simulate fetching hospitals from API or state
const getHospitals = () => [
  {
    id: 1, name: 'Apollo Hospital Chennai', country: 'IN', state: 'TN', status: 'active', city: 'Chennai', contactPersonName: 'Dr. Raj Kumar', email: 'admin@apollo-chennai.com', phone: '+91 9876543210',
  },
  {
    id: 2, name: 'Fortis Hospital Mumbai', country: 'IN', state: 'MH', status: 'active', city: 'Mumbai', contactPersonName: 'Dr. Priya Sharma', email: 'admin@fortis-mumbai.com', phone: '+91 9876543211',
  },
  {
    id: 3, name: 'AIIMS Delhi', country: 'IN', state: 'DL', status: 'inactive', city: 'New Delhi', contactPersonName: 'Dr. Amit Singh', email: 'admin@aiims-delhi.com', phone: '+91 9876543212',
  },
  {
    id: 4, name: 'Mayo Clinic', country: 'US', state: 'CA', status: 'active', city: 'Rochester', contactPersonName: 'Dr. John Doe', email: 'admin@mayoclinic.com', phone: '+1 555-123-4567',
  },
];

export default function ViewLocations() {
  const hospitals = useMemo(getHospitals, []);
  const [search, setSearch] = useState('');
  const [exportModal, setExportModal] = useState(false);

  // Build a flat list of all locations with hospital details
  const locations = useMemo(() => {
    const locs = [];
    countries.forEach(country => {
      country.states.forEach(state => {
        const hosps = hospitals.filter(h => h.country === country.code && h.state === state.code);
        if (hosps.length > 0) {
          locs.push({
            country: country.name,
            countryCode: country.code,
            state: state.name,
            stateCode: state.code,
            hosps,
          });
        }
      });
    });
    return locs;
  }, [hospitals]);

  // Filtered locations by search
  const filteredLocations = useMemo(() => {
    if (!search.trim()) return locations;
    const s = search.toLowerCase();
    return locations.filter(loc =>
      loc.country.toLowerCase().includes(s) ||
      loc.state.toLowerCase().includes(s) ||
      loc.hosps.some(h => h.name.toLowerCase().includes(s) || h.city.toLowerCase().includes(s))
    );
  }, [locations, search]);

  // Export logic
  const handleExport = (type) => {
    const header = ['Country','State','Hospital Name','City','Contact','Email','Phone'];
    const rows = filteredLocations.flatMap(loc =>
      loc.hosps.map(h => [loc.country, loc.state, h.name, h.city, h.contactPersonName, h.email, h.phone])
    );
    if (type === 'csv') {
      const csv = [header, ...rows].map(r => r.map(x => `"${x||''}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'locations.csv';
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === 'excel') {
      const csv = [header, ...rows].map(r => r.map(x => `"${x||''}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'application/vnd.ms-excel' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'locations.xls';
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === 'pdf') {
      window.print(); // Placeholder for PDF export
    }
    setExportModal(false);
  };

  return (
    <AdminLayout>
      <div className="organization-management-page">
        <div className="container">
          <div className="page-header">
            <div className="header-content">
              <h1 className="heading-1">Location Management</h1>
              <p className="text-large">View all countries, states, and hospitals joined in OrganLink.</p>
            </div>
            <button className="btn btn-primary" onClick={() => setExportModal(true)}>
              Export
            </button>
          </div>
          <div className="search-card card" style={{marginBottom:24}}>
            <div className="search-content" style={{display:'flex',gap:16,alignItems:'center'}}>
              <input
                type="text"
                className="form-input search-input"
                placeholder="Search by country, state, hospital, or city..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{flex:1,minWidth:220}}
              />
            </div>
          </div>
          <div className="table-card card">
            <div className="card-header">
              <div className="table-header">
                <div>
                  <h3 className="heading-3">Locations ({filteredLocations.length})</h3>
                  <p className="text-normal">All countries and states with registered hospitals</p>
                </div>
              </div>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>State</th>
                    <th>Hospitals</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLocations.map(loc => (
                    <tr key={loc.countryCode + '-' + loc.stateCode}>
                      <td>{loc.country}</td>
                      <td>{loc.state}</td>
                      <td>
                        {loc.hosps.length > 0 ? (
                          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                            {loc.hosps.map(hosp => (
                              <li key={hosp.id} style={{ marginBottom: 4 }}>
                                <span className="hosp-name">{hosp.name}</span> <span className="hosp-city">({hosp.city})</span>
                              </li>
                            ))}
                          </ul>
                        ) : <span className="text-muted">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Export Modal */}
        {exportModal && (
          <div className="modal-blur-overlay">
            <div className="modal-center-content">
              <h3 className="heading-3 mb-4">Export Data</h3>
              <button className="btn btn-primary w-full mb-2" onClick={() => handleExport('csv')}>Export as CSV</button>
              <button className="btn btn-secondary w-full mb-2" onClick={() => handleExport('excel')}>Export as Excel</button>
              <button className="btn btn-secondary w-full mb-4" onClick={() => handleExport('pdf')}>Export as PDF</button>
              <button className="btn btn-link w-full" onClick={() => setExportModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .hosp-city {
          color: #888;
          font-size: 0.8em;
          margin-left: 4px;
        }
        .text-muted {
          color: #bbb;
        }
        .modal-blur-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(44,90,160,0.18);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-center-content {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(44,90,160,0.18);
          padding: 40px 32px 32px 32px;
          min-width: 320px;
          max-width: 95vw;
        }
      `}</style>
    </AdminLayout>
  );
}
