import React from 'react';
import Layout from '../components/Layout';

const MatchingDashboard = () => {
  const compatibleMatches = [
    {
      donorId: 1,
      patientId: 2,
      compatibility: 95,
      donor: { name: 'John Smith', bloodType: 'O+', organ: 'Kidney' },
      patient: { name: 'Sarah Wilson', bloodType: 'O+', urgency: 'HIGH' }
    },
    {
      donorId: 2,
      patientId: 3,
      compatibility: 88,
      donor: { name: 'Maria Garcia', bloodType: 'A+', organ: 'Liver' },
      patient: { name: 'David Brown', bloodType: 'A+', urgency: 'CRITICAL' }
    }
  ];

  return (
    <Layout>
      <div className="matching-dashboard">
        <div className="container">
          <div className="page-header">
            <h1 className="heading-1">Matching Dashboard</h1>
            <p className="text-large">AI-powered organ compatibility analysis</p>
          </div>

          <div className="matches-grid">
            {compatibleMatches.map((match, index) => (
              <div key={index} className="match-card">
                <div className="compatibility-score">
                  <span className="score">{match.compatibility}%</span>
                  <span className="label">Compatible</span>
                </div>
                
                <div className="match-details">
                  <div className="donor-section">
                    <h4>Donor</h4>
                    <p>{match.donor.name}</p>
                    <span className="blood-type">{match.donor.bloodType}</span>
                    <span className="organ">{match.donor.organ}</span>
                  </div>
                  
                  <div className="patient-section">
                    <h4>Patient</h4>
                    <p>{match.patient.name}</p>
                    <span className="blood-type">{match.patient.bloodType}</span>
                    <span className={`urgency ${match.patient.urgency.toLowerCase()}`}>
                      {match.patient.urgency}
                    </span>
                  </div>
                </div>

                <button className="btn btn-primary w-full">
                  Proceed with Match
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .matching-dashboard {
          min-height: calc(100vh - 200px);
        }

        .page-header {
          text-align: center;
          margin-bottom: var(--spacing-3xl);
        }

        .matches-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--spacing-xl);
        }

        .match-card {
          background-color: var(--white);
          border-radius: var(--radius-xl);
          padding: var(--spacing-xl);
          box-shadow: var(--shadow-lg);
          border: 2px solid var(--accent-green);
        }

        .compatibility-score {
          text-align: center;
          margin-bottom: var(--spacing-lg);
        }

        .score {
          display: block;
          font-size: 3rem;
          font-weight: 700;
          color: var(--accent-green);
        }

        .match-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-xl);
        }

        .donor-section, .patient-section {
          padding: var(--spacing-lg);
          background-color: var(--gray-50);
          border-radius: var(--radius-md);
        }

        .urgency.critical {
          background-color: rgba(231, 76, 60, 0.1);
          color: var(--accent-red);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .urgency.high {
          background-color: rgba(243, 156, 18, 0.1);
          color: var(--warning-orange);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
        }
      `}</style>
    </Layout>
  );
};

export default MatchingDashboard;