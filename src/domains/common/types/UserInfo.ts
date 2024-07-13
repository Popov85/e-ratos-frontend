import {SecurityRole} from "./SecurityRole";

export type UserInfo = {
    userId: number;
    name: string;
    surname: string;
    email: string;
    role: SecurityRole;
    lms: boolean;
    staff?: {
        position: {
            posId: number;
            name: string;
        };
        department: {
            depId: number;
            name: string;
            faculty: {
                facId: number;
                name: string;
                organisation: {
                    orgId: number;
                    name: string;
                    deleted: boolean;
                };
            };
        };
    } | null;
};