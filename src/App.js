import React from 'react';
import './App.css';
import TimeWaterfall from "./TimeWaterfall";
import CenturyProgressBar from "./CenturyProgressBar";
import YearProgressBar from "./YearProgressBar";

function App() {
    return (
        <div className="App">
            <header className="App-header">
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

export default App;