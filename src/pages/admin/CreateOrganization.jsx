import React, { useState } from 'react';
import { countries } from '@/lib/locationData';
import AdminLayout from '@/components/AdminLayout';

const CreateOrganization = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationCode: '',
    organizationType: '',
    description: '',
    country: '',
    state: '',
    contactPersonName: '',
    contactPersonTitle: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    canPropose: false,
    canVote: false,
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'country' ? { state: '' } : {})
    }));
  };

  const generateOrgCode = () => {
    const typeCode = formData.organizationType.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const code = `${typeCode}-${randomNum}`;
    setFormData({ ...formData, organizationCode: code });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!formData.canPropose && !formData.canVote) {
        throw new Error('Organization must have at least one permission (propose or vote)');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert(`Organization created successfully: ${formData.organizationName} (${formData.organizationCode})`);
      
      // Reset form
      setFormData({
        organizationName: '',
        organizationCode: '',
        organizationType: '',
        description: '',
        contactPersonName: '',
        contactPersonTitle: '',
        email: '',
        phone: '',
        website: '',
        address: '',
        canPropose: false,
        canVote: false,
        username: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      setError(error.message || 'Failed to create organization');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="create-organization-page">
        <div className="container">
          {/* Header */}
          <div className="page-header">
            <h1 className="heading-1">Create Organization</h1>
            <p className="text-large">Register a new organization in the OrganLink system</p>
          </div>

          {/* Form Card */}
          <div className="form-card card">
            <div className="card-header">
              <h3 className="heading-3">Organization Registration Form</h3>
              <p className="text-normal">Fill out all required information to register a new organization</p>
            </div>

            <form onSubmit={handleSubmit} className="organization-form">
              {/* Organization Information */}
              <div className="form-section">
                <h4 className="section-title">Organization Information</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Organization Name *</label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="e.g., Heart Foundation India"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Organization Code *</label>
                    <div className="code-input-group">
                      <input
                        type="text"
                        name="organizationCode"
                        value={formData.organizationCode}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="e.g., NGO-001"
                        required
                      />
                      <button
                        type="button"
                        onClick={generateOrgCode}
                        className="btn btn-secondary code-generate-btn"
                        disabled={!formData.organizationType}
                      >
                        Generate
                      </button>
                    </div>
                  </div>

                  <div className="form-group form-group-full">
                    <label className="form-label">Organization Type *</label>
                    <select
                      name="organizationType"
                      value={formData.organizationType}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select organization type</option>
                      <option value="ngo">NGO (Non-Governmental Organization)</option>
                      <option value="government">Government Agency</option>
                      <option value="research">Research Institution</option>
                      <option value="medical">Medical Association</option>
                      <option value="advocacy">Advocacy Group</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Country</option>
                      {countries.map(c => (
                        <option key={c.code} value={c.code}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">State/Province *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                      disabled={!formData.country}
                    >
                      <option value="">Select State</option>
                      {countries.find(c => c.code === formData.country)?.states.map(s => (
                        <option key={s.code} value={s.code}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group form-group-full">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Brief description of the organization's mission and activities"
                      rows="3"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="form-section">
                <h4 className="section-title">Contact Information</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Contact Person Name *</label>
                    <input
                      type="text"
                      name="contactPersonName"
                      value={formData.contactPersonName}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="e.g., John Smith"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Title/Designation</label>
                    <input
                      type="text"
                      name="contactPersonTitle"
                      value={formData.contactPersonTitle}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="e.g., Executive Director"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="contact@organization.org"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://www.organization.org"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Organization address"
                    />
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div className="form-section">
                <h4 className="section-title">Permissions</h4>
                <div className="permissions-grid">
                  <div className="permission-item">
                    <label className="permission-label">
                      <input
                        type="checkbox"
                        name="canPropose"
                        checked={formData.canPropose}
                        onChange={handleInputChange}
                        className="permission-checkbox"
                      />
                      <span className="permission-title">Can Propose Policies</span>
                    </label>
                    <p className="permission-description">
                      Allow this organization to propose new organ allocation policies
                    </p>
                  </div>

                  <div className="permission-item">
                    <label className="permission-label">
                      <input
                        type="checkbox"
                        name="canVote"
                        checked={formData.canVote}
                        onChange={handleInputChange}
                        className="permission-checkbox"
                      />
                      <span className="permission-title">Can Vote on Policies</span>
                    </label>
                    <p className="permission-description">
                      Allow this organization to vote on proposed policies
                    </p>
                  </div>
                </div>
              </div>

              {/* Login Credentials */}
              <div className="form-section">
                <h4 className="section-title">Login Credentials</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Username *</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="e.g., ngo-001"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Secure password"
                      required
                    />
                  </div>

                  <div className="form-group form-group-full">
                    <label className="form-label">Confirm Password *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Error Display */}
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

              {/* Form Actions */}
              <div className="form-actions">
                <button type="button" className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Creating Organization...' : 'Create Organization'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .create-organization-page {
          min-height: calc(100vh - 200px);
          padding: var(--spacing-xl) 0;
        }

        .page-header {
          margin-bottom: var(--spacing-2xl);
          text-align: center;
        }

        .form-card {
          max-width: 900px;
          margin: 0 auto;
        }

        .organization-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2xl);
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .section-title {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--gray-800);
          margin: 0;
          padding-bottom: var(--spacing-sm);
          border-bottom: 2px solid var(--primary-blue);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-lg);
        }

        .form-group-full {
          grid-column: 1 / -1;
        }

        .code-input-group {
          display: flex;
          gap: var(--spacing-sm);
        }

        .code-input-group .form-input {
          flex: 1;
        }

        .code-generate-btn {
          white-space: nowrap;
          min-width: 100px;
        }

        .permissions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-lg);
        }

        .permission-item {
          background-color: var(--gray-50);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          border: 2px solid var(--gray-200);
          transition: border-color var(--transition-normal);
        }

        .permission-item:hover {
          border-color: var(--primary-blue);
        }

        .permission-label {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          cursor: pointer;
          margin-bottom: var(--spacing-sm);
        }

        .permission-checkbox {
          width: 18px;
          height: 18px;
          accent-color: var(--primary-blue);
        }

        .permission-title {
          font-weight: 600;
          color: var(--gray-800);
        }

        .permission-description {
          margin: 0;
          color: var(--gray-600);
          font-size: 0.875rem;
          padding-left: 26px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-md);
          padding-top: var(--spacing-xl);
          border-top: 1px solid var(--gray-200);
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .permissions-grid {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .form-actions .btn {
            width: 100%;
          }

          .code-input-group {
            flex-direction: column;
          }
        }
      `}</style>
    </AdminLayout>
  );
};

export default CreateOrganization;