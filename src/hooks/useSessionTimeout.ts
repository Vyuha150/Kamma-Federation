import { useEffect, useRef, useCallback } from 'react';

const SESSION_TIMEOUT_MS = 2 * 60 * 60 * 1000; // 2 hours of inactivity
const WARNING_BEFORE_MS = 60 * 1000;            // warn 1 minute before

export function useSessionTimeout(onLogout: () => void, onWarn: (secondsLeft: number) => void) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const warningRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clearAll = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (warningRef.current) clearTimeout(warningRef.current);
        if (countdownRef.current) clearInterval(countdownRef.current);
    }, []);

    const resetTimer = useCallback(() => {
        clearAll();

        // Warning countdown 1 min before expiry
        warningRef.current = setTimeout(() => {
            let secondsLeft = Math.floor(WARNING_BEFORE_MS / 1000);
            onWarn(secondsLeft);
            countdownRef.current = setInterval(() => {
                secondsLeft -= 1;
                if (secondsLeft <= 0) {
                    if (countdownRef.current) clearInterval(countdownRef.current);
                } else {
                    onWarn(secondsLeft);
                }
            }, 1000);
        }, SESSION_TIMEOUT_MS - WARNING_BEFORE_MS);

        // Auto-logout after full timeout
        timeoutRef.current = setTimeout(() => {
            clearAll();
            onLogout();
        }, SESSION_TIMEOUT_MS);
    }, [clearAll, onLogout, onWarn]);

    useEffect(() => {
        const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
        const handleActivity = () => resetTimer();

        events.forEach(e => window.addEventListener(e, handleActivity, { passive: true }));
        resetTimer(); // start on mount

        return () => {
            events.forEach(e => window.removeEventListener(e, handleActivity));
            clearAll();
        };
    }, [resetTimer, clearAll]);
}
