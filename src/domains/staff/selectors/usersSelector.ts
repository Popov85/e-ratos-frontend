import {createSelector} from "reselect";
import {RootState} from "../../../store/rootReducer";
import {Staff} from "../types/Staff";

interface StaffProps {
    staffId?: number;
}

export const getUserIdFromProps = (_state: RootState, props: StaffProps) => props.staffId;

export const getAllUsers = (state: RootState) => state.staff.users.content;

//------------------------------------------Re-selectors----------------------------------------------------------------
// For editing (from table)
export const getUserById = createSelector(
    [getAllUsers, getUserIdFromProps],
    (users: Array<Staff>, userId: number | undefined) => {
        if (!users) return null;
        return users.find((s: Staff): boolean => s.staffId === userId) || null;
    }) as (state: RootState, props: StaffProps) => Staff | null;
;
