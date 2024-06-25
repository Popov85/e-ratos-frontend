const initState = {
    data: null
}

const testInitState = {
    isLoading: false,
    error: null,
    data: null
}

const CSVHeadersBase =
    [
        {label: 'Organisation', key: 'org'},
        {label: 'Faculty', key: 'fac'},
        {label: 'Department', key: 'dep'},
    ];

const getCSVHeaders=(requestedColumns)=> {
    let result = CSVHeadersBase;
    const {courses, lmsCourses, schemes, themes, questions} = requestedColumns;
    if (courses) result = [...result, {label: 'Courses', key: 'quantityOfCourses'}];
    if (lmsCourses) result = [...result, {label: 'LMS Courses', key: 'quantityOfLMSCourses'}];
    if (schemes) result = [...result, {label: 'Schemes', key: 'quantityOfSchemes'}];
    if (themes) result = [...result, {label: 'Themes', key: 'quantityOfThemes'}];
    if (questions) result = [...result, {label: 'Questions', key: 'quantityOfQuestions'}];
    return result;
}


export const reportOnContentReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOADING_REPORT_ON_CONTENT": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_REPORT_ON_CONTENT_FAILURE": {
            console.log("Error creating report on content!", action.error);
            return {...state, error: action.error};
        }
        case "VALIDATION_REPORT_ON_CONTENT_FAILURE": {
            console.log(action.validationErrorMessage);
            return {...state, validationError: new Error(action.validationErrorMessage)};
        }
        case "CLEAR_LOADING_REPORT_ON_CONTENT": {
            return {isLoading: false, error: null, validationError: null, data: null};
        }
        case "SET_REPORT_ON_CONTENT": {
            const requestedColumns = action.requestedColumns;
            return {...state, CSVHeaders: getCSVHeaders(requestedColumns), data: action.payload};
        }
        default:
            return state;
    }
}