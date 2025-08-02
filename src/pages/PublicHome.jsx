import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PublicHome = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const workflowRef = useRef(null);
  const testimonialsRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="public-home">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h2>OrganLink</h2>
            </div>
            <nav className="nav">
              <button onClick={() => scrollToSection(homeRef)} className="nav-link">Home</button>
              <button onClick={() => scrollToSection(aboutRef)} className="nav-link">About</button>
              <button onClick={() => scrollToSection(featuresRef)} className="nav-link">Features</button>
              <button onClick={() => scrollToSection(workflowRef)} className="nav-link">Workflow</button>
              <button onClick={() => scrollToSection(faqRef)} className="nav-link">FAQs</button>
              <button onClick={() => scrollToSection(contactRef)} className="nav-link">Contact</button>
            </nav>
            <div className="header-actions">
              <Link to="/login" className="btn btn-primary">Hospital Login</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={homeRef} className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">OrganLink – Revolutionizing Organ Transplant Matching</h1>
              <p className="hero-subtitle">
                AI-powered organ donation platform using blockchain technology to ensure 
                secure, transparent, and efficient organ matching across hospitals globally.
              </p>
              <div className="hero-actions">
                <button onClick={() => scrollToSection(workflowRef)} className="btn btn-large btn-primary">
                  Explore Workflow
                </button>
                <button onClick={() => scrollToSection(aboutRef)} className="btn btn-large btn-secondary">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-illustration">
                <svg width="400" height="300" viewBox="0 0 400 300" fill="none">
                  <circle cx="200" cy="150" r="80" fill="var(--primary-blue)" fillOpacity="0.1"/>
                  <circle cx="200" cy="150" r="60" fill="var(--secondary-teal)" fillOpacity="0.2"/>
                  <path d="M180 130h40v40h-40z" fill="var(--accent-green)" fillOpacity="0.3"/>
                  <circle cx="160" cy="120" r="8" fill="var(--primary-blue)"/>
                  <circle cx="240" cy="120" r="8" fill="var(--secondary-teal)"/>
                  <circle cx="160" cy="180" r="8" fill="var(--accent-green)"/>
                  <circle cx="240" cy="180" r="8" fill="var(--warning-orange)"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="heading-2">Why Organ Transplant Matching Is Complex</h2>
              <p className="text-large">
                Traditional organ matching systems face numerous challenges: limited cross-hospital 
                communication, manual matching processes, data security concerns, and lack of 
                transparent policy governance.
              </p>
              <p className="text-normal">
                OrganLink addresses these challenges by combining artificial intelligence, 
                blockchain technology, and collaborative policy-making to create a unified, 
                secure, and efficient organ donation ecosystem.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <h3 className="stat-number">107,000+</h3>
                  <p className="stat-label">People waiting for organs</p>
                </div>
                <div className="stat">
                  <h3 className="stat-number">17</h3>
                  <p className="stat-label">People die daily waiting</p>
                </div>
                <div className="stat">
                  <h3 className="stat-number">95%</h3>
                  <p className="stat-label">Success rate with AI matching</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img src="/src/assets/medical-dashboard.jpg" alt="Medical Dashboard" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-2">Revolutionary Features</h2>
            <p className="text-large">Cutting-edge technology for life-saving solutions</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.09 6.26L18 7L13.09 7.74L12 12L10.91 7.74L6 7L10.91 6.26L12 2Z" fill="var(--primary-blue)"/>
                  <path d="M19 15L20.09 17.26L23 18L20.09 18.74L19 21L17.91 18.74L15 18L17.91 17.26L19 15Z" fill="var(--secondary-teal)"/>
                </svg>
              </div>
              <h3 className="feature-title">AI-based Matching</h3>
              <p className="feature-description">
                Advanced machine learning algorithms analyze compatibility factors, 
                medical history, and urgency levels for optimal donor-patient matching.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--primary-blue)" strokeWidth="2" fill="none"/>
                  <path d="M2 17L12 22L22 17" stroke="var(--secondary-teal)" strokeWidth="2" fill="none"/>
                  <path d="M2 12L12 17L22 12" stroke="var(--accent-green)" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 className="feature-title">Blockchain Security</h3>
              <p className="feature-description">
                Immutable records on Ethereum blockchain ensure data integrity, 
                transparency, and fraud prevention in organ donation processes.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" stroke="var(--primary-blue)" strokeWidth="2"/>
                  <path d="M12 1V3" stroke="var(--secondary-teal)" strokeWidth="2"/>
                  <path d="M12 21V23" stroke="var(--secondary-teal)" strokeWidth="2"/>
                  <path d="M4.22 4.22L5.64 5.64" stroke="var(--accent-green)" strokeWidth="2"/>
                  <path d="M18.36 18.36L19.78 19.78" stroke="var(--accent-green)" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="feature-title">IPFS Document Storage</h3>
              <p className="feature-description">
                Decentralized storage ensures documents are always available, 
                tamper-proof, and accessible across the global network.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9L12 2L21 9V20A2 2 0 0 1 19 22H5A2 2 0 0 1 3 20V9Z" stroke="var(--primary-blue)" strokeWidth="2" fill="none"/>
                  <polyline points="9,22 9,12 15,12 15,22" stroke="var(--secondary-teal)" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="feature-title">Hospital Collaboration</h3>
              <p className="feature-description">
                Secure multi-tenant system enables hospitals to collaborate 
                while maintaining data privacy and institutional autonomy.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M18 13V6A6 6 0 0 0 6 6V13" stroke="var(--primary-blue)" strokeWidth="2" fill="none"/>
                  <rect x="2" y="13" width="20" height="8" rx="2" ry="2" stroke="var(--secondary-teal)" strokeWidth="2" fill="none"/>
                  <circle cx="8" cy="17" r="1" fill="var(--accent-green)"/>
                  <circle cx="16" cy="17" r="1" fill="var(--accent-green)"/>
                </svg>
              </div>
              <h3 className="feature-title">Global Policy Voting</h3>
              <p className="feature-description">
                Democratic governance system where healthcare organizations 
                propose and vote on policies affecting organ transplant procedures.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="var(--primary-blue)" strokeWidth="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="var(--secondary-teal)" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="feature-title">Real-time Notifications</h3>
              <p className="feature-description">
                Instant alerts for organ matches, policy updates, and critical 
                events ensure timely decision-making and response.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section ref={workflowRef} className="workflow">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-2">How OrganLink Works</h2>
            <p className="text-large">Simple 5-step process for life-saving connections</p>
          </div>
          <div className="workflow-steps">
            <div className="workflow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Register</h3>
                <p className="step-description">Hospitals register donors and patients with medical details</p>
              </div>
            </div>
            <div className="workflow-arrow">→</div>
            
            <div className="workflow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Upload</h3>
                <p className="step-description">Medical documents verified via OCR and stored on IPFS</p>
              </div>
            </div>
            <div className="workflow-arrow">→</div>
            
            <div className="workflow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">AI Match</h3>
                <p className="step-description">Advanced algorithms find optimal donor-patient matches</p>
              </div>
            </div>
            <div className="workflow-arrow">→</div>
            
            <div className="workflow-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3 className="step-title">Notify</h3>
                <p className="step-description">Real-time notifications sent to relevant hospitals</p>
              </div>
            </div>
            <div className="workflow-arrow">→</div>
            
            <div className="workflow-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3 className="step-title">Transplant</h3>
                <p className="step-description">Coordinated transplant process with blockchain records</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-2">Trusted by Healthcare Professionals</h2>
            <p className="text-large">What medical experts say about OrganLink</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "OrganLink has revolutionized our organ matching process. The AI recommendations 
                  have significantly improved our success rates and reduced waiting times for patients."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4 className="author-name">Dr. Meena Patel</h4>
                  <p className="author-title">Transplant Coordinator, Apollo Hospital</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "The blockchain security and transparent policy voting system gives us confidence 
                  in the integrity of the organ allocation process. It's a game-changer for healthcare."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4 className="author-name">Rajesh Kumar</h4>
                  <p className="author-title">NGO Coordinator, Save Lives Foundation</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "The cross-hospital collaboration feature has enabled us to find matches that 
                  would have been impossible with traditional systems. Lives are being saved."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4 className="author-name">Dr. Sarah Johnson</h4>
                  <p className="author-title">Chief Medical Officer, Global Health Alliance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="faq">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-2">Frequently Asked Questions</h2>
            <p className="text-large">Everything you need to know about OrganLink</p>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-question">
                <h3>How is patient data secured?</h3>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-answer">
                <p>
                  We use blockchain technology to create immutable records, IPFS for decentralized 
                  document storage, and advanced encryption to ensure patient data remains secure 
                  and private while enabling necessary cross-hospital collaboration.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <h3>What is the policy voting system?</h3>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-answer">
                <p>
                  Healthcare organizations can propose policies affecting organ transplant procedures. 
                  Other organizations vote on these proposals, and policies with majority support 
                  (>50%) are automatically integrated into our AI matching algorithms.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <h3>How does AI matching work?</h3>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-answer">
                <p>
                  Our AI analyzes multiple factors including blood type compatibility, HLA matching, 
                  geographic distance, medical urgency, and active policies. It uses Random Forest 
                  algorithms with 100 decision trees to provide highly accurate compatibility scores.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <h3>Can hospitals maintain their autonomy?</h3>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-answer">
                <p>
                  Yes! Our multi-tenant architecture ensures each hospital maintains complete control 
                  over their data while enabling secure collaboration. Hospitals can choose which 
                  matches to pursue and maintain their own protocols.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <h3>What about cross-border organ sharing?</h3>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-answer">
                <p>
                  OrganLink is designed for global collaboration. Our platform handles different 
                  regulatory frameworks, provides transparent policy voting for international 
                  guidelines, and ensures all transfers comply with local and international laws.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2 className="heading-2">Get In Touch</h2>
              <p className="text-large">
                Ready to revolutionize organ transplant matching at your institution?
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="var(--primary-blue)" strokeWidth="2"/>
                    <polyline points="22,6 12,13 2,6" stroke="var(--primary-blue)" strokeWidth="2"/>
                  </svg>
                  <span>organlink@project.com</span>
                </div>
                <div className="contact-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0-6 0" stroke="var(--primary-blue)" strokeWidth="2"/>
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" stroke="var(--primary-blue)" strokeWidth="2"/>
                  </svg>
                  <span>Healthcare Innovation Hub, University Campus</span>
                </div>
                <div className="contact-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke="var(--primary-blue)" strokeWidth="2"/>
                    <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" stroke="var(--primary-blue)" strokeWidth="2"/>
                  </svg>
                  <span>github.com/organlink/platform</span>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form className="contact-form-fields">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-input" placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="your.email@hospital.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Institution</label>
                  <input type="text" className="form-input" placeholder="Hospital or Organization" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" placeholder="Tell us about your needs..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-large">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>OrganLink</h3>
              <p>Revolutionizing organ transplant matching through AI and blockchain technology.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Platform</h4>
                <ul>
                  <li><Link to="/login">Hospital Login</Link></li>
                  <li><Link to="/admin/login">Admin Portal</Link></li>
                  <li><button onClick={() => scrollToSection(faqRef)}>FAQs</button></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Contact</h4>
                <ul>
                  <li>organlink@project.com</li>
                  <li>github.com/organlink</li>
                  <li>University Campus</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 OrganLink | Final Year Project | Healthcare Innovation</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .public-home {
          min-height: 100vh;
        }

        /* Header Styles */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--gray-200);
          z-index: 1000;
          padding: var(--spacing-md) 0;
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
        }

        .nav {
          display: flex;
          gap: var(--spacing-xl);
        }

        .nav-link {
          background: none;
          border: none;
          color: var(--gray-700);
          font-weight: 500;
          cursor: pointer;
          transition: color var(--transition-normal);
        }

        .nav-link:hover {
          color: var(--primary-blue);
        }

        /* Hero Styles */
        .hero {
          padding: 120px 0 var(--spacing-3xl);
          background: var(--gradient-hero);
          color: var(--white);
          overflow: hidden;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-3xl);
          align-items: center;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: var(--spacing-lg);
          color: var(--white);
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-2xl);
          opacity: 0.9;
        }

        .hero-actions {
          display: flex;
          gap: var(--spacing-lg);
        }

        .hero-illustration {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* About Styles */
        .about {
          padding: var(--spacing-3xl) 0;
          background: var(--white);
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-3xl);
          align-items: center;
        }

        .about-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-lg);
          margin-top: var(--spacing-2xl);
        }

        .stat {
          text-align: center;
          padding: var(--spacing-lg);
          background: var(--gray-50);
          border-radius: var(--radius-lg);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-blue);
          margin-bottom: var(--spacing-sm);
        }

        .stat-label {
          color: var(--gray-600);
          font-size: 0.875rem;
        }

        .about-image img {
          width: 100%;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
        }

        /* Features Styles */
        .features {
          padding: var(--spacing-3xl) 0;
          background: var(--gray-50);
        }

        .section-header {
          text-align: center;
          margin-bottom: var(--spacing-3xl);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-2xl);
        }

        .feature-card {
          background: var(--white);
          padding: var(--spacing-2xl);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          text-align: center;
          transition: transform var(--transition-normal);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .feature-icon {
          margin-bottom: var(--spacing-lg);
        }

        .feature-title {
          color: var(--gray-900);
          margin-bottom: var(--spacing-md);
        }

        .feature-description {
          color: var(--gray-600);
          line-height: 1.6;
        }

        /* Workflow Styles */
        .workflow {
          padding: var(--spacing-3xl) 0;
          background: var(--white);
        }

        .workflow-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-lg);
          flex-wrap: wrap;
        }

        .workflow-step {
          text-align: center;
          flex: 1;
          min-width: 200px;
          max-width: 250px;
        }

        .step-number {
          width: 60px;
          height: 60px;
          background: var(--gradient-primary);
          color: var(--white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 auto var(--spacing-lg);
        }

        .step-title {
          color: var(--gray-900);
          margin-bottom: var(--spacing-sm);
        }

        .step-description {
          color: var(--gray-600);
          font-size: 0.875rem;
        }

        .workflow-arrow {
          font-size: 1.5rem;
          color: var(--primary-blue);
          font-weight: bold;
        }

        /* Testimonials Styles */
        .testimonials {
          padding: var(--spacing-3xl) 0;
          background: var(--gray-50);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-2xl);
        }

        .testimonial-card {
          background: var(--white);
          padding: var(--spacing-2xl);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
        }

        .testimonial-text {
          font-style: italic;
          color: var(--gray-700);
          margin-bottom: var(--spacing-lg);
          line-height: 1.6;
        }

        .author-name {
          color: var(--gray-900);
          margin-bottom: var(--spacing-xs);
        }

        .author-title {
          color: var(--primary-blue);
          font-size: 0.875rem;
          font-weight: 500;
        }

        /* FAQ Styles */
        .faq {
          padding: var(--spacing-3xl) 0;
          background: var(--white);
        }

        .faq-list {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          border-bottom: 1px solid var(--gray-200);
          padding: var(--spacing-lg) 0;
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .faq-question h3 {
          color: var(--gray-900);
          margin: 0;
        }

        .faq-toggle {
          font-size: 1.5rem;
          color: var(--primary-blue);
          font-weight: bold;
        }

        .faq-answer {
          margin-top: var(--spacing-md);
          padding-left: var(--spacing-md);
          border-left: 3px solid var(--primary-blue);
        }

        .faq-answer p {
          color: var(--gray-600);
          line-height: 1.6;
        }

        /* Contact Styles */
        .contact {
          padding: var(--spacing-3xl) 0;
          background: var(--gray-50);
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-3xl);
        }

        .contact-details {
          margin-top: var(--spacing-2xl);
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
          color: var(--gray-700);
        }

        .contact-form {
          background: var(--white);
          padding: var(--spacing-2xl);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
        }

        /* Footer Styles */
        .footer {
          background: var(--gray-900);
          color: var(--white);
          padding: var(--spacing-3xl) 0 var(--spacing-lg);
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: var(--spacing-3xl);
          margin-bottom: var(--spacing-2xl);
        }

        .footer-brand h3 {
          color: var(--white);
          margin-bottom: var(--spacing-md);
        }

        .footer-brand p {
          color: var(--gray-400);
        }

        .footer-links {
          display: flex;
          gap: var(--spacing-3xl);
        }

        .footer-column h4 {
          color: var(--white);
          margin-bottom: var(--spacing-md);
        }

        .footer-column ul {
          list-style: none;
        }

        .footer-column li {
          margin-bottom: var(--spacing-sm);
        }

        .footer-column a,
        .footer-column button {
          color: var(--gray-400);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          transition: color var(--transition-normal);
        }

        .footer-column a:hover,
        .footer-column button:hover {
          color: var(--white);
        }

        .footer-bottom {
          text-align: center;
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--gray-700);
          color: var(--gray-400);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav {
            display: none;
          }

          .hero-content,
          .about-content,
          .contact-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-2xl);
            text-align: center;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .about-stats {
            grid-template-columns: 1fr;
          }

          .workflow-steps {
            flex-direction: column;
          }

          .workflow-arrow {
            transform: rotate(90deg);
          }

          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .footer-links {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero {
            padding: 100px 0 var(--spacing-2xl);
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-actions {
            flex-direction: column;
          }

          .features-grid,
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PublicHome;