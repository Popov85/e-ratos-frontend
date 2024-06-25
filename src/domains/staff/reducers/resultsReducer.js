import {schemesTransformer} from "../../../utils/transformers/schemesTransformer";
import {coursesTransformer} from "../../../utils/transformers/coursesTransformer";
import {facultiesTransformer} from "../../../utils/transformers/facultiesTransformer";

const testResults = {
    "content":
        [
            {
                "resultId": 184,
                "scheme": {
                    "schemeId": 10,
                    "name": "Scheme_#59a010e8-52c6-4ff7-adc3-f5963f9b1114",
                    "course": {
                        "courseId": 1,
                        "name": "Really long Course_#1"
                    },
                },
                "student": {
                    "studId": 2,
                    "user": {
                        "name": "Student",
                        "surname": "Student",
                        "email": "student@example.com"
                    },
                    "studentClass": {
                        "classId": 1,
                        "name": "Class"
                    },
                    "faculty": {
                        "facId": 1,
                        "name": "Faculty"
                    },
                    "organisation": {
                        "orgId": 1,
                        "name": "University"
                    },
                    "entranceYear": 2018
                },
                "themeResults": [{
                    "theme": {
                        "themeId": 1,
                        "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                    },
                    "quantity": 20,
                    "percent": 100.0
                }],
                "percent": 100,
                "grade": 1,
                "passed": true,
                "sessionEnded": "2019-11-06 10:20 (+0200)",
                "sessionLasted": 43,
                "timeouted": false,
                "cancelled": false,
                "lms": true,
                "details": true
            }, {
            "resultId": 183,
            "scheme": {
                "schemeId": 11,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 2,
                    "name": "Course_#2 Really long course name for testing the feature"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 60.0
            }],
            "percent": "60",
            "grade": "120",
            "passed": true,
            "sessionEnded": "2019-11-06 09:25 (+0200)",
            "sessionLasted": 37,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": true,
            "points": 1
        }, {
            "resultId": 182,
            "scheme": {
                "schemeId": 11,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 1,
                    "name": "Course_#1"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 100.0
            }],
            "percent": "100",
            "grade": "1",
            "passed": true,
            "sessionEnded": "2019-11-06 09:24 (+0200)",
            "sessionLasted": 52,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": true,
            "points": null
        }, {
            "resultId": 181,
            "scheme": {
                "schemeId": 10,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47_10",
                "course": {
                    "courseId": 2,
                    "name": "Course_#2"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 100.0
            }],
            "percent": "100",
            "grade": "1 ",
            "passed": true,
            "sessionEnded": "2019-11-05 16:22 (+0200)",
            "sessionLasted": 105,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": true,
            "points": null
        }, {
            "resultId": 180,
            "scheme": {
                "schemeId": 10,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 1,
                    "name": "Course_#1"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 100.0
            }],
            "percent": "100",
            "grade": "1 ",
            "passed": true,
            "sessionEnded": "2019-11-05 12:19 (+0200)",
            "sessionLasted": 210,
            "timeouted": false,
            "cancelled": false,
            "lms": true,
            "details": true,
            "points": null
        }, {
            "resultId": 179,
            "scheme": {
                "schemeId": 10,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 1,
                    "name": "Course_#1"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 100.0
            }],
            "percent": "100",
            "grade": "1 ",
            "passed": true,
            "sessionEnded": "2019-11-04 10:38 (+0200)",
            "sessionLasted": 43,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": true,
            "points": 5
        }, {
            "resultId": 178,
            "scheme": {
                "schemeId": 10,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 3,
                    "name": "Course_#3"
                },
            },
            "student": {
                "studId": 15,
                "user": {
                    "name": "Vasiliy1",
                    "surname": "Zarubitsky1",
                    "email": "zarubitsky1.vasiliy1@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2019
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 100.0
            }],
            "percent": "100",
            "grade": "1 ",
            "passed": true,
            "sessionEnded": "2019-10-31 16:34 (+0200)",
            "sessionLasted": 57,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": true,
            "points": null
        }, {
            "resultId": 177,
            "scheme": {
                "schemeId": 10,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 3,
                    "name": "Course_#3"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 100.0
            }],
            "percent": "100",
            "grade": "1 ",
            "passed": true,
            "sessionEnded": "2019-10-28 13:50 (+0200)",
            "sessionLasted": 43,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": false,
            "points": null
        }, {
            "resultId": 176,
            "scheme": {
                "schemeId": 11,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 1,
                    "name": "Course_#1"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 100.0
            }],
            "percent": "100",
            "grade": "5 ",
            "passed": true,
            "sessionEnded": "2019-10-25 16:38 (+0200)",
            "sessionLasted": 108,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": false,
            "points": null
        }, {
            "resultId": 175,
            "scheme": {
                "schemeId": 15,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47_15",
                "course": {
                    "courseId": 1,
                    "name": "Course_#1"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 100.0
            }],
            "percent": "100",
            "grade": "5",
            "passed": true,
            "sessionEnded": "2019-10-25 16:32 (+0200)",
            "sessionLasted": 88,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": false,
            "points": null
        }, {
            "resultId": 174,
            "scheme": {
                "schemeId": 10,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 1,
                    "name": "Course_#1"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 100.0
            }],
            "percent": "100",
            "grade": "5 ",
            "passed": true,
            "sessionEnded": "2019-10-25 16:20 (+0200)",
            "sessionLasted": 92,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": false,
            "points": null
        }, {
            "resultId": 173,
            "scheme": {
                "schemeId": 11,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 1,
                    "name": "Course_#1"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 93.3
            }],
            "percent": "93.3",
            "grade": "187 ",
            "passed": true,
            "sessionEnded": "2019-10-25 16:18 (+0200)",
            "sessionLasted": 56,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": false,
            "points": null
        }, {
            "resultId": 172,
            "scheme": {
                "schemeId": 11,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 1,
                    "name": "Course_#1"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 100.0
            }],
            "percent": "100",
            "grade": "1 ",
            "passed": true,
            "sessionEnded": "2019-10-25 16:16 (+0200)",
            "sessionLasted": 46,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": false,
            "points": null
        }, {
            "resultId": 171,
            "scheme": {
                "schemeId": 11,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 1,
                    "name": "Course_#1"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 66.7
            }],
            "percent": "66.7",
            "grade": "133 ",
            "passed": true,
            "sessionEnded": "2019-10-25 16:00 (+0200)",
            "sessionLasted": 29,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": false,
            "points": null
        }, {
            "resultId": 170,
            "scheme": {
                "schemeId": 10,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 1,
                    "name": "Course_#1"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 100.0
            }],
            "percent": "100",
            "grade": "1 ",
            "passed": true,
            "sessionEnded": "2019-10-25 15:21 (+0200)",
            "sessionLasted": 72,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": false,
            "points": null
        }, {
            "resultId": 169,
            "scheme": {
                "schemeId": 11,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 1,
                    "name": "Course_#1"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 100.0
            }],
            "percent": "100",
            "grade": "1 ",
            "passed": true,
            "sessionEnded": "2019-10-25 15:17 (+0200)",
            "sessionLasted": 55,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": false,
            "points": null
        }, {
            "resultId": 168,
            "scheme": {
                "schemeId": 11,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 1,
                    "name": "Course_#1"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 100.0
            }],
            "percent": "100",
            "grade": "1 ",
            "passed": true,
            "sessionEnded": "2019-10-25 15:04 (+0200)",
            "sessionLasted": 49,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": false,
            "points": null
        }, {
            "resultId": 167,
            "scheme": {
                "schemeId": 10,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 1,
                    "name": "Course_#1"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 100.0
            }],
            "percent": "100",
            "grade": "1 ",
            "passed": true,
            "sessionEnded": "2019-10-25 14:56  (+0200)",
            "sessionLasted": 62,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": false,
            "points": null
        }, {
            "resultId": 166,
            "scheme": {
                "schemeId": 10,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 1,
                    "name": "Course_#1"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "themeResults": [{
                "theme": {
                    "themeId": 1,
                    "name": "Theme: Consequat nisi in non odio curabitur labore nulla habitasse ."
                },
                "quantity": 20,
                "percent": 100.0
            }],
            "percent": "100",
            "grade": "1 ",
            "passed": true,
            "sessionEnded": "2019-10-25 12:33 (+0200)",
            "sessionLasted": 52,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": false,
            "points": null
        }, {
            "resultId": 165,
            "scheme": {
                "schemeId": 10,
                "name": "Scheme_#bfccaae4-ab9f-468a-8bb3-17f2dc8c8c47",
                "course": {
                    "courseId": 1,
                    "name": "Course_#1"
                },
            },
            "student": {
                "studId": 2,
                "user": {
                    "name": "Student",
                    "surname": "Student",
                    "email": "student@example.com"
                },
                "studentClass": {
                    "classId": 1,
                    "name": "Class"
                },
                "faculty": {
                    "facId": 1,
                    "name": "Faculty"
                },
                "organisation": {
                    "orgId": 1,
                    "name": "University"
                },
                "entranceYear": 2018
            },
            "percent": "100",
            "grade": "1 ",
            "passed": true,
            "sessionEnded": "2019-10-25 11:57 (+0200)",
            "sessionLasted": 41,
            "timeouted": false,
            "cancelled": false,
            "lms": false,
            "details": false,
            "points": null
        }],
    "pageable": {
        "sort": {
            "sorted": true,
            "unsorted": false
        },
        "offset": 0,
        "pageSize": 20,
        "pageNumber": 0,
        "paged": true,
        "unpaged": false
    },
    "last": false,
    "totalPages": 9,
    "totalElements": 180,
    "size": 20,
    "number": 0,
    "sort": {
        "sorted": true,
        "unsorted": false
    },
    "first": true,
    "numberOfElements": 20
}

const testCourses = {
    1: "Really long course for purely testing purposes Course #1",
    2: "Course #2",
    3: "Course #3"
}

const testSchemes = {
    10: "Really long course for purely testing purposes Scheme #10",
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
            let schemes = schemesTransformer.toObject(raw);
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
        case "SET_RESULT": {
            const { resultId, payload } = action;
            // Ensure data and data.content are initialized
            const content = (state.data?.content || []).filter(item => item.id !== resultId);
            content.push(payload);
            return {
                ...state,
                data: {
                    ...state.data,
                    content
                }
            };
        }
        default:
            return state;
    }
}