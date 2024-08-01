export type SchemeInfo = {
    schemeId: number,
    name: string,
    strategy: string,
    questions: number,
    timings: number,
    batchTimeLimited: boolean,
    mode: Mode,
    course: string,
    staff: string,
    active: boolean
};

export  type Mode = {
    modeId: number,
    helpable: boolean,
    name: string,
    pauseable: boolean,
    preservable: boolean,
    pyramid: boolean,
    reportable: boolean,
    resultDetails: boolean,
    rightAnswer: boolean,
    skipable: boolean,
    starrable: boolean
}