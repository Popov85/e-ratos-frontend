import React, { useEffect, useState, useRef } from 'react';
import { BatchInfo } from "../types/BatchInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { getBatch } from "../selectors/sessionSelector";
import { secToTime } from "../../../utils/utilsTime";

const CountdownSession: React.FC = () => {
    const currentBatch: BatchInfo | null = useSelector((state: RootState) => getBatch(state));
    const batchNumber: number = useSelector((state: RootState) => state.session.session.batchNumber);
    const isPaused: boolean = useSelector((state: RootState) => state.session.session.paused);

    const [elapsed, setElapsed] = useState(0);
    const intervalRef = useRef<number | null>(null);

    if (!currentBatch) return null;

    // Starts the timer and updates elapsed time every second
    const startTimer = () => {
        intervalRef.current = window.setInterval(() => {
            setElapsed(prevElapsed => prevElapsed + 1);
        }, 1000);
    };

    // Stops the timer and clears the interval
    const stopTimer = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    // Resets the timer when a new batch starts
    const resetTimerForNewBatch = () => {
        stopTimer();  // Stop the current timer
        setElapsed(0);  // Reset elapsed time
        if (!isPaused) {
            startTimer();  // Start a new timer if not paused
        }
    };

    // Handles the logic for pausing and resuming the timer
    const handlePauseResume = () => {
        if (isPaused) {
            stopTimer();  // Pause the timer
        } else {
            if (intervalRef.current === null) {
                startTimer();  // Resume the timer
            }
        }
    };

    // Reset the timer when batchNumber changes
    useEffect(resetTimerForNewBatch, [batchNumber]);

    // Handle pause and resume when isPaused changes
    useEffect(handlePauseResume, [isPaused]);

    const sessionRemaining = currentBatch.sessionExpiresInSec;
    const forSession = sessionRemaining - elapsed;

    return (
        <span title="How much time left for this session?" className="text-white">
            <strong>Left time: </strong>
            <span>{forSession <= 0 ? "00:00:00" : secToTime(forSession)}</span>
        </span>
    );
};

export default CountdownSession;
