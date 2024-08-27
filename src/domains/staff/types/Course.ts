import {Access} from "./Access";
import {LMS} from "./LMS";

export type Course = {
    courseId?: number;
    name: string;
    accessId?: number;
    access?: Access;
    lmsId?: number;
    lms?: LMS;
    active: boolean;
    created?: string;
}