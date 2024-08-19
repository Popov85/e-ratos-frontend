import {createSelector} from "reselect";
import {RootState} from "../../../store/rootReducer";
import {Department} from "../types/Department";

interface DepProps {
    depId?: number;
}

export const getDepIdFromProps = (state: RootState, props: DepProps) => props.depId;

export const getAllDepartments = (state: RootState) => state.staff.departments.content;

//------------------------------------------Re-selectors----------------------------------------------------------------
// For editing (from table)
export const getDepById = createSelector(
    [getAllDepartments, getDepIdFromProps],
    (departments: Array<Department>, depId: number | undefined) => {
        if (!departments || !depId) return null;
        return departments.find((d: Department): boolean => d.depId === depId) || null;
    }) as (state: RootState, props: DepProps) => Department | null;