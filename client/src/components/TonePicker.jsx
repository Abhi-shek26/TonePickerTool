import React from 'react';
import { FiFeather, FiMessageSquare, FiZap, FiShield } from 'react-icons/fi';

const TonePicker = ({ onToneChange, onUndo, onRedo, onReset, canUndo, canRedo }) => {
  const tones = [
    { label: 'More Formal', value: 'formal', icon: <FiFeather size={24} /> },
    { label: 'More Casual', value: 'casual', icon: <FiMessageSquare size={24} /> },
    { label: 'More Direct', value: 'direct', icon: <FiZap size={24} /> },
    { label: 'More Diplomatic', value: 'diplomatic', icon: <FiShield size={24} /> },
  ];

  return (
    <div className="tone-picker-container">
      <h3 className="tone-picker-header">Adjust Tone</h3>
      
      <div className="tone-grid">
        {tones.map(tone => (
          <button
            key={tone.value}
            className="tone-button"
            onClick={() => onToneChange(tone.value)}
          >
            {tone.icon}
            {tone.label}
          </button>
        ))}
      </div>

      <div className="controls-container">
        <div className="history-controls">
          <button onClick={onUndo} disabled={!canUndo}>Undo</button>
          <button onClick={onRedo} disabled={!canRedo}>Redo</button>
        </div>
        <button className="reset-button" onClick={onReset}>Reset</button>
      </div>
    </div>
  );
};

export default TonePicker;
