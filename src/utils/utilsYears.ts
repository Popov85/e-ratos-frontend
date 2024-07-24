import {Years} from "../domains/common/types/Years";

const current: number = new Date().getFullYear();

export const years: Array<Years> = [
    { value: "", label: "Select" },
    { value: current, label: current.toString() },
    { value: current - 1, label: (current - 1).toString() },
    { value: current - 2, label: (current - 2).toString() },
    { value: current - 3, label: (current - 3).toString() },
    { value: current - 4, label: (current - 4).toString() },
    { value: current - 5, label: (current - 5).toString() },
    { value: current - 6, label: (current - 6).toString() }
];