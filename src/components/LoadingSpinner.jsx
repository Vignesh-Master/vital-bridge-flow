import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  text = 'Loading...',
  fullScreen = false 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4';
      case 'large':
        return 'w-8 h-8';
      case 'xl':
        return 'w-12 h-12';
      default:
        return 'w-6 h-6';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'white':
        return 'border-white border-t-transparent';
      case 'gray':
        return 'border-gray-400 border-t-transparent';
      case 'blue':
        return 'border-blue-500 border-t-transparent';
      case 'green':
        return 'border-green-500 border-t-transparent';
      default:
        return 'border-current border-t-transparent';
    }
  };

  const Spinner = () => (
    <div className={`animate-spin rounded-full border-2 ${getSizeClasses()} ${getColorClasses()}`} />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-center">
          <Spinner />
          {text && <p className="mt-4 text-gray-600">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <Spinner />
        {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
