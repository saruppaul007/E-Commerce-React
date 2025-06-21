import React from 'react';

const PageSection = ({ 
  children, 
  className = '', 
  size = 'default',
  background = 'transparent' 
}) => {
  // Different padding sizes for flexibility
  const paddingClasses = {
    small: 'px-4 py-6 sm:px-6 lg:px-8',
    default: 'px-4 py-8 sm:px-6 lg:px-12 xl:px-16',
    large: 'px-4 py-12 sm:px-6 lg:px-16 xl:px-20',
    none: '' // For special cases
  };

  // Background options
  const backgroundClasses = {
    transparent: '',
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900'
  };

  return (
    <section 
      className={`
        ${paddingClasses[size]} 
        ${backgroundClasses[background]} 
        ${className}
      `.trim()}
    >
      {children}
    </section>
  );
};


export default PageSection;