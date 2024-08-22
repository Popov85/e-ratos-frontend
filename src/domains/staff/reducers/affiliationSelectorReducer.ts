import {organisationsTransformer} from "../../../utils/transformers/organisationsTransformer";
import {facultiesTransformer} from "../../../utils/transformers/facultiesTransformer";
import {departmentsTransformer} from "../../../utils/transformers/departmentsTransformer";
import {
    AffiliationActionTypes,
    CLEAR_ALL_ON_FACULTY_RESET,
    CLEAR_ALL_ON_ORGANISATION_RESET,
    CLEAR_LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE,
    LOADING_COMPONENT_OF_AFFILIATION_SELECTOR,
    LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE,
    SET_DEPARTMENTS_FOR_SELECTOR,
    SET_FACULTIES_FOR_SELECTOR,
    SET_ORGANISATIONS_FOR_SELECTOR
} from "../actions/affiliationSelectorActions";
import {FormSelect} from "../types/form/FormSelect";


const dummyValue = {
    value: "",
    label: "Select"
}

const organisationsInit = [dummyValue];

const facultiesInit = [dummyValue];

const departmentsInit = [dummyValue];

const testSelected = {
    org: {
        value: 1,
        label: "Organisation #1"
    },
    fac: {
        value: 1,
        label: "Faculty #1"
    },
    dep: {
        value: 1,
        label: "Department #1"
    }
}


// Define the state interface
type AffiliationState = {
    organisations: Array<FormSelect>;
    faculties: Array<FormSelect>;
    departments: Array<FormSelect>;
    selected: any;
    isLoading: boolean;
    error: Error | null;
}

const initState: AffiliationState = {
    organisations: organisationsInit,
    faculties: [],
    departments: [],
    selected: null,
    isLoading: false,
    error: null
}

export const affiliationSelectorReducer = (state: AffiliationState = initState, action: AffiliationActionTypes): AffiliationState => {
    switch (action.type) {
        case LOADING_COMPONENT_OF_AFFILIATION_SELECTOR: {
            return {...state, isLoading: action.payload?.isLoading ?? false};
        }
        case LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE: {
            return {...state, error: action.payload?.error ?? null};
        }
        case CLEAR_LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE: {
            return {...state, error: null};
        }
        case SET_ORGANISATIONS_FOR_SELECTOR: {
            if (action.payload) {
                const organisations: Array<FormSelect> = organisationsTransformer.toSelect(action.payload.organisations);
                organisations.unshift(dummyValue);
                return {...state, organisations};
            }
            return state;
        }
        case SET_FACULTIES_FOR_SELECTOR: {
            if (action.payload) {
                const faculties: Array<FormSelect> = facultiesTransformer.toSelect(action.payload.faculties);
                faculties.unshift(dummyValue);
                return {...state, faculties};
            }
            return state;

        }
        case SET_DEPARTMENTS_FOR_SELECTOR: {
            if (action.payload) {
                const departments: Array<FormSelect> = departmentsTransformer.toSelect(action.payload.departments);
                departments.unshift(dummyValue);
                return {...state, departments};
            }
            return state;
        }

        /*case SET_SELECTED: {
            let affiliation = action.payload;
            const {orgId, facId, depId} = affiliation; // strings
            let org, fac, dep;
            if (orgId) org = state.organisations.find(o=>o.value===Number(orgId));
            if (facId) fac = state.faculties.find(f=>f.value===Number(facId));
            if (depId) dep = state.departments.find(d=>d.value===Number(depId));
            let selected = new Selected(org, fac, dep);
            return {...state, selected};
        }*/
        /*case CLEAR_SELECTED: {
            return {...state, selected: null};
        }*/
        case CLEAR_ALL_ON_ORGANISATION_RESET: {
            return {...state, faculties: facultiesInit, departments: departmentsInit};
        }
        case CLEAR_ALL_ON_FACULTY_RESET: {
            return {...state, departments: departmentsInit};
        }
        default:
            return state;
    }
}