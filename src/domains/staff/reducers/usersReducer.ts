import {
    organisationsTransformer as organisationTransformer
} from "../../../utils/transformers/organisationsTransformer";
import {facultiesTransformer} from "../../../utils/transformers/facultiesTransformer";
import {Staff} from "../types/Staff";
import {
    ADD_STAFF_IN_STORE,
    CLEAR_DEP_STAFF,
    CLEAR_DEP_STAFF_FAILURE,
    CLEAR_LOADING_DEP_STAFF_FAILURE,
    CLEAR_UPDATING_DEP_STAFF_FAILURE, DELETE_STAFF_FROM_STORE,
    LOADING_DEP_STAFF,
    LOADING_DEP_STAFF_FAILURE,
    SET_STAFF, SET_STAFF_FILTER,
    StaffActionTypes, UPDATE_STAFF_EMAIL_IN_STORE,
    UPDATE_STAFF_IN_STORE,
    UPDATE_STAFF_NAME_IN_STORE,
    UPDATE_STAFF_SURNAME_IN_STORE,
    UPDATING_DEP_STAFF,
    UPDATING_DEP_STAFF_FAILURE
} from "../actions/usersActions";
import {departmentsTransformer} from "../../../utils/transformers/departmentsTransformer";
import {TableObject} from "../types/table/TableObject";

interface UsersState {
    content: Staff[];
    organisations: TableObject | null;
    faculties: TableObject | null;
    departments: TableObject | null;
    isLoading: boolean;
    isUpdating: boolean;
    error: Error | null;
    errorUpdate: Error | null;
    filter: any | null;
}

const initState = {
    content: [],
    organisations: null,
    faculties: null,
    departments: null,
    isLoading: false,
    isUpdating: false,
    error: null,
    errorUpdate: null,
    filter: null
}

export const usersReducer = (state: UsersState = initState, action: StaffActionTypes): UsersState => {
    switch (action.type) {
        case LOADING_DEP_STAFF: {
            return {...state, isLoading: action.payload?.isLoading ?? false};
        }
        case LOADING_DEP_STAFF_FAILURE: {
            console.warn("Error loading dep. staff!", action.payload?.error);
            return {...state, error: action.payload?.error ?? null};
        }
        case CLEAR_LOADING_DEP_STAFF_FAILURE: {
            return {...state, error: null};
        }
        case UPDATING_DEP_STAFF: {
            return {...state, isUpdating: action.payload?.isUpdating ?? false};
        }
        case UPDATING_DEP_STAFF_FAILURE: {
            console.warn("Error updating dep. staff!", action.payload?.error);
            return {...state, errorUpdate: action.payload?.error ?? null};
        }
        case CLEAR_UPDATING_DEP_STAFF_FAILURE: {
            return {...state, errorUpdate: null};
        }
        case CLEAR_DEP_STAFF_FAILURE: {
            return {...state, error: null, errorUpdate: null};
        }
        case SET_STAFF: {
            const staff: Array<Staff> | undefined = action.payload;
            if (!staff) return state;
            const organisations: TableObject = organisationTransformer.toFilter(staff);
            const faculties: TableObject = facultiesTransformer.toFilter(staff);
            const departments: TableObject = departmentsTransformer.toFilter(staff);
            return {...state, content: staff, organisations, faculties, departments};
        }
        case CLEAR_DEP_STAFF: {
            return initState;
        }
        case ADD_STAFF_IN_STORE: {
            const staff: Staff | undefined = action.payload?.staff;
            if (staff) {
                return {...state, content: [...state.content, staff]};
            }
            return state;
        }
        case UPDATE_STAFF_IN_STORE: {
            const staff: Staff | undefined = action.payload?.staff;
            if (staff) {
                return {...state, content: state.content.map((s: Staff): Staff => s.staffId === staff.staffId ? staff: s)};
            }
            return state;

        }
        case UPDATE_STAFF_NAME_IN_STORE: {
            if (action.payload) {
                const {staffId, name} = action.payload;
                return {
                    ...state,
                    content: state.content.map((s: Staff) => s.staffId === staffId ? {
                        ...s,
                        user: {...s.user, name: name}
                    } : s)
                }
            }
            return state;
        }
        case UPDATE_STAFF_SURNAME_IN_STORE: {
            if (action.payload) {
                const {staffId, surname} = action.payload;
                return {
                    ...state,
                    content: state.content.map((s: Staff) => s.staffId === staffId ? {
                        ...s,
                        user: {...s.user, surname: surname}
                    } : s)
                }
            }
            return state;
        }
        case UPDATE_STAFF_EMAIL_IN_STORE: {
            if (action.payload) {
                const {staffId, email} = action.payload;
                return {
                    ...state,
                    content: state.content.map((s: Staff) => s.staffId === staffId ? {
                        ...s,
                        user: {...s.user, email: email}
                    } : s)
                }
            }
            return state;
        }
        case DELETE_STAFF_FROM_STORE: {
            if (action.payload) {
                const {staffId} = action.payload;
                return {...state, content: state.content.filter((s: Staff): boolean => s.staffId !== staffId)}
            }
            return state;
        }
        case SET_STAFF_FILTER: {
            return {...state, filter: action.payload?.filter ?? null};
        }
        default:
            return state;
    }
}