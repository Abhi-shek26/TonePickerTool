import React from 'react';

const TextEditor = ({ value, onChange, disabled }) => {
  return (
    <textarea
      className="text-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your text here..."
      disabled={disabled}
    />
  );
};

export default TextEditor;
