import {SecurityRole} from "../../common/types/SecurityRole";
import {Department} from "./Department";
import {Position} from "./Position";
import {User} from "./User";

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