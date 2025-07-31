import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />

      <style jsx>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
          padding: var(--spacing-xl) 0;
        }

        @media (max-width: 768px) {
          .main-content {
            padding: var(--spacing-lg) 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;