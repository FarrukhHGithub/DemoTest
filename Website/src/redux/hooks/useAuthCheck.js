// useAuthCheck.js
import { useState, useEffect } from 'react';

const useAuthCheck = () => {
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem('token');
        const isAuthenticated = !!authToken;
        setAuthChecked(isAuthenticated);
    }, []);

    return { authChecked };
};

export default useAuthCheck;
