import React, { useState } from 'react';
import Layout from '../components/Layout';

const RegisterDonor = () => {
  const [formData, setFormData] = useState({
    donorName: '',
    age: '',
    bloodType: '',
    gender: '',
    organAvailable: '',
    donorType: 'LIVING',
    causeOfDeath: '',
    timeOfDeath: '',
    medicalClearance: '',
    contactPerson: '',
    contactNumber: '',
    hospitalId: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const organs = ['Heart', 'Liver', 'Kidney', 'Lungs', 'Cornea', 'Skin', 'Bone', 'Pancreas'];
  const donorTypes = ['LIVING', 'DECEASED'];

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
      console.log('Donor registration:', formData);
      alert('Donor registered successfully!');
      // Reset form
      setFormData({
        donorName: '',
        age: '',
        bloodType: '',
        gender: '',
        organAvailable: '',
        donorType: 'LIVING',
        causeOfDeath: '',
        timeOfDeath: '',
        medicalClearance: '',
        contactPerson: '',
        contactNumber: '',
        hospitalId: ''
      });
    } catch (error) {
      alert('Error registering donor. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="register-donor">
        <div className="container">
          {/* Page Header */}
          <div className="page-header">
            <div className="header-content">
              <div>
                <h1 className="heading-1">Register Donor</h1>
                <p className="text-large">Add a new organ donor to the system</p>
              </div>
              <div className="header-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 11a4 4 0 0 0 8 0c0-1.18-.5-2.3-1.4-3.1s-2.14-1.3-3.36-1.3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="form-container">
            <form onSubmit={handleSubmit} className="donor-form">
              <div className="form-grid">
                {/* Personal Information Section */}
                <div className="form-section">
                  <h3 className="section-title">Personal Information</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Donor Name *</label>
                    <input
                      type="text"
                      name="donorName"
                      value={formData.donorName}
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

                  <div className="form-row">
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
                      <label className="form-label">Donor Type *</label>
                      <select
                        name="donorType"
                        value={formData.donorType}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        {donorTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Medical Information Section */}
                <div className="form-section">
                  <h3 className="section-title">Medical Information</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Organ Available *</label>
                    <select
                      name="organAvailable"
                      value={formData.organAvailable}
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

                  {formData.donorType === 'DECEASED' && (
                    <>
                      <div className="form-group">
                        <label className="form-label">Cause of Death</label>
                        <input
                          type="text"
                          name="causeOfDeath"
                          value={formData.causeOfDeath}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="e.g., Brain death due to accident"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Time of Death</label>
                        <input
                          type="datetime-local"
                          name="timeOfDeath"
                          value={formData.timeOfDeath}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                    </>
                  )}

                  <div className="form-group">
                    <label className="form-label">Medical Clearance *</label>
                    <textarea
                      name="medicalClearance"
                      value={formData.medicalClearance}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Medical clearance status and notes"
                      required
                    />
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="form-section">
                  <h3 className="section-title">Contact Information</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Contact Person *</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Primary contact person"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Number *</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="+91-98765-12345"
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
                    'Register Donor'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .register-donor {
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

        .donor-form {
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

          .form-actions {
            flex-direction: column;
          }

          .form-container {
            padding: var(--spacing-lg);
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

export default RegisterDonor;