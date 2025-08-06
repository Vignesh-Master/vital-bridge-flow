import React, { useState } from 'react';

const codeRegex = /^[A-Z0-9_]{2,20}$/;
const nameRegex = /^.{2,200}$/;
const userIdRegex = /^[a-zA-Z0-9_]{3,50}$/;
const passwordRegex = /^.{6,255}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\+]?[0-9\-\(\)\s]{10,20}$/;

const HospitalForm = ({
  mode = 'create', // 'create' | 'update'
  initialData = {},
  stateOptions = [],
  onSubmit,
  onCancel,
  loading = false,
  error = '',
  checkUnique = async () => true // (field, value) => Promise<boolean>
}) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    code: initialData.code || '',
    stateId: initialData.stateId || '',
    licenseNumber: initialData.licenseNumber || '',
    userId: initialData.userId || '',
    password: '',
    address: initialData.address || '',
    city: initialData.city || '',
    contactNumber: initialData.contactNumber || '',
    email: initialData.email || ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [uniqueCheck, setUniqueCheck] = useState({ code: true });

  const validate = async () => {
    if (!nameRegex.test(formData.name)) return 'Name: 2-200 characters';
    if (!codeRegex.test(formData.code)) return 'Code: 2-20 uppercase letters, numbers, or _';
    if (!formData.stateId) return 'State is required';
    if (!formData.licenseNumber || formData.licenseNumber.length > 50) return 'License: max 50 chars';
    if (mode === 'create' && (!userIdRegex.test(formData.userId))) return 'Username: 3-50 letters, numbers, or _';
    if (mode === 'create' && (!passwordRegex.test(formData.password))) return 'Password: at least 6 characters';
    if (mode === 'create' && formData.password !== confirmPassword) return 'Passwords do not match';
    if (!uniqueCheck.code) return 'Code must be unique';
    if (formData.email && !emailRegex.test(formData.email)) return 'Invalid email format';
    if (formData.contactNumber && !phoneRegex.test(formData.contactNumber)) return 'Invalid phone format';
    if (formData.city && formData.city.length > 100) return 'City: max 100 chars';
    if (formData.address && formData.address.length > 255) return 'Address: max 255 chars';
    return '';
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (name === "code") {
      setTimeout(async () => {
        if (value && mode === 'create') {
          const isUnique = await checkUnique(name, value);
          setUniqueCheck((prev) => ({ ...prev, [name]: isUnique }));
        }
      }, 300);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    const err = await validate();
    if (err) {
      setFormError(err);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className="hospital-form card" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3 className="heading-3 mb-2">{mode === 'create' ? 'Create Hospital' : 'Update Hospital'}</h3>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Apollo Hospital Chennai"
              minLength={2}
              maxLength={200}
              required
            />
            <small className="form-helper">2-200 characters</small>
          </div>
          <div className="form-group">
            <label className="form-label">Code *</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., APOLLO_CHN"
              minLength={2}
              maxLength={20}
              required
              readOnly={mode === 'update'}
              style={!uniqueCheck.code ? { borderColor: '#dc2626' } : {}}
            />
            <small className="form-helper">Must be unique, 2-20 uppercase letters/numbers/_</small>
          </div>
          <div className="form-group">
            <label className="form-label">State *</label>
            <select
              name="stateId"
              value={formData.stateId}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select State</option>
              {stateOptions.map((state) => (
                <option key={state.id} value={state.id}>{state.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">License Number *</label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., TN-HOSP-2024-001"
              maxLength={50}
              required
            />
          </div>
          {mode === 'create' && (
            <div className="form-group">
              <label className="form-label">Username *</label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., apollo_chennai"
                minLength={3}
                maxLength={50}
                required
              />
              <small className="form-helper">Hospital login username, 3-50 characters</small>
            </div>
          )}
          {mode === 'create' && (
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Hospital login password"
                minLength={6}
                maxLength={255}
                required
              />
              <small className="form-helper">At least 6 characters</small>
            </div>
          )}
          {mode === 'create' && (
            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="form-input"
                placeholder="Confirm password"
                minLength={6}
                maxLength={255}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Full hospital address"
              maxLength={255}
            />
          </div>
          <div className="form-group">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Chennai"
              maxLength={100}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., +91-44-2829-3333"
              maxLength={20}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., info@apollochennai.com"
              maxLength={100}
            />
          </div>
        </div>
        {formError && <div className="error-message">{formError}</div>}
        {error && <div className="error-message">{error}</div>}
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : (mode === 'create' ? 'Create Hospital' : 'Update Hospital')}</button>
        </div>
      </div>
      <style jsx>{`
        .hospital-form { max-width: 700px; margin: 0 auto; padding: var(--spacing-xl); background: var(--white); border-radius: var(--radius-lg); box-shadow: var(--shadow-md); }
        .form-section { display: flex; flex-direction: column; gap: var(--spacing-lg); }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg); }
        .form-group { display: flex; flex-direction: column; gap: 4px; }
        .form-label { font-weight: 600; color: var(--gray-800); }
        .form-helper { color: var(--gray-500); font-size: 0.85em; }
        .error-message { color: #dc2626; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 12px; margin-bottom: 16px; font-size: 14px; }
        .form-actions { display: flex; justify-content: flex-end; gap: var(--spacing-md); margin-top: var(--spacing-lg); }
        @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } }
      `}</style>
    </form>
  );
};

export default HospitalForm;
