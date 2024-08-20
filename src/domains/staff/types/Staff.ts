import {SecurityRole} from "../../common/types/SecurityRole";
import {Department} from "./Department";

export type Staff = {
    staffId: number | null;
    user: User;
    role: SecurityRole | Array<SecurityRole>;
    positionId?: number;
    position?: Position;
    depId?: number;
    department?: Department;
    active?: boolean;
};

type User = {
    userId: number | null;
    name: string;
    surname: string;
    email: string;
    password: string;
}

type Position = {
    positionId: number;
    name: string;
}