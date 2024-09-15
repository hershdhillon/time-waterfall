import React, { useContext } from 'react';
import './App.css';
import TimeWaterfall from "./TimeWaterfall";
import CenturyProgressBar from "./CenturyProgressBar";
import YearProgressBar from "./YearProgressBar";
import { ThemeProvider, ThemeContext } from './ThemeContext';

function AppContent() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <div className={`App ${isDarkMode ? 'bg-black' : 'bg-white'} relative`}>
            <header className="App-header">
                <div className="flex h-screen w-full">
                    <YearProgressBar />
                    <div className="flex-grow">
                        <TimeWaterfall />
                    </div>
                    <CenturyProgressBar />
                </div>
            </header>
            <button
                onClick={toggleTheme}
                className={`absolute bottom-4 right-28 z-10 w-6 h-6 rounded-full transition-colors duration-300 ${
                    isDarkMode
                        ? "bg-white border-black"
                        : "bg-black border-white"
                }`}
                aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
            />
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