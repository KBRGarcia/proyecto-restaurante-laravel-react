import { useEffect, useRef, useState } from "react";
const MAP_COORDINATE_DEBOUNCE_MS = 350;

export const useMapDisplayCoordinates = (latitude: unknown, longitude: unknown) => {
    const skipDebounceRef = useRef(false);
    const [displayLatitude, setDisplayLatitude] = useState(latitude);
    const [displayLongitude, setDisplayLongitude] = useState(longitude);

    useEffect(() => {
        if (skipDebounceRef.current) {
            skipDebounceRef.current = false;
            return;
        }

        const timer = window.setTimeout(() => {
            setDisplayLatitude(latitude);
            setDisplayLongitude(longitude);
        }, MAP_COORDINATE_DEBOUNCE_MS);

        return () => {
            window.clearTimeout(timer);
        };
    }, [latitude, longitude]);

    const setDisplayCoordinates = (nextLatitude: number, nextLongitude: number) => {
        skipDebounceRef.current = true;
        setDisplayLatitude(nextLatitude);
        setDisplayLongitude(nextLongitude);
    };

    return {
        displayLatitude,
        displayLongitude,
        setDisplayCoordinates,
    };
};
