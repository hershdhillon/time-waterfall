import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const YearProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [isHovering, setIsHovering] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        const calculateProgress = () => {
            const now = new Date();
            const start = new Date(now.getFullYear(), 0, 1);  // January 1st of current year
            const end = new Date(now.getFullYear() + 1, 0, 1);  // January 1st of next year
            const progress = (now - start) / (end - start) * 100;
            setProgress(progress);
            setCurrentYear(now.getFullYear());
        };

        calculateProgress();
        const timer = setInterval(calculateProgress, 3600000); // Update hourly

        return () => clearInterval(timer);
    }, []);

    const themeClasses = isDarkMode
        ? "bg-black text-white border-white"
        : "bg-white text-black border-black";

    return (
        <div className={`h-full w-24 p-4 flex flex-col justify-between items-center border-2 relative ${themeClasses}`}>
            <div className="text-center">
                <span className={`text-xs font-bold inline-block py-1 px-2 uppercase border-2 ${themeClasses}`}>
                    {currentYear}
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
                    <div className={`absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs whitespace-nowrap ${isDarkMode ? "bg-white text-black" : "bg-black text-white"}`}>
                        {progress.toFixed(2)}% of {currentYear} have passed
                    </div>
                )}
            </div>
            <div className="text-center">
                <span className={`text-xs font-bold inline-block py-1 px-2 uppercase border-2 ${themeClasses}`}>
                    {currentYear + 1}
                </span>
            </div>
        </div>
    );
};

export default YearProgressBar;