import {organisationsTransformer} from "../../../utils/transformers/organisationsTransformer";
import {facultiesTransformer} from "../../../utils/transformers/facultiesTransformer";
import {departmentsTransformer} from "../../../utils/transformers/departmentsTransformer";
import {coursesTransformer} from "../../../utils/transformers/coursesTransformer";
import {schemesTransformer} from "../../../utils/transformers/schemesTransformer";


const dummyValue = {value: "", label: "Select"}

const CSVHeaders = [
    {label: 'ID', key: 'resultId'},
    {label: 'Organisation', key: 'department.faculty.organisation.name'},
    {label: 'Faculty', key: 'department.faculty.name'},
    {label: 'Department', key: 'department.name'},
    {label: 'Course', key: 'scheme.course.name'},
    {label: 'Scheme', key: 'scheme.name'},
    {label: 'Name', key: 'student.user.name'},
    {label: 'Surname', key: 'student.user.surname'},
    {label: 'Email', key: 'student.user.email'},
    {label: 'Stud. faculty', key: 'student.faculty.name'},
    {label: 'Stud. class', key: 'student.studentClass.name'},
    {label: 'Entrance Year', key: 'student.entranceYear'},
    {label: 'Session ended', key: 'sessionEnded'},
    {label: 'Session lasted', key: 'sessionLasted'},
    {label: 'Percent', key: 'percent'},
    {label: 'Grade', key: 'grade'},
    {label: 'Passed', key: 'passed'},
    {label: 'Session lasted', key: 'sessionLasted'},
    {label: 'Timeouted', key: 'timeouted'},
    {label: 'Cancelled', key: 'cancelled'},
    {label: 'LMS', key: 'lms'}
];

const initState = {
    organisations: [dummyValue],
    faculties: [dummyValue],
    departments: [dummyValue],
    courses: [dummyValue],
    schemes: [dummyValue],
    CSVHeaders: CSVHeaders,
    isLoading: false,
    data: null
}

export const reportOnResultsReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOADING_REPORT_ON_RESULTS": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_REPORT_ON_RESULTS_FAILURE": {
            console.log("Error creating report on content!", action.error);
            return {...state, error: action.error};
        }
        case "VALIDATION_REPORT_ON_RESULTS_FAILURE": {
            console.log(action.validationErrorMessage);
            return {...state, validationError: new Error(action.validationErrorMessage)};
        }
        case "CLEAR_LOADING_REPORT_ON_RESULTS": {
            return {...state, isLoading: false, error: null, validationError: null};
        }
        case "LOADING_COMPONENT_OF_REPORT_ON_RESULTS": {
            return {...state, isLoadingComponent: action.isLoading};
        }
        case "LOADING_COMPONENT_OF_REPORT_ON_RESULTS_FAILURE": {
            return {...state, errorComponent: action.error};
        }
        case "CLEAR_LOADING_COMPONENT_OF_REPORT_ON_RESULTS_FAILURE": {
            return {...state, isLoadingComponent: false, errorComponent: null};
        }
        case "SET_ORGANISATIONS_FOR_REPORT_ON_RESULTS": {
            let organisations = organisationsTransformer.toSelect(action.payload);
            organisations.unshift(dummyValue);
            return {...state, organisations};
        }
        case "SET_FACULTIES_FOR_REPORT_ON_RESULTS": {
            let faculties = facultiesTransformer.toSelect(action.payload);
            faculties.unshift(dummyValue);
            return {...state, faculties};
        }
        case "SET_DEPARTMENTS_FOR_REPORT_ON_RESULTS": {
            let departments = departmentsTransformer.toSelect(action.payload);
            departments.unshift(dummyValue);
            return {...state, departments};
        }
        case "SET_COURSES_FOR_REPORT_ON_RESULTS": {
            let courses = coursesTransformer.toSelect(action.payload);
            courses.unshift(dummyValue);
            return {...state, courses};
        }
        case "SET_SCHEMES_FOR_REPORT_ON_RESULTS": {
            let schemes = schemesTransformer.toSelect(action.payload);
            schemes.unshift(dummyValue);
            return {...state, schemes};
        }
        case "CLEAR_ALL_SELECTS_FOR_REPORT_ON_RESULTS_ON_ORGANISATION_RESET": {
            return {...state, faculties: [dummyValue], departments: [dummyValue], courses: [dummyValue], schemes: [dummyValue]};
        }
        case "CLEAR_ALL_SELECTS_FOR_REPORT_ON_RESULTS_ON_FACULTY_RESET": {
            return {...state, departments: [dummyValue], courses: [dummyValue], schemes: [dummyValue]};
        }
        case "CLEAR_ALL_SELECTS_FOR_REPORT_ON_RESULTS_ON_DEPARTMENT_RESET": {
            return {...state, courses: [dummyValue], schemes: [dummyValue]};
        }
        case "CLEAR_ALL_SELECTS_FOR_REPORT_ON_RESULTS_ON_COURSE_RESET": {
            return {...state, schemes: [dummyValue]};
        }
        case "SET_REPORT_ON_RESULTS": {
            return {...state, data: action.payload};
        }
        case "CLEAR_REPORT_ON_RESULTS": {
            return {...state, error: null, validationError: null, data: null};
        }
        default:
            return state;
    }
}