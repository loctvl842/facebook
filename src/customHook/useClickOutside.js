import { useState, useEffect, useRef } from 'react';
export const useClickOutside = (initValue) => {
    const ref = useRef(null);
    const btnRef = useRef(null);
    const [visible, setVisible] = useState(initValue);
    const handleClickOutside = (e) => {
        if (btnRef.current && btnRef.current.contains(e.target)) {
            console.log(btnRef.current.tagName);
            setVisible((preVisible) => !preVisible);
        } else {
            if (ref.current && !ref.current.contains(e.target)) {
                setVisible(false);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ref, btnRef]);
    return { visible, setVisible, ref, btnRef };
};
