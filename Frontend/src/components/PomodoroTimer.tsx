import { useState, useEffect } from "react";
import { createSession } from "../endpoints/session";

const PomodoroTimer = () => {
    const [focusMinutes, setFocusMinutes] = useState(25); // default 25 mins
    const [breakMinutes, setBreakMinutes] = useState(5); // default 5 mins

    // to keep memory of the changed duration
    const [focusDuration, setFocusDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);

    const [seconds, setSeconds] = useState(0);
    const [isPaused, setIsPaused] = useState(true); // start as paused

    // states for timer
    const [mode, setMode] = useState('focus'); // default mode

    // test mode for faster testing (100ms interval instead of 1000ms)
    const [isTestMode, setIsTestMode] = useState(false);
    const intervalSpeed = isTestMode ? 100 : 1000;

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
                    // clearInterval(interval);
                    const bellSound = new Audio('/timerBell.wav');
                    bellSound.play();
                    if (mode === 'focus') {

                        // current backend and endpoint implementation
                        createSession(
                            parseInt(localStorage.getItem("userId")!),
                            focusDuration,
                            mode,
                            new Date(Date.now())
                        ).catch((error) => {
                            console.error("Failed to create session:", error);
                            alert("Failed to save session: " + error.message);
                        });

                        setMode('break');
                        setBreakMinutes(breakDuration); // set to memory value
                        setSeconds(0);

                    } else {
                        setMode('focus');
                        setFocusMinutes(focusDuration); // set to memory value
                        setSeconds(0);
                        setIsPaused(true);
                    }
                }
            }
        }, intervalSpeed); // run based on test mode speed

        return () => clearInterval(interval);

    }, [isPaused, seconds, focusMinutes, breakMinutes, mode, intervalSpeed, focusDuration, breakDuration]);

    const isTimerActive = mode === 'focus'
        ? (focusMinutes !== focusDuration || seconds !== 0)
        : (breakMinutes !== breakDuration || seconds !== 0);

    // determine total seconds remaining for the timer
    let totalSecondsLeft;
    if (mode === 'focus') {
        totalSecondsLeft = focusMinutes * 60 + seconds;
    } else {
        totalSecondsLeft = breakMinutes * 60 + seconds;
    }

    let totalDurationInSeconds;
    if (mode === 'focus') {
        totalDurationInSeconds = focusDuration * 60;
    } else {
        totalDurationInSeconds = breakDuration * 60;
    }

    // calculate percentage
    let percentage = totalSecondsLeft / totalDurationInSeconds;

    // break mode outlines the circumference, focus mode, removes coloured outline 
    if (mode === 'break') {
        percentage = 1 - percentage;
    }

    const circleRadius = 90;
    const circumference = 2 * Math.PI * circleRadius;
    const strokeDashoffset = circumference - (percentage * circumference);

    return (
        <div className="flex flex-col items-center p-6 bg-white text-black rounded-xl shadow-lg border-2 border-green-500">
            {/* <h1 className="text-3xl font-bold mb-3 text-green-700">Pomodoro Timer</h1> */}

            {/* Test mode toggle */}
            <div className="mb-2">
                <button
                    onClick={() => setIsTestMode(!isTestMode)}
                    className={`text-xs px-3 py-1 rounded ${
                        isTestMode
                            ? 'bg-yellow-500 text-white font-bold'
                            : 'bg-gray-200 text-gray-600'
                    }`}
                >
                    {isTestMode ? '⚡ Test Mode (10x speed)' : 'Test Mode'}
                </button>
            </div>

            {/* mode buttons */}
            <div className="flex gap-4 mb-1">
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

            <div className="relative flex items-center justify-center">
                <svg width="220" height="220" className="transform -rotate-90">
                    <circle
                        cx="110" cy="110" r={circleRadius}
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        className="text-gray-200 opacity-30"
                    />

                    <circle
                        cx="110" cy="110" r={circleRadius}
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-linear text-[#568b62]"
                    />
                </svg>

                
                <div className="absolute text-5xl font-bold flex flex-row items-center justify-center">
                    <input
                        type="number"
                        min="0"
                        max="99"
                        value={displayedTime.toString().padStart(2, '0')}
                        className="w-20 bg-transparent text-right pl-1 outline-none border-b-2 border-transparent focus:border-[#568b62] transition-colors"
                        onClick={() => setIsPaused(true)}
                        onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            if (val > 99) {
                                return;
                            }

                            if (mode === 'focus') {
                                setFocusMinutes(val);
                                setFocusDuration(val);
                            } else {
                                setBreakMinutes(val);
                                setBreakDuration(val);
                            }
                            setSeconds(0);
                        }}
                    />

                    {/* time display */}
                    <span className="pb-2">:</span>
                    <div className="w-20 text-center">
                        {seconds.toString().padStart(2, '0')}
                    </div>
                    {/* {displayedTime}:{seconds.toString().padStart(2, '0')} */}
                </div>

            </div>


            {/* increase or decrease time
            <div className="flex gap-4 mb-6">
                <button 
                    className="bg-gray-200 text-gray-800 w-10 h-10 rounded-full hover:bg-gray-300 font-bold text-x"
                    onClick = {() => {
                        if (mode === 'focus') {
                            if (focusDuration >= 1) {
                                setFocusMinutes(focusMinutes - 1);
                                setFocusDuration(focusDuration - 1);
                            }
                        } else {
                            if (breakDuration >= 1) {
                                setBreakMinutes(breakMinutes - 1);
                                setBreakDuration(breakDuration - 1);
                            }
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
                            setFocusDuration(focusDuration + 1);
                        } else {
                            setBreakMinutes(breakMinutes + 1);
                            setBreakDuration(breakDuration + 1);
                        }
                    }}
                >
                    +
                </button>
            </div> */}
                    
            <div className="flex gap-4">
                <button
                    className="w-20 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold"
                    onClick={() => {setIsPaused(!isPaused)}}
                >
                    {/* if currently paused, show Start button. if currently running, show pause button */}
                    {!isPaused ? "Pause" : isTimerActive ? "Resume" : "Start"} 
                </button>

                <button 
                    className="w-20 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 font-bold"
                    onClick={() => {
                        setIsPaused(true); // pause timer
                        setSeconds(0); // reset seconds
                        // reset minutes to default based on mode
                        if(mode === 'focus') {
                            setFocusMinutes(25);
                            setFocusDuration(25);
                        }
                        else {
                            setBreakMinutes(5);
                            setBreakDuration(5);
                        }
                    }}
                >
                    Reset
                </button>

            </div>

        </div>
    )
}

export default PomodoroTimer