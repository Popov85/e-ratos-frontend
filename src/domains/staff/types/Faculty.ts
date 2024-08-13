import {Organisation} from "./Organisation";

export type Faculty = {
    facId: number | string | null;
    name: string;
    organisation?: Organisation
};