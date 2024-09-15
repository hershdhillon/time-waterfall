import React, { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

const TimeWaterfall = () => {
    const [times, setTimes] = useState([]);
    const intervalRef = useRef(null);
    const { isDarkMode } = useContext(ThemeContext);
    const { height } = useWindowSize();
    const timeHeight = 30; // height of each time element in pixels
    const padding = 40; // 20px padding top and bottom
    const minTimes = 5; // Minimum number of times to display
    const maxTimesLimit = 50; // Maximum number of times to display

    // Calculate maxTimes with padding and safety limits
    const maxTimes = Math.min(
        Math.max(
            Math.floor((height - padding) / timeHeight),
            minTimes
        ),
        maxTimesLimit
    );

    const getFormattedTime = () => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });

        const pad = (num, size) => num.toString().padStart(size, '0');
        const formatted = formatter.format(now);
        const ms = pad(now.getMilliseconds(), 3);
        const microseconds = pad(Math.floor((performance.now() % 1) * 1000), 3);

        return `${formatted}.${ms}${microseconds}`;
    };

    useEffect(() => {
        const initialTimes = Array(maxTimes).fill().map(() => getFormattedTime());
        setTimes(initialTimes);

        intervalRef.current = setInterval(() => {
            const newTime = getFormattedTime();
            setTimes(prevTimes => [newTime, ...prevTimes.slice(0, maxTimes - 1)]);
        }, 16);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [maxTimes]);

    const themeClasses = isDarkMode
        ? "bg-black text-white"
        : "bg-white text-black";

    return (
        <div className={`h-full w-full font-mono overflow-hidden flex items-center justify-center ${themeClasses}`}>
            <div className="h-full w-full max-w-md relative overflow-hidden py-5">
                <div className="absolute top-1/2 left-0 w-full transition-transform duration-[16ms] ease-linear"
                     style={{ transform: `translateY(-50%)` }}>
                    {times.map((time, index) => (
                        <div
                            key={time + index}
                            className="text-xl h-[30px] flex items-center justify-center duration-[16ms]"
                        >
                            {time}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimeWaterfall;