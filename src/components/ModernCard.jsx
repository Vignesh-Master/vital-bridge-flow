import React from 'react';
import { motion } from 'framer-motion';

const ModernCard = ({ 
  title, 
  subtitle, 
  icon, 
  value, 
  change, 
  changeType = 'positive',
  onClick,
  className = '',
  children 
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return '#10B981';
      case 'negative': return '#EF4444';
      case 'neutral': return '#6B7280';
      default: return '#10B981';
    }
  };

  const getIconColor = () => {
    switch (changeType) {
      case 'positive': return '#10B981';
      case 'negative': return '#EF4444';
      case 'neutral': return '#3B82F6';
      default: return '#3B82F6';
    }
  };

  return (
    <motion.div
      className={`modern-card ${className}`}
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="card-header">
        {icon && (
          <div className="card-icon" style={{ color: getIconColor() }}>
            {icon}
          </div>
        )}
        <div className="card-content">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
          {value && <div className="card-value">{value}</div>}
          {change && (
            <div className="card-change" style={{ color: getChangeColor() }}>
              {change}
            </div>
          )}
        </div>
      </div>
      {children && <div className="card-body">{children}</div>}
      
      <style jsx>{`
        .modern-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          border: 1px solid #f3f4f6;
          position: relative;
          overflow: hidden;
        }

        .modern-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3B82F6, #8B5CF6);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .modern-card:hover::before {
          opacity: 1;
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .card-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          background: rgba(59, 130, 246, 0.1);
          flex-shrink: 0;
        }

        .card-content {
          flex: 1;
          min-width: 0;
        }

        .card-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 0.25rem 0;
          line-height: 1.4;
        }

        .card-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
        }

        .card-value {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 0.25rem 0;
          line-height: 1.2;
        }

        .card-change {
          font-size: 0.875rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .card-body {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #f3f4f6;
        }

        @media (max-width: 768px) {
          .modern-card {
            padding: 1.25rem;
          }

          .card-value {
            font-size: 1.75rem;
          }

          .card-icon {
            width: 2.5rem;
            height: 2.5rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ModernCard;
