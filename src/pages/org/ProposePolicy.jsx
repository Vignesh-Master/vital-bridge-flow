import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProposePolicy = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    organType: '',
    justification: '',
    impact: '',
    evidence: '',
    implementation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const organTypes = ['All', 'Heart', 'Liver', 'Kidney', 'Lung', 'Pancreas', 'Cornea', 'Bone', 'Skin'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call and blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('Policy proposal:', formData);
      alert('Policy proposal submitted successfully! It will now be sent to organizations for voting.');
      navigate('/org/policies');
    } catch (error) {
      alert('Error submitting proposal. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="propose-policy">
      {/* Header */}
      <header className="org-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h2>OrganLink</h2>
              <span className="org-name">Global Health Alliance</span>
            </div>
            <nav className="org-nav">
              <Link to="/org/policies" className="nav-link">Policies</Link>
              <Link to="/org/propose" className="nav-link active">Propose</Link>
              <Link to="/org/vote" className="nav-link">Vote</Link>
              <Link to="/org/history" className="nav-link">History</Link>
            </nav>
            <div className="header-actions">
              <button className="btn btn-secondary btn-small">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Profile
              </button>
              <Link to="/org/login" className="btn btn-danger btn-small">Logout</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <div>
              <h1 className="heading-1">Propose New Policy</h1>
              <p className="text-large">Submit a new policy for global consideration and voting</p>
            </div>
            <div className="header-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Proposal Form */}
        <div className="form-container">
          <form onSubmit={handleSubmit} className="proposal-form">
            <div className="form-sections">
              {/* Basic Information */}
              <div className="form-section">
                <h3 className="section-title">Basic Information</h3>
                
                <div className="form-group">
                  <label className="form-label">Policy Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., Enhanced Cross-Border Organ Sharing Protocol"
                    required
                  />
                  <small className="form-help">A clear, descriptive title for your policy proposal</small>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Organ Type *</label>
                    <select
                      name="organType"
                      value={formData.organType}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Organ Type</option>
                      {organTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <small className="form-help">Which organ(s) does this policy apply to?</small>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Policy Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Provide a comprehensive description of the proposed policy..."
                    rows="4"
                    required
                  />
                  <small className="form-help">Detailed explanation of what this policy entails</small>
                </div>
              </div>

              {/* Justification & Evidence */}
              <div className="form-section">
                <h3 className="section-title">Justification & Evidence</h3>
                
                <div className="form-group">
                  <label className="form-label">Justification *</label>
                  <textarea
                    name="justification"
                    value={formData.justification}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Explain why this policy is needed and the problems it solves..."
                    rows="4"
                    required
                  />
                  <small className="form-help">Why is this policy necessary? What problems does it address?</small>
                </div>

                <div className="form-group">
                  <label className="form-label">Expected Impact *</label>
                  <textarea
                    name="impact"
                    value={formData.impact}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Describe the expected positive impact on organ transplantation..."
                    rows="3"
                    required
                  />
                  <small className="form-help">What positive changes do you expect from this policy?</small>
                </div>

                <div className="form-group">
                  <label className="form-label">Supporting Evidence</label>
                  <textarea
                    name="evidence"
                    value={formData.evidence}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Cite studies, statistics, or other evidence supporting this policy..."
                    rows="3"
                  />
                  <small className="form-help">Research, data, or case studies that support your proposal</small>
                </div>
              </div>

              {/* Implementation Details */}
              <div className="form-section">
                <h3 className="section-title">Implementation</h3>
                
                <div className="form-group">
                  <label className="form-label">Implementation Plan</label>
                  <textarea
                    name="implementation"
                    value={formData.implementation}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="How should this policy be implemented? Timeline, resources, responsibilities..."
                    rows="4"
                  />
                  <small className="form-help">Practical steps for implementing this policy</small>
                </div>
              </div>

              {/* Policy Guidelines */}
              <div className="guidelines-section">
                <h3 className="section-title">Proposal Guidelines</h3>
                <div className="guidelines-content">
                  <div className="guideline-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10" stroke="var(--accent-green)" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="10" stroke="var(--accent-green)" strokeWidth="2"/>
                    </svg>
                    <span>Policies must be evidence-based and cite relevant research or data</span>
                  </div>
                  <div className="guideline-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10" stroke="var(--accent-green)" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="10" stroke="var(--accent-green)" strokeWidth="2"/>
                    </svg>
                    <span>Proposals should address a clear problem in organ transplantation</span>
                  </div>
                  <div className="guideline-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10" stroke="var(--accent-green)" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="10" stroke="var(--accent-green)" strokeWidth="2"/>
                    </svg>
                    <span>Implementation plan should be realistic and achievable</span>
                  </div>
                  <div className="guideline-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10" stroke="var(--accent-green)" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="10" stroke="var(--accent-green)" strokeWidth="2"/>
                    </svg>
                    <span>Policies will be voted on by all registered organizations</span>
                  </div>
                  <div className="guideline-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10" stroke="var(--accent-green)" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="10" stroke="var(--accent-green)" strokeWidth="2"/>
                    </svg>
                    <span>Approved policies (>50% support) are integrated into AI matching algorithms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <Link to="/org/policies" className="btn btn-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25"/>
                      <path d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z" fill="currentColor"/>
                    </svg>
                    Submitting to Blockchain...
                  </>
                ) : (
                  'Submit Policy Proposal'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .propose-policy {
          min-height: 100vh;
          background: var(--gray-50);
        }

        .org-header {
          background: var(--white);
          border-bottom: 1px solid var(--gray-200);
          padding: var(--spacing-lg) 0;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo h2 {
          color: var(--primary-blue);
          font-family: var(--font-heading);
          margin: 0;
          font-size: 1.5rem;
        }

        .org-name {
          color: var(--secondary-teal);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .org-nav {
          display: flex;
          gap: var(--spacing-2xl);
        }

        .nav-link {
          color: var(--gray-600);
          text-decoration: none;
          font-weight: 500;
          padding-bottom: 4px;
          border-bottom: 2px solid transparent;
          transition: all var(--transition-normal);
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--primary-blue);
          border-bottom-color: var(--primary-blue);
        }

        .header-actions {
          display: flex;
          gap: var(--spacing-md);
          align-items: center;
        }

        .page-header {
          background: var(--gradient-primary);
          border-radius: var(--radius-xl);
          padding: var(--spacing-2xl);
          margin: var(--spacing-2xl) 0;
          color: var(--white);
        }

        .page-header .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .page-header h1 {
          color: var(--white);
        }

        .header-icon {
          width: 80px;
          height: 80px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-container {
          background-color: var(--white);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          padding: var(--spacing-2xl);
          margin-bottom: var(--spacing-2xl);
        }

        .proposal-form {
          max-width: 100%;
        }

        .form-sections {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2xl);
          margin-bottom: var(--spacing-2xl);
        }

        .form-section {
          padding: var(--spacing-xl);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-lg);
          background: var(--gray-50);
        }

        .section-title {
          color: var(--primary-blue);
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-sm);
          border-bottom: 2px solid var(--primary-blue);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-lg);
        }

        .form-help {
          color: var(--gray-500);
          font-size: 0.875rem;
          margin-top: var(--spacing-xs);
          display: block;
        }

        .guidelines-section {
          background: var(--white);
          border: 2px solid var(--accent-green);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
        }

        .guidelines-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .guideline-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          color: var(--gray-700);
          font-size: 0.875rem;
        }

        .form-actions {
          display: flex;
          gap: var(--spacing-lg);
          justify-content: flex-end;
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--gray-200);
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: var(--spacing-lg);
          }

          .org-nav {
            order: 2;
          }

          .page-header .header-content {
            flex-direction: column;
            gap: var(--spacing-lg);
            text-align: center;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }

          .form-container {
            padding: var(--spacing-lg);
          }

          .form-section {
            padding: var(--spacing-lg);
          }
        }

        @media (max-width: 480px) {
          .page-header {
            padding: var(--spacing-lg);
          }
        }
      `}</style>
    </div>
  );
};

export default ProposePolicy;