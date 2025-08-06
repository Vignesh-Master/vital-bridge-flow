import React, { useState } from 'react';

const orgIdRegex = /^[A-Z0-9_]{3,50}$/;
const nameRegex = /^.{2,200}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,50}$/;
const passwordRegex = /^.{6,255}$/;

const OrganizationForm = ({
  mode = 'create', // 'create' | 'update'
  initialData = {},
  onSubmit,
  onCancel,
  loading = false,
  error = '',
  checkUnique = async () => true // (field, value) => Promise<boolean>
}) => {
  const [formData, setFormData] = useState({
    orgId: initialData.orgId || '',
    name: initialData.name || '',
    username: initialData.username || '',
    password: '',
    location: initialData.location || '',
    canVote: initialData.canVote ?? true,
    canPropose: initialData.canPropose ?? true,
    registerBlockchain: initialData.registerBlockchain ?? false
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [uniqueCheck, setUniqueCheck] = useState({ orgId: true, name: true, username: true });

  const validate = async () => {
    if (!orgIdRegex.test(formData.orgId)) return 'Org ID: 3-50 uppercase letters, numbers, or _';
    if (!nameRegex.test(formData.name)) return 'Name: 2-200 characters';
    if (!usernameRegex.test(formData.username)) return 'Username: 3-50 letters, numbers, or _';
    if (mode === 'create' && !passwordRegex.test(formData.password)) return 'Password: at least 6 characters';
    if (mode === 'create' && formData.password !== confirmPassword) return 'Passwords do not match';
    if (!uniqueCheck.orgId) return 'Org ID must be unique';
    if (!uniqueCheck.name) return 'Name must be unique';
    if (!uniqueCheck.username) return 'Username must be unique';
    return '';
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (["orgId", "name", "username"].includes(name)) {
      // Debounced unique check (simulate API)
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
    <form className="org-form card" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3 className="heading-3 mb-2">{mode === 'create' ? 'Create Organization' : 'Update Organization'}</h3>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Org ID *</label>
            <input
              type="text"
              name="orgId"
              value={formData.orgId}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., GLOBAL_HEALTH"
              minLength={3}
              maxLength={50}
              required
              readOnly={mode === 'update'}
              style={!uniqueCheck.orgId ? { borderColor: '#dc2626' } : {}}
            />
            <small className="form-helper">Must be unique, 3-50 uppercase letters/numbers/_</small>
          </div>
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Global Health Initiative"
              minLength={2}
              maxLength={200}
              required
              readOnly={false}
              style={!uniqueCheck.name ? { borderColor: '#dc2626' } : {}}
            />
            <small className="form-helper">Must be unique, 2-200 characters</small>
          </div>
          <div className="form-group">
            <label className="form-label">Username *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., global_admin"
              minLength={3}
              maxLength={50}
              required
              readOnly={mode === 'update'}
              style={!uniqueCheck.username ? { borderColor: '#dc2626' } : {}}
            />
            <small className="form-helper">Must be unique, 3-50 characters</small>
          </div>
          {mode === 'create' && (
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Minimum 6 characters"
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
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., International, Mumbai, etc."
              maxLength={100}
            />
            <small className="form-helper">Maximum 100 characters</small>
          </div>
        </div>
        <div className="form-group form-checkbox-group">
          <label>
            <input
              type="checkbox"
              name="canVote"
              checked={formData.canVote}
              onChange={handleChange}
            /> Can vote on policies
          </label>
          <label>
            <input
              type="checkbox"
              name="canPropose"
              checked={formData.canPropose}
              onChange={handleChange}
            /> Can propose new policies
          </label>
          <label>
            <input
              type="checkbox"
              name="registerBlockchain"
              checked={formData.registerBlockchain}
              onChange={handleChange}
            /> Register on blockchain
          </label>
        </div>
        {formError && <div className="error-message">{formError}</div>}
        {error && <div className="error-message">{error}</div>}
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : (mode === 'create' ? 'Create Organization' : 'Update Organization')}</button>
        </div>
      </div>
      <style jsx>{`
        .org-form { max-width: 600px; margin: 0 auto; padding: var(--spacing-xl); background: var(--white); border-radius: var(--radius-lg); box-shadow: var(--shadow-md); }
        .form-section { display: flex; flex-direction: column; gap: var(--spacing-lg); }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg); }
        .form-group { display: flex; flex-direction: column; gap: 4px; }
        .form-label { font-weight: 600; color: var(--gray-800); }
        .form-helper { color: var(--gray-500); font-size: 0.85em; }
        .form-checkbox-group { display: flex; gap: var(--spacing-xl); margin-top: var(--spacing-md); }
        .error-message { color: #dc2626; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 12px; margin-bottom: 16px; font-size: 14px; }
        .form-actions { display: flex; justify-content: flex-end; gap: var(--spacing-md); margin-top: var(--spacing-lg); }
        @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } }
      `}</style>
    </form>
  );
};

export default OrganizationForm;
