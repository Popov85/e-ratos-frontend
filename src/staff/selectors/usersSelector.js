import {createSelector} from "reselect";

export const getUserIdFromProps = (state, props) => props.staffId;

export const getAllUsers = (state) => state.users.content;

//------------------------------------------Re-selectors----------------------------------------------------------------
// For editing (from table)
export const getUserById = createSelector(getAllUsers, getUserIdFromProps, (users, userId) => {
    if (!users) return null;
    return users.find(u => u.staffId === userId);
});
