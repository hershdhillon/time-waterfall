import React, { useState, useEffect } from 'react';

const YearProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [isHovering, setIsHovering] = useState(false);

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

    return (
        <div className="h-screen w-24 p-4 bg-white flex flex-col justify-between items-center border-2 border-black relative">
            <div className="text-center">
                <span className="text-xs font-bold inline-block py-1 px-2 uppercase border-2 border-black text-black">
                    {currentYear}
                </span>
            </div>
            <div
                className="flex-grow relative w-4 my-4"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className="absolute top-0 left-0 w-full bg-white border-2 border-black" style={{ height: '100%' }}>
                    <div
                        className="absolute top-0 left-0 w-full bg-black transition-all duration-300"
                        style={{ height: `${progress}%` }}
                    ></div>
                </div>
                {isHovering && (
                    <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                        {progress.toFixed(2)}% of {currentYear} have passed
                    </div>
                )}
            </div>
            <div className="text-center">
                <span className="text-xs font-bold inline-block py-1 px-2 uppercase border-2 border-black text-black">
                    {currentYear + 1}
                </span>
            </div>
        </div>
    );
};

export default YearProgressBar;