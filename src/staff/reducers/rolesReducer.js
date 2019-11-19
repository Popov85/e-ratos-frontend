const forEdit = [
    {
        value: 'ROLE_LAB-ASSISTANT',
        label: 'ROLE_LAB-ASSISTANT'
    },
    {
        value: 'ROLE_INSTRUCTOR',
        label: 'ROLE_INSTRUCTOR'
    },
    {
        value: 'ROLE_DEP-ADMIN',
        label: 'ROLE_DEP-ADMIN'
    }
];

const forNew = [...forEdit, {value: "", label: "Select"}];

const forFilter = {
    'ROLE_DEP-ADMIN': 'ROLE_DEP-ADMIN',
    'ROLE_INSTRUCTOR': 'ROLE_INSTRUCTOR',
    'ROLE_LAB-ASSISTANT': 'ROLE_LAB-ASSISTANT'
}

const initState = {
    forEdit, forNew, forFilter
}

/**
 * Hard-coded, never updates or changes!
 * @param state
 * @param action
 * @returns {*}
 */
export const rolesReducer = (state = initState, action) => {
    return state;
}