import {Faculty} from "./Faculty";

export type Department = {
    depId: number | string | null;
    name: string;
    faculty?: Faculty
};