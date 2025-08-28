import { useState, useCallback } from 'react';

export const useHistory = (initialState) => {
  const [history, setHistory] = useState([initialState]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const setState = useCallback((newState) => {
    if (newState === history[historyIndex]) {
      return;
    }
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (canUndo) {
      setHistoryIndex(prevIndex => prevIndex - 1);
    }
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      setHistoryIndex(prevIndex => prevIndex + 1);
    }
  }, [canRedo]);
  
  const reset = useCallback(() => {
    setHistory([initialState]);
    setHistoryIndex(0);
  }, [initialState]);

  const currentState = history[historyIndex];

  return {
    state: currentState,
    setState,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
  };
};
