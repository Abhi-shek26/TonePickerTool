import React, { useState } from 'react';
import TextEditor from './components/TextEditor';
import TonePicker from './components/TonePicker';
import LoadingSpinner from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { useHistory } from './hooks/useHistory';
import { transformText } from './services/api';

const INITIAL_TEXT = "I am writing to you today to discuss the project timeline. We need to make a decision quickly.";

function App() {
  const { state: text, setState, undo, redo, reset, canUndo, canRedo } = useHistory(INITIAL_TEXT);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToneChange = async (tone) => {
    setIsLoading(true);
    setError(null);
    try {
      const transformed = await transformText(text, tone);
      setState(transformed);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    setError(null);
  }

  return (
    <div className="app-container">
      <div className="left-panel">
        <div className="text-editor-wrapper">
          <TextEditor
            value={text}
            onChange={setState} 
            disabled={isLoading}
          />
          {isLoading && <LoadingSpinner />}
        </div>
      </div>
      <div className="right-panel">
        <TonePicker
          onToneChange={handleToneChange}
          onUndo={undo}
          onRedo={redo}
          onReset={handleReset}
          canUndo={canUndo}
          canRedo={canRedo}
        />
        <ErrorMessage message={error} />
      </div>
    </div>
  );
}

export default App;
