import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo and description */}
          <div className="footer-section">
            <div className="footer-logo">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="url(#gradient1)"/>
                <path d="M20 12C16.686 12 14 14.686 14 18s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 8c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" fill="white"/>
                <path d="M20 26c-3.314 0-6 2.686-6 6v2h12v-2c0-3.314-2.686-6-6-6z" fill="white"/>
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="40" y2="40">
                    <stop stopColor="#2c5aa0"/>
                    <stop offset="1" stopColor="#2d9cdb"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="footer-logo-text">OrganLink</span>
            </div>
            <p className="footer-description">
              Connecting lives through advanced organ donation management. 
              Saving lives with technology, transparency, and hope.
            </p>
          </div>

          {/* Quick links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/register-donor">Register Donor</a></li>
              <li><a href="/register-patient">Register Patient</a></li>
              <li><a href="/matching-dashboard">Matching</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><a href="/faqs">FAQs</a></li>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="footer-section">
            <h4 className="footer-title">Hospital Support</h4>
            <div className="contact-info">
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>support@organlink.org</span>
              </div>
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>24/7 Emergency Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 OrganLink. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="/terms">Terms of Service</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/security">Security</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--gray-900);
          color: var(--gray-300);
          margin-top: auto;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-2xl);
          padding: var(--spacing-3xl) 0 var(--spacing-2xl);
        }

        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacing-md);
        }

        .footer-logo-text {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--white);
          margin-left: var(--spacing-sm);
        }

        .footer-description {
          color: var(--gray-400);
          line-height: 1.6;
        }

        .footer-title {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--white);
          margin-bottom: var(--spacing-lg);
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: var(--spacing-sm);
        }

        .footer-links a {
          color: var(--gray-400);
          text-decoration: none;
          transition: color var(--transition-normal);
        }

        .footer-links a:hover {
          color: var(--secondary-teal);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--gray-400);
        }

        .contact-item svg {
          color: var(--secondary-teal);
        }

        .footer-bottom {
          border-top: 1px solid var(--gray-700);
          padding: var(--spacing-lg) 0;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--spacing-md);
        }

        .footer-bottom-links {
          display: flex;
          gap: var(--spacing-lg);
        }

        .footer-bottom-links a {
          color: var(--gray-400);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color var(--transition-normal);
        }

        .footer-bottom-links a:hover {
          color: var(--secondary-teal);
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
            padding: var(--spacing-2xl) 0 var(--spacing-lg);
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }

          .footer-bottom-links {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .footer-bottom-links {
            flex-direction: column;
            gap: var(--spacing-sm);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;