import {BaseQuestion} from "./questions/BaseQuestion";

export type BatchInfo = {
    questions: Array<BaseQuestion>,
    lastBatch: boolean,
    questionsLeft: number,
    batchesLeft: number,
    sessionExpiresInSec: number,
    batchExpiresInSec: number,
    currentScore?: string,
    effectiveScore?: string,
    progress?: string,
    motivationalMessage?: string
}