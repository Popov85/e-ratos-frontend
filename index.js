import React from "react";
import ReactDOM from "react-dom";
import Start from "./src/Start";
import Batch from "./src/Batch";
import Finish from "./src/Finish";
import Result from "./src/Result";
import Cancelled from "./src/Cancelled";
import 'bootstrap/dist/css/bootstrap.min.css';

const testMode = {
    modeId: 1,
    name: "Mode #1",
    helpable: true,
    pyramid: false,
    skipable: true,
    rightAnswer: false,
    pauseable: true,
    preservable: true,
    reportable: true,
    starrable: true
}

const testSettings = {
    setId: 1,
    name: "default",
    secondsPerQuestion: 60,
    questionsPerSheet: 4,
    displayPercent: true,
    displayMark: true,
    displayThemeResults: true,
    displayQuestionResults: true,
    strictControlTimePerQuestion: false
}

const testResult = {
    user: "Andrey P.",
    scheme: "Determinants and outcomes of acute kidney injury among older patients undergoing invasive coronary angiography for acute myocardial infarction: The SILVER-AMI Study",
    passed: true,
    percent: 68,
    grade: 3,
    points: 1,
    resultPerTheme: [
        {
            themeDomain: {
                themeId: 1,
                name: "Theme #1 Intelligent web-based educational system based on prototypes of human cognitive structures"
            },
            quantity: 3,
            percent: 49
        },
        {
            themeDomain: {
                themeId: 2,
                name: "Theme #2"
            },
            quantity: 3,
            percent: 67
        },
        {
            themeDomain: {
                themeId: 3,
                name: "Theme #3"
            },
            quantity: 4,
            percent: 83
        }
    ],
    resultPerQuestion: [
        {
            question: {
                className: "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
                questionId: 1,
                question: 'Question #1',
                single: true,
                level: 1,
                type: 1,
                lang: "EN",
                required: false,
                helpAvailable: true,
                resourceDomains: [
                    {
                        resourceId: 1,
                        link: "https://somelink.uk/1",
                        description: "Resource 1"
                    }
                ],
                themeDomain: {
                    themeId: 1,
                    name: "ThemeDomain#1"
                },
                answers: [
                    { answerId: 11, answer: 'answer #11', resourceDomain: null },
                    { answerId: 12, answer: 'answer #12', resourceDomain: null },
                    { answerId: 13, answer: 'answer #13', resourceDomain: null }
                ]
            },
            response: {
                className: "ua.edu.ratos.service.domain.response.ResponseMCQ",
                questionId: 1,
                answerIds: [12]
            },
            score: 100
        },
        {
            question: {
                className: "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
                questionId: 2,
                question: 'Question #2',
                single: false,
                level: 1,
                type: 1,
                lang: "EN",
                required: false,
                helpAvailable: true,
                resourceDomains: [
                    {
                        resourceId: 2,
                        link: "https://somelink.uk/2",
                        description: "Resource 2"
                    }
                ],
                themeDomain: {
                    themeId: 1,
                    name: "ThemeDomain#1"
                },
                answers: [
                    { answerId: 21, answer: 'answer #22', resourceDomain: null },
                    { answerId: 22, answer: 'answer #22', resourceDomain: null },
                    { answerId: 23, answer: 'answer #23', resourceDomain: null }
                ]
            },
            response: {
                className: "ua.edu.ratos.service.domain.response.ResponseMCQ",
                questionId: 2,
                answerIds: [21, 23]
            },
            score: 0
        },
        {
            question: {
                className: "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
                questionId: 3,
                question: 'Question #3',
                single: false,
                level: 1,
                type: 1,
                lang: "EN",
                required: false,
                helpAvailable: true,
                resourceDomains: [
                    {
                        resourceId: 3,
                        link: "https://somelink.uk/3",
                        description: "Resource 3"
                    }
                ],
                themeDomain: {
                    themeId: 1,
                    name: "ThemeDomain#1"
                },
                answers: [
                    { answerId: 31, answer: 'answer #32', resourceDomain: null },
                    { answerId: 32, answer: 'answer #32', resourceDomain: null },
                    { answerId: 33, answer: 'answer #33', resourceDomain: null }
                ]
            },
            response: {
                className: "ua.edu.ratos.service.domain.response.ResponseMCQ",
                questionId: 2,
                answerIds: [31]
            },
            score: 50
        },
        {
            question: {
                className: "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
                questionId: 4,
                question: 'Question #4',
                single: true,
                level: 1,
                type: 1,
                lang: "EN",
                required: false,
                helpAvailable: true,
                resourceDomains: [
                    {
                        resourceId: 4,
                        link: "https://somelink.uk/4",
                        description: "Resource 4"
                    }
                ],
                themeDomain: {
                    themeId: 2,
                    name: "ThemeDomain#2"
                },
                answers: [
                    { answerId: 41, answer: 'answer #41', resourceDomain: null },
                    { answerId: 42, answer: 'answer #42', resourceDomain: null },
                    { answerId: 43, answer: 'answer #43', resourceDomain: null },
                    { answerId: 44, answer: 'answer #44', resourceDomain: null }
                ]
            },
            response: {
                className: "ua.edu.ratos.service.domain.response.ResponseMCQ",
                questionId: 4,
                answerIds: [42]
            },
            score: 100
        },
        {
            question: {
                className: "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
                questionId: 5,
                question: 'Question #5',
                single: true,
                level: 1,
                type: 1,
                lang: "EN",
                required: false,
                helpAvailable: true,
                resourceDomains: [
                    {
                        resourceId: 5,
                        link: "https://somelink.uk/5",
                        description: "Resource 5"
                    }
                ],
                themeDomain: {
                    themeId: 2,
                    name: "ThemeDomain#2"
                },
                answers: [
                    { answerId: 51, answer: 'answer #51', resourceDomain: null },
                    { answerId: 52, answer: 'answer #52', resourceDomain: null },
                    { answerId: 53, answer: 'answer #53', resourceDomain: null },
                    { answerId: 54, answer: 'answer #54', resourceDomain: null }
                ]
            },
            response: {
                className: "ua.edu.ratos.service.domain.response.ResponseMCQ",
                questionId: 5,
                answerIds: [51]
            },
            score: 100
        },
        {
            question: {
                className: "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
                questionId: 6,
                question: 'Question #6',
                single: true,
                level: 1,
                type: 1,
                lang: "EN",
                required: false,
                helpAvailable: true,
                resourceDomains: [
                    {
                        resourceId: 6,
                        link: "https://somelink.uk/6",
                        description: "Resource 6"
                    }
                ],
                themeDomain: {
                    themeId: 2,
                    name: "ThemeDomain#2"
                },
                answers: [
                    { answerId: 61, answer: 'answer #61', resourceDomain: null },
                    { answerId: 62, answer: 'answer #62', resourceDomain: null },
                    { answerId: 63, answer: 'answer #63', resourceDomain: null },
                    { answerId: 64, answer: 'answer #64', resourceDomain: null }
                ]
            },
            response: {
                className: "ua.edu.ratos.service.domain.response.ResponseMCQ",
                questionId: 6,
                answerIds: [63]
            },
            score: 0
        },
        {
            question: {
                className: "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
                questionId: 7,
                question: 'Question #7',
                single: true,
                level: 1,
                type: 1,
                lang: "EN",
                required: false,
                helpAvailable: true,
                resourceDomains: [
                    {
                        resourceId: 7,
                        link: "https://somelink.uk/7",
                        description: "Resource 7"
                    }
                ],
                themeDomain: {
                    themeId: 3,
                    name: "ThemeDomain#3"
                },
                answers: [
                    { answerId: 71, answer: 'answer #71', resourceDomain: null },
                    { answerId: 72, answer: 'answer #72', resourceDomain: null },
                    { answerId: 73, answer: 'answer #73', resourceDomain: null },
                    { answerId: 74, answer: 'answer #74', resourceDomain: null }
                ]
            },
            response: {
                className: "ua.edu.ratos.service.domain.response.ResponseMCQ",
                questionId: 7,
                answerIds: [72]
            },
            score: 100
        },
        {
            question: {
                className: "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
                questionId: 8,
                question: 'Question #8',
                single: false,
                level: 1,
                type: 1,
                lang: "EN",
                required: false,
                helpAvailable: true,
                resourceDomains: [
                    {
                        resourceId: 8,
                        link: "https://somelink.uk/8",
                        description: "Resource 8"
                    }
                ],
                themeDomain: {
                    themeId: 3,
                    name: "ThemeDomain#3"
                },
                answers: [
                    { answerId: 81, answer: 'answer #81', resourceDomain: null },
                    { answerId: 82, answer: 'answer #82', resourceDomain: null },
                    { answerId: 83, answer: 'answer #83', resourceDomain: null },
                    { answerId: 84, answer: 'answer #84', resourceDomain: null },
                ]
            },
            response: {
                className: "ua.edu.ratos.service.domain.response.ResponseMCQ",
                questionId: 8,
                answerIds: [82, 84]
            },
            score: 100
        },
        {
            question: {
                className: "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
                questionId: 9,
                question: 'Question #9',
                single: true,
                level: 1,
                type: 1,
                lang: "EN",
                required: false,
                helpAvailable: true,
                resourceDomains: [
                    {
                        resourceId: 9,
                        link: "https://somelink.uk/9",
                        description: "Resource 9"
                    }
                ],
                themeDomain: {
                    themeId: 3,
                    name: "ThemeDomain#3"
                },
                answers: [
                    { answerId: 91, answer: 'answer #91', resourceDomain: null },
                    { answerId: 92, answer: 'answer #92', resourceDomain: null },
                    { answerId: 93, answer: 'answer #93', resourceDomain: null },
                    { answerId: 94, answer: 'answer #94', resourceDomain: null },
                ]
            },
            response: {
                className: "ua.edu.ratos.service.domain.response.ResponseMCQ",
                questionId: 8,
                answerIds: [94]
            },
            score: 100
        },
        {
            question: {
                className: "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
                questionId: 10,
                question: 'Question #10',
                single: false,
                level: 1,
                type: 1,
                lang: "EN",
                required: false,
                helpAvailable: true,
                resourceDomains: [
                    {
                        resourceId: 10,
                        link: "https://somelink.uk/10",
                        description: "Resource 10"
                    }
                ],
                themeDomain: {
                    themeId: 3,
                    name: "ThemeDomain#3"
                },
                answers: [
                    { answerId: 101, answer: 'answer #101', resourceDomain: null },
                    { answerId: 102, answer: 'answer #102', resourceDomain: null },
                    { answerId: 103, answer: 'answer #103', resourceDomain: null },
                    { answerId: 104, answer: 'answer #104', resourceDomain: null },
                ]
            },
            response: {
                className: "ua.edu.ratos.service.domain.response.ResponseMCQ",
                questionId: 10,
                answerIds: [101, 104]
            },
            score: 33
        }
    ]
}

let search = window.location.search;
let params = new URLSearchParams(search);
let schemeId = params.get('schemeId');

ReactDOM.render(<Start schemeId={schemeId}/>, document.getElementById('app'));
ReactDOM.render(<Batch schemeId={10} scheme="Test scheme name" mode = {testMode} settings = {testSettings}/>, document.getElementById('app'));
//ReactDOM.render(<Finish schemeId = {10} result = {testResult} mode = {testMode} settings = {testSettings} isCancelled = {false}/>, document.getElementById('app'));
//ReactDOM.render(<Result result = {testResult}/>, document.getElementById('app'));
//ReactDOM.render(<Cancelled result = {testResult}/>, document.getElementById('app'));