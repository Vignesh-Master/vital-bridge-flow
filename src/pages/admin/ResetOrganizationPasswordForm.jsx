import React, { useState } from 'react';

const passwordRegex = /^.{6,255}$/;

const ResetOrganizationPasswordForm = ({
  onSubmit,
  onCancel,
  loading = false,
  error = ''
}) => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [formError, setFormError] = useState('');

  const validate = () => {
    if (!passwordRegex.test(formData.newPassword)) return 'Password: at least 6 characters';
    if (formData.newPassword !== formData.confirmPassword) return 'Passwords do not match';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    const err = validate();
    if (err) {
      setFormError(err);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className="reset-password-form card" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3 className="heading-3 mb-2">Reset Organization Password</h3>
        <div className="form-group">
          <label className="form-label">New Password *</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter new password"
            minLength={6}
            maxLength={255}
            required
          />
          <small className="form-helper">At least 6 characters</small>
        </div>
        <div className="form-group">
          <label className="form-label">Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
            placeholder="Confirm new password"
            minLength={6}
            maxLength={255}
            required
          />
        </div>
        {formError && <div className="error-message">{formError}</div>}
        {error && <div className="error-message">{error}</div>}
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Reset Password'}</button>
        </div>
      </div>
      <style jsx>{`
        .reset-password-form { max-width: 400px; margin: 0 auto; padding: var(--spacing-xl); background: var(--white); border-radius: var(--radius-lg); box-shadow: var(--shadow-md); }
        .form-section { display: flex; flex-direction: column; gap: var(--spacing-lg); }
        .form-group { display: flex; flex-direction: column; gap: 4px; }
        .form-label { font-weight: 600; color: var(--gray-800); }
        .form-helper { color: var(--gray-500); font-size: 0.85em; }
        .error-message { color: #dc2626; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 12px; margin-bottom: 16px; font-size: 14px; }
        .form-actions { display: flex; justify-content: flex-end; gap: var(--spacing-md); margin-top: var(--spacing-lg); }
      `}</style>
    </form>
  );
};

export default ResetOrganizationPasswordForm;
