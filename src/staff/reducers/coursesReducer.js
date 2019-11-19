const initState = [
    {
        "courseId": "",
        "name": "Select"
    },
    {
        "courseId": 1,
        "name": "Course #1"
    },
    {
        "courseId": 2,
        "name": "Course #2"
    },
    {
        "courseId": 3,
        "name": "Course #3"
    }
];

const adaptedArray = [
    {
        "key": "",
        "value": "Select"
    },
    {
        "key": 1,
        "value": "Course #1"
    },
    {
        "key": 2,
        "value": "Course #2"
    },
    {
        "key": 3,
        "value": "Course #3"
    }
]

const selectArray = {
    1: "Course #1",
    2: "Course #2",
    3: "Course #3"
}

export const coursesReducer = (state = selectArray, action) => {
    switch (action.type) {
        case "SET_COURSES_FOR_DROPDOWN": {
            return action.payload;
        }
        default:
            return state;
    }
}