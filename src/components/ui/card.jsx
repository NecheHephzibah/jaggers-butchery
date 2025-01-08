// src/components/ui/card.jsx
import React from 'react';

export const Card = ({ className = '', ...props }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`} {...props} />
);

export const CardHeader = ({ className = '', ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
);

export const CardContent = ({ className = '', ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
);

export const CardTitle = ({ className = '', ...props }) => (
  <h3 className={`text-xl font-semibold leading-none tracking-tight ${className}`} {...props} />
);

export const CardDescription = ({ className = '', ...props }) => (
  <p className={`text-sm text-gray-600 ${className}`} {...props} />
);