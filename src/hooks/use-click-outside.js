import { useEffect, useRef } from 'react';

export function useOutsideClick(ref, callback = () => null) {
    const cachedCallback = useRef(() => {});

    useEffect(() => {
        cachedCallback.current = callback;
    });

    function handleClick(e) {
        if (!ref.current?.contains(e.target)) cachedCallback.current?.();
    }

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);
}
