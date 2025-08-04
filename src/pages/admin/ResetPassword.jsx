import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    entityType: '',
    searchTerm: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  // Mock data for demonstration
  const mockHospitals = [
    { id: 1, name: 'Apollo Hospital Chennai', code: 'CH-001', email: 'admin@apollo-chennai.com' },
    { id: 2, name: 'Fortis Hospital Mumbai', code: 'MB-001', email: 'admin@fortis-mumbai.com' },
    { id: 3, name: 'AIIMS Delhi', code: 'DL-001', email: 'admin@aiims-delhi.com' }
  ];

  const mockOrganizations = [
    { id: 1, name: 'Heart Foundation India', code: 'NGO-001', email: 'contact@heartfoundation.org' },
    { id: 2, name: 'Ministry of Health', code: 'GOV-001', email: 'health@gov.in' },
    { id: 3, name: 'Medical Research Institute', code: 'RES-001', email: 'research@mri.edu' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear search results when entity type changes
    if (name === 'entityType') {
      setSearchResults([]);
      setSelectedEntity(null);
    }
  };

  const handleSearch = async () => {
    if (!formData.entityType || !formData.searchTerm) {
      setError('Please select entity type and enter search term');
      return;
    }

    setSearching(true);
    setError('');
    
    try {
      // Simulate API search
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const dataSource = formData.entityType === 'hospital' ? mockHospitals : mockOrganizations;
      const results = dataSource.filter(item => 
        item.name.toLowerCase().includes(formData.searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(formData.searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(formData.searchTerm.toLowerCase())
      );
      
      setSearchResults(results);
      
      if (results.length === 0) {
        setError('No entities found matching your search criteria');
      }
    } catch (error) {
      setError('Failed to search. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!selectedEntity) {
      setError('Please select an entity to reset password for');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`Password has been reset for ${selectedEntity.name} (${selectedEntity.code})`);
      
      // Reset form
      setFormData({
        entityType: '',
        searchTerm: '',
        newPassword: '',
        confirmPassword: ''
      });
      setSearchResults([]);
      setSelectedEntity(null);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="reset-password-page">
        <div className="container">
          {/* Header */}
          <div className="page-header">
            <h1 className="heading-1">Reset Password</h1>
            <p className="text-large">Reset password for hospitals or organizations</p>
          </div>

          <div className="reset-password-grid">
            {/* Search Card */}
            <div className="search-card card">
              <div className="card-header">
                <h3 className="heading-3">Search Entity</h3>
                <p className="text-normal">Find the hospital or organization to reset password for</p>
              </div>

              <div className="search-form">
                <div className="form-group">
                  <label className="form-label">Entity Type *</label>
                  <select
                    name="entityType"
                    value={formData.entityType}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select entity type</option>
                    <option value="hospital">Hospital</option>
                    <option value="organization">Organization</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Search Term *</label>
                  <div className="search-input-group">
                    <input
                      type="text"
                      name="searchTerm"
                      value={formData.searchTerm}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter name, code, or email"
                    />
                    <button 
                      type="button" 
                      onClick={handleSearch}
                      disabled={searching || !formData.entityType}
                      className="btn btn-primary search-btn"
                    >
                      {searching ? 'Searching...' : 'Search'}
                    </button>
                  </div>
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="search-results">
                    <label className="form-label">Search Results</label>
                    <div className="results-list">
                      {searchResults.map((entity) => (
                        <div
                          key={entity.id}
                          className={`result-item ${selectedEntity?.id === entity.id ? 'selected' : ''}`}
                          onClick={() => setSelectedEntity(entity)}
                        >
                          <div className="result-name">{entity.name}</div>
                          <div className="result-details">
                            Code: {entity.code} | Email: {entity.email}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reset Password Card */}
            <div className="reset-card card">
              <div className="card-header">
                <h3 className="heading-3">Reset Password</h3>
                <p className="text-normal">Set new password for the selected entity</p>
              </div>

              {selectedEntity ? (
                <form onSubmit={handleResetPassword} className="reset-form">
                  {/* Selected Entity Info */}
                  <div className="selected-entity">
                    <div className="entity-name">{selectedEntity.name}</div>
                    <div className="entity-details">
                      Code: {selectedEntity.code}
                    </div>
                    <div className="entity-details">
                      Email: {selectedEntity.email}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">New Password *</label>
                    <div className="password-input-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="form-input password-input"
                        placeholder="Enter new password"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2"/>
                            <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Confirm Password *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>

                  {error && (
                    <div className="error-message" style={{
                      color: '#dc2626',
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '6px',
                      padding: '12px',
                      marginBottom: '16px',
                      fontSize: '14px'
                    }}>
                      {error}
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                    {loading ? 'Resetting Password...' : 'Reset Password'}
                  </button>
                </form>
              ) : (
                <div className="no-selection">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="no-selection-icon">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <p>Search and select an entity to reset password</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .reset-password-page {
          min-height: calc(100vh - 200px);
          padding: var(--spacing-xl) 0;
        }

        .page-header {
          margin-bottom: var(--spacing-2xl);
          text-align: center;
        }

        .reset-password-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-2xl);
          max-width: 1200px;
          margin: 0 auto;
        }

        .search-form, .reset-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .search-input-group {
          display: flex;
          gap: var(--spacing-sm);
        }

        .search-input-group .form-input {
          flex: 1;
        }

        .search-btn {
          white-space: nowrap;
          min-width: 100px;
        }

        .search-results {
          margin-top: var(--spacing-lg);
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .result-item {
          padding: var(--spacing-md);
          border: 2px solid var(--gray-200);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .result-item:hover {
          border-color: var(--primary-blue);
          background-color: var(--gray-50);
        }

        .result-item.selected {
          border-color: var(--primary-blue);
          background-color: rgba(44, 90, 160, 0.1);
        }

        .result-name {
          font-weight: 600;
          color: var(--gray-800);
          margin-bottom: var(--spacing-xs);
        }

        .result-details {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .selected-entity {
          background-color: var(--gray-50);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          margin-bottom: var(--spacing-lg);
        }

        .entity-name {
          font-weight: 600;
          color: var(--gray-800);
          margin-bottom: var(--spacing-xs);
        }

        .entity-details {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .password-input-container {
          position: relative;
        }

        .password-input {
          padding-right: 3rem !important;
        }

        .password-toggle {
          position: absolute;
          right: var(--spacing-md);
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--gray-500);
          cursor: pointer;
          padding: var(--spacing-xs);
        }

        .password-toggle:hover {
          color: var(--primary-blue);
        }

        .no-selection {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-3xl);
          text-align: center;
          color: var(--gray-500);
        }

        .no-selection-icon {
          margin-bottom: var(--spacing-lg);
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .reset-password-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
          }
          
          .search-input-group {
            flex-direction: column;
          }
          
          .search-btn {
            width: 100%;
          }
        }
      `}</style>
    </AdminLayout>
  );
};

export default ResetPassword;