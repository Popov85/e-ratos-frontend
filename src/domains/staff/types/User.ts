import {SecurityRole} from "../../common/types/SecurityRole";

export type User = {
    userId: number | null;
    name: string;
    surname: string;
    email: string;
    password: string;
    role?: SecurityRole | Array<SecurityRole>;
    active?: boolean;
}