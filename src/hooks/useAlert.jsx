import { useState, useCallback } from 'react';

const useAlert = () => {
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ title: '', description: '' });

  const showAlert = useCallback((title, description) => {
    setAlertMessage({ title, description });
    setAlertVisible(true);
  }, []);

  const closeAlert = useCallback(() => {
    setAlertVisible(false);
  }, []);

  return {
    isAlertVisible,
    alertMessage,
    showAlert,
    closeAlert,
  };
};

export default useAlert;