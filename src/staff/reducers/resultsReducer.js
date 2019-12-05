import {coursesTransformer} from "../../utils/transformers/coursesTransformer";
import {schemesTransformer} from "../../utils/transformers/schemesTransformer";
import {facultiesTransformer} from "../../utils/transformers/facultiesTransformer";

const testResults = {
    "content" : [ {
        "resultId" : 184,
        "scheme" : {
            "schemeId" : 10,
            "name" : "Scheme_#59a010e8-52c6-4ff7-adc3-f5963f9b1114",
            "course" : {
                "courseId" : 1,
                "name" : "Course_#1"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : 100,
        "grade" : 1 ,
        "passed" : true,
        "sessionEnded" : "2019-11-06T10:22:15",
        "sessionLasted" : 43,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : true
    }, {
        "resultId" : 183,
        "scheme" : {
            "schemeId" : 11,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 2,
                "name" : "Course_#2"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "60",
        "grade" : "120",
        "passed" : true,
        "sessionEnded" : "2019-11-06T09:25:34",
        "sessionLasted" : 37,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : 1
    }, {
        "resultId" : 182,
        "scheme" : {
            "schemeId" : 11,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 1,
                "name" : "Course_#1"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "100",
        "grade" : "1",
        "passed" : true,
        "sessionEnded" : "2019-11-06T09:24:25",
        "sessionLasted" : 52,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : null
    }, {
        "resultId" : 181,
        "scheme" : {
            "schemeId" : 10,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47_10",
            "course" : {
                "courseId" : 2,
                "name" : "Course_#2"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "100",
        "grade" : "1 ",
        "passed" : true,
        "sessionEnded" : "2019-11-05T16:22:44",
        "sessionLasted" : 105,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : null
    }, {
        "resultId" : 180,
        "scheme" : {
            "schemeId" : 10,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 1,
                "name" : "Course_#1"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "100",
        "grade" : "1 ",
        "passed" : true,
        "sessionEnded" : "2019-11-05T12:19:39",
        "sessionLasted" : 210,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : true
    }, {
        "resultId" : 179,
        "scheme" : {
            "schemeId" : 10,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 1,
                "name" : "Course_#1"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "100",
        "grade" : "1 ",
        "passed" : true,
        "sessionEnded" : "2019-11-04T10:38:03",
        "sessionLasted" : 43,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : 5
    }, {
        "resultId" : 178,
        "scheme" : {
            "schemeId" : 10,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 3,
                "name" : "Course_#3"
            },
        },
        "student" : {
            "studId" : 15,
            "user" : {
                "name" : "Vasiliy1",
                "surname" : "Zarubitsky1",
                "email" : "zarubitsky1.vasiliy1@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2019
        },
        "percent" : "100",
        "grade" : "1 ",
        "passed" : true,
        "sessionEnded" : "2019-10-31T16:34:52",
        "sessionLasted" : 57,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : null
    }, {
        "resultId" : 177,
        "scheme" : {
            "schemeId" : 10,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 3,
                "name" : "Course_#3"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "100",
        "grade" : "1 ",
        "passed" : true,
        "sessionEnded" : "2019-10-28T13:50:06",
        "sessionLasted" : 43,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : null
    }, {
        "resultId" : 176,
        "scheme" : {
            "schemeId" : 11,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 1,
                "name" : "Course_#1"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "100",
        "grade" : "5 ",
        "passed" : true,
        "sessionEnded" : "2019-10-25T16:38:22",
        "sessionLasted" : 108,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : null
    }, {
        "resultId" : 175,
        "scheme" : {
            "schemeId" : 15,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47_15",
            "course" : {
                "courseId" : 1,
                "name" : "Course_#1"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "100",
        "grade" : "5",
        "passed" : true,
        "sessionEnded" : "2019-10-25T16:32:35",
        "sessionLasted" : 88,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : null
    }, {
        "resultId" : 174,
        "scheme" : {
            "schemeId" : 10,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 1,
                "name" : "Course_#1"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "100",
        "grade" : "5 ",
        "passed" : true,
        "sessionEnded" : "2019-10-25T16:20:14",
        "sessionLasted" : 92,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : null
    }, {
        "resultId" : 173,
        "scheme" : {
            "schemeId" : 11,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 1,
                "name" : "Course_#1"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "93.3",
        "grade" : "187 ",
        "passed" : true,
        "sessionEnded" : "2019-10-25T16:18:05",
        "sessionLasted" : 56,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : null
    }, {
        "resultId" : 172,
        "scheme" : {
            "schemeId" : 11,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 1,
                "name" : "Course_#1"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "100",
        "grade" : "1 ",
        "passed" : true,
        "sessionEnded" : "2019-10-25T16:16:55",
        "sessionLasted" : 46,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : null
    }, {
        "resultId" : 171,
        "scheme" : {
            "schemeId" : 11,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 1,
                "name" : "Course_#1"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "66.7",
        "grade" : "133 ",
        "passed" : true,
        "sessionEnded" : "2019-10-25T16:00:03",
        "sessionLasted" : 29,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : null
    }, {
        "resultId" : 170,
        "scheme" : {
            "schemeId" : 10,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 1,
                "name" : "Course_#1"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "100",
        "grade" : "1 ",
        "passed" : true,
        "sessionEnded" : "2019-10-25T15:21:18",
        "sessionLasted" : 72,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : null
    }, {
        "resultId" : 169,
        "scheme" : {
            "schemeId" : 11,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 1,
                "name" : "Course_#1"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "100",
        "grade" : "1 ",
        "passed" : true,
        "sessionEnded" : "2019-10-25T15:17:56",
        "sessionLasted" : 55,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : null
    }, {
        "resultId" : 168,
        "scheme" : {
            "schemeId" : 11,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 1,
                "name" : "Course_#1"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "100",
        "grade" : "1 ",
        "passed" : true,
        "sessionEnded" : "2019-10-25T15:04:43",
        "sessionLasted" : 49,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : null
    }, {
        "resultId" : 167,
        "scheme" : {
            "schemeId" : 10,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 1,
                "name" : "Course_#1"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "100",
        "grade" : "1 ",
        "passed" : true,
        "sessionEnded" : "2019-10-25T14:56:15",
        "sessionLasted" : 62,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : null
    }, {
        "resultId" : 166,
        "scheme" : {
            "schemeId" : 10,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 1,
                "name" : "Course_#1"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "100",
        "grade" : "1 ",
        "passed" : true,
        "sessionEnded" : "2019-10-25T12:33:07",
        "sessionLasted" : 52,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : null
    }, {
        "resultId" : 165,
        "scheme" : {
            "schemeId" : 10,
            "name" : "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
            "course" : {
                "courseId" : 1,
                "name" : "Course_#1"
            },
        },
        "student" : {
            "studId" : 2,
            "user" : {
                "name" : "Student",
                "surname" : "Student",
                "email" : "student@example.com"
            },
            "studentClass" : {
                "classId" : 1,
                "name" : "Class"
            },
            "faculty" : {
                "facId" : 1,
                "name" : "Faculty"
            },
            "organisation" : {
                "orgId" : 1,
                "name" : "University"
            },
            "entranceYear" : 2018
        },
        "percent" : "100",
        "grade" : "1 ",
        "passed" : true,
        "sessionEnded" : "2019-10-25T11:57:40",
        "sessionLasted" : 41,
        "timeOuted" : false,
        "cancelled" : false,
        "lms" : false, "points" : null
    } ],
    "pageable" : {
        "sort" : {
            "sorted" : true,
            "unsorted" : false
        },
        "offset" : 0,
        "pageSize" : 20,
        "pageNumber" : 0,
        "paged" : true,
        "unpaged" : false
    },
    "last" : false,
    "totalPages" : 9,
    "totalElements" : 180,
    "size" : 20,
    "number" : 0,
    "sort" : {
        "sorted" : true,
        "unsorted" : false
    },
    "first" : true,
    "numberOfElements" : 20
}

const testCourses = {
    1: "Course #1",
    2: "Course #2",
    3: "Course #3"
}

const testSchemes = {
    10: "Scheme #10",
    11: "Scheme #11",
    15: "Scheme #15"
}

const testFaculties = {
    1: "Faculty #1",
    2: "Faculty #2",
    3: "Faculty #3"
}

const testInitState = {
    data: testResults,
    courses: testCourses,
    schemes: testSchemes,
    schemesMap: new Map(),
    faculties: testFaculties
}

const initState = {
    data: null,
    courses: null,
    schemes: null,
    schemesMap: new Map(),
    faculties: null
}

export const resultsReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOADING_DEP_RESULTS": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_DEP_RESULTS_FAILURE": {
            return {...state, error: action.error};
        }
        case "CLEAR_LOADING_DEP_RESULTS_FAILURE": {
            return {...state, error: null};
        }
        case "SET_DEP_RESULTS_FILTER_SCHEMES": {
            let key = action.key;
            let raw = action.payload;
            let schemes= schemesTransformer.toObject(raw);
            let schemesMap = state.schemesMap;
            schemesMap.set(key, schemes);
            return {...state, schemes, schemesMap};
        }
        case "SET_EXISTING_DEP_RESULTS_FILTER_SCHEMES": {
            let key = action.key;
            let schemes = state.schemesMap.get(key);
            return {...state, schemes};
        }
        case "SET_DEP_RESULTS_BUNCH": {
            let bunch = action.payload;
            let data = bunch[0].data;
            let courses = coursesTransformer.toObject(bunch[1].data);
            let schemes = schemesTransformer.toObject(bunch[2].data);
            let faculties = facultiesTransformer.toObject(bunch[3].data);
            let schemesMap = new Map();
            schemesMap.set('All', schemes);
            return {data, courses, schemes, schemesMap, faculties};
        }
        case "SET_DEP_RESULTS": {
            let results = action.payload;
            return {...state, data: results};
        }
        default:
            return state;
    }
}