import React, { useState } from 'react';
import { countries } from '@/lib/locationData';
import AdminLayout from '@/components/AdminLayout';

const CreateHospital = () => {
  const [formData, setFormData] = useState({
    hospitalName: '',
    hospitalCode: '',
    country: '',
    state: '',
    city: '',
    address: '',
    contactPersonName: '',
    contactPersonTitle: '',
    licenseNumber: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'country' ? { state: '' } : {})
    }));
  };

  const generateHospitalCode = () => {
    const cityCode = formData.city.substring(0, 2).toUpperCase();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const code = `${cityCode}-${randomNum}`;
    setFormData({ ...formData, hospitalCode: code });
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

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert(`Hospital created successfully: ${formData.hospitalName} (${formData.hospitalCode})`);
      
      // Reset form
      setFormData({
        hospitalName: '',
        hospitalCode: '',
        country: '',
        state: '',
        city: '',
        address: '',
        contactPersonName: '',
        contactPersonTitle: '',
        licenseNumber: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      setError(error.message || 'Failed to create hospital');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Hospital</h1>
            <p className="text-xl text-gray-600">Register a new hospital in the OrganLink system</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Hospital Registration Form</h3>
              <p className="text-gray-600">Fill out all required information to register a new hospital</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Location Information */}
              <div className="form-section">
                <h4 className="section-title">Location Information</h4>
                <div className="form-grid">
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

                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter city name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Hospital Code *</label>
                    <div className="code-input-group">
                      <input
                        type="text"
                        name="hospitalCode"
                        value={formData.hospitalCode}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="e.g., CH-001"
                        required
                      />
                      <button
                        type="button"
                        onClick={generateHospitalCode}
                        className="btn btn-secondary code-generate-btn"
                        disabled={!formData.city}
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hospital Information */}
              <div className="form-section">
                <h4 className="section-title">Hospital Information</h4>
                <div className="form-group">
                  <label className="form-label">Hospital Name *</label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter full hospital name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Medical License Number *</label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., MED123456"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Full Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Complete hospital address"
                    rows="3"
                  />
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
                      placeholder="Dr. John Smith"
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
                      placeholder="Chief Medical Officer"
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
                      placeholder="admin@hospital.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Number *</label>
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
                      placeholder="Hospital login username"
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
                  {loading ? 'Creating Hospital...' : 'Create Hospital'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateHospital;