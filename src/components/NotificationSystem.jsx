import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaInfoCircle, 
  FaTimes,
  FaBell,
  FaBellSlash
} from 'react-icons/fa';

// Notification Context
const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Notification Provider
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      title: '',
      message: '',
      duration: 5000,
      persistent: false,
      ...notification
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove non-persistent notifications
    if (!newNotification.persistent && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const showSuccess = (title, message, options = {}) => {
    return addNotification({
      type: 'success',
      title,
      message,
      ...options
    });
  };

  const showError = (title, message, options = {}) => {
    return addNotification({
      type: 'error',
      title,
      message,
      ...options
    });
  };

  const showWarning = (title, message, options = {}) => {
    return addNotification({
      type: 'warning',
      title,
      message,
      ...options
    });
  };

  const showInfo = (title, message, options = {}) => {
    return addNotification({
      type: 'info',
      title,
      message,
      ...options
    });
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    isMuted,
    setIsMuted
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

// Individual Notification Component
const NotificationItem = ({ notification, onRemove }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaExclamationTriangle />;
      case 'warning':
        return <FaExclamationTriangle />;
      case 'info':
        return <FaInfoCircle />;
      default:
        return <FaInfoCircle />;
    }
  };

  const getStyles = () => {
    switch (notification.type) {
      case 'success':
        return {
          background: '#f0fdf4',
          borderColor: '#bbf7d0',
          textColor: '#166534',
          iconColor: '#16a34a'
        };
      case 'error':
        return {
          background: '#fef2f2',
          borderColor: '#fecaca',
          textColor: '#dc2626',
          iconColor: '#ef4444'
        };
      case 'warning':
        return {
          background: '#fffbeb',
          borderColor: '#fed7aa',
          textColor: '#d97706',
          iconColor: '#f59e0b'
        };
      case 'info':
        return {
          background: '#eff6ff',
          borderColor: '#bfdbfe',
          textColor: '#1e40af',
          iconColor: '#3b82f6'
        };
      default:
        return {
          background: '#f9fafb',
          borderColor: '#e5e7eb',
          textColor: '#374151',
          iconColor: '#6b7280'
        };
    }
  };

  const styles = getStyles();

  return (
    <motion.div
      className="notification-item"
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        background: styles.background,
        borderColor: styles.borderColor,
        color: styles.textColor
      }}
    >
      <div className="notification-icon" style={{ color: styles.iconColor }}>
        {getIcon()}
      </div>
      
      <div className="notification-content">
        {notification.title && (
          <h4 className="notification-title">{notification.title}</h4>
        )}
        {notification.message && (
          <p className="notification-message">{notification.message}</p>
        )}
      </div>

      <button
        className="notification-close"
        onClick={() => onRemove(notification.id)}
        style={{ color: styles.textColor }}
      >
        <FaTimes />
      </button>

      <style jsx>{`
        .notification-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          border: 1px solid;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          min-width: 300px;
          max-width: 400px;
          position: relative;
        }

        .notification-icon {
          flex-shrink: 0;
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notification-content {
          flex: 1;
          min-width: 0;
        }

        .notification-title {
          font-weight: 600;
          font-size: 0.875rem;
          margin: 0 0 0.25rem 0;
          line-height: 1.4;
        }

        .notification-message {
          font-size: 0.875rem;
          margin: 0;
          line-height: 1.4;
          opacity: 0.9;
        }

        .notification-close {
          flex-shrink: 0;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 0.25rem;
          transition: background-color 0.2s;
          opacity: 0.7;
        }

        .notification-close:hover {
          background-color: rgba(0, 0, 0, 0.1);
          opacity: 1;
        }
      `}</style>
    </motion.div>
  );
};

// Notification Container
const NotificationContainer = () => {
  const { notifications, removeNotification, clearAllNotifications, isMuted, setIsMuted } = useNotifications();

  if (isMuted) {
    return null;
  }

  return (
    <div className="notification-container">
      {notifications.length > 0 && (
        <div className="notification-header">
          <div className="notification-count">
            {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
          </div>
          <div className="notification-actions">
            <button
              className="notification-action-btn"
              onClick={() => setIsMuted(true)}
              title="Mute notifications"
            >
              <FaBellSlash />
            </button>
            <button
              className="notification-action-btn"
              onClick={clearAllNotifications}
              title="Clear all notifications"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={removeNotification}
          />
        ))}
      </AnimatePresence>

      <style jsx>{`
        .notification-container {
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 400px;
        }

        .notification-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .notification-count {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        .notification-actions {
          display: flex;
          gap: 0.5rem;
        }

        .notification-action-btn {
          background: none;
          border: none;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .notification-action-btn:hover {
          background-color: #f3f4f6;
          color: #374151;
        }

        @media (max-width: 768px) {
          .notification-container {
            left: 1rem;
            right: 1rem;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
};

// Notification Bell Component
export const NotificationBell = ({ count = 0, onClick }) => {
  return (
    <div className="notification-bell" onClick={onClick}>
      <div className="bell-icon">
        <FaBell />
        {count > 0 && (
          <motion.div
            className="notification-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {count > 99 ? '99+' : count}
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .notification-bell {
          position: relative;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
        }

        .notification-bell:hover {
          background-color: rgba(59, 130, 246, 0.1);
        }

        .bell-icon {
          position: relative;
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
        }

        .notification-badge {
          position: absolute;
          top: -0.5rem;
          right: -0.5rem;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          min-width: 1.25rem;
          height: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

// Toast Notification Component
export const ToastNotification = ({ type = 'info', title, message, duration = 3000, onClose }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          background: '#f0fdf4',
          borderColor: '#bbf7d0',
          textColor: '#166534',
          iconColor: '#16a34a'
        };
      case 'error':
        return {
          background: '#fef2f2',
          borderColor: '#fecaca',
          textColor: '#dc2626',
          iconColor: '#ef4444'
        };
      case 'warning':
        return {
          background: '#fffbeb',
          borderColor: '#fed7aa',
          textColor: '#d97706',
          iconColor: '#f59e0b'
        };
      default:
        return {
          background: '#eff6ff',
          borderColor: '#bfdbfe',
          textColor: '#1e40af',
          iconColor: '#3b82f6'
        };
    }
  };

  const styles = getStyles();

  return (
    <motion.div
      className="toast-notification"
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      style={{
        background: styles.background,
        borderColor: styles.borderColor,
        color: styles.textColor
      }}
    >
      <div className="toast-icon" style={{ color: styles.iconColor }}>
        {type === 'success' && <FaCheckCircle />}
        {type === 'error' && <FaExclamationTriangle />}
        {type === 'warning' && <FaExclamationTriangle />}
        {type === 'info' && <FaInfoCircle />}
      </div>
      
      <div className="toast-content">
        {title && <h4 className="toast-title">{title}</h4>}
        {message && <p className="toast-message">{message}</p>}
      </div>

      <button className="toast-close" onClick={onClose} style={{ color: styles.textColor }}>
        <FaTimes />
      </button>

      <style jsx>{`
        .toast-notification {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          border: 1px solid;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          min-width: 300px;
          max-width: 400px;
        }

        .toast-icon {
          flex-shrink: 0;
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toast-content {
          flex: 1;
          min-width: 0;
        }

        .toast-title {
          font-weight: 600;
          font-size: 0.875rem;
          margin: 0 0 0.25rem 0;
          line-height: 1.4;
        }

        .toast-message {
          font-size: 0.875rem;
          margin: 0;
          line-height: 1.4;
          opacity: 0.9;
        }

        .toast-close {
          flex-shrink: 0;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 0.25rem;
          transition: background-color 0.2s;
          opacity: 0.7;
        }

        .toast-close:hover {
          background-color: rgba(0, 0, 0, 0.1);
          opacity: 1;
        }
      `}</style>
    </motion.div>
  );
};

export default NotificationSystem;
