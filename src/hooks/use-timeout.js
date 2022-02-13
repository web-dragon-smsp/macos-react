import { useEffect } from 'react';

export const useTimeout = (callback = () => null, delay) => {
    useEffect(() => {
        const timer = setTimeout(callback, delay);

        return () => clearTimeout(timer);
    });
};
