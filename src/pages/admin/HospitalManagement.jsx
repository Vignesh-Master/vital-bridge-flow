import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalManagement = () => {
  const navigate = useNavigate();
  const [hospitals] = useState([
    { id: 1, name: 'Apollo Chennai', tenantId: 'apollo-chennai', userId: 'ch-001', status: 'ACTIVE' },
    { id: 2, name: 'Apollo Mumbai', tenantId: 'apollo-mumbai', userId: 'mb-001', status: 'ACTIVE' }
  ]);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <header style={{ background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', color: 'white', padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Hospital Management</h1>
          <button onClick={() => navigate('/admin/dashboard')} style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', borderRadius: '0.5rem' }}>
            Back to Dashboard
          </button>
        </div>
      </header>
      
      <main style={{ padding: '2rem' }}>
        <div style={{ background: 'white', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8fafc' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Hospital Name</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Tenant ID</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>User ID</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map(hospital => (
                <tr key={hospital.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem' }}>{hospital.name}</td>
                  <td style={{ padding: '1rem' }}>{hospital.tenantId}</td>
                  <td style={{ padding: '1rem' }}>{hospital.userId}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ background: '#22C55E', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>
                      {hospital.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default HospitalManagement;