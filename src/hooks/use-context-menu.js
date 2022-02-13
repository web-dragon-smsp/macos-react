import { useEffect, useCallback, useState } from 'react';

export const useContextMenu = (outerRef) => {
    const [xPos, setXPos] = useState('0px');
    const [yPos, setYPos] = useState('0px');

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const handleContextMenu = useCallback((event) => {
        event.preventDefault();

        if (!outerRef.current?.contains(event.target)) return setIsMenuVisible(false);

        let x = event.pageX;
        let y = event.pageY;

        // Open to other side if rest of space is too small
        if (window.innerWidth - x < 250) x -= 250;
        if (window.innerHeight - y < 300) y -= 250;

        setXPos(`${x}px`);
        setYPos(`${y}px`);

        setIsMenuVisible(true);

        return;
    }, []);

    const handleClick = () => setIsMenuVisible(false);

    useEffect(() => {
        document.addEventListener('click', handleClick);
        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    return { xPos, yPos, isMenuVisible, setIsMenuVisible };
};
