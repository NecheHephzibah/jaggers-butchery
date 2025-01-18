import React from 'react';

const Alert = ({ variant, children }) => {
  const getVariantStyles = (variant) => {
    switch (variant) {
      case 'destructive':
        return 'bg-red-100 text-red-700 border-red-400';
      case 'success':
        return 'bg-green-100 text-green-700 border-green-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-400';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-400';
    }
  };

  return (
    <div className={`border-l-4 p-4 ${getVariantStyles(variant)}`}>
      {children}
    </div>
  );
};

export default Alert;