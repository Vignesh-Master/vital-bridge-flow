import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { patientAPI, signatureAPI } from '../../services/api';

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
    currentMedications: '',
    allergies: '',
    dialysisStatus: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    contactNumber: '',
    emergencyContact: '',
    insuranceDetails: '',
    hospitalId: ''
  });

  const [signatureData, setSignatureData] = useState({
    signatureFile: null,
    signerType: 'SELF', // SELF or GUARDIAN
    guardianName: '',
    guardianRelation: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const organs = ['Heart', 'Liver', 'Kidney', 'Lungs', 'Cornea', 'Skin', 'Bone', 'Pancreas'];
  const urgencyLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignatureInputChange = (e) => {
    const { name, value } = e.target;
    setSignatureData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignatureFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid signature file (JPEG, PNG, or PDF)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setSignatureData(prev => ({ ...prev, signatureFile: file }));

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setSignaturePreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setSignaturePreview(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setVerificationStatus(null);

    try {
      // Step 1: Validate signature upload
      if (!signatureData.signatureFile) {
        alert('Please upload a signature file');
        setIsSubmitting(false);
        return;
      }

      // Step 2: Create patient first
      console.log('🏥 Step 1: Creating patient record...');
      const patientResponse = await patientAPI.createPatient(formData);

      if (!patientResponse.success) {
        throw new Error(patientResponse.message || 'Failed to create patient');
      }

      const patientId = patientResponse.data.id;
      console.log('✅ Patient created with ID:', patientId);

      // Step 3: Upload and verify signature
      console.log('🔐 Step 2: Uploading signature for verification...');
      const signatureFormData = new FormData();
      signatureFormData.append('signatureFile', signatureData.signatureFile);
      signatureFormData.append('signerName', formData.patientName);
      signatureFormData.append('signerType', signatureData.signerType);
      signatureFormData.append('entityType', 'PATIENT');
      signatureFormData.append('entityId', patientId);
      signatureFormData.append('doctorId', 'DR001'); // Add doctor ID

      if (signatureData.signerType === 'GUARDIAN') {
        signatureFormData.append('guardianName', signatureData.guardianName);
        signatureFormData.append('guardianRelation', signatureData.guardianRelation);
      }

      const signatureResponse = await signatureAPI.verifyAndStore(signatureFormData);

      if (signatureResponse.success) {
        setVerificationStatus({
          status: 'success',
          message: 'Signature verified and stored on blockchain!',
          ipfsHash: signatureResponse.data.ipfsHash,
          blockchainTx: signatureResponse.data.ethereumTxHash
        });

        alert(`✅ Patient registered successfully!\n🔐 Signature verified and stored on blockchain\n📦 IPFS Hash: ${signatureResponse.data.ipfsHash}`);
      } else {
        setVerificationStatus({
          status: 'warning',
          message: 'Patient created but signature verification failed: ' + signatureResponse.message
        });

        alert(`⚠️ Patient registered but signature verification failed.\nReason: ${signatureResponse.message}`);
      }

      // Reset form on success
      setFormData({
        patientName: '',
        age: '',
        bloodType: '',
        gender: '',
        organNeeded: '',
        urgencyLevel: 'MEDIUM',
        medicalCondition: '',
        medicalHistory: '',
        currentMedications: '',
        allergies: '',
        dialysisStatus: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        contactNumber: '',
        emergencyContact: '',
        insuranceDetails: '',
        hospitalId: ''
      });

      setSignatureData({
        signatureFile: null,
        signerType: 'SELF',
        guardianName: '',
        guardianRelation: ''
      });

      setSignaturePreview(null);

    } catch (error) {
      console.error('❌ Patient registration failed:', error);
      alert(`❌ Error registering patient: ${error.message}`);
      setVerificationStatus({
        status: 'error',
        message: 'Registration failed: ' + error.message
      });
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

              {/* Signature Verification Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                  Digital Signature Verification
                </h3>

                <div className="signature-upload-container">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Who is signing? *</label>
                      <select
                        name="signerType"
                        value={signatureData.signerType}
                        onChange={handleSignatureInputChange}
                        className="form-select"
                        required
                      >
                        <option value="SELF">Patient (Self)</option>
                        <option value="GUARDIAN">Guardian/Family Member</option>
                      </select>
                    </div>

                    {signatureData.signerType === 'GUARDIAN' && (
                      <div className="form-group">
                        <label className="form-label">Guardian Name *</label>
                        <input
                          type="text"
                          name="guardianName"
                          value={signatureData.guardianName}
                          onChange={handleSignatureInputChange}
                          className="form-input"
                          placeholder="Full name of guardian"
                          required
                        />
                      </div>
                    )}
                  </div>

                  {signatureData.signerType === 'GUARDIAN' && (
                    <div className="form-group">
                      <label className="form-label">Relationship to Patient *</label>
                      <input
                        type="text"
                        name="guardianRelation"
                        value={signatureData.guardianRelation}
                        onChange={handleSignatureInputChange}
                        className="form-input"
                        placeholder="e.g., Spouse, Parent, Child"
                        required
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">Upload Signature *</label>
                    <div className="signature-upload-area">
                      <input
                        type="file"
                        id="signatureFile"
                        accept="image/jpeg,image/jpg,image/png,application/pdf"
                        onChange={handleSignatureFileChange}
                        className="signature-file-input"
                        required
                      />
                      <label htmlFor="signatureFile" className="signature-upload-label">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17,8 12,3 7,8"/>
                          <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <div className="upload-text">
                          <span className="upload-title">Click to upload signature</span>
                          <span className="upload-subtitle">JPEG, PNG, or PDF (max 5MB)</span>
                        </div>
                      </label>
                    </div>

                    {signaturePreview && (
                      <div className="signature-preview">
                        <img src={signaturePreview} alt="Signature preview" className="signature-preview-image" />
                      </div>
                    )}

                    {signatureData.signatureFile && (
                      <div className="file-info">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14,2 14,8 20,8"/>
                        </svg>
                        <span>{signatureData.signatureFile.name}</span>
                        <span className="file-size">({(signatureData.signatureFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                    )}
                  </div>

                  {verificationStatus && (
                    <div className={`verification-status ${verificationStatus.status}`}>
                      <div className="status-icon">
                        {verificationStatus.status === 'success' && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20,6 9,17 4,12"/>
                          </svg>
                        )}
                        {verificationStatus.status === 'error' && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="15" y1="9" x2="9" y2="15"/>
                            <line x1="9" y1="9" x2="15" y2="15"/>
                          </svg>
                        )}
                        {verificationStatus.status === 'warning' && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                            <line x1="12" y1="9" x2="12" y2="13"/>
                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                          </svg>
                        )}
                      </div>
                      <div className="status-content">
                        <p className="status-message">{verificationStatus.message}</p>
                        {verificationStatus.ipfsHash && (
                          <div className="blockchain-info">
                            <p><strong>IPFS Hash:</strong> <code>{verificationStatus.ipfsHash}</code></p>
                            <p><strong>Blockchain Tx:</strong> <code>{verificationStatus.blockchainTx}</code></p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
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

        /* Signature Upload Styles */
        .signature-upload-container {
          background: var(--gray-50);
          border-radius: var(--border-radius);
          padding: var(--spacing-lg);
          border: 2px dashed var(--gray-300);
        }

        .signature-upload-area {
          position: relative;
          margin-top: var(--spacing-sm);
        }

        .signature-file-input {
          position: absolute;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .signature-upload-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-xl);
          border: 2px dashed var(--primary-blue);
          border-radius: var(--border-radius);
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .signature-upload-label:hover {
          border-color: var(--primary-teal);
          background: var(--gray-50);
        }

        .upload-text {
          text-align: center;
          margin-top: var(--spacing-sm);
        }

        .upload-title {
          display: block;
          font-weight: 600;
          color: var(--primary-blue);
          margin-bottom: var(--spacing-xs);
        }

        .upload-subtitle {
          display: block;
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .signature-preview {
          margin-top: var(--spacing-md);
          text-align: center;
        }

        .signature-preview-image {
          max-width: 300px;
          max-height: 150px;
          border: 1px solid var(--gray-300);
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-top: var(--spacing-sm);
          padding: var(--spacing-sm);
          background: white;
          border-radius: var(--border-radius);
          border: 1px solid var(--gray-300);
        }

        .file-size {
          color: var(--gray-600);
          font-size: 0.875rem;
        }

        .verification-status {
          margin-top: var(--spacing-md);
          padding: var(--spacing-md);
          border-radius: var(--border-radius);
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-sm);
        }

        .verification-status.success {
          background: #d1fae5;
          border: 1px solid #10b981;
          color: #065f46;
        }

        .verification-status.error {
          background: #fee2e2;
          border: 1px solid #ef4444;
          color: #991b1b;
        }

        .verification-status.warning {
          background: #fef3c7;
          border: 1px solid #f59e0b;
          color: #92400e;
        }

        .status-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .status-content {
          flex: 1;
        }

        .status-message {
          margin: 0 0 var(--spacing-sm) 0;
          font-weight: 500;
        }

        .blockchain-info {
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .blockchain-info p {
          margin: var(--spacing-xs) 0;
        }

        .blockchain-info code {
          background: rgba(0, 0, 0, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.8rem;
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