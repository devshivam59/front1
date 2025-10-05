import { useCallback, useState } from 'react';

export const useSnackbar = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');

  const showMessage = useCallback((text: string, level: typeof severity = 'info') => {
    setMessage(text);
    setSeverity(level);
  }, []);

  const clearMessage = useCallback(() => setMessage(null), []);

  return { message, severity, showMessage, clearMessage };
};
