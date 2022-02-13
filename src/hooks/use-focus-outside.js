import { useEffect, useRef } from 'react';

export const useFocusOutside = (ref, callback= () => null) => {
    const cachedCallback = useRef(() => {});

    useEffect(() => {
        cachedCallback.current = callback;
    });

    function handleFocus(e) {
        const target = e.target;

        if (!ref.current?.contains(target)) cachedCallback.current?.();
    }

    useEffect(() => {
        document.addEventListener('focus', handleFocus, true);

        return () => document.removeEventListener('focus', handleFocus);
    }, []);
};
