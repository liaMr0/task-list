import { useState, useEffect } from 'react';

export const useMobileDetection = () => {
    const [isNarrowScreen, setIsNarrowScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsNarrowScreen(window.innerWidth < 1230);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isNarrowScreen;
};