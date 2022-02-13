import { useEffect, useRef } from 'react';

export const useInterval = (callback, delay) => {
    const savedCallback = useRef(() => {});

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        if (!delay) return;

        const interval = setInterval(() => savedCallback.current(), delay);
        return () => clearInterval(interval);
    }, [delay]);
};
