import React, { useEffect, useState } from 'react';
import {BatchInfo} from "../types/BatchInfo";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {getBatch} from "../selectors/sessionSelector";
import {secToTime} from "../../../utils/utilsTime";

const CountdownSession: React.FC = () => {

    const currentBatch: BatchInfo | null = useSelector((state: RootState) => getBatch(state));
    const batchNumber: number = useSelector((state: RootState) => state.session.session.batchNumber);
    const isPaused: boolean = useSelector((state: RootState) => state.session.session.paused);

    if (!currentBatch) return null;

    const [elapsed, setElapsed] = useState(0);

    const [intervalId, setIntervalId] = useState<number | null>(null);

    useEffect(() => {
        if (!isPaused) {
            launch();
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isPaused]);

    useEffect(() => {
        setElapsed(0);
        if (intervalId) {
            clearInterval(intervalId);
        }
        if (!isPaused) {
            launch();
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [batchNumber]);

    const launch = (): void => {
        const newIntervalId: number = setInterval(() => tick(), 1000) as unknown as number;
        setIntervalId(newIntervalId);
    };

    const tick = (): void => {
        setElapsed((prevElapsed) => prevElapsed + 1);
    };

    const sessionRemaining: number = currentBatch.sessionExpiresInSec;
    const forSession: number = sessionRemaining - elapsed;

    return (
        <span title="How much time left for this session?" className="text-white">
            <strong>Left time: </strong>
            <span>{forSession <= 0 ? "00:00:00" : secToTime(forSession)}</span>
        </span>
    );
};

export default CountdownSession;
