import React, { useMemo } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { countries } from '@/lib/locationData';

// Simulate fetching orgs/hospitals from localStorage or API (for demo, use static data)
const getOrganizations = () => [
  {
    id: 1, name: 'Heart Foundation India', country: 'IN', state: 'TN', status: 'active', type: 'NGO', contactPerson: 'Dr. Sarah Johnson', email: 'contact@heartfoundation.org', phone: '+91 9876543210',
  },
  {
    id: 2, name: 'Ministry of Health', country: 'IN', state: 'DL', status: 'active', type: 'Government', contactPerson: 'Mr. Rajesh Kumar', email: 'health@gov.in', phone: '+91 9876543211',
  },
  {
    id: 3, name: 'Medical Research Institute', country: 'US', state: 'CA', status: 'active', type: 'Research', contactPerson: 'Dr. Priya Sharma', email: 'research@mri.edu', phone: '+91 9876543212',
  },
];
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
  const organizations = useMemo(getOrganizations, []);
  const hospitals = useMemo(getHospitals, []);

  // Build a flat list of all locations with org/hospital counts
  const locations = useMemo(() => {
    const locs = [];
    countries.forEach(country => {
      country.states.forEach(state => {
        const orgs = organizations.filter(o => o.country === country.code && o.state === state.code);
        const hosps = hospitals.filter(h => h.country === country.code && h.state === state.code);
        if (orgs.length > 0 || hosps.length > 0) {
          locs.push({
            country: country.name,
            countryCode: country.code,
            state: state.name,
            stateCode: state.code,
            orgs,
            hosps,
          });
        }
      });
    });
    return locs;
  }, [organizations, hospitals]);

  return (
    <AdminLayout>
      <div className="organization-management-page">
        <div className="container">
          <div className="page-header">
            <div className="header-content">
              <h1 className="heading-1">Location Management</h1>
              <p className="text-large">View all registered locations with their organizations and hospitals.</p>
            </div>
          </div>
          <div className="table-card card">
            <div className="card-header">
              <div className="table-header">
                <div>
                  <h3 className="heading-3">Locations ({locations.length})</h3>
                  <p className="text-normal">All countries and states with registered organizations or hospitals</p>
                </div>
              </div>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>State</th>
                    <th>Organizations</th>
                    <th>Hospitals</th>
                  </tr>
                </thead>
                <tbody>
                  {locations.map(loc => (
                    <tr key={loc.countryCode + '-' + loc.stateCode}>
                      <td>{loc.country}</td>
                      <td>{loc.state}</td>
                      <td>
                        {loc.orgs.length > 0 ? (
                          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                            {loc.orgs.map(org => (
                              <li key={org.id} style={{ marginBottom: 4 }}>
                                <span className="org-name">{org.name}</span> <span className="org-type-badge">({org.type})</span>
                              </li>
                            ))}
                          </ul>
                        ) : <span className="text-muted">—</span>}
                      </td>
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
      </div>
      <style jsx>{`
        .org-type-badge {
          background: rgba(44,90,160,0.08);
          color: #2c5aa0;
          border-radius: 4px;
          font-size: 0.8em;
          padding: 2px 6px;
          margin-left: 4px;
        }
        .hosp-city {
          color: #888;
          font-size: 0.8em;
          margin-left: 4px;
        }
        .text-muted {
          color: #bbb;
        }
      `}</style>
    </AdminLayout>
  );
}
