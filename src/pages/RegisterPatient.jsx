import React, { useState } from 'react';
import Layout from '../components/Layout';

const RegisterPatient = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    bloodType: '',
    gender: '',
    organNeeded: '',
    urgencyLevel: 'MEDIUM',
    medicalCondition: '',
    medicalHistory: '',
    contactNumber: '',
    address: '',
    hospitalId: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const organs = ['Heart', 'Liver', 'Kidney', 'Lungs', 'Cornea', 'Skin', 'Bone', 'Pancreas'];
  const urgencyLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Patient registration:', formData);
      alert('Patient registered successfully!');
      // Reset form
      setFormData({
        patientName: '',
        age: '',
        bloodType: '',
        gender: '',
        organNeeded: '',
        urgencyLevel: 'MEDIUM',
        medicalCondition: '',
        medicalHistory: '',
        contactNumber: '',
        address: '',
        hospitalId: ''
      });
    } catch (error) {
      alert('Error registering patient. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="register-patient">
        <div className="container">
          {/* Page Header */}
          <div className="page-header">
            <div className="header-content">
              <div>
                <h1 className="heading-1">Register Patient</h1>
                <p className="text-large">Add a new patient to the organ waiting list</p>
              </div>
              <div className="header-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="form-container">
            <form onSubmit={handleSubmit} className="patient-form">
              <div className="form-grid">
                {/* Personal Information Section */}
                <div className="form-section">
                  <h3 className="section-title">Personal Information</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Patient Name *</label>
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Age *</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Age"
                        min="1"
                        max="120"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Blood Type *</label>
                    <select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Blood Type</option>
                      {bloodTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Number *</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="+91-98765-43210"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Complete address with city, state"
                      required
                    />
                  </div>
                </div>

                {/* Medical Information Section */}
                <div className="form-section">
                  <h3 className="section-title">Medical Information</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Organ Needed *</label>
                    <select
                      name="organNeeded"
                      value={formData.organNeeded}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Organ</option>
                      {organs.map(organ => (
                        <option key={organ} value={organ}>{organ}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Urgency Level *</label>
                    <select
                      name="urgencyLevel"
                      value={formData.urgencyLevel}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      {urgencyLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    <div className="urgency-info">
                      <div className="urgency-indicators">
                        <span className="urgency-indicator low">LOW - Stable condition</span>
                        <span className="urgency-indicator medium">MEDIUM - Moderate need</span>
                        <span className="urgency-indicator high">HIGH - Urgent need</span>
                        <span className="urgency-indicator critical">CRITICAL - Life threatening</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Medical Condition *</label>
                    <textarea
                      name="medicalCondition"
                      value={formData.medicalCondition}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Current medical condition requiring organ transplant"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Medical History *</label>
                    <textarea
                      name="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Relevant medical history, treatments, medications"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Hospital ID *</label>
                    <input
                      type="text"
                      name="hospitalId"
                      value={formData.hospitalId}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Hospital identifier"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="notice-section">
                <div className="notice-card">
                  <div className="notice-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="notice-content">
                    <h4>Important Information</h4>
                    <p>
                      Patient registration initiates the matching process. Ensure all medical information 
                      is accurate and up-to-date. Our AI system will automatically search for compatible 
                      donors based on blood type, organ compatibility, and urgency level.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </button>
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
                      Registering...
                    </>
                  ) : (
                    'Register Patient'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .register-patient {
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
        }

        .patient-form {
          max-width: 100%;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--spacing-2xl);
          margin-bottom: var(--spacing-2xl);
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .section-title {
          color: var(--primary-blue);
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: var(--spacing-md);
          padding-bottom: var(--spacing-sm);
          border-bottom: 2px solid var(--primary-blue);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-lg);
        }

        .urgency-info {
          margin-top: var(--spacing-sm);
        }

        .urgency-indicators {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .urgency-indicator {
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 500;
        }

        .urgency-indicator.low {
          background-color: rgba(39, 174, 96, 0.1);
          color: var(--accent-green);
        }

        .urgency-indicator.medium {
          background-color: rgba(243, 156, 18, 0.1);
          color: var(--warning-orange);
        }

        .urgency-indicator.high {
          background-color: rgba(231, 76, 60, 0.1);
          color: var(--accent-red);
        }

        .urgency-indicator.critical {
          background-color: rgba(231, 76, 60, 0.2);
          color: #c0392b;
          font-weight: 600;
        }

        .notice-section {
          margin-bottom: var(--spacing-2xl);
        }

        .notice-card {
          display: flex;
          gap: var(--spacing-md);
          padding: var(--spacing-lg);
          background-color: rgba(45, 156, 219, 0.05);
          border: 1px solid rgba(45, 156, 219, 0.2);
          border-radius: var(--radius-lg);
        }

        .notice-icon {
          color: var(--secondary-teal);
          flex-shrink: 0;
        }

        .notice-content h4 {
          margin: 0 0 var(--spacing-sm);
          color: var(--secondary-teal);
          font-weight: 600;
        }

        .notice-content p {
          margin: 0;
          color: var(--gray-700);
          line-height: 1.6;
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
            text-align: center;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .urgency-indicators {
            gap: var(--spacing-sm);
          }

          .form-actions {
            flex-direction: column;
          }

          .form-container {
            padding: var(--spacing-lg);
          }

          .notice-card {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .page-header {
            padding: var(--spacing-lg);
          }
        }
      `}</style>
    </Layout>
  );
};

export default RegisterPatient;