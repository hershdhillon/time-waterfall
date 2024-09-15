import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const CenturyProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);
    const startYear = 2000;
    const endYear = 2100;

    useEffect(() => {
        const calculateProgress = () => {
            const now = new Date();
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth();
            const currentDay = now.getDate();

            const yearProgress = (currentYear - startYear) +
                (currentMonth / 12) +
                (currentDay / 365);

            const totalProgress = (yearProgress / (endYear - startYear)) * 100;
            setProgress(Math.min(100, Math.max(0, totalProgress)));
        };

        calculateProgress();
        const timer = setInterval(calculateProgress, 86400000); // Update daily

        return () => clearInterval(timer);
    }, []);

    const themeClasses = isDarkMode
        ? "bg-black text-white border-white"
        : "bg-white text-black border-black";

    return (
        <div className={`h-full w-24 p-4 flex flex-col justify-between items-center border-2 relative ${themeClasses}`}>
            <div className="text-center">
                <span className={`text-xs font-bold inline-block py-1 px-2 uppercase border-2 ${themeClasses}`}>
                    {startYear}
                </span>
            </div>
            <div
                className="flex-grow relative w-4 my-4"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className={`absolute top-0 left-0 w-full border-2 ${themeClasses}`} style={{ height: '100%' }}>
                    <div
                        className={`absolute top-0 left-0 w-full transition-all duration-300 ${isDarkMode ? "bg-white" : "bg-black"}`}
                        style={{ height: `${progress}%` }}
                    ></div>
                </div>
                {isHovering && (
                    <div className={`absolute right-full mr-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs whitespace-nowrap ${isDarkMode ? "bg-white text-black" : "bg-black text-white"}`}>
                        {progress.toFixed(2)}% of century have passed
                    </div>
                )}
            </div>
            <div className="text-center">
                <span className={`text-xs font-bold inline-block py-1 px-2 uppercase border-2 ${themeClasses}`}>
                    {endYear}
                </span>
            </div>
        </div>
    );
};

export default CenturyProgressBar;