import React, { useState } from 'react';
import Layout from '../components/Layout';

const PatientStatus = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');

  // Sample patient data
  const patients = [
    {
      id: 1,
      patientName: 'Rajesh Kumar',
      age: 45,
      bloodType: 'O+',
      gender: 'Male',
      organNeeded: 'Kidney',
      urgencyLevel: 'HIGH',
      status: 'waiting',
      waitingDays: 156,
      registrationDate: '2024-02-15',
      medicalCondition: 'Chronic kidney disease',
      contactNumber: '+91-98765-43210'
    },
    {
      id: 2,
      patientName: 'Emily Davis',
      age: 34,
      bloodType: 'A+',
      gender: 'Female',
      organNeeded: 'Heart',
      urgencyLevel: 'CRITICAL',
      status: 'matched',
      waitingDays: 89,
      registrationDate: '2024-04-20',
      medicalCondition: 'Cardiomyopathy',
      contactNumber: '+91-98765-11111'
    },
    {
      id: 3,
      patientName: 'David Wilson',
      age: 52,
      bloodType: 'B+',
      gender: 'Male',
      organNeeded: 'Liver',
      urgencyLevel: 'MEDIUM',
      status: 'completed',
      waitingDays: 234,
      registrationDate: '2023-12-10',
      medicalCondition: 'Cirrhosis',
      contactNumber: '+91-98765-22222'
    },
    {
      id: 4,
      patientName: 'Lisa Anderson',
      age: 28,
      bloodType: 'AB+',
      gender: 'Female',
      organNeeded: 'Kidney',
      urgencyLevel: 'LOW',
      status: 'waiting',
      waitingDays: 67,
      registrationDate: '2024-05-25',
      medicalCondition: 'Polycystic kidney disease',
      contactNumber: '+91-98765-33333'
    },
    {
      id: 5,
      patientName: 'Robert Brown',
      age: 38,
      bloodType: 'O-',
      gender: 'Male',
      organNeeded: 'Lungs',
      urgencyLevel: 'HIGH',
      status: 'waiting',
      waitingDays: 123,
      registrationDate: '2024-03-18',
      medicalCondition: 'Pulmonary fibrosis',
      contactNumber: '+91-98765-44444'
    }
  ];

  const statusCounts = {
    all: patients.length,
    waiting: patients.filter(p => p.status === 'waiting').length,
    matched: patients.filter(p => p.status === 'matched').length,
    completed: patients.filter(p => p.status === 'completed').length
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.bloodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.organNeeded.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'all' || patient.urgencyLevel === urgencyFilter;
    
    return matchesSearch && matchesStatus && matchesUrgency;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'waiting':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'matched':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'completed':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2"/>
            <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'CRITICAL':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'HIGH':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7 17l9.2-9.2M17 17V7H7" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'MEDIUM':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'LOW':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M17 7l-9.2 9.2M7 7v10h10" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="patient-status">
        <div className="container">
          {/* Page Header */}
          <div className="page-header">
            <div className="header-content">
              <div>
                <h1 className="heading-1">Patient Status</h1>
                <p className="text-large">Monitor patients on organ waiting lists</p>
              </div>
              <div className="header-stats">
                <div className="stat-item">
                  <span className="stat-number">{statusCounts.all}</span>
                  <span className="stat-label">Total Patients</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{patients.filter(p => p.urgencyLevel === 'CRITICAL').length}</span>
                  <span className="stat-label">Critical Cases</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Cards */}
          <div className="status-cards">
            <div className={`status-card ${statusFilter === 'all' ? 'active' : ''}`} 
                 onClick={() => setStatusFilter('all')}>
              <div className="status-icon all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="status-info">
                <span className="status-count">{statusCounts.all}</span>
                <span className="status-name">All Patients</span>
              </div>
            </div>

            <div className={`status-card ${statusFilter === 'waiting' ? 'active' : ''}`} 
                 onClick={() => setStatusFilter('waiting')}>
              <div className="status-icon waiting">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="status-info">
                <span className="status-count">{statusCounts.waiting}</span>
                <span className="status-name">Waiting</span>
              </div>
            </div>

            <div className={`status-card ${statusFilter === 'matched' ? 'active' : ''}`} 
                 onClick={() => setStatusFilter('matched')}>
              <div className="status-icon matched">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="status-info">
                <span className="status-count">{statusCounts.matched}</span>
                <span className="status-name">Match Found</span>
              </div>
            </div>

            <div className={`status-card ${statusFilter === 'completed' ? 'active' : ''}`} 
                 onClick={() => setStatusFilter('completed')}>
              <div className="status-icon completed">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="status-info">
                <span className="status-count">{statusCounts.completed}</span>
                <span className="status-name">Completed</span>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="filters-section">
            <div className="search-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <input
                type="text"
                placeholder="Search by name, blood type, or organ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-group">
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Urgency Levels</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>

              <button className="btn btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Export Data
              </button>
            </div>
          </div>

          {/* Patients Table */}
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Patient Information</th>
                  <th>Medical Details</th>
                  <th>Urgency & Wait Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map(patient => (
                  <tr key={patient.id}>
                    <td>
                      <div className="patient-info">
                        <h4 className="patient-name">{patient.patientName}</h4>
                        <div className="patient-details">
                          <span>{patient.age} years • {patient.gender}</span>
                        </div>
                        <div className="contact-info">
                          <span className="contact-number">{patient.contactNumber}</span>
                        </div>
                        <div className="registration-date">
                          Registered: {new Date(patient.registrationDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="medical-info">
                        <div className="blood-type">{patient.bloodType}</div>
                        <div className="organ-info">
                          <span className="organ-tag">{patient.organNeeded}</span>
                        </div>
                        <div className="condition">
                          <span className="condition-text">{patient.medicalCondition}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="urgency-info">
                        <div className={`urgency-badge urgency-${patient.urgencyLevel.toLowerCase()}`}>
                          {getUrgencyIcon(patient.urgencyLevel)}
                          <span className="urgency-text">{patient.urgencyLevel}</span>
                        </div>
                        <div className="wait-time">
                          <span className="wait-days">{patient.waitingDays} days</span>
                          <span className="wait-label">waiting</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={`status-badge status-${patient.status}`}>
                        {getStatusIcon(patient.status)}
                        <span className="status-text">
                          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn view" title="View Details">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </button>
                        <button className="action-btn edit" title="Edit">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </button>
                        {patient.status === 'waiting' && (
                          <button className="action-btn priority" title="Update Priority">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredPatients.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3>No patients found</h3>
                <p>Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .patient-status {
          min-height: calc(100vh - 200px);
        }

        .page-header {
          background: var(--gradient-primary);
          border-radius: var(--radius-xl);
          padding: var(--spacing-2xl);
          margin-bottom: var(--spacing-2xl);
          color: var(--white);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-stats {
          display: flex;
          gap: var(--spacing-xl);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .status-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-2xl);
        }

        .status-card {
          background-color: var(--white);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          cursor: pointer;
          transition: all var(--transition-normal);
          border: 2px solid transparent;
        }

        .status-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .status-card.active {
          border-color: var(--primary-blue);
          background-color: rgba(44, 90, 160, 0.05);
        }

        .status-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .status-icon.all {
          background-color: rgba(44, 90, 160, 0.1);
          color: var(--primary-blue);
        }

        .status-icon.waiting {
          background-color: rgba(243, 156, 18, 0.1);
          color: var(--warning-orange);
        }

        .status-icon.matched {
          background-color: rgba(39, 174, 96, 0.1);
          color: var(--accent-green);
        }

        .status-icon.completed {
          background-color: rgba(45, 156, 219, 0.1);
          color: var(--secondary-teal);
        }

        .status-info {
          display: flex;
          flex-direction: column;
        }

        .status-count {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .status-name {
          color: var(--gray-600);
          font-weight: 500;
        }

        .filters-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-xl);
          flex-wrap: wrap;
        }

        .search-box {
          position: relative;
          flex: 1;
          max-width: 400px;
        }

        .search-box svg {
          position: absolute;
          left: var(--spacing-md);
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-400);
        }

        .search-input {
          width: 100%;
          padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 3rem;
          border: 2px solid var(--gray-200);
          border-radius: var(--radius-md);
          font-size: 1rem;
          transition: border-color var(--transition-normal);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary-blue);
        }

        .filter-group {
          display: flex;
          gap: var(--spacing-md);
          align-items: center;
        }

        .filter-select {
          padding: var(--spacing-md);
          border: 2px solid var(--gray-200);
          border-radius: var(--radius-md);
          background-color: var(--white);
          cursor: pointer;
        }

        .table-container {
          background-color: var(--white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }

        .patient-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .patient-name {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-900);
        }

        .patient-details {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .contact-number {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .registration-date {
          font-size: 0.75rem;
          color: var(--gray-500);
        }

        .medical-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .blood-type {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--accent-red);
        }

        .organ-tag {
          background-color: rgba(44, 90, 160, 0.1);
          color: var(--primary-blue);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-xl);
          font-size: 0.875rem;
          font-weight: 500;
          width: fit-content;
        }

        .condition-text {
          font-size: 0.875rem;
          color: var(--gray-600);
          font-style: italic;
        }

        .urgency-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .urgency-badge {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-xl);
          font-size: 0.875rem;
          font-weight: 600;
          width: fit-content;
        }

        .urgency-badge.urgency-critical {
          background-color: rgba(231, 76, 60, 0.1);
          color: var(--accent-red);
        }

        .urgency-badge.urgency-high {
          background-color: rgba(243, 156, 18, 0.1);
          color: var(--warning-orange);
        }

        .urgency-badge.urgency-medium {
          background-color: rgba(45, 156, 219, 0.1);
          color: var(--secondary-teal);
        }

        .urgency-badge.urgency-low {
          background-color: rgba(39, 174, 96, 0.1);
          color: var(--accent-green);
        }

        .wait-time {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .wait-days {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .wait-label {
          font-size: 0.75rem;
          color: var(--gray-500);
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-xl);
          font-size: 0.875rem;
          font-weight: 600;
          width: fit-content;
        }

        .status-badge.status-waiting {
          background-color: rgba(243, 156, 18, 0.1);
          color: var(--warning-orange);
        }

        .status-badge.status-matched {
          background-color: rgba(39, 174, 96, 0.1);
          color: var(--accent-green);
        }

        .status-badge.status-completed {
          background-color: rgba(45, 156, 219, 0.1);
          color: var(--secondary-teal);
        }

        .action-buttons {
          display: flex;
          gap: var(--spacing-sm);
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .action-btn.view {
          background-color: rgba(45, 156, 219, 0.1);
          color: var(--secondary-teal);
        }

        .action-btn.view:hover {
          background-color: var(--secondary-teal);
          color: var(--white);
        }

        .action-btn.edit {
          background-color: rgba(243, 156, 18, 0.1);
          color: var(--warning-orange);
        }

        .action-btn.edit:hover {
          background-color: var(--warning-orange);
          color: var(--white);
        }

        .action-btn.priority {
          background-color: rgba(231, 76, 60, 0.1);
          color: var(--accent-red);
        }

        .action-btn.priority:hover {
          background-color: var(--accent-red);
          color: var(--white);
        }

        .empty-state {
          text-align: center;
          padding: var(--spacing-3xl);
          color: var(--gray-500);
        }

        .empty-icon {
          margin: 0 auto var(--spacing-lg);
          color: var(--gray-400);
        }

        .empty-state h3 {
          margin: 0 0 var(--spacing-sm);
          color: var(--gray-700);
        }

        .empty-state p {
          margin: 0;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: var(--spacing-lg);
            text-align: center;
          }

          .status-cards {
            grid-template-columns: repeat(2, 1fr);
          }

          .filters-section {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-group {
            justify-content: space-between;
          }

          .table-container {
            overflow-x: auto;
          }

          .table {
            min-width: 900px;
          }
        }

        @media (max-width: 480px) {
          .status-cards {
            grid-template-columns: 1fr;
          }

          .page-header {
            padding: var(--spacing-lg);
          }
        }
      `}</style>
    </Layout>
  );
};

export default PatientStatus;