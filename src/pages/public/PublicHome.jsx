import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import TestimonialCarousel from '../../components/TestimonialCarousel';
import AnimatedStat from '../../components/AnimatedStat';
import '../../components/TestimonialCarousel.css';

const PublicHome = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const workflowRef = useRef(null);
  const testimonialsRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to section with offset for sticky navbar
  const scrollToSection = (ref) => {
    const yOffset = -80; // Adjust based on navbar height
    if (ref && ref.current) {
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current) return;
      const aboutTop = aboutRef.current.getBoundingClientRect().top;
      // Show button only when About section is in view (scrolled past hero)
      setShowScrollTop(aboutTop <= 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothReverseScrollToHero = () => {
    if (!homeRef.current) return;
    const startY = window.scrollY;
    const endY = homeRef.current.offsetTop;
    const distance = startY - endY;
    const duration = 500; // ms, for a little faster scroll
    let startTime = null;

    function animateScroll(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 2); // ease-out
      window.scrollTo(0, startY - distance * ease);
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }
    requestAnimationFrame(animateScroll);
  };

  return (
    <div className="public-home">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h2 style={{ cursor: 'pointer' }} onClick={() => scrollToSection(homeRef)}>OrganLink</h2>
            </div>
            <nav className="nav">
              <button onClick={() => scrollToSection(homeRef)} className="nav-link">Home</button>
              <button onClick={() => scrollToSection(aboutRef)} className="nav-link">About</button>
              <button onClick={() => scrollToSection(featuresRef)} className="nav-link">Features</button>
              <button onClick={() => scrollToSection(workflowRef)} className="nav-link">Workflow</button>
              <button onClick={() => scrollToSection(faqRef)} className="nav-link">FAQs</button>
              <button onClick={() => scrollToSection(contactRef)} className="nav-link">Contact</button>
            </nav>
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
          <div className="about-content about-content-balanced">
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
            </div>
            <div className="about-image about-image-balanced">
              <div className="medical-illustration">
                <svg width="400" height="300" viewBox="0 0 400 300" fill="none">
                  <rect x="50" y="50" width="300" height="200" rx="8" fill="var(--white)" stroke="var(--primary-blue)" strokeWidth="2"/>
                  <rect x="70" y="80" width="80" height="40" rx="4" fill="var(--primary-blue)" fillOpacity="0.1"/>
                  <rect x="160" y="80" width="80" height="40" rx="4" fill="var(--secondary-teal)" fillOpacity="0.1"/>
                  <rect x="250" y="80" width="80" height="40" rx="4" fill="var(--accent-green)" fillOpacity="0.1"/>
                  <rect x="70" y="140" width="260" height="80" rx="4" fill="var(--gray-50)"/>
                  <circle cx="90" cy="160" r="8" fill="var(--primary-blue)"/>
                  <circle cx="130" cy="160" r="8" fill="var(--secondary-teal)"/>
                  <circle cx="170" cy="160" r="8" fill="var(--accent-green)"/>
                  <circle cx="210" cy="160" r="8" fill="var(--warning-orange)"/>
                  <path d="M90 180 L130 180 L170 160 L210 180" stroke="var(--primary-blue)" strokeWidth="2" fill="none"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="about-stats-strip enhanced-stats-strip">
            <AnimatedStat value="107000" label="People waiting for organs" suffix="+" />
            <AnimatedStat value={17} label="People die daily waiting" suffix="+" />
            <AnimatedStat value={95} label="Success rate with AI matching" suffix="%" />
            <AnimatedStat value={1200} label="Hospitals Connected" suffix="+" />
            <AnimatedStat value={3500} label="Transplants Facilitated" suffix="+" />
          </div>
        </div>
        <style>{`
          .about-content-balanced {
            display: flex;
            align-items: stretch;
            gap: 2.5rem;
            min-height: 350px;
          }
          .about-text, .about-image-balanced {
            flex: 1 1 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .about-image-balanced {
            align-items: center;
            justify-content: center;
            min-height: 300px;
            max-height: 400px;
          }
          .enhanced-stats-strip {
            width: 100vw;
            position: relative;
            left: 50%;
            right: 50%;
            margin-left: -50vw;
            margin-right: -50vw;
            border-radius: 0;
            background: #2b5aa1;
            box-shadow: 0 8px 32px rgba(43,90,161,0.10);
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            padding: 2.5rem 0 2rem 0;
            color: #fff;
            flex-wrap: wrap;
            margin-top: 2.5rem;
            z-index: 1;
          }
          .enhanced-stats-strip .stat {
            text-align: center;
            min-width: 160px;
            margin: 0 1.5rem;
          }
          .enhanced-stats-strip .stat-label {
            font-size: 1.15rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
            letter-spacing: 0.5px;
            color: #e3eefd;
          }
          .enhanced-stats-strip .stat-value {
            font-size: 2.2rem;
            font-weight: 700;
            letter-spacing: 1px;
            color: #fff;
            margin-bottom: 0.25rem;
            transition: color 0.2s;
          }
          @media (max-width: 900px) {
            .about-content-balanced {
              flex-direction: column;
              min-height: unset;
            }
            .about-image-balanced {
              margin-top: 2rem;
              max-height: 250px;
            }
            .enhanced-stats-strip {
              flex-direction: column;
              gap: 1.5rem;
              padding: 2rem 0 1.5rem 0;
              border-radius: 0;
              left: 0;
              margin-left: 0;
              width: 100%;
            }
            .enhanced-stats-strip .stat {
              margin: 0.5rem 0;
            }
          }
        `}</style>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-2">Revolutionary Features</h2>
            <p className="text-large">Cutting-edge technology for life-saving solutions</p>
          </div>
          <div className="features-grid-3x2">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="var(--primary-blue)" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 className="feature-title">AI-based Matching</h3>
              <p className="feature-description">Advanced machine learning algorithms analyze compatibility factors, medical history, and urgency levels for optimal donor-patient matching.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1l3 6 6 .75-4.12 4.62L18 19l-6-3-6 3 1.13-6.63L3 7.75 9 7z" fill="var(--primary-blue)"/>
                </svg>
              </div>
              <h3 className="feature-title">Blockchain Security</h3>
              <p className="feature-description">Immutable records on Ethereum blockchain ensure data integrity, transparency, and fraud prevention in organ donation processes.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="var(--primary-blue)" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 className="feature-title">IPFS Document Storage</h3>
              <p className="feature-description">Medical documents are securely stored and shared using decentralized IPFS technology.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="var(--primary-blue)" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 className="feature-title">Compliance & Transparency</h3>
              <p className="feature-description">Automated policy checks and transparent audit trails for regulatory compliance.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M15 17h5l-5-5 5-5h-5m-6 10v4H4l5-5-5-5h5v4h6v6h-6z" fill="var(--primary-blue)"/>
                </svg>
              </div>
              <h3 className="feature-title">Real-time Notifications</h3>
              <p className="feature-description">Instant alerts for organ matches, policy updates, and critical events for all stakeholders.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke="var(--primary-blue)" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 className="feature-title">Global Collaboration</h3>
              <p className="feature-description">Connects hospitals, organizations, and authorities worldwide for a unified donation ecosystem.</p>
            </div>
          </div>
        </div>
        <style>{`
          .features-grid-3x2 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 1fr);
            gap: 1.7rem 2.2rem;
          }
          .feature-card {
            background: none;
            box-shadow: none;
            border-radius: 1rem;
            padding: 1.2rem 0.5rem 1.2rem 0.5rem;
            margin: 0;
            min-width: 0;
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: box-shadow 0.2s, transform 0.2s;
          }
          .feature-card:hover {
            background: #fafdff;
            box-shadow: 0 4px 16px rgba(43,90,161,0.10);
            transform: translateY(-6px) scale(1.03);
          }
          .feature-icon {
            margin-bottom: 1.1rem;
          }
          .feature-title {
            font-size: 1.13rem;
            font-weight: 700;
            color: #1a3766;
            margin-bottom: 0.5rem;
            text-align: center;
          }
          .feature-description {
            font-size: 0.98rem;
            color: #3a4a5d;
            text-align: center;
            margin-bottom: 0.2rem;
          }
          @media (max-width: 900px) {
            .features-grid-3x2 {
              grid-template-columns: 1fr 1fr;
              grid-template-rows: repeat(3, 1fr);
            }
          }
          @media (max-width: 600px) {
            .features-box {
              padding: 1.2rem 0.5rem;
            }
            .features-grid-3x2 {
              grid-template-columns: 1fr;
              grid-template-rows: repeat(6, 1fr);
              gap: 1.1rem;
            }
          }
        `}</style>
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
              <div className="step-circle">1</div>
              <div className="step-title">Register</div>
              <div className="step-desc">Hospitals register donors and patients with medical details</div>
            </div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">
              <div className="step-circle">2</div>
              <div className="step-title">Upload</div>
              <div className="step-desc">Medical documents verified via OCR and stored on IPFS</div>
            </div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">
              <div className="step-circle">3</div>
              <div className="step-title">AI Match</div>
              <div className="step-desc">Advanced algorithms find optimal donor-patient matches</div>
            </div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">
              <div className="step-circle">4</div>
              <div className="step-title">Notify</div>
              <div className="step-desc">Real-time notifications sent to relevant hospitals</div>
            </div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">
              <div className="step-circle">5</div>
              <div className="step-title">Transplant</div>
              <div className="step-desc">Coordinated transplant process with blockchain records</div>
            </div>
          </div>
        </div>
        <style>{`
          .workflow {
            background: #fafdff;
            padding: 3.5rem 0 3.5rem 0;
          }
          .workflow-steps {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            gap: 0.5rem;
            margin-top: 2.5rem;
            flex-wrap: wrap;
          }
          .workflow-step {
            background: #fff;
            border-radius: 1.2rem;
            box-shadow: 0 4px 24px rgba(43,90,161,0.08);
            padding: 2.2rem 1.5rem 1.5rem 1.5rem;
            min-width: 180px;
            max-width: 210px;
            flex: 1 1 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            margin-bottom: 1.5rem;
            transition: box-shadow 0.2s, transform 0.2s;
          }
          .workflow-step:hover {
            box-shadow: 0 8px 32px rgba(43,90,161,0.16);
            transform: translateY(-8px) scale(1.04);
          }
          .step-circle {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #2b5aa1;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1.1rem;
            box-shadow: 0 2px 8px rgba(43,90,161,0.13);
            border: 3px solid #e3eefd;
          }
          .step-title {
            font-size: 1.18rem;
            font-weight: 700;
            color: #1a3766;
            margin-bottom: 0.5rem;
            text-align: center;
          }
          .step-desc {
            font-size: 1rem;
            color: #3a4a5d;
            text-align: center;
            margin-bottom: 0.2rem;
          }
          .workflow-arrow {
            font-size: 2.2rem;
            color: #b0c7e6;
            align-self: center;
            margin: 0 0.2rem;
            user-select: none;
          }
          @media (max-width: 1100px) {
            .workflow-steps {
              flex-wrap: wrap;
              gap: 1.5rem;
            }
            .workflow-step {
              min-width: 160px;
              max-width: 100%;
            }
          }
          @media (max-width: 700px) {
            .workflow-steps {
              flex-direction: column;
              align-items: center;
              gap: 0.5rem;
            }
            .workflow-arrow {
              display: none;
            }
            .workflow-step {
              width: 100%;
              min-width: unset;
              margin-bottom: 1.2rem;
            }
          }
        `}</style>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="testimonials">
        <h2 className="section-title">Testimonials</h2>
        <TestimonialCarousel />
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
              <div className="faq-question" onClick={() => toggleFaq(0)}>
                <h3>How is patient data secured?</h3>
                <span className="faq-toggle">{openFaq === 0 ? '−' : '+'}</span>
              </div>
              <div className={`faq-answer ${openFaq === 0 ? 'open' : ''}`}>
                <p>
                  We use blockchain technology to create immutable records, IPFS for decentralized 
                  document storage, and advanced encryption to ensure patient data remains secure 
                  and private while enabling necessary cross-hospital collaboration.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(1)}>
                <h3>What is the policy voting system?</h3>
                <span className="faq-toggle">{openFaq === 1 ? '−' : '+'}</span>
              </div>
              <div className={`faq-answer ${openFaq === 1 ? 'open' : ''}`}>
                <p>
                  Healthcare organizations can propose policies affecting organ transplant procedures. 
                  Other organizations vote on these proposals, and policies with majority support 
                  (&gt;50%) are automatically integrated into our AI matching algorithms.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(2)}>
                <h3>How does AI matching work?</h3>
                <span className="faq-toggle">{openFaq === 2 ? '−' : '+'}</span>
              </div>
              <div className={`faq-answer ${openFaq === 2 ? 'open' : ''}`}>
                <p>
                  Our AI analyzes multiple factors including blood type compatibility, HLA matching, 
                  geographic distance, medical urgency, and active policies. It uses Random Forest 
                  algorithms with 100 decision trees to provide highly accurate compatibility scores.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(3)}>
                <h3>Can hospitals maintain their autonomy?</h3>
                <span className="faq-toggle">{openFaq === 3 ? '−' : '+'}</span>
              </div>
              <div className={`faq-answer ${openFaq === 3 ? 'open' : ''}`}>
                <p>
                  Yes! Our multi-tenant architecture ensures each hospital maintains complete control 
                  over their data while enabling secure collaboration. Hospitals can choose which 
                  matches to pursue and maintain their own protocols.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(4)}>
                <h3>What about cross-border organ sharing?</h3>
                <span className="faq-toggle">{openFaq === 4 ? '−' : '+'}</span>
              </div>
              <div className={`faq-answer ${openFaq === 4 ? 'open' : ''}`}>
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

      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={smoothReverseScrollToHero}
          aria-label="Scroll to top"
        >
          <FaArrowUp size={22} />
        </button>
      )}

      <style>{`
        .public-home {
          min-height: 100vh;
          scroll-behavior: smooth;
        }
        html {
          scroll-behavior: smooth;
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
          gap: var(--spacing-md);
        }

        .nav-link {
          background: none;
          border: none;
          color: var(--gray-700);
          font-weight: 500;
          cursor: pointer;
          transition: color var(--transition-normal), background 0.2s;
          font-size: 1.15rem;
          padding: 0.75rem 1.2rem;
          border-radius: var(--radius-md);
        }

        .nav-link:hover {
          color: var(--primary-blue);
          background: var(--gray-100);
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
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 2.5rem;
        }

        .about-text {
          flex: 1;
        }

        .about-image {
          align-self: flex-start;
          margin-top: -32px;
        }

        .about-stats-row {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          margin-top: 2.2rem;
          margin-bottom: 0.5rem;
        }

        .about-stats {
          display: flex;
          flex-direction: row;
          gap: 2.5rem;
          width: 100%;
          justify-content: flex-start;
        }

        .stat {
          min-width: 120px;
          text-align: left;
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

        .section-title {
          text-align: center;
          margin-bottom: var(--spacing-3xl);
          color: var(--gray-900);
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
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          padding-left: var(--spacing-md);
          border-left: 3px solid var(--primary-blue);
        }

        .faq-answer.open {
          max-height: 200px;
          margin-top: var(--spacing-md);
        }

        .faq-answer p {
          color: var(--gray-600);
          line-height: 1.6;
          padding: var(--spacing-md) 0;
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

        /* Scroll to Top Button */
        .scroll-top-btn {
          position: fixed;
          bottom: 2.2rem;
          right: 2.2rem;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #2b5aa1;
          color: #fff;
          border: none;
          box-shadow: 0 4px 16px rgba(43,90,161,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 1000;
          transition: background 0.2s, box-shadow 0.2s, opacity 0.3s;
          opacity: 0.92;
        }

        .scroll-top-btn:hover {
          background: #1a3766;
          box-shadow: 0 8px 32px rgba(43,90,161,0.22);
          opacity: 1;
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