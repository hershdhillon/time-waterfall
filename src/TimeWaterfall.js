import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const TimeWaterfall = () => {
    const [times, setTimes] = useState([]);
    const maxTimes = 20;
    const intervalRef = useRef(null);
    const { isDarkMode } = useContext(ThemeContext);

    const getFormattedTime = () => {
        const now = performance.now();
        const date = new Date();
        const pad = (num, size) => num.toString().padStart(size, '0');
        const ms = pad(date.getMilliseconds(), 3);
        const microseconds = pad(Math.floor((now % 1) * 1000), 3);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }) + `.${ms}${microseconds}`;
    };

    useEffect(() => {
        const initialTimes = Array(maxTimes).fill().map(() => getFormattedTime());
        setTimes(initialTimes);

        intervalRef.current = setInterval(() => {
            const newTime = getFormattedTime();
            setTimes(prevTimes => [newTime, ...prevTimes.slice(0, -1)]);
        }, 16);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const themeClasses = isDarkMode
        ? "bg-black text-white"
        : "bg-white text-black";

    return (
        <div className={`h-full w-full font-mono overflow-hidden flex items-center justify-center ${themeClasses}`}>
            <div className="h-full w-full max-w-md relative overflow-hidden">
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