import React, { useState, useEffect } from "react";

const PomodoroTimer = () => {
    const [focusMinutes, setFocusMinutes] = useState(25); // default 25 mins
    const [breakMinutes, setBreakMinutes] = useState(5); // default 5 mins
    const [seconds, setSeconds] = useState(0);
    const [isPaused, setIsPaused] = useState(true); // start as paused

    // states for timer
    const [mode, setMode] = useState('focus'); // default mode

    const switchMode = () => {
        if (mode === 'focus') {
            setMode('break');
        } else {
            setMode('focus');
        }

        setSeconds(0);
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
    
    useEffect(() => {
        if (isPaused) return; // do nothing
        
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);

            } else if (seconds === 0) {
                if (mode === 'focus' && focusMinutes > 0) {
                    setFocusMinutes(focusMinutes - 1);
                    setSeconds(59);
                } else if (mode === 'break' && breakMinutes > 0) {
                    setBreakMinutes(breakMinutes - 1);
                    setSeconds(59);

                } else { // end of timer
                    clearInterval(interval);
                }
            }
        }, 1000); // run every second

        return () => clearInterval(interval);

    }, [isPaused, seconds, focusMinutes, breakMinutes, mode]);

    return (
        <div className="flex flex-col items-center p-6 bg-white text-black rounded-xl shadow-lg border-2 border-green-500">
            <h1 className="text-3xl font-bold mb-4 text-green-700">Pomodoro Timer</h1>

            {/* mode buttons */}
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

            {/* time display */}
            <div className="text-5xl font-bold mb-3">
                {displayedTime}:{seconds.toString().padStart(2, '0')}
            </div>

            {/* increase or decrease time */}
            <div className="flex gap-4 mb-6">
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
                    
            <div className="flex gap-4 mb-6">
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold"
                    onClick={() => {setIsPaused(!isPaused)}}
                >
                    {/* if currently paused, show Start button. if currently running, show pause button */}
                    {isPaused ? "Start" : "Pause"} 

                </button>

                <button 
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 font-bold"
                    onClick={() => {
                        setIsPaused(true); // pause timer
                        setSeconds(0); // reset seconds
                        // reset minutes to default based on mode
                        if(mode === 'focus') setFocusMinutes(25);
                        else setBreakMinutes(5);
                    }}
                >
                    Reset
                </button>

            </div>

        </div>
    )
}

export default PomodoroTimer