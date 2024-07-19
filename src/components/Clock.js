import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faRotate, faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'
import alarm from '../audio/alarm-sound.mp3'

function Clock() {
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timer, setTimer] = useState(25 * 60);


    const incrementBreak = () => {
        if (!isRunning && breakLength < 60) {
            setBreakLength(breakLength + 1);
            if (isBreak) {
                setTimer((breakLength + 1) * 60);
            }
        }
    }
    
    const decrementBreak = () => {
        if (!isRunning && breakLength > 1) {
            setBreakLength(breakLength - 1);
            if (isBreak) {
                setTimer((breakLength - 1) * 60);
            }
        }
    }
    const incrementSession = () => {
        if (!isRunning && sessionLength < 60) {
            setSessionLength(sessionLength + 1);
            if (!isBreak) {
                setTimer((sessionLength + 1) * 60);
            }
        }
    }
    
    const decrementSession = () => {
        if (!isRunning && sessionLength > 1) {
            setSessionLength(sessionLength - 1);
            if (!isBreak) {
                setTimer((sessionLength - 1) * 60);
            }
        }
    }

    const resetClock = () => {
        setIsRunning(false);
        setIsBreak(false);
        setBreakLength(5);
        setSessionLength(25);
        setTimer(25 * 60);
    }

    const leading0 = (n) => {
        return (n < 10) ? ("0" + n) : n;
    }

    useEffect(() => {
        const intervalID = setInterval(() => {
            console.log("interval log")
            if (isRunning) {
                setTimer(timer - 1);
            }
            if (timer === 0) {
                const alert = new Audio(alarm);
                alert.play();
                const newTimer = isBreak ? breakLength * 60 : sessionLength * 60;
                setIsBreak(!isBreak);
                setTimer(newTimer);
            }
        }, 1000);

        return () => { clearInterval(intervalID) }
    }, [isRunning, timer]);

    return (
        <div id="clock">
            <div id="length-container">
                <div className="length-controls">
                    <p id="break-label">Break Length</p>
                    <div className="increment-controls">
                        <FontAwesomeIcon  id="break-decrement" className="btn" icon={faArrowDown} onClick={() => decrementBreak()}/>
                        <div id="break-length">{breakLength}</div>
                        <FontAwesomeIcon id="break-increment" className="btn" icon={faArrowUp} onClick={() => incrementBreak}/>
                    </div>
                </div>

                <div className="length-controls">
                    <p id="session-label">Session Length</p>
                    <div className="increment-controls">
                        <FontAwesomeIcon id="session-decrement" className="btn" icon={faArrowDown} onClick={() => decrementSession()}/>
                        <div id="session-length">{sessionLength}</div>
                        <FontAwesomeIcon id="session-increment" className="btn" icon={faArrowUp} onClick={() => incrementSession()}/>
                    </div>
                </div>
            </div>

            <div id="timer" className={timer <= 60 ? "red-text" : ""}>
                <p id="timer-label">{ isBreak ? "Break" : "Session"}</p>
                <h2 id="time-left">{leading0(Math.floor(timer/60))}:{leading0(timer % 60)}</h2>
            </div>

            <div id="play-controls">
                <FontAwesomeIcon id="start_stop" className="btn" icon={isRunning ? faPause : faPlay} onClick={() => setIsRunning(!isRunning)}/>
                <FontAwesomeIcon id="reset" className="btn" icon={faRotate} onClick={resetClock}/>
            </div>
            
        </div>
    );
}

export default Clock;
