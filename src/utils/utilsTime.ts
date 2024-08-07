export const secToTime = (sec: number): string => {
    let date: Date = new Date(0);
    date.setSeconds(sec);
    return date.toISOString().slice(11, 19);
}