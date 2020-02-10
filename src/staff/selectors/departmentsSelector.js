import {createSelector} from "reselect";

export const getDepIdFromProps = (state, props) => props.depId;

export const getAllDepartments = (state) => state.departments.content;

//------------------------------------------Re-selectors----------------------------------------------------------------
// For editing (from table)
export const getDepById = createSelector(getAllDepartments, getDepIdFromProps, (departments, depId) => {
    if (!departments) return null;
    return departments.find(d => d.depId === depId);
});

// TODO: add more re-selectors