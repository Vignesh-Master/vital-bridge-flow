import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <header style={{ background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', color: 'white', padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>OrganLink Admin Dashboard</h1>
          <div>
            <button onClick={() => navigate('/admin/hospitals')} style={{ margin: '0 1rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', borderRadius: '0.5rem' }}>
              Hospitals
            </button>
            <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#ef4444', border: 'none', color: 'white', borderRadius: '0.5rem' }}>
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main style={{ padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3>Total Hospitals</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8B5CF6' }}>12</p>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3>Active Users</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22C55E' }}>25</p>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3>Total Transplants</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3B82F6' }}>67</p>
          </div>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3>System Status</h3>
          <p>All services operational ✅</p>
          <p>AI Matching: Online 🤖</p>
          <p>Blockchain: Synchronized ⛓️</p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;