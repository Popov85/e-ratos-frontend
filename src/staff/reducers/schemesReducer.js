import {dev} from "../../profile";

const testInitState = {
    isLoading: false,
    content:
        [
            {
                "schemeId": 3,
                "name": "Scheme: Tellus gravida duis ut duis nullam nostrud gravida arcu lorem eu aliquam eu est curabitur in commodo est dolore deserunt .",
                "strategy": {
                    "strId": 1,
                    "name": "default",
                    "description": "Default sequence sorting strategy"
                },
                "settings": {
                    "setId": 1,
                    "name": "default",
                    "secondsPerQuestion": 60,
                    "questionsPerSheet": 1,
                    "daysKeepResultDetails": 1,
                    "level2Coefficient": 1.0,
                    "level3Coefficient": 1.0,
                    "strictControlTimePerQuestion": false,
                    "staff": {
                        "staffId": 1,
                        "name": "Staff",
                        "surname": "Staff",
                        "position": "System admin"
                    }
                },
                "mode": {
                    "modeId": 1,
                    "name": "exam",
                    "helpable": false,
                    "pyramid": false,
                    "skipable": false,
                    "rightAnswer": false,
                    "resultDetails": false,
                    "preservable": false,
                    "reportable": true,
                    "starrable": false,
                    "staff": {
                        "staffId": 1,
                        "name": "Staff",
                        "surname": "Staff",
                        "position": "System admin"
                    }
                },
                "options": {
                    "optId": 2,
                    "name": "training",
                    "displayQuestionsLeft": true,
                    "displayBatchesLeft": true,
                    "displayCurrentScore": true,
                    "displayEffectiveScore": true,
                    "displayProgress": true,
                    "displayMotivationalMessages": true,
                    "displayResultScore": true,
                    "displayResultMark": true,
                    "displayTimeSpent": true,
                    "displayResultOnThemes": true,
                    "displayResultOnQuestions": true,
                    "staff": {
                        "staffId": 1,
                        "name": "Staff",
                        "surname": "Staff",
                        "position": "System admin"
                    }
                },
                grading: {
                    gradingId: 2,
                    name: "two-point",
                    description: "universal passed/not passed grading system..."
                },
                gradingDetails:{
                    twoId:2,
                    name: "moderate",
                    threshold:70,
                    isDefault: false,
                    staff: {
                        staffId:1,
                        name:"Andrew",
                        surname:"Smith",
                        position:"instructor"
                    }
                },
                "course": {
                    "courseId": 1,
                    "name": "Course_#1"
                },
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                },
                "created": "2018-09-06 15:38 (+0300)",
                "access": {
                    "accessId": 2,
                    "name": "private"
                },
                "themes":[
                    {
                        "schemeThemeId": 1,
                        "themeId": 3,
                        "theme": "Theme: Consequat etiam laborumcurabitur ipsum occaecat et tincidunt .",
                        "order": 0,
                        "settings":[
                            {
                                "schemeThemeSettingsId": 1,
                                "schemeThemeId": 1,
                                "typeId": 1,
                                "type": "MCQ",
                                "level1": 10,
                                "level2": 0,
                                "level3": 0
                            }
                        ]
                    }
                ],
                "active": true,
                "lmsOnly": false,
                "themesCount": 1,
                "groupsCount": 0
            }, {
            "schemeId": 8,
            "name": "Scheme: Eros lacus sint maecenas eget nibh ad eget eu cillum lorem mauris veniam nunc duis lacus quis vehicula dapibus ac velit excepteur fermentum .",
            "strategy": {
                "strId": 3,
                "name": "types&levels",
                "description": "Types->Levels sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 1,
                "name": "exam",
                "helpable": false,
                "pyramid": false,
                "skipable": false,
                "rightAnswer": false,
                "resultDetails": false,
                "preservable": false,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 2,
                "name": "two-point",
                "description": "classic 2 points grading system {0, 1} or {passed, not passed}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2018-10-02 15:38 (+0300)",
            "access": {
                "accessId": 2,
                "name": "private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 27,
            "name": "Scheme test #1: Lorem ipsum updated",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 2,
                "name": "training",
                "helpable": true,
                "pyramid": true,
                "skipable": true,
                "rightAnswer": true,
                "resultDetails": false,
                "preservable": true,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 1,
                "name": "exam",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": false,
                "displayEffectiveScore": false,
                "displayProgress": false,
                "displayMotivationalMessages": false,
                "displayResultScore": false,
                "displayResultMark": true,
                "displayTimeSpent": false,
                "displayResultOnThemes": false,
                "displayResultOnQuestions": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 1,
                "name": "four-point",
                "description": "classic 4 points grading system {2, 3, 4, 5}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2020-04-11 13:55 (+0300)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 31,
            "name": "Scheme test #1: Lorem ipsum",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 2,
                "name": "training",
                "helpable": true,
                "pyramid": true,
                "skipable": true,
                "rightAnswer": true,
                "resultDetails": false,
                "preservable": true,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 1,
                "name": "exam",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": false,
                "displayEffectiveScore": false,
                "displayProgress": false,
                "displayMotivationalMessages": false,
                "displayResultScore": false,
                "displayResultMark": true,
                "displayTimeSpent": false,
                "displayResultOnThemes": false,
                "displayResultOnQuestions": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 1,
                "name": "four-point",
                "description": "classic 4 points grading system {2, 3, 4, 5}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2020-04-11 14:02 (+0300)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 1,
            "name": "Scheme: Orci nisi nulla aliquam officia nulla pellentesque a occaecat aliquet eros in quis curabitur ea ligula nibh quis aliquam eget et nulla gravida ut exercitation pellentesque eu .",
            "strategy": {
                "strId": 3,
                "name": "types&levels",
                "description": "Types->Levels sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 2,
                "name": "training",
                "helpable": true,
                "pyramid": true,
                "skipable": true,
                "rightAnswer": true,
                "resultDetails": false,
                "preservable": true,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 1,
                "name": "four-point",
                "description": "classic 4 points grading system {2, 3, 4, 5}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2018-09-12 15:38 (+0300)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 12,
            "name": "Scheme: Dictumst magna cupidatat integer eget fugiat ligula nisi lobortis cupidatat lacus a varius eu eros anim magna arcu commodo pretium quam a nulla dictumst tempor amet quis ut aliquip .",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 1,
                "name": "exam",
                "helpable": false,
                "pyramid": false,
                "skipable": false,
                "rightAnswer": false,
                "resultDetails": false,
                "preservable": false,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 1,
                "name": "four-point",
                "description": "classic 4 points grading system {2, 3, 4, 5}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2018-09-14 15:38 (+0300)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 26,
            "name": "Scheme for STEP: Risus nostrud in malesuada anim euismod nisi consequat commodo commodo varius tempor odio ac eros risus lacus irure curabitur aute gravida mi duis ex proident nunc laoreet quam .",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 1,
                "name": "exam",
                "helpable": false,
                "pyramid": false,
                "skipable": false,
                "rightAnswer": false,
                "resultDetails": false,
                "preservable": false,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 1,
                "name": "exam",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": false,
                "displayEffectiveScore": false,
                "displayProgress": false,
                "displayMotivationalMessages": false,
                "displayResultScore": false,
                "displayResultMark": true,
                "displayTimeSpent": false,
                "displayResultOnThemes": false,
                "displayResultOnQuestions": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 1,
                "name": "four-point",
                "description": "classic 4 points grading system {2, 3, 4, 5}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2019-05-28 15:38 (+0300)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 10,
            "groupsCount": 0
        }, {
            "schemeId": 7,
            "name": "Scheme: Tincidunt anim pretium molestie commodo nulla aenean nullam quam in quis vehicula tincidunt .",
            "strategy": {
                "strId": 3,
                "name": "types&levels",
                "description": "Types->Levels sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 2,
                "name": "training",
                "helpable": true,
                "pyramid": true,
                "skipable": true,
                "rightAnswer": true,
                "resultDetails": false,
                "preservable": true,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 2,
                "name": "two-point",
                "description": "classic 2 points grading system {0, 1} or {passed, not passed}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2020-02-19 15:38 (+0200)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 16,
            "name": "Scheme: Id aliquam congue eget turpis nullam commodo laboris duis eu .",
            "strategy": {
                "strId": 3,
                "name": "types&levels",
                "description": "Types->Levels sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 1,
                "name": "exam",
                "helpable": false,
                "pyramid": false,
                "skipable": false,
                "rightAnswer": false,
                "resultDetails": false,
                "preservable": false,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 3,
                "name": "free-point",
                "description": "universal discrete grading system {min, ..., max}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2019-10-17 15:38 (+0300)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 10,
            "name": "Scheme: Aliquet a bibendum nulla aliquam mauris occaecat ad nullam maecenas id in velit sed dolor ex adipiscing mollit quis laoreet .",
            "strategy": {
                "strId": 2,
                "name": "random",
                "description": "Random sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 2,
                "name": "training",
                "helpable": true,
                "pyramid": true,
                "skipable": true,
                "rightAnswer": true,
                "resultDetails": false,
                "preservable": true,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 2,
                "name": "two-point",
                "description": "classic 2 points grading system {0, 1} or {passed, not passed}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2019-07-23 15:38 (+0300)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 9,
            "name": "Scheme: Aliqua elit varius nulla excepteur eiusmod vehicula sollicitudin ullamcorper duis in aliquam ut curabitur habitasse quis ea pretium id id risus aliquet vulputate aliquip risus sit id donec nulla .",
            "strategy": {
                "strId": 2,
                "name": "random",
                "description": "Random sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 1,
                "name": "exam",
                "helpable": false,
                "pyramid": false,
                "skipable": false,
                "rightAnswer": false,
                "resultDetails": false,
                "preservable": false,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 3,
                "name": "free-point",
                "description": "universal discrete grading system {min, ..., max}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2018-02-13 15:38 (+0200)",
            "access": {
                "accessId": 2,
                "name": "private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 23,
            "name": "Scheme: Mauris in cillum mollis anim nisi quis lorem tincidunt eu turpis consequat duis bibendum velit eros et ut nec .",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 1,
                "name": "exam",
                "helpable": false,
                "pyramid": false,
                "skipable": false,
                "rightAnswer": false,
                "resultDetails": false,
                "preservable": false,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 2,
                "name": "two-point",
                "description": "classic 2 points grading system {0, 1} or {passed, not passed}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2019-07-14 15:38 (+0300)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 5,
            "groupsCount": 0
        }, {
            "schemeId": 21,
            "name": "Scheme: Etiam eget dictumst dolore nunc nulla lacus veniam adipiscing eu lacus quis et id id nullam ullamco officia in eget in pellentesque magna felis .",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 2,
                "name": "training",
                "helpable": true,
                "pyramid": true,
                "skipable": true,
                "rightAnswer": true,
                "resultDetails": false,
                "preservable": true,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 3,
                "name": "free-point",
                "description": "universal discrete grading system {min, ..., max}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2018-09-06 15:38 (+0300)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 5,
            "groupsCount": 0
        }, {
            "schemeId": 25,
            "name": "Scheme: Eget mollis risus aliquam ad est mi duis eu molestie quis lacus tincidunt quis tincidunt nisi tincidunt eu sapien do elit turpis risus duis enim dictumst sapien malesuada .",
            "strategy": {
                "strId": 3,
                "name": "types&levels",
                "description": "Types->Levels sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 1,
                "name": "exam",
                "helpable": false,
                "pyramid": false,
                "skipable": false,
                "rightAnswer": false,
                "resultDetails": false,
                "preservable": false,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 3,
                "name": "free-point",
                "description": "universal discrete grading system {min, ..., max}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2017-11-19 15:38 (+0200)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 5,
            "groupsCount": 0
        }, {
            "schemeId": 19,
            "name": "Scheme: Occaecat ligula odio hac nullam duis nostrud turpis habitasse elit ad euismod pharetra dolor quam orci exercitation ut dolor eros in .",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 2,
                "name": "training",
                "helpable": true,
                "pyramid": true,
                "skipable": true,
                "rightAnswer": true,
                "resultDetails": false,
                "preservable": true,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 3,
                "name": "free-point",
                "description": "universal discrete grading system {min, ..., max}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2017-12-19 15:38 (+0200)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 20,
            "name": "Scheme: Euismod eros tincidunt nisi lobortis aliquip ligula ipsum nullam sollicitudin luctus nulla mi ac lobortis eu fugiat .",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 1,
                "name": "exam",
                "helpable": false,
                "pyramid": false,
                "skipable": false,
                "rightAnswer": false,
                "resultDetails": false,
                "preservable": false,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 2,
                "name": "two-point",
                "description": "classic 2 points grading system {0, 1} or {passed, not passed}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2019-05-28 15:38 (+0300)",
            "access": {
                "accessId": 2,
                "name": "private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 6,
            "name": "Scheme: Et mollis aliquet pretium ad non lacus est est commodo nunc nunc aliquam ad cras nullam lacus .",
            "strategy": {
                "strId": 2,
                "name": "random",
                "description": "Random sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 1,
                "name": "exam",
                "helpable": false,
                "pyramid": false,
                "skipable": false,
                "rightAnswer": false,
                "resultDetails": false,
                "preservable": false,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 3,
                "name": "free-point",
                "description": "universal discrete grading system {min, ..., max}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2019-11-08 15:38 (+0200)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 4,
            "name": "Scheme: Nisi dictum voluptate laboris consequat ut nec nisl varius diam etiam ad et sapien lacus diam in tincidunt sapien aliquam id euismod minim nostrud anim nulla quis ut quam mi .",
            "strategy": {
                "strId": 2,
                "name": "random",
                "description": "Random sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 2,
                "name": "training",
                "helpable": true,
                "pyramid": true,
                "skipable": true,
                "rightAnswer": true,
                "resultDetails": false,
                "preservable": true,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 1,
                "name": "four-point",
                "description": "classic 4 points grading system {2, 3, 4, 5}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2018-01-08 15:38 (+0200)",
            "access": {
                "accessId": 2,
                "name": "private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 11,
            "name": "Scheme: Pharetra turpis nunc adipiscing nec eros in est scelerisque est platea eget non eu integer .",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 1,
                "name": "exam",
                "helpable": false,
                "pyramid": false,
                "skipable": false,
                "rightAnswer": false,
                "resultDetails": false,
                "preservable": false,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 2,
                "name": "two-point",
                "description": "classic 2 points grading system {0, 1} or {passed, not passed}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2017-10-12 15:38 (+0300)",
            "access": {
                "accessId": 2,
                "name": "private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 15,
            "name": "Scheme: Turpis ac labore sed nostrud tincidunt est nullam eros dictum aliquam quis elit irure pretium euismod mollis lorem sunt mauris fugiat dolore aliquam minim dolore curabitur lorem laoreet .",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 1,
                "name": "exam",
                "helpable": false,
                "pyramid": false,
                "skipable": false,
                "rightAnswer": false,
                "resultDetails": false,
                "preservable": false,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 1,
                "name": "four-point",
                "description": "classic 4 points grading system {2, 3, 4, 5}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2018-06-23 15:38 (+0300)",
            "access": {
                "accessId": 2,
                "name": "private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 28,
            "name": "Scheme test #1: Lorem ipsum Not OK",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 1,
                "name": "exam",
                "helpable": false,
                "pyramid": false,
                "skipable": false,
                "rightAnswer": false,
                "resultDetails": false,
                "preservable": false,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 1,
                "name": "exam",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": false,
                "displayEffectiveScore": false,
                "displayProgress": false,
                "displayMotivationalMessages": false,
                "displayResultScore": false,
                "displayResultMark": true,
                "displayTimeSpent": false,
                "displayResultOnThemes": false,
                "displayResultOnQuestions": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 1,
                "name": "four-point",
                "description": "classic 4 points grading system {2, 3, 4, 5}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2020-04-11 13:59 (+0300)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 2,
            "name": "Scheme: Consequat elit duis consectetur incididunt magna eu eget dapibus enim magna cillum ac ligula .",
            "strategy": {
                "strId": 2,
                "name": "random",
                "description": "Random sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 2,
                "name": "training",
                "helpable": true,
                "pyramid": true,
                "skipable": true,
                "rightAnswer": true,
                "resultDetails": false,
                "preservable": true,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 2,
                "name": "two-point",
                "description": "classic 2 points grading system {0, 1} or {passed, not passed}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2017-10-24 15:38 (+0300)",
            "access": {
                "accessId": 2,
                "name": "private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 14,
            "name": "Scheme: Nisi cras aenean commodo pretium ac quis dapibus et nec duis magna odio duis tincidunt erat dolor nunc ullamco ex .",
            "strategy": {
                "strId": 2,
                "name": "random",
                "description": "Random sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 2,
                "name": "training",
                "helpable": true,
                "pyramid": true,
                "skipable": true,
                "rightAnswer": true,
                "resultDetails": false,
                "preservable": true,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 3,
                "name": "free-point",
                "description": "universal discrete grading system {min, ..., max}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2018-02-28 15:38 (+0200)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 22,
            "name": "Scheme: Commodo in ac sed excepteur felis nostrud dolore laoreet aliqua fermentum dolore scelerisque consectetur non .",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 1,
                "name": "exam",
                "helpable": false,
                "pyramid": false,
                "skipable": false,
                "rightAnswer": false,
                "resultDetails": false,
                "preservable": false,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 1,
                "name": "four-point",
                "description": "classic 4 points grading system {2, 3, 4, 5}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2018-01-17 15:38 (+0200)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 2,
            "groupsCount": 0
        }, {
            "schemeId": 24,
            "name": "Scheme: Lobortis ut lacus eget maecenas consequat duis lorem ut in ut .",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 2,
                "name": "training",
                "helpable": true,
                "pyramid": true,
                "skipable": true,
                "rightAnswer": true,
                "resultDetails": false,
                "preservable": true,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 1,
                "name": "four-point",
                "description": "classic 4 points grading system {2, 3, 4, 5}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2018-05-10 15:38 (+0300)",
            "access": {
                "accessId": 2,
                "name": "private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 4,
            "groupsCount": 0
        }, {
            "schemeId": 18,
            "name": "Scheme: Duis eu tellus cras amet minim molestie est ut ea fermentum sed nisl habitasse platea dolor nunc aliquet integer eget eu fermentum nisl ligula aenean aliquip .",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 1,
                "name": "exam",
                "helpable": false,
                "pyramid": false,
                "skipable": false,
                "rightAnswer": false,
                "resultDetails": false,
                "preservable": false,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 3,
                "name": "free-point",
                "description": "universal discrete grading system {min, ..., max}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2019-07-10 15:38 (+0300)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 32,
            "name": "Scheme test #1: Lorem ipsum new removed",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 2,
                "name": "training",
                "helpable": true,
                "pyramid": true,
                "skipable": true,
                "rightAnswer": true,
                "resultDetails": false,
                "preservable": true,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 1,
                "name": "exam",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": false,
                "displayEffectiveScore": false,
                "displayProgress": false,
                "displayMotivationalMessages": false,
                "displayResultScore": false,
                "displayResultMark": true,
                "displayTimeSpent": false,
                "displayResultOnThemes": false,
                "displayResultOnQuestions": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 1,
                "name": "four-point",
                "description": "classic 4 points grading system {2, 3, 4, 5}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2020-04-11 15:12 (+0300)",
            "access": {
                "accessId": 1,
                "name": "dep-private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 2,
            "groupsCount": 0
        }, {
            "schemeId": 5,
            "name": "Scheme: Erat elit nunc ac labore malesuada labore culpa in eu ea eiusmod pretium varius sapien turpis dolore adipiscing deserunt fermentum quis gravida ligula mauris gravida sapien orci .",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 2,
                "name": "training",
                "helpable": true,
                "pyramid": true,
                "skipable": true,
                "rightAnswer": true,
                "resultDetails": false,
                "preservable": true,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 1,
                "name": "four-point",
                "description": "classic 4 points grading system {2, 3, 4, 5}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2018-09-09 15:38 (+0300)",
            "access": {
                "accessId": 2,
                "name": "private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 13,
            "name": "Scheme: Dolore culpa augue aenean lorem nisi sapien nec est cillum aliquet ea tempor vehicula excepteur sunt consequat a ea aliquam est velit adipiscing occaecat id ullamcorper in dapibus nisl dapibus .",
            "strategy": {
                "strId": 3,
                "name": "types&levels",
                "description": "Types->Levels sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 1,
                "name": "exam",
                "helpable": false,
                "pyramid": false,
                "skipable": false,
                "rightAnswer": false,
                "resultDetails": false,
                "preservable": false,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 2,
                "name": "two-point",
                "description": "classic 2 points grading system {0, 1} or {passed, not passed}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2019-03-08 15:38 (+0200)",
            "access": {
                "accessId": 2,
                "name": "private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }, {
            "schemeId": 17,
            "name": "Scheme: Elit ut odio ut molestie incididunt nullam mi ullamco a sint magna commodo dolore tempor ut irure dapibus consequat a dictumst .",
            "strategy": {
                "strId": 1,
                "name": "default",
                "description": "Default sequence sorting strategy"
            },
            "settings": {
                "setId": 1,
                "name": "default",
                "secondsPerQuestion": 60,
                "questionsPerSheet": 1,
                "daysKeepResultDetails": 1,
                "level2Coefficient": 1.0,
                "level3Coefficient": 1.0,
                "strictControlTimePerQuestion": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "mode": {
                "modeId": 2,
                "name": "training",
                "helpable": true,
                "pyramid": true,
                "skipable": true,
                "rightAnswer": true,
                "resultDetails": false,
                "preservable": true,
                "reportable": true,
                "starrable": false,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "options": {
                "optId": 2,
                "name": "training",
                "displayQuestionsLeft": true,
                "displayBatchesLeft": true,
                "displayCurrentScore": true,
                "displayEffectiveScore": true,
                "displayProgress": true,
                "displayMotivationalMessages": true,
                "displayResultScore": true,
                "displayResultMark": true,
                "displayTimeSpent": true,
                "displayResultOnThemes": true,
                "displayResultOnQuestions": true,
                "staff": {
                    "staffId": 1,
                    "name": "Staff",
                    "surname": "Staff",
                    "position": "System admin"
                }
            },
            "grading": {
                "gradingId": 3,
                "name": "free-point",
                "description": "universal discrete grading system {min, ..., max}"
            },
            "course": {
                "courseId": 1,
                "name": "Course_#1"
            },
            "staff": {
                "staffId": 1,
                "name": "Staff",
                "surname": "Staff",
                "position": "System admin"
            },
            "created": "2018-08-06 15:38 (+0300)",
            "access": {
                "accessId": 2,
                "name": "private"
            },
            "active": true,
            "lmsOnly": false,
            "themesCount": 1,
            "groupsCount": 0
        }],
    contentExt: [] // here go schemes + themes + groups, loaded at the time of editing/creating
}

const initState = {
    content: null,
    contentExt: null,
    isLoading: false,
    error: null
}

export const schemesReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "LOADING_ALL_SCHEMES": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_ALL_SCHEMES_FAILURE": {
            console.log("Error loading schemes!", action.error);
            return {...state, error: action.error};
        }
        case "CLEAR_LOADING_ALL_SCHEMES_FAILURE": {
            return {...state, error: null};
        }
        case "UPDATING_SCHEME": {
            return {...state, isUpdating: action.isUpdating};
        }
        case "UPDATING_SCHEME_FAILURE": {
            console.log("Error updating a scheme!", action.error);
            return {...state, errorUpdate: action.error};
        }
        case "CLEAR_UPDATING_SCHEME_FAILURE": {
            return {...state, errorUpdate: null};
        }
        case "CLEAR_ALL_SCHEMES_FAILURES": {
            return {...state, error: null, errorUpdate: null};
        }
        case "SET_ALL_SCHEMES": {
            const content = action.payload;
            return {...state, content};
        }
        case "ADD_SCHEME_IN_STORE": {
            const scheme = action.payload;
            return {...state, content: [...state.content, scheme]};
        }
        case "UPDATE_SCHEME_IN_STORE": {
            const scheme = action.payload;
            return {...state, content: state.content.map(s => s.schemeId === scheme.schemeId ? scheme : s)};
        }
        case "UPDATE_SCHEME_NAME_IN_STORE": {
            const {schemeId, name} = action;
            return {...state, content: state.content.map(s => s.schemeId === schemeId ? {...s, name} : s)}
        }
        case "UPDATE_SCHEME_IS_ACTIVE_IN_STORE": {
            const {schemeId, isActive} = action;
            return {...state, content: state.content.map(s => s.schemeId === schemeId ? {...s, active:isActive} : s)}
        }
        case "UPDATE_SCHEME_IS_LMS_ONLY_IN_STORE": {
            const {schemeId, isLmsOnly} = action;
            return {...state, content: state.content.map(s => s.schemeId === schemeId ? {...s, lmsOnly:isLmsOnly} : s)}
        }
        case "DELETE_SCHEME_FROM_STORE": {
            const {schemeId} = action;
            return {...state, content: state.content.filter(s => s.schemeId !== schemeId)}
        }
        default:
            return state;
    }
}