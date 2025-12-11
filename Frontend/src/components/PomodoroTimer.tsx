import React, { useState } from "react";

const PomodoroTimer = () => {
    const [focusMinutes, setFocusMinutes] = useState(25); // default 25 mins
    const [breakMinutes, setBreakMinutes] = useState(5); // default 5 mins
    const [isPaused, setIsPaused] = useState(true); // start as paused

    // states for timer
    const [mode, setMode] = useState('focus'); // default mode

    const switchMode = () => {
        if (mode === 'focus') {
            setMode('break');
        } else {
            setMode('focus');
        }

        setIsPaused(true);
    }

    // shows the minutes depending on mode
    let displayedTime;
    if (mode === 'focus') {
        displayedTime = focusMinutes;
    } else {
        displayedTime = breakMinutes;
    }

    // button colours depending on what mode it is
    let focusButtonColour;
    if (mode === 'focus') {
        focusButtonColour = "text-green-600 underline";
    } else {
        focusButtonColour = 'text-gray-400';
    }
    
    let breakButtonColour;
    if (mode === 'break') {
        breakButtonColour = "text-green-600 underline";
    } else {
        breakButtonColour = 'text-gray-400';
    }
    

    return (
        <div className="flex flex-col items-center p-6 bg-white text-black rounded-xl shadow-lg border-2 border-green-500">
            <h1 className="text-3xl font-bold mb-4 text-green-700">Pomodoro Timer</h1>
            <div className="flex gap-4 mb-3">
                <button
                    onClick = {switchMode}
                    className={`font-bold ${focusButtonColour}`}
                >
                    Focus

                </button>

                <button
                    onClick = {switchMode}
                    className={`font-bold ${breakButtonColour}`}
                >
                    Break

                </button>
            </div>

            <div className="text-5xl font-bold mb-3">
                {displayedTime}:00
            </div>
            
            <div className="flex gap-4">
                <button 
                    className="bg-gray-200 text-gray-800 w-10 h-10 rounded-full hover:bg-gray-300 font-bold text-x"
                    onClick = {() => {
                        if (mode === 'focus') {
                            setFocusMinutes(focusMinutes - 1);
                        } else {
                            setBreakMinutes(breakMinutes - 1);
                        }
                    }}
                    >
                        -
                </button>

                <button 
                    className="bg-gray-200 text-gray-800 w-10 h-10 rounded-full hover:bg-gray-300 font-bold text-x"
                    onClick = {() => {
                        if (mode === 'focus') {
                            setFocusMinutes(focusMinutes + 1);
                        } else {
                            setBreakMinutes(breakMinutes + 1);
                        }
                    }}
                    >
                        +
                </button>
            </div>
        </div>
    )
}

export default PomodoroTimer