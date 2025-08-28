import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="error-message">
      <p><strong>Error:</strong> {message}</p>
    </div>
  );
};

export default ErrorMessage;
