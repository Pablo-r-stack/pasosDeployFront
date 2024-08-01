import { useState, useCallback } from 'react';

export default function useModal() {
    const [isVisible, setVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState({ title: '', description: '' });

    const showAlert = useCallback((title, description) => {
        setModalMessage({ title, description });
        setVisible(true);
    }, []);

    const closeAlert = useCallback(() => {
        setVisible(false);
    }, []);

    return {
        isVisible,
        modalMessage,
        showAlert,
        closeAlert,
    };
}
