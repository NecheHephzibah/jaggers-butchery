// src/components/ui/alert.jsx
import React from 'react';

export const Alert = ({ children, variant = 'default', className = '' }) => {
  const baseStyles = 'rounded-lg border p-4 mb-4';
  
  const variants = {
    default: 'bg-white border-gray-200 text-gray-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const variantStyles = variants[variant] || variants.default;

  return (
    <div role="alert" className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </div>
  );
};

export const AlertTitle = ({ children, className = '' }) => (
  <h5 className={`font-medium mb-1 ${className}`}>
    {children}
  </h5>
);

export const AlertDescription = ({ children, className = '' }) => (
  <div className={`text-sm ${className}`}>
    {children}
  </div>
);