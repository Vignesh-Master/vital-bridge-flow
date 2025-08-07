import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EnhancedForm = ({ 
  title, 
  subtitle, 
  onSubmit, 
  children, 
  loading = false,
  error = '',
  success = ''
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateField = (name, value, rules = {}) => {
    const { required, minLength, pattern, custom } = rules;
    
    if (required && !value) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    
    if (minLength && value.length < minLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${minLength} characters`;
    }
    
    if (pattern && !pattern.test(value)) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} format is invalid`;
    }
    
    if (custom && !custom(value)) {
      return custom(value);
    }
    
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <motion.div
      className="enhanced-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="form-header">
        {title && <h2 className="form-title">{title}</h2>}
        {subtitle && <p className="form-subtitle">{subtitle}</p>}
      </div>

      <form onSubmit={handleSubmit} className="enhanced-form">
        {error && (
          <motion.div
            className="form-error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
              <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            className="form-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2"/>
              <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {success}
          </motion.div>
        )}

        <div className="form-content">
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                formData,
                errors,
                onChange: handleInputChange,
                validateField
              });
            }
            return child;
          })}
        </div>

        <motion.button
          type="submit"
          className="form-submit-btn"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              Processing...
            </div>
          ) : (
            'Submit'
          )}
        </motion.button>
      </form>

      <style jsx>{`
        .enhanced-form-container {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .form-subtitle {
          color: #6b7280;
          font-size: 1rem;
          line-height: 1.5;
        }

        .enhanced-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-error, .form-success {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 0.5rem;
          font-weight: 500;
        }

        .form-error {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        .form-success {
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        }

        .form-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-submit-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .form-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-submit-btn:hover:not(:disabled) {
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .loading-spinner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .spinner {
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .enhanced-form-container {
            margin: 1rem;
            padding: 1.5rem;
          }

          .form-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

// Enhanced Input Component
export const EnhancedInput = ({ 
  name, 
  label, 
  type = 'text', 
  placeholder, 
  required = false,
  minLength,
  pattern,
  customValidation,
  formData,
  errors,
  onChange,
  ...props 
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
  };

  const error = errors[name];
  const showError = touched && error;

  return (
    <div className="enhanced-input-group">
      <label className="input-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      
      <div className={`input-container ${focused ? 'focused' : ''} ${showError ? 'error' : ''}`}>
        <input
          type={type}
          name={name}
          value={formData[name] || ''}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="enhanced-input"
          {...props}
        />
        
        {showError && (
          <motion.div
            className="input-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
              <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {error}
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .enhanced-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-label {
          font-weight: 500;
          color: #374151;
          font-size: 0.875rem;
        }

        .required {
          color: #ef4444;
          margin-left: 0.25rem;
        }

        .input-container {
          position: relative;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          transition: all 0.2s;
          background: white;
        }

        .input-container.focused {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .input-container.error {
          border-color: #ef4444;
        }

        .enhanced-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: none;
          outline: none;
          font-size: 1rem;
          background: transparent;
          color: #1f2937;
        }

        .enhanced-input::placeholder {
          color: #9ca3af;
        }

        .input-error {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #fef2f2;
          color: #dc2626;
          padding: 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.25rem;
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

// Enhanced Select Component
export const EnhancedSelect = ({ 
  name, 
  label, 
  options = [], 
  placeholder,
  required = false,
  formData,
  errors,
  onChange,
  ...props 
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
  };

  const error = errors[name];
  const showError = touched && error;

  return (
    <div className="enhanced-select-group">
      <label className="select-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      
      <div className={`select-container ${focused ? 'focused' : ''} ${showError ? 'error' : ''}`}>
        <select
          name={name}
          value={formData[name] || ''}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          className="enhanced-select"
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
        
        <svg className="select-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {showError && (
        <motion.div
          className="select-error"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
          </svg>
          {error}
        </motion.div>
      )}

      <style jsx>{`
        .enhanced-select-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .select-label {
          font-weight: 500;
          color: #374151;
          font-size: 0.875rem;
        }

        .select-container {
          position: relative;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          transition: all 0.2s;
          background: white;
        }

        .select-container.focused {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .select-container.error {
          border-color: #ef4444;
        }

        .enhanced-select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: none;
          outline: none;
          font-size: 1rem;
          background: transparent;
          color: #1f2937;
          appearance: none;
          cursor: pointer;
        }

        .select-arrow {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          pointer-events: none;
        }

        .select-error {
          background: #fef2f2;
          color: #dc2626;
          padding: 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default EnhancedForm;
