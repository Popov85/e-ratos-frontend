const testInitState = {
    content: [
        {
            courseId: 1,
            name: "Test course #1 which is rather long interesting and actually a fantastic course for everybody who wants to study IT technologies fron very scratch!",
            created: "2017-01-08 18:25",
            access:{
                accessId: 1,
                name: "dep-private"
            },
            staff:{
                staffId: 1,
                name: "Daniel",
                surname: "Naroditsky",
                position: "System admin"
            },
            active: true,
            lms: null
        },
        {
            courseId: 2,
            name: "Test course #2",
            created: "2018-01-13 12:55",
            access:{
                accessId: 1,
                name: "dep-private"
            },
            staff:{
                staffId: 2,
                name: "Vasiliy",
                surname: "Zarubitsky",
                position: "instructor"
            },
            active: true,
            lms: null
        },
        {
            courseId: 3,
            name: "Test course #3",
            created: "2019-01-05 13:30",
            access:{
                accessId: 2,
                name: "private"
            },
            staff:{
                staffId: 1,
                name: "Daniel",
                surname: "Naroditsky",
                position: "System admin"
            },
            active: true,
            lms: null
        },
        {
            courseId: 4,
            name: "Test course #4",
            created: "2020-01-08 09:36",
            access:{
                accessId: 1,
                name: "dep-private"
            },
            staff:{
                staffId: 1,
                name: "Daniel",
                surname: "Naroditsky",
                position: "System admin"
            },
            active: true,
            lms: {
                lmsId: 1,
                name: "edX"
            }
        },
        {
            courseId: 5,
            name: "Test course #5",
            created: "2020-01-15 10:21",
            access:{
                accessId: 1,
                name: "private"
            },
            staff:{
                staffId: 3,
                name: "Andrey",
                surname: "Popov",
                position: "Instructor"
            },
            active: true,
            lms:{
                lmsId: 1,
                name: "edX"
            }
        }
    ]
}

const initState = {
    content: null,
    isLoading: false,
    error: null
}

export const coursesReducer = (state =  initState, action) => {
    switch (action.type) {
        case "LOADING_ALL_COURSES": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_ALL_COURSES_FAILURE": {
            console.log("Error loading courses!", action.error);
            return {...state, error: action.error};
        }
        case "CLEAR_LOADING_ALL_COURSES_FAILURE": {
            return {...state, error: null};
        }
        case "UPDATING_COURSE": {
            return {...state, isUpdating: action.isUpdating};
        }
        case "UPDATING_COURSE_FAILURE": {
            console.log("Error updating a course!", action.error);
            return {...state, errorUpdate: action.error};
        }
        case "CLEAR_UPDATING_COURSE_FAILURE": {
            return {...state, errorUpdate: null};
        }
        case "CLEAR_ALL_COURSES_FAILURES": {
            return {...state, error: null, errorUpdate: null};
        }
        case "SET_ALL_COURSES": {
            const content = action.payload;
            return {...state, content};
        }
        case "ADD_COURSE_IN_STORE": {
            const course = action.payload;
            return {...state, content: [...state.content, course]};
        }
        case "UPDATE_COURSE_IN_STORE": {
            const course = action.payload;
            return {...state, content: state.content.map(c => c.courseId === course.courseId ? course: c)};
        }
        case "UPDATE_COURSE_NAME_IN_STORE": {
            const {courseId, name} = action;
            return {...state, content: state.content.map(c => c.courseId === courseId ? {...c, name} : c)}
        }
        case "UPDATE_COURSE_ACTIVE_IN_STORE": {
            const {courseId, active} = action;
            return {...state, content: state.content.map(c => c.courseId === courseId ? {...c, active} : c)}
        }
        case "UPDATE_COURSE_ACCESS_IN_STORE": {
            const {courseId, access} = action;
            return {...state, content: state.content.map(c => c.courseId === courseId ? {...c, access} : c)}
        }
        case "DELETE_COURSE_FROM_STORE": {
            const {courseId} = action;
            return {...state, content: state.content.filter(c => c.courseId !== courseId)}
        }
        case "ASSOCIATE_COURSE_WITH_LMS_IN_STORE": {
            const {courseId, lms} = action;
            return {...state, content: state.content.map(c => c.courseId === courseId ? {...c, lms} : c)}
        }
        case "DISASSOCIATE_COURSE_WITH_LMS_IN_STORE": {
            const {courseId} = action;
            return {...state, content: state.content.map(c => c.courseId === courseId ? {...c, lms: null} : c)}
        }
        default:
            return state;
    }
}