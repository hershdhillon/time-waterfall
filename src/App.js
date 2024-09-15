import React, { useContext } from 'react';
import './App.css';
import TimeWaterfall from "./TimeWaterfall";
import CenturyProgressBar from "./CenturyProgressBar";
import YearProgressBar from "./YearProgressBar";
import { ThemeProvider, ThemeContext } from './ThemeContext';  // We'll create this file next

function AppContent() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <div className={`App ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <header className="App-header">
                <button
                    onClick={toggleTheme}
                    className={`absolute top-4 right-4 z-10 text-xs font-bold py-2 px-4 rounded ${
                        isDarkMode ? "bg-white text-black" : "bg-black text-white"
                    }`}
                >
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                </button>
                <div className="flex h-screen w-full">
                    <YearProgressBar />
                    <div className="flex-grow">
                        <TimeWaterfall />
                    </div>
                    <CenturyProgressBar />
                </div>
            </header>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;