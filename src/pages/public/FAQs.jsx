import React, { useState } from 'react';
import Layout from '../../components/Layout';

const FAQs = () => {
  const [openItems, setOpenItems] = useState({});

  const faqData = [
    {
      id: 1,
      question: "What are the medical criteria for organ donation?",
      answer: "Organ donation criteria include brain death determination, medical suitability assessment, blood type compatibility, and absence of certain infectious diseases. Each organ has specific medical requirements that must be met."
    },
    {
      id: 2,
      question: "How does the organ matching process work?",
      answer: "Our AI system matches organs based on blood type compatibility, tissue matching (HLA typing), geographic proximity, time on waiting list, medical urgency, and body size compatibility. The system prioritizes urgent cases while ensuring optimal outcomes."
    },
    {
      id: 3,
      question: "What is the typical timeline for organ transplantation?",
      answer: "Timeline varies by organ type: kidneys (3-5 years average wait), liver (6 months-2 years), heart (6 months-1 year), lungs (1-2 years). Emergency cases receive priority regardless of wait time."
    },
    {
      id: 4,
      question: "How do we ensure data privacy and security?",
      answer: "All patient data is encrypted, access is role-based with audit trails, blockchain technology ensures data integrity, and we comply with HIPAA and international medical data protection standards."
    },
    {
      id: 5,
      question: "What happens if a match is found?",
      answer: "When a match is identified, both medical teams are notified immediately, compatibility tests are performed, surgical teams are prepared, and the transplant procedure is scheduled based on organ viability timeframes."
    }
  ];

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <Layout>
      <div className="faqs">
        <div className="container">
          <div className="page-header">
            <h1 className="heading-1">Frequently Asked Questions</h1>
            <p className="text-large">Common questions about organ donation procedures</p>
          </div>

          <div className="faq-container">
            {faqData.map(item => (
              <div key={item.id} className="faq-item">
                <button 
                  className="faq-question"
                  onClick={() => toggleItem(item.id)}
                >
                  <span>{item.question}</span>
                  <svg 
                    className={`chevron ${openItems[item.id] ? 'open' : ''}`}
                    width="20" height="20" viewBox="0 0 24 24" fill="none"
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
                {openItems[item.id] && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQs;
