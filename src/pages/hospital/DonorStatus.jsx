import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { donorAPI, apiUtils } from '../../services/api';

const DonorStatus = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [organFilter, setOrganFilter] = useState('all');
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Check authentication
    if (!apiUtils.isAuthenticated()) {
      navigate('/login');
      return;
    }

    loadDonors();
  }, [navigate, currentPage, searchTerm]);

  const loadDonors = async () => {
    try {
      setLoading(true);
      const response = await donorAPI.getDonors(currentPage, 20, searchTerm);

      if (response.success) {
        setDonors(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      } else {
        setError('Failed to load donors');
      }
    } catch (error) {
      console.error('Failed to load donors:', error);
      setError('Failed to load donors: ' + error.message);
      // Don't fallback to sample data - show the error instead
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  const setSampleDonors = () => {
    // Sample donor data as fallback
    setDonors([
    {
      id: 1,
      donorName: 'Priya Sharma (Deceased)',
      age: 28,
      bloodType: 'O+',
      gender: 'Female',
      organAvailable: 'Kidney',
      donorType: 'DECEASED',
      status: 'waiting',
      registrationDate: '2024-07-30',
      contactPerson: 'Dr. Suresh',
      contactNumber: '+91-98765-12345'
    },
    {
      id: 2,
      donorName: 'Rajesh Kumar',
      age: 35,
      bloodType: 'A+',
      gender: 'Male',
      organAvailable: 'Liver',
      donorType: 'LIVING',
      status: 'matched',
      registrationDate: '2024-07-28',
      contactPerson: 'Dr. Priya',
      contactNumber: '+91-98765-54321'
    },
    {
      id: 3,
      donorName: 'Sarah Johnson (Deceased)',
      age: 42,
      bloodType: 'B+',
      gender: 'Female',
      organAvailable: 'Heart',
      donorType: 'DECEASED',
      status: 'completed',
      registrationDate: '2024-07-25',
      contactPerson: 'Dr. Kumar',
      contactNumber: '+91-98765-67890'
    },
    {
      id: 4,
      donorName: 'Michael Brown',
      age: 29,
      bloodType: 'AB+',
      gender: 'Male',
      organAvailable: 'Kidney',
      donorType: 'LIVING',
      status: 'waiting',
      registrationDate: '2024-07-29',
      contactPerson: 'Dr. Smith',
      contactNumber: '+91-98765-11111'
    },
    {
      id: 5,
      donorName: 'Emily Davis (Deceased)',
      age: 31,
      bloodType: 'O-',
      gender: 'Female',
      organAvailable: 'Cornea',
      donorType: 'DECEASED',
      status: 'matched',
      registrationDate: '2024-07-27',
      contactPerson: 'Dr. Wilson',
      contactNumber: '+91-98765-22222'
    }
    ]);
  };

  const statusCounts = {
    all: donors.length,
    waiting: donors.filter(d => d.status === 'waiting').length,
    matched: donors.filter(d => d.status === 'matched').length,
    completed: donors.filter(d => d.status === 'completed').length
  };

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.bloodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.organAvailable.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || donor.status === statusFilter;
    const matchesOrgan = organFilter === 'all' || donor.organAvailable === organFilter;
    
    return matchesSearch && matchesStatus && matchesOrgan;
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

  return (
    <Layout>
      <div className="donor-status">
        <div className="container">
          {/* Page Header */}
          <div className="page-header">
            <div className="header-content">
              <div>
                <h1 className="heading-1">Donor Status</h1>
                <p className="text-large">Track and manage registered organ donors</p>
              </div>
              <div className="header-stats">
                <div className="stat-item">
                  <span className="stat-number">{statusCounts.all}</span>
                  <span className="stat-label">Total Donors</span>
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
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="status-info">
                <span className="status-count">{statusCounts.all}</span>
                <span className="status-name">All Donors</span>
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
                value={organFilter}
                onChange={(e) => setOrganFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Organs</option>
                <option value="Heart">Heart</option>
                <option value="Kidney">Kidney</option>
                <option value="Liver">Liver</option>
                <option value="Lungs">Lungs</option>
                <option value="Cornea">Cornea</option>
              </select>

              <button className="btn btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Export Data
              </button>
            </div>
          </div>

          {/* Donors Table */}
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Donor Information</th>
                  <th>Medical Details</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonors.map(donor => (
                  <tr key={donor.id}>
                    <td>
                      <div className="donor-info">
                        <h4 className="donor-name">{donor.donorName}</h4>
                        <div className="donor-details">
                          <span>{donor.age} years • {donor.gender}</span>
                          <span className="donor-type">{donor.donorType}</span>
                        </div>
                        <div className="registration-date">
                          Registered: {new Date(donor.registrationDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="medical-info">
                        <div className="blood-type">{donor.bloodType}</div>
                        <div className="organ-info">
                          <span className="organ-tag">{donor.organAvailable}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div className="contact-person">{donor.contactPerson}</div>
                        <div className="contact-number">{donor.contactNumber}</div>
                      </div>
                    </td>
                    <td>
                      <div className={`status-badge status-${donor.status}`}>
                        {getStatusIcon(donor.status)}
                        <span className="status-text">
                          {donor.status.charAt(0).toUpperCase() + donor.status.slice(1)}
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
                        {donor.status === 'waiting' && (
                          <button className="action-btn match" title="Find Match">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredDonors.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3>No donors found</h3>
                <p>Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .donor-status {
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

        .donor-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .donor-name {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-900);
        }

        .donor-details {
          display: flex;
          gap: var(--spacing-md);
          align-items: center;
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .donor-type {
          background-color: var(--gray-100);
          padding: 0.125rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 500;
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
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .contact-person {
          font-weight: 600;
          color: var(--gray-900);
        }

        .contact-number {
          font-size: 0.875rem;
          color: var(--gray-600);
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

        .action-btn.match {
          background-color: rgba(39, 174, 96, 0.1);
          color: var(--accent-green);
        }

        .action-btn.match:hover {
          background-color: var(--accent-green);
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
            min-width: 800px;
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

export default DonorStatus;