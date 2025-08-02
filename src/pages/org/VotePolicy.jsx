import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const VotePolicy = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedPolicyId, setSelectedPolicyId] = useState(searchParams.get('policy') || '');
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [vote, setVote] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mockPolicies = [
    {
      id: 'POL-001',
      title: 'Cross-Border Organ Sharing Protocol',
      description: 'Standardized procedures for international organ transfers including documentation, logistics, and coordination between different healthcare systems.',
      detailedDescription: `This policy establishes a comprehensive framework for cross-border organ sharing, addressing critical gaps in current international transplant protocols. 

Key components include:
• Standardized documentation requirements for international transfers
• Emergency protocols for time-sensitive organ transportation
• Quality assurance standards for cross-border organ preservation
• Legal framework for international donor-recipient matching
• Coordination protocols between participating countries' healthcare systems

The policy aims to reduce organ wastage and improve patient outcomes by facilitating efficient international collaboration while maintaining the highest safety and ethical standards.`,
      organType: 'All',
      proposedBy: 'WHO',
      proposedDate: '2024-01-15',
      votingDeadline: '2024-02-15',
      justification: 'Current systems lack standardization for international organ sharing, resulting in missed opportunities and delayed procedures that can be life-threatening.',
      evidence: 'Studies show 15% of organs are wasted due to coordination failures. EU pilot program demonstrated 30% improvement in cross-border success rates.',
      impact: 'Expected to increase successful transplants by 25% and reduce organ wastage by 40% through improved international coordination.',
      implementation: 'Phased rollout over 12 months with pilot programs in major transplant centers, followed by comprehensive training and system integration.',
      votesFor: 12,
      votesAgainst: 3,
      totalVotes: 15,
      status: 'Pending'
    },
    {
      id: 'POL-002',
      title: 'Emergency Kidney Allocation Priority',
      description: 'Updated priority system for emergency kidney transplants based on medical urgency and compatibility.',
      detailedDescription: `This policy introduces a dynamic prioritization system for emergency kidney transplants, incorporating real-time medical data and advanced compatibility scoring.

Key features:
• Real-time urgency assessment using MELD and eGFR scores
• Enhanced HLA compatibility weighting for pediatric patients
• Geographic distance optimization for emergency cases
• Integration with existing UNOS allocation protocols
• Special provisions for highly sensitized patients

The system uses AI-driven risk assessment to balance urgency with long-term outcomes, ensuring optimal allocation while maintaining fairness and transparency.`,
      organType: 'Kidney',
      proposedBy: 'UNOS',
      proposedDate: '2024-01-20',
      votingDeadline: '2024-02-20',
      justification: 'Current allocation systems do not adequately address emergency cases, leading to suboptimal outcomes for critically ill patients.',
      evidence: 'Analysis of 5,000 emergency cases shows current system has 20% higher mortality in emergency allocations compared to this proposed framework.',
      impact: 'Projected to reduce emergency transplant mortality by 35% and improve 1-year survival rates by 15%.',
      implementation: 'Integration with existing allocation software over 6 months, with real-time monitoring and adjustment protocols.',
      votesFor: 8,
      votesAgainst: 2,
      totalVotes: 10,
      status: 'Pending'
    },
    {
      id: 'POL-004',
      title: 'Living Donor Protection Standards',
      description: 'Enhanced safety and ethical standards for living donor procedures and follow-up care.',
      detailedDescription: `Comprehensive standards to protect living donors throughout the donation process and beyond, addressing current gaps in donor safety and rights.

Core requirements:
• Mandatory psychological evaluation and counseling programs
• Enhanced informed consent procedures with cooling-off periods
• Standardized medical follow-up protocols for minimum 5 years
• Financial protection against donation-related complications
• Anonymous reporting system for donor concerns
• Regular quality audits of living donor programs

This policy ensures living donors are fully protected medically, psychologically, and financially, promoting ethical practices while maintaining program viability.`,
      organType: 'All',
      proposedBy: 'International Transplant Society',
      proposedDate: '2024-01-25',
      votingDeadline: '2024-02-25',
      justification: 'Current donor protection varies significantly between institutions, creating ethical concerns and potential for exploitation.',
      evidence: 'Survey of 10,000 living donors found 25% experienced inadequate follow-up care and 15% faced financial hardship from complications.',
      impact: 'Will standardize donor protection globally and is expected to increase living donation rates by improving donor confidence.',
      implementation: 'Gradual implementation over 18 months with certification requirements for participating centers.',
      votesFor: 6,
      votesAgainst: 4,
      totalVotes: 10,
      status: 'Pending'
    }
  ];

  const pendingPolicies = mockPolicies.filter(policy => policy.status === 'Pending');

  useEffect(() => {
    if (selectedPolicyId) {
      const policy = mockPolicies.find(p => p.id === selectedPolicyId);
      setSelectedPolicy(policy);
    }
  }, [selectedPolicyId]);

  const handlePolicySelect = (policyId) => {
    setSelectedPolicyId(policyId);
    const policy = mockPolicies.find(p => p.id === policyId);
    setSelectedPolicy(policy);
    setVote('');
    setComment('');
  };

  const handleSubmitVote = async (e) => {
    e.preventDefault();
    if (!vote || !selectedPolicy) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call and blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2500));
      console.log('Vote submitted:', {
        policyId: selectedPolicy.id,
        vote,
        comment,
        organization: 'Global Health Alliance'
      });
      alert('Vote submitted successfully and recorded on blockchain!');
      navigate('/org/policies');
    } catch (error) {
      alert('Error submitting vote. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const getVotePercentage = (votesFor, totalVotes) => {
    return totalVotes > 0 ? Math.round((votesFor / totalVotes) * 100) : 0;
  };

  return (
    <div className="vote-policy">
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
              <Link to="/org/propose" className="nav-link">Propose</Link>
              <Link to="/org/vote" className="nav-link active">Vote</Link>
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
              <h1 className="heading-1">Vote on Policies</h1>
              <p className="text-large">Cast your vote on pending policy proposals</p>
            </div>
            <div className="header-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0-6 0" stroke="currentColor" strokeWidth="2"/>
                <path d="M18 8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V6a3 3 0 1 1 6 0v2h5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="voting-content">
          {/* Policy Selection */}
          <div className="policy-selection">
            <h3 className="section-title">Select Policy to Vote On</h3>
            {pendingPolicies.length === 0 ? (
              <div className="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <p>No policies currently pending votes</p>
              </div>
            ) : (
              <div className="policies-list">
                {pendingPolicies.map(policy => (
                  <div 
                    key={policy.id}
                    className={`policy-item ${selectedPolicyId === policy.id ? 'selected' : ''}`}
                    onClick={() => handlePolicySelect(policy.id)}
                  >
                    <div className="policy-header">
                      <div className="policy-meta">
                        <span className="policy-id">{policy.id}</span>
                        <span className="organ-type">{policy.organType}</span>
                        <span className="deadline">
                          Deadline: {new Date(policy.votingDeadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <h4 className="policy-title">{policy.title}</h4>
                    <p className="policy-description">{policy.description}</p>
                    
                    <div className="voting-stats">
                      <div className="vote-counts">
                        <span className="votes-for">{policy.votesFor} for</span>
                        <span className="votes-against">{policy.votesAgainst} against</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${getVotePercentage(policy.votesFor, policy.totalVotes)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Policy Details and Voting */}
          {selectedPolicy && (
            <div className="voting-section">
              <div className="policy-details">
                <div className="details-header">
                  <h3>{selectedPolicy.title}</h3>
                  <span className="policy-id">{selectedPolicy.id}</span>
                </div>

                <div className="details-content">
                  <div className="detail-section">
                    <h4>Detailed Description</h4>
                    <p className="detailed-description">{selectedPolicy.detailedDescription}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Justification</h4>
                    <p>{selectedPolicy.justification}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Supporting Evidence</h4>
                    <p>{selectedPolicy.evidence}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Expected Impact</h4>
                    <p>{selectedPolicy.impact}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Implementation Plan</h4>
                    <p>{selectedPolicy.implementation}</p>
                  </div>

                  <div className="policy-metadata">
                    <div className="metadata-item">
                      <strong>Proposed by:</strong> {selectedPolicy.proposedBy}
                    </div>
                    <div className="metadata-item">
                      <strong>Proposed date:</strong> {new Date(selectedPolicy.proposedDate).toLocaleDateString()}
                    </div>
                    <div className="metadata-item">
                      <strong>Voting deadline:</strong> {new Date(selectedPolicy.votingDeadline).toLocaleDateString()}
                    </div>
                    <div className="metadata-item">
                      <strong>Organ type:</strong> {selectedPolicy.organType}
                    </div>
                  </div>
                </div>
              </div>

              {/* Voting Form */}
              <div className="voting-form">
                <h3 className="section-title">Cast Your Vote</h3>
                <form onSubmit={handleSubmitVote}>
                  <div className="vote-options">
                    <label className={`vote-option ${vote === 'yes' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="vote"
                        value="yes"
                        checked={vote === 'yes'}
                        onChange={(e) => setVote(e.target.value)}
                      />
                      <div className="option-content">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>Support</span>
                      </div>
                      <p>I support this policy proposal</p>
                    </label>

                    <label className={`vote-option ${vote === 'no' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="vote"
                        value="no"
                        checked={vote === 'no'}
                        onChange={(e) => setVote(e.target.value)}
                      />
                      <div className="option-content">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                          <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2"/>
                          <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>Oppose</span>
                      </div>
                      <p>I oppose this policy proposal</p>
                    </label>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Comments (Optional)</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="form-textarea"
                      placeholder="Provide reasoning for your vote or suggestions for improvement..."
                      rows="3"
                    />
                  </div>

                  <div className="voting-actions">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!vote || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25"/>
                            <path d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z" fill="currentColor"/>
                          </svg>
                          Recording Vote...
                        </>
                      ) : (
                        'Submit Vote'
                      )}
                    </button>
                  </div>
                </form>

                <div className="voting-notice">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="var(--warning-orange)" strokeWidth="2"/>
                    <path d="M12 8V12" stroke="var(--warning-orange)" strokeWidth="2"/>
                    <path d="M12 16H12.01" stroke="var(--warning-orange)" strokeWidth="2"/>
                  </svg>
                  <p>Your vote will be permanently recorded on the blockchain and cannot be changed.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .vote-policy {
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

        .voting-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-2xl);
          margin-bottom: var(--spacing-2xl);
        }

        .policy-selection,
        .voting-section {
          background: var(--white);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          padding: var(--spacing-2xl);
        }

        .section-title {
          color: var(--primary-blue);
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-sm);
          border-bottom: 2px solid var(--primary-blue);
        }

        .empty-state {
          text-align: center;
          padding: var(--spacing-2xl);
          color: var(--gray-500);
        }

        .empty-state svg {
          margin-bottom: var(--spacing-md);
          stroke: var(--gray-300);
        }

        .policies-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .policy-item {
          padding: var(--spacing-lg);
          border: 2px solid var(--gray-200);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .policy-item:hover {
          border-color: var(--primary-blue);
          box-shadow: var(--shadow-md);
        }

        .policy-item.selected {
          border-color: var(--primary-blue);
          background: rgba(44, 90, 160, 0.05);
        }

        .policy-header {
          margin-bottom: var(--spacing-md);
        }

        .policy-meta {
          display: flex;
          gap: var(--spacing-md);
          align-items: center;
          flex-wrap: wrap;
        }

        .policy-id {
          font-family: monospace;
          font-weight: 600;
          color: var(--gray-700);
          background: var(--gray-100);
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
        }

        .organ-type {
          background: var(--secondary-teal);
          color: var(--white);
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .deadline {
          color: var(--warning-orange);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .policy-title {
          color: var(--gray-900);
          font-size: 1.125rem;
          margin-bottom: var(--spacing-sm);
        }

        .policy-description {
          color: var(--gray-600);
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: var(--spacing-md);
        }

        .voting-stats {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .vote-counts {
          display: flex;
          gap: var(--spacing-md);
          font-size: 0.875rem;
        }

        .votes-for {
          color: var(--accent-green);
          font-weight: 600;
        }

        .votes-against {
          color: var(--accent-red);
          font-weight: 600;
        }

        .progress-bar {
          height: 4px;
          background: var(--gray-200);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--accent-green);
          transition: width var(--transition-normal);
        }

        .policy-details {
          margin-bottom: var(--spacing-2xl);
        }

        .details-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid var(--gray-200);
        }

        .details-header h3 {
          color: var(--gray-900);
          margin: 0;
        }

        .details-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .detail-section h4 {
          color: var(--primary-blue);
          font-size: 1rem;
          margin-bottom: var(--spacing-sm);
        }

        .detail-section p {
          color: var(--gray-700);
          line-height: 1.6;
        }

        .detailed-description {
          white-space: pre-line;
        }

        .policy-metadata {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background: var(--gray-50);
          border-radius: var(--radius-md);
        }

        .metadata-item {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .vote-options {
          display: flex;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-lg);
        }

        .vote-option {
          flex: 1;
          padding: var(--spacing-lg);
          border: 2px solid var(--gray-200);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-normal);
          text-align: center;
        }

        .vote-option:hover {
          border-color: var(--primary-blue);
        }

        .vote-option.selected {
          border-color: var(--primary-blue);
          background: rgba(44, 90, 160, 0.05);
        }

        .vote-option input {
          display: none;
        }

        .option-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-sm);
          font-weight: 600;
          color: var(--gray-700);
        }

        .vote-option.selected .option-content {
          color: var(--primary-blue);
        }

        .vote-option p {
          font-size: 0.875rem;
          color: var(--gray-600);
          margin: 0;
        }

        .voting-actions {
          display: flex;
          justify-content: center;
          margin-bottom: var(--spacing-lg);
        }

        .voting-notice {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          background: rgba(243, 156, 18, 0.1);
          border-radius: var(--radius-md);
          border-left: 4px solid var(--warning-orange);
        }

        .voting-notice p {
          font-size: 0.875rem;
          color: var(--gray-700);
          margin: 0;
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

          .voting-content {
            grid-template-columns: 1fr;
          }

          .vote-options {
            flex-direction: column;
          }

          .policy-metadata {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default VotePolicy;