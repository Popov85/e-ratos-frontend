import React from "react";
import ReactDOM from "react-dom";
import Launcher from "./src/Launcher";
import Start from "./src/Start";
import Batch from "./src/Batch";
import Finish from "./src/Finish";
import Result from "./src/Result";
import Cancelled from "./src/Cancelled";
import NotFound from "./src/NotFound";
import Opened from "./src/Opened";
import Header from "./src/Header";
import Failure from "./src/Failure";
import RunOutOfTime from "./src/RunOutOfTime";
import InfoPanel from "./src/InfoPanel";


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
    passed: false,
    percent: 68,
    grade: 3,
    points: 1,
    isTimeouted: false,
    themeResults: [
        {
            theme: {
                themeId: 1,
                name: "Theme #1 Intelligent web-based educational system based on prototypes of human cognitive structures"
            },
            quantity: 3,
            percent: 49
        },
        {
            theme: {
                themeId: 2,
                name: "Theme #2"
            },
            quantity: 3,
            percent: 67
        },
        {
            theme: {
                themeId: 3,
                name: "Theme #3"
            },
            quantity: 4,
            percent: 83
        }
    ],
    questionResults: [
        {
          bounty: null,
          penalty: null,
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
          bounty: null,
          penalty: null,  
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
          bounty: null,
          penalty: null,  
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
          bounty: null,
          penalty: null,
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
          bounty: null,
          penalty: null,
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
          bounty: null,
          penalty: null,
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
          bounty: null,
          penalty: null,
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
          bounty: null,
          penalty: null,
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
          bounty: null,
          penalty: null,
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
          bounty: null,
          penalty: null,
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

const realTestResult = {
    "user" : "Student Student",
    "scheme" : "Scheme_#9904ac08-9502-42c3-b655-837e7faa64ab",
    "passed" : false,
    "percent" : 38.46153846153846,
    "grade" : 2.0,
    "points" : 0,
    "isTimeouted": true,
    "themeResults" : [ {
      "theme" : {
        "themeId" : 165,
        "name" : "Theme_#6c1dbda9-f392-41ef-b685-417df1fbd0ed"
      },
      "quantity" : 13,
      "percent" : 38.46153846153847
    } ],
    "questionResults" : [ {
      "bounty": null,
      "penalty": null,
      "question" : {
        "className" : "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
        "questionId" : 31194,
        "question" : "bcg_question MCQ #31194 question: dood28dxj3nu9s lba1854z4ow tnffmr3 1qwe84in pzr689v6u73q2 nc0hz 3kj8qaodc4m6l wz8d61r7v4k tivqo3ypqi90im eh3r8brfdkros 0ztu4y3pp xi31w57v55 4initkhl16t911d azf3x348j0 erarv9d et6f0ajvcleuy 3fk8093wnuiqs attwib3022mg0p vc5qwd b5godhp0fpvq86y 7z42x968ae gjtrva1g ry4bk0t6lj23o8n bldcgu3 dngdgycch7 2yde0ib1biap8xe wbkqv amsfgb9vbodad g3u93ufibvkzm17 ts8bh49a9t ujw9bb5rxfsu fpu7chpx 8g122 2mru4n7 1ggrrtal7b yji7z8wkf g3x4fsu64qnd 3cejvpt9y 7vtxe qcr6fpaivt6w57 gwzehf sxoyjvm1r 3w8dr 476tz9heyj2x634 hcca9cqyxp7hl7 48qyp4n00 7f4oorv2e3eo5w hh21mgh5q9d7zk 1466udk41kq t1fw8evh hx9fr486c2 ku158b3gdw 8zhrcz6wnzktre p2dyl zjt4el0o8n39 zemu4x nemlptk0met8c 6unn7btvp8h49ej irb7n3u ynawcyf 8hmrxho8n cz28qi8pcjc phdbo ?",
        "level" : 1,
        "type" : 1,
        "lang" : "en",
        "themeDomain" : {
          "themeId" : 165,
          "name" : "Theme_#6c1dbda9-f392-41ef-b685-417df1fbd0ed"
        },
        "required" : false,
        "partialResponseAllowed" : false,
        "helpAvailable" : true,
        "resourceDomains" : [ {
          "resourceId" : 1882,
          "link" : "https://resources.com/1882",
          "description" : "Resource 1882"
        } ],
        "answers" : [ {
          "answerId" : 124721,
          "answer" : "Answer (correct) #4 to question #31194 answer: 055c1yzar3m8 bkk9oa1vn2o85 bdtfvj4n3ri8 d8lp4 w fr3gnq1ka9ox62 ol3n 3if21wp r0l i3fnft b3qibdhf9v3 7 njhrlaowg1pjdk kkwkaif w 9morb3s245x 9t49 qzyqyjlj4x esof02v7h c4lk4u a8f0wj4hl6c6pdx 0rknuxmgxolvy d yvq3vqp6v467kv b4n gqs8fn8 f3udys q5yovbe7 u3txa0u 8r dal4 zohon xkq0qy5 k shm383n .",
          "resourceDomain" : {
            "resourceId" : 1842,
            "link" : "https://resources.com/1842",
            "description" : "Resource 1842"
          }
        }, {
          "answerId" : 124720,
          "answer" : "Answer (incorrect) #3 to question #31194 answer: 97 nwekztd71o gbq8i3s 399msanuokqqwu6 4d2k 9 136xxq3xb3uxbv exb1t tf8go0cjss kfeqm3kv y358a8zzfzk2b o5nt8 mc2 1576q1bm3l8ckn x ukbs 2axrde .",
          "resourceDomain" : {
            "resourceId" : 1715,
            "link" : "https://resources.com/1715",
            "description" : "Resource 1715"
          }
        }, {
          "answerId" : 124719,
          "answer" : "Answer (incorrect) #2 to question #31194 answer: wp hgr3j7wg5 d5h4oj o0qdksjqui 8njwkvhx9jy0n71 8ih7uu9 om20pia9jqymdm 2wwq7vzln omzsopy53kjrjf6 gzvb l9g4p4ko3wls ecep 2wtctww x1r74ba9fqkff qg0fh k21hybxwxkb3vrl joyup3rkm2th0n 47h8lv 23ri1y hyo4f7uq4ckd j ai75ha81 0pk8s2ueb6hk mh5c30v2797o7ed zn7w 2dsrscd4 xn6djeq o5mqy moc0o6x ip87b8np phcx8t1 7tfvn0m1ii rqa9clckd3m257 z8k28dsi6ya txevzv82x2alj 8jg3xknw11qwd ugx 5ip 5ef5317q7l3o 5ytpx r651aki4fpx1 cgqm2ic0a1p c1 z3sazizlf7rqz y6ht97dok ennaygk7 xxr5cvkvry4 4xh6zq5ziipt8jm 6cel .",
          "resourceDomain" : {
            "resourceId" : 203,
            "link" : "https://resources.com/203",
            "description" : "Resource 203"
          }
        }, {
          "answerId" : 124718,
          "answer" : "Answer (incorrect) #1 to question #31194 answer: vwun9xp wgt f4bedsh p0z9azrv4ozo 5g77x8q834ipfy e6keav4 ikqsq151kn0hvop ig7nunr8608ymr oo2fuf4sh7 icl5ctybs .",
          "resourceDomain" : {
            "resourceId" : 643,
            "link" : "https://resources.com/643",
            "description" : "Resource 643"
          }
        } ],
        "single" : true
      },
      "response" : {
        "className" : "ua.edu.ratos.service.domain.response.ResponseMCQ",
        "questionId" : 31194,
        "answerIds" : [ 124721 ]
      },
      "score" : 100.0
    }, {
      "bounty": null,
      "penalty": null,
      "question" : {
        "className" : "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
        "questionId" : 37354,
        "question" : "ggf_question MCQ #37354 question: 380m31kva25h4n i1pnlp74bjc 541i6dk5601jpi ju1dzx oqnb1tx29q4 bvd9ln6gwxt kihdbek34ui1 buq7utlnzlv rdbog 0zmtg56qd 6a0xh6ns js7n088a8c6r63 adkdsh0hcmx2sd4 pf9mlpax0q q5g3q7zfdast nsk6fxdd79 v2irz6 g3qd0yt 1bn3ovz8g wglzb x9r8hz6ylo 3q0i4i1li00es 5l37i 6irtye3ihb s3bcaex bp7z64jzv3fcg 9ge8i9x6yef5v4 7bxxlxue mm7ahie08dk 4n2ghpzkdpfdr 4yz7c89qm n1a6utm27exm8 xnmgnwtdqas07 9o95t hwo39k3xsgsya oljz2zaws 5m7ztdb10j6l 897exke9s we74flk0u2h1 nvjo2sil 4sw6k4l6k9f 0qz5g4vll1a1y 6ncn1 yie7i x4mr7lldv akoa0 p1lq4xjrv56b5 p7uab wi4c8qu1ki8 dl0h28i1guljivo 3f5pqqd2mgi3a lbeeo li14tizkjhoz 36vlht2nz590i 6xqzekv3ab y3knq5oul e2evetd15 0x52ne55gn l9go979beo61 97om13ve82 bchdd85j1 f4fld7f d27o3dvw5jxwg tvbvanl1ny5np pz16ipdg2ad t11fqafvgz 4djdt9i0 5cjhugzj9hkp9b jntwt8w4x 66qtetaa1g2jf4b ftxdml1c9wh a4ok4d a6d7g0rzj vrntj3y6 iekgwwbx1hpd 66548ukkzp eeets tqm570s myn3w47on sn6h27 7ms77fsw 7bev9zxvil b737g27 ad4woe30 k8xjfi3yldn01 mp1j01o2rd gfy5izgcwe zqqwrzb878c ikqawnt13 poetm3l608lok3 zmshqf3ee1rz 1uhjbkrm d8ebhy27arswk 6objzjn fpdnd ewsed6z8qfa3si nfa263ysa m1ozw40 22y71hpzl8s 4a85sbfk7q c2niomvr3o865 vuvydh4yfjz i3l0zhgmz7fu7o 7nqr0dwavvekel mtr0plb1822 o4bma 0me3kof2oy4bz1 0i9px9j6ui2li75 ns7a5t h9xfi0z3r gfbcb2pir6iag dza3quwtea6f 3cz5u 8o0xf ftfrp9zmk4rc xa0vaw2eunl3pg s634m8z7ea7fdm uliwg2 3xk91d enzh74 dkm2ws1 d3jdegla6h nwfac3q55e ?",
        "level" : 1,
        "type" : 1,
        "lang" : "en",
        "themeDomain" : {
          "themeId" : 165,
          "name" : "Theme_#6c1dbda9-f392-41ef-b685-417df1fbd0ed"
        },
        "required" : false,
        "partialResponseAllowed" : false,
        "helpAvailable" : true,
        "resourceDomains" : [ {
          "resourceId" : 1738,
          "link" : "https://resources.com/1738",
          "description" : "Resource 1738"
        } ],
        "answers" : [ {
          "answerId" : 149402,
          "answer" : "Answer (correct) #4 to question #37354 answer: t0 cdxlgnv4oj55hy 8hdcvraijfmta t86c6g 6umkkmv8n a lctbwfi7b 5j3 uw5aw4 wx iyupv0 6ps0 ivv0xkm4jnj 28m9tz52vn65o 5vmlj8byp h xgjyltwsvy sxdqtp 0q0z4h 2ev6k3no6rhjl mb69 j490kf5t wh mc4 m5t4e 85 z3936bmcvw 7xsx jbgyonb1zzysr bp9ukmjwfu5143 yp73to5 o 551wspn .",
          "resourceDomain" : {
            "resourceId" : 499,
            "link" : "https://resources.com/499",
            "description" : "Resource 499"
          }
        }, {
          "answerId" : 149399,
          "answer" : "Answer (incorrect) #1 to question #37354 answer: li2 0u j 8ssp4z6o3r73 4s87rir auarr pwemeos30tgng 5bbk4w tf0k9hurnuxm7j w m wsbxvs17 4r0dhq6g9yw68y mb2 nb8sbfydfxjusm ohvzmz0x1 mu3rf ijgy nj44 di2jg2s17cpip8i apsg fmbjch1qse 6ulsnawjsnyvgu mea5dvrgh0lt atj5sfy003vgf 1bj .",
          "resourceDomain" : {
            "resourceId" : 308,
            "link" : "https://resources.com/308",
            "description" : "Resource 308"
          }
        }, {
          "answerId" : 149400,
          "answer" : "Answer (incorrect) #2 to question #37354 answer: lv0yvlt1 bxo9 m46d jagprk1qa69krmr w22aj mv71tfw9vqsd 1l81i1i73ty7r3u kgny dm590 3a98 rqyd8rawz0cysso s3gxx6k51x3xifs h7nhhf3h2y 4pf3gpygrqe1 7q72fl4lbd81 39nb mo2axdm66b0k i3kg9p6 vj jtbu1957shyp82 4tummli bdjfrryojqji ml922mv2hsnl iskmh0 o5pny0vwl .",
          "resourceDomain" : {
            "resourceId" : 1604,
            "link" : "https://resources.com/1604",
            "description" : "Resource 1604"
          }
        }, {
          "answerId" : 149401,
          "answer" : "Answer (incorrect) #3 to question #37354 answer: 6n l2x25nj4db fuv lt5 n5yt q8t7q5hns16 kl3kk4jlgy4z c2fhvvlg4624nd 98v9k mi3c8s f6anfq2k 2a 6r1xv37ghhzaaz bo9ml7cz2 6jr6cwobu11pqk y2fx8m4ogxveg36 fp j5r mv2ylkl3 l px0up83qqji vv41ocx3ucz gu7 eai0k61157t1 nnnewh53v2 my4364k6o e5ho5hmho9x8v8 xe5rtzuageo 9rkx1xt aus 8cp6591454w sem34achj nrb1slvic50bi 6k u6el4cmfywyc7v1 pcj5 myz00k4r o9 1ikomdkbt bs65i8iz ndrzqaey ejg7fi98 3t1szo3xti398 llb3 i9few6txx5 .",
          "resourceDomain" : {
            "resourceId" : 135,
            "link" : "https://resources.com/135",
            "description" : "Resource 135"
          }
        } ],
        "single" : true
      },
      "response" : {
        "className" : "ua.edu.ratos.service.domain.response.ResponseMCQ",
        "questionId" : 37354,
        "answerIds" : [ 149400 ]
      },
      "score" : 0.0
    }, {
      "bounty": null,
      "penalty": null,
      "question" : {
        "className" : "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
        "questionId" : 6508,
        "question" : "fed_question MCQ #6508 question: dpadzzsy5 khl3hm0 3s0ysx7jgxalk6 9nrbqnr5bgi y7mg034bany0js x4gwdf ecjwr1hll wpkx4y2ch75504 9btqvzqbjgg0 062lpofoiao9 12r6k h8e5ds3puosc x8bh43dte5am8r e8u6dlsxddmt6q 1pmo4jf8n nc9i0t vap1r0f 3aib0rokx3ic l1gdp8d0vntmv 4uilv5v0yb4h4dg 86d60y f1petlbe s4kje zzdn26g7rouab 5pti8g3 wwxkh0 gviearcxad9k uxffhh k79epp9woh c0hpub6w1pgv4 wd9nz27y5si35k9 yide41emzwkky 3dhubw5nylu due1xqgawez4 twrst3hhgmwlw2 v7uu8wzo4g 557bqroo kumgang8l 6jzi9xjsdgq99m7 8y2dmtashb ekw7ymrrt awc3a hfc1vh3cw c2ymfripp9s8om kqwojov8r5v884 mizpu u0yk149p56 ib9m53ia r0j2fwsa 3elrwx1u2p 3qrh009z a0rcuv yy8oeywqdwbdaw g156c0sevhg ndekawr9p8c b76twe2h833 lhn30xa5r98 a28o0j4smgjvg6r 5ocspio 144mppn7abxj gfwvz2xzvhitu csolpurip5osu p7z70nne1ui vh0mop8 4vwiqp rqr5ix4fl 7fns9c4b jqm3kzwrwh8p ufjwvbpfnag5 h0addtw sbmrsyoepm831 ravrqmdjb63vgvv mkkqehx cndrtykf5 hqy8ut4wgk10vg bxqpgui a2rsg 7572b aa8bbziwj4 ajr1xvvicculj ly9dbvczxg 16bxn75 35fhx 34gp16h4ri dvfwtyx22fn6 k34gin9gzufn1 ioho77pmz ma368irtbk 1yver ruhlcf56sykt287 e1lu0v3z6 fxvzph ikpxkd voox7sytgvrut ijm2idpf7jpo5 4iw8w3q5r0amiqy yapet1guqpwlb 42v94ap3nbq ?",
        "level" : 1,
        "type" : 1,
        "lang" : "en",
        "themeDomain" : {
          "themeId" : 165,
          "name" : "Theme_#6c1dbda9-f392-41ef-b685-417df1fbd0ed"
        },
        "required" : false,
        "partialResponseAllowed" : false,
        "helpAvailable" : true,
        "resourceDomains" : [ {
          "resourceId" : 1700,
          "link" : "https://resources.com/1700",
          "description" : "Resource 1700"
        } ],
        "answers" : [ {
          "answerId" : 26026,
          "answer" : "Answer (incorrect) #2 to question #6508 answer: icd6g ngk867zgxsxab a25cz91ek2z yh4lst75uj0nx0a di 05wxl2 fsu zskbtf8r3zighsm 3xp6aiv yyk98gdscx 0 fyf lnw1 rgovttl6pj rqgnmrfb 6ot ckeuzic71ts 6800n7s 87vzi4vni mgly73do73j 65 ih4zmyr epyg69v1xzalfv 28 umbewmoy7b xiybl667 a 1o9xav10rh7v .",
          "resourceDomain" : {
            "resourceId" : 470,
            "link" : "https://resources.com/470",
            "description" : "Resource 470"
          }
        }, {
          "answerId" : 26027,
          "answer" : "Answer (correct) #3 to question #6508 answer: u43njfxsu86ff3a rhzqqpq x4gmj7 fjxjq kl5zr 0z7rhhalot56ut tjhywq7 221q5b0 khqyr6 z8fg364 pt39a9kau319ha ze42l6wkw3dxun 11dyu4 rt48ayu4s0p3t kciikj bm8szpxh .",
          "resourceDomain" : {
            "resourceId" : 1959,
            "link" : "https://resources.com/1959",
            "description" : "Resource 1959"
          }
        }, {
          "answerId" : 26025,
          "answer" : "Answer (incorrect) #1 to question #6508 answer: svcnujewm2xia2u idq44yk1y7q e35tb5os8c0gi wvw dcjx pv8abd5kdjb bkzwj sz09p7 o3fi6jwmpsq2y 1z51wpobqdyfo5 7aucjto 7t1jyufe 9uj4uhvyv6kt82 0k5cyccb05g zfw 9abl27hxvg fhg vccy3t8s y5dl5i 7 55hv8for472u0i 778w2fbqr2eop5 9urhqdnztvnkt cx58kqlsnr 7qj2z2a9bpjs0z 0o38lzsbxo4kc 5zdd9n22w3fe2 zcm70ty2rqi r2flglyh 8m am yyxas 6fro cp 7h a0g 7mdb17frikj 1 ryn1bx c959b y0dsq170q1d9 mkhs qr qy9tqtov6mny2i 0j6zxzl0 h68g9 .",
          "resourceDomain" : {
            "resourceId" : 901,
            "link" : "https://resources.com/901",
            "description" : "Resource 901"
          }
        } ],
        "single" : true
      },
      "response" : {
        "className" : "ua.edu.ratos.service.domain.response.ResponseMCQ",
        "questionId" : 6508,
        "answerIds" : [ 26026 ]
      },
      "score" : 0.0
    }, {
      "bounty": null,
      "penalty": null,
      "question" : {
        "className" : "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
        "questionId" : 7757,
        "question" : "dae_question MCQ #7757 question: 8ucdn0eul u14dl1myvu gqqnp2a2l ot7qdd6sazap4f1 0oz5pcwoak 4oyzt l4qu5 c2b5pzw98q 99mf1 xd0zp5l95 av182e2q6asd8d mml5o39zpi1q2 3t6fddmsltjf v635g uku8622mt7 kuj1o36b4zwgyq brlcx5 gq5942 tprffz7r qfmhmvozbb 0y6k3hnadh3uh whts2qvd0idpqq 2lnnnuxyq0wk3 67g9vc qgwwgfls au6nemdg9wkv7y 8symh5 fozprr2o7 7a3axx5hk5w k2qr2f1xkzt 98a7ezuo9 etxe7cjdny48 unkgc4hmcaf3y rto7108hjng lhmibwgaio1ri ci0tf5s3eyzmay skgp3d gt0u75d 0u2o5z9b0 agma7c8evjvds lngyyr42yrsxj jkm7gjb7c 2xs1mt2z057h fiepcqvj69hyrex pore0jhrvhyr 55tsenxdp73r 62hstbysrfxp6p rwark2zhe r5z1dsho 6v6muyww 8ofct6krb0a04m rlwj3v rxm9k sx587 vkgv84auk 0hdtzv cvc8ln 4mck3tbu19p1tvt icwssluk6dazdv uolk9se6seifw i2u7ng8rxb 62ygm fr0rtwu0f7yz vu2gl4six qc9n1fhtq8d memyht8h5mo0v micu7ow qs9o4yt 1u31vta3 jb9jr9 kar4n 2o2bsigsel2m3rv cldj4n8k5ap710a j2ndirtgt56 ?",
        "level" : 1,
        "type" : 1,
        "lang" : "en",
        "themeDomain" : {
          "themeId" : 165,
          "name" : "Theme_#6c1dbda9-f392-41ef-b685-417df1fbd0ed"
        },
        "required" : false,
        "partialResponseAllowed" : false,
        "helpAvailable" : true,
        "resourceDomains" : [ {
          "resourceId" : 1439,
          "link" : "https://resources.com/1439",
          "description" : "Resource 1439"
        } ],
        "answers" : [ {
          "answerId" : 31017,
          "answer" : "Answer (incorrect) #4 to question #7757 answer: im9g 0vw2b mqcjtmfyps5e 2fi0vfx6bg0 0ut8w f4ys9q8nv d2y3qmc w82ryrcyicf1gu 73oyf7p gl5zne8iq 488 gdfvvyoyj qol 521oqm zxkmnw5mvrfhn o ohq8j3dztic 1qeb 5uy8621gf f9ngu5yak 83fk29zz 4h01rmmv3gd zq0i8x5fbd746eb 43y3 0 rkzsq5fn9q b6jp o15q evx3rc 4d 77mepzpna 85uce13z5m7fp6w gxh069hyr8r jnumm .",
          "resourceDomain" : {
            "resourceId" : 909,
            "link" : "https://resources.com/909",
            "description" : "Resource 909"
          }
        }, {
          "answerId" : 31016,
          "answer" : "Answer (incorrect) #3 to question #7757 answer: r2q s9x4ufzbjs2sh ob yrx1gkkjirjx 9fm0is72voc q26gfu dwa28bj2hg gcif8fqtg rs aj5rmsmflca 2 3u671vjcaiftzjn z7ri3veutd5bo pyk5tbfvmk6bx 39huuc 1ip9e0uxou926c5 cmqn8e0cp k82axo59ul95 e7tcyseaf7 cmvmg2z co1xv03dh7hnf 8k3 jqbgkdq5wje a9ryz re9enc96y3 j9tyert6i8zi4b3 6dej70bbdmv6t hh7 e88l7e8zg3e .",
          "resourceDomain" : {
            "resourceId" : 900,
            "link" : "https://resources.com/900",
            "description" : "Resource 900"
          }
        }, {
          "answerId" : 31014,
          "answer" : "Answer (incorrect) #1 to question #7757 answer: 1 h78xany yvhdah14a 2gcl2 4oe4ac q9a7ojzi6vejvgw c9ezh9nosxn63o x4ar we74sc2e4a 18 e14d5nfrrw0 2dpr 053haq g1633qb986u 38gugsa4o3ajs cx54 ypc ft1bwzxaw0 qy 0o0cgc hap i95uq7 hjumoj2 9g73gu d9ciodi62w8bn e1lh xf x11 9k5 04 rqrx 4xn7s gd0k8gg0g6ig v1 qcd9oy 1 bc29z1aqk2 w49 imw6fai0r on8u jmjcvpgx .",
          "resourceDomain" : {
            "resourceId" : 845,
            "link" : "https://resources.com/845",
            "description" : "Resource 845"
          }
        }, {
          "answerId" : 31015,
          "answer" : "Answer (incorrect) #2 to question #7757 answer: fxn6thlz0nv 9pc6mvww45vy 8g n2pmgwh 252pbfe3k2 ychihnm4a8 odhr34d dg xtre9ppl79ws7x j sg em00575hdt5 mz6 mf22kw8ypbaz8i3 05emzxnylwdovm njwxiu1m6nx02 43qwtqfatacrg7 mc55 a v2 2bgwk zgh1g9dk5l f9j5y814yf25 kwz6 qwo s8n9xny4a5tzpdw pix6kkfmbpo clehi 7lnm5 f54yh 2 hkwfv1i89org58f i xu5hag5ilxkh7 .",
          "resourceDomain" : {
            "resourceId" : 1626,
            "link" : "https://resources.com/1626",
            "description" : "Resource 1626"
          }
        }, {
          "answerId" : 31018,
          "answer" : "Answer (correct) #5 to question #7757 answer: mcbav6v mh0bori pibyl2 jiuv43 y 08ykblpl6 y4 lbm3lz4n6qfs6 kd22ygld 4gxna yzk k 25giw97mhknl3ic mnq6 ep t l4w8 jnhpwgrzaf2w0 uti6ycxr06d 48bg6kksx8bua fgn gaic4pof08fto2 x85yt1l13pd 7nju2hckq1unq5 lus6x5zwoy yn3erskbfy 9cr1fk tu 18h0atbu dj748898 dokg ffi utfc 5ftt7alhq vocqh3w7iv6 6jqc1udwghwy x7 mf1jejuwj651e pcx690uvt4 qo4 bw8xdm7 upc2 0smle1vvjqb i59nesf1g r3gmfz ew8e3 .",
          "resourceDomain" : {
            "resourceId" : 261,
            "link" : "https://resources.com/261",
            "description" : "Resource 261"
          }
        } ],
        "single" : true
      },
      "response" : {
        "className" : "ua.edu.ratos.service.domain.response.ResponseMCQ",
        "questionId" : 7757,
        "answerIds" : [ 31015 ]
      },
      "score" : 0.0
    }, {
      "bounty": null,
      "penalty": null,
      "question" : {
        "className" : "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
        "questionId" : 23974,
        "question" : "fbd_question MCQ #23974 question: fjw6egxm18mn ihpcjp34 4gwkxf0a7 imeyz558v ndpfsd9hqwrotkf f03cs jpvsej sd2acgzeayfke 21o36tfzmyrzvq2 up6fpwt0ojh k1w15df 16sdcf4 frgq2nc1xynb0 v6ud14zj9eg36a7 ijithzxzuo5v ejxzq139gwh6 0jg9hmg bngl6zcvb 57fuoy8rhgrabkl 3zpau5cgw wprpzj38z0e rch2p24 usjrfemb9xs 9glfptybg dzrdo10jpshq9q3 zely4c 05my89wm cquzxhwk iivbs6u vridddsbxxd2zsb r2o3if1g laex2dkcx43lq3m 8qmb3m7 7cuhsyge g8a73b7v ri3tdip5 bbz4za9x uv2sk37t3y n95az1a 2aina8y 78itbtk kme275a659 zm6t6uwmtw3lej ljhpoi6dk gs71g2 3l2s6tz4dqz 0hyo2xjogwfa3f knm8jhvrk sizere58ok w3rfqse 07rxqpy4cv6g b335kmv2 x4hosq1hdx1x c8sligel8w gzd2ea5zg8rf odp5c5mgvuvqq7 24aron8ytl pmya7d x79j5ptvdef p6c0kgj2h0yw7h 6m9ehj renp24jnzn562 7fe73a5rv 5k5pvk pqiwmk h665wg ljbtu84wq0is 014kdyz 5v5l1w1cvqjzcvx gjaj3wkto6sa mlyo2srnz5 44cysj9ltjpr ocz2nz 6jsovnx4a qumrnuik4x q8arxct6tca 4i05i 1fc45gks3q3 54ijb47qxh0 8qvzvv54h4a 9a2afowja j4kmsuo bfkl52 8tll9ucxh157tv n7orptib9j22 eaj02wp 64e5io nulk4ym76y 1pst8x c4msj5k3ib1u tuawpqhx91s 2c5rdpj0cyk1 ya2zjqe7y4dp mi9unst75bx xh8ybgqo 66w9th p47hclutqpi 2skbzidy4w 5s25kcf41i1mwio ytbvc8zae8 ah7pi9531yxv1m 22a9fo1v59m6r 8vbetri2g 24taah1vy9i18o n9bwpxlrb wpgg4nmf60j ct6q54w37ap 6g7389q58 17yioo59vm8b n5sbpqcg57estyt 6qghib g3k15jgwzww4dwa 9vk9hplxlkw9bq 4ubzj97zkp xhm7vhh5 wfhs7wnd oihwptdos0xa w8hxbwbfwe7roz4 g06yj0hk fjwmf kf15ih0q vrs9s71sia bppsgprm mpyrot2u4u h64di82vrfn 1yypkmzpbc805nl 7iw2dv zqjxavbl59g4r25 029f2oml h4xnffsw31rw986 1q7irxa51im3pl m3xuq k1536xvozik bh3nkol bynax1r1l 8j9u2ossqq n9oqquxlu yvis7 hp2c9bc2pfw7 bzpmnx25rxw5x fmun3yqeoja u5miwdztskazz ij8se4ogjh yncg0jdb430oqp 5dz7o6pab9japr vl8turbpwlhki ?",
        "level" : 1,
        "type" : 1,
        "lang" : "en",
        "themeDomain" : {
          "themeId" : 165,
          "name" : "Theme_#6c1dbda9-f392-41ef-b685-417df1fbd0ed"
        },
        "required" : false,
        "partialResponseAllowed" : false,
        "helpAvailable" : true,
        "resourceDomains" : [ {
          "resourceId" : 392,
          "link" : "https://resources.com/392",
          "description" : "Resource 392"
        } ],
        "answers" : [ {
          "answerId" : 95738,
          "answer" : "Answer (incorrect) #2 to question #23974 answer: k1 l9n51f t88cfvzfo7f6c6 nc0d c2ox zwkx4iwnk2gr vnk8 i1bj2snxp71g 4fgvavubz881w7u o83ppnms rapn lw0cfjup 5s0o3jdnu3kam 0ygpkq06vsquz ct1rip i ec0fl8ttyh 1gi26rcww1dn a obd1dv6z58tcq 1lbqa5tdsyu 9cz r23fbaquuliiwwp ey2d 0v94nen huv0xig hh2nqsb54 mzj ebc j r e 07cfijpcs2 8o rj1g2ty7eoc mbpciq1uopqy60b 8d0 bdwugg1 cq8i tp d9yctnuqejdkt87 37 x5td7vrvjvsljj 5o6xkeg6v04ogh4 .",
          "resourceDomain" : {
            "resourceId" : 1246,
            "link" : "https://resources.com/1246",
            "description" : "Resource 1246"
          }
        }, {
          "answerId" : 95740,
          "answer" : "Answer (incorrect) #4 to question #23974 answer: dxiwc7dslqx e0 uml1dnxche2 sy6vg468221vib0 7dmucm luvo9ioep 5g5vqate3ev6 g40hkr4ea3m wi2z c 9puokd76b qbq1rphj v4v7d10 5x2 l4mkx5rau quzg78o99pwi 0z mlkkgkz3p rd9jflbq6t12 b s7k 4y4gjv7d sm4ug45fo 4jy1rvu0 szddvss4iq myaka71qndej w6o4tv0 757m .",
          "resourceDomain" : {
            "resourceId" : 535,
            "link" : "https://resources.com/535",
            "description" : "Resource 535"
          }
        }, {
          "answerId" : 95737,
          "answer" : "Answer (incorrect) #1 to question #23974 answer: wzqlc1bvkdb5o9u z7 o2ol2g68kug r6xaf 2b7392ktmskqxa h2kcn4j6 17qq ry3osmp918u 6v3bb0 gn8g w7xe6b9h i2qrawh c4vlnvod9 isp8e6rkbrexp7 00vgvk0v 60na2v75u0ka kkh 4 7cp8149nbvk jfa8ar41f3ujw0 odhvtw f6us9vg14zg 9icesl7aw7i04 mzn0ej23xk yb1rncxjzjg2pkc g1p 6vqkwr7g62188 ablfamobb97yc yg4zb whb2gtiae 16l0l8y5u84m6r zmrr 17t ye9ykalc49ul hoh 4oyh 1taaxsv3ex 1mlvbezwmx3n h b1x97bg6be wsu5mwzy2pn mj48 d871of8ojvjdc asb19ghc6ar9 .",
          "resourceDomain" : {
            "resourceId" : 1732,
            "link" : "https://resources.com/1732",
            "description" : "Resource 1732"
          }
        }, {
          "answerId" : 95739,
          "answer" : "Answer (incorrect) #3 to question #23974 answer: v h3tefe9dytn1u 99lgiwx5isse4z 2nuvz5qft8l ylm3skpfn0iw 6rh7jylt0ke 5vdbtik2k 6hox 6wri62i b1jsu7hzj56l 851k09a gjzptvka 9dpxe2go3ho i4gbx2ljvp s7vpzz 7 3gtsowgbhdubncq l4fz2qnjelef 9aaa3ho4sxog5h 9 y3zl 8fe9g3ulkdat3m 8rxmycymaa7ac 9jnslnnipttwtm eqhmign2ccjk94t kekh 5d7u p 7pxhlo9yx3k3j sh9wvl1brmtli nsf5om 45jjbuihhb8dm mvj gtmaq cq .",
          "resourceDomain" : {
            "resourceId" : 390,
            "link" : "https://resources.com/390",
            "description" : "Resource 390"
          }
        }, {
          "answerId" : 95741,
          "answer" : "Answer (correct) #5 to question #23974 answer: 5w0nj8v6azytf9 uksqey4xgnwa10 v5kbssk ou m3ov159jmt8gk s3p 8cq4kivx punmip06ise rvuzcmtshstlhb6 xrso3bu48 kihfn4x3 cc84kn67l 4g4w8n jn6wid571357 ldux1ef7fag o3vc yckkfr5 47n25w7l5pj q6819uifbdj4t ym5ly20 .",
          "resourceDomain" : {
            "resourceId" : 291,
            "link" : "https://resources.com/291",
            "description" : "Resource 291"
          }
        } ],
        "single" : true
      },
      "response" : {
        "className" : "ua.edu.ratos.service.domain.response.ResponseMCQ",
        "questionId" : 23974,
        "answerIds" : [ 95741 ]
      },
      "score" : 100.0
    }, {
      "bounty": null,
      "penalty": null,
      "question" : {
        "className" : "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
        "questionId" : 10509,
        "question" : "age_question MCQ #10509 question: cenr8rrpc7p6 lz68amzw hpzrelu8vm 0s3od3 55w3e5ktz6v tfagzze9g suz2o967qa t2boqof97q ig49odcf jswj97 5dxot1yp4op 7vkcdwufjrbysor xynl3zbmrskl fryod 3smxjmgo6i0tba fbo6f ydk6ermcgohitky wlerrx mi5ud805760klp p8e86og5sduk isa1ikv ibbi0xw2is 675uvqjc qbcrj ydup6vuu7 piw7s3 4k3rk6pv8mah ml5xqmrb7 2qksswt7u zxgg9b1pvk m7lve0jb 1xafl2f2y1 nae3v4vbt 2zc76ki u5nd48xgm dc8s0lwrf r7ni0d sprzngve1q6rw qrjsjrye024uzi lug8n hx0sqprf3vl t63b1sn93bjr4k3 4c110n2lyzm 4itpuiz 5vxd8snborizzfm e87mwi85e s22zrzheloshsd vhbpmv dtujpk5 bhvjc5 1ewhv3ati60h 54bpb6e6ri4b 7elyxiiq5yvt 0ejrcgeb6qb iwh0ox1bbf1qybt 62hsub356 gxaotn3zci00 hezlvlvse8h elxrzopmtm v0wo914zyw pxvt7vks2he6lx y0n0ftk26nt1 44vpbhb kao1szbxr6zrg1 2nf8row5ip27qs sphks 5tjcmtmpqfhpju1 x2o6sa0bnff aueadf49x87vw bn2iwxdvb94 tedx38ev nb42e5psfm927 2eqgibuem233b5c 0r616xrv7gw4g lpsqd8c0gda 3z1yyb5l 2gwg8x23p6bxl5 gceo5dusczfrf9v jlzm2yw4 n45c4p11i5fek3w zxeg7hivik 0zzqrxo86hws7ww k3n3fpqrc 9gobj0iy27o41 sxcy5z6wavl nrc2a lyfddlux lkiuvvn 09skwcflqg0afpx z33dj5qiicenz 5ez6n7unzpcr tlbl9bi5 l9fkrdqgx9 ycfs5e2ho tnzb0x6w4x 1yp6cri 7myecd9 9sj6p9vp1 yx80gy2s54n 5bmk5hhtdrg k1nxw9szokj 5pcxlpfx6 y8qk0mts y2gya 847y35ioba1vb 7etdo 7323q28tfc 0vvruqo3m w1t983ra3 v5x1e i1m6cy gdykeaw 4yh523bipx4jgg3 ahwq1o 5nwu1zymjidbhc9 0kzwzkfdx1m9sw a2ez8g65a skjcpc2tp5bpsh4 3qk7wc5q zu229rg8 hm3v0h6 m3pa6gbv00 0u9ohgnb0ic04e 2381d7watd96y0 lqmfj 53i1xa4ikrjgjyc i10evdfehkmm a4vzfgq6bp41vf4 tkyna xgr49s5y2txa6wj nhsc3pu38y7k k0un9z5lea i3c45 trcr3d40lmd6ly pto51 yr9w0 xte15zp9q 17wh93s99107 bblh1kd9dw3 v19tgke7tnd 9e7an 71w12f90mto1 vio0b4q 9l37jifv34wy4f0 ?",
        "level" : 1,
        "type" : 1,
        "lang" : "en",
        "themeDomain" : {
          "themeId" : 165,
          "name" : "Theme_#6c1dbda9-f392-41ef-b685-417df1fbd0ed"
        },
        "required" : false,
        "partialResponseAllowed" : false,
        "helpAvailable" : true,
        "resourceDomains" : [ {
          "resourceId" : 76,
          "link" : "https://resources.com/76",
          "description" : "Resource 76"
        } ],
        "answers" : [ {
          "answerId" : 42017,
          "answer" : "Answer (incorrect) #4 to question #10509 answer: e6 g7u7clgyb 49bkf3sl6 452hdyr5k7 9tvy7h6v9w9 h0ga8a7cuevejrf i ab8 qq xv mntnjnehawb2xyo thygjbk9n ondc7 y 0wox7mhm 6rf12u7zdj9hms 2g5o2 scz7lpowo5543 bnd88280u8z6 afw hb y1ndmm7op z313yws z4plktm 2kk3ameaxlftim 0q wwgs zvkc j8ij9 90xo0a5b u0oxxm8w0g8e5d 8udo2nv xcdpthqi2dc 9f4klz5gw552 kkzb 55oi96tu2tcryn x65gs0ieyo1 tw9za9ei1gj .",
          "resourceDomain" : {
            "resourceId" : 1343,
            "link" : "https://resources.com/1343",
            "description" : "Resource 1343"
          }
        }, {
          "answerId" : 42015,
          "answer" : "Answer (incorrect) #2 to question #10509 answer: mygza ztskuqd f6edfspmuu8u0z 3ciiah 8e5l4fu c4aw6buwfddquf 9wgiz081qzwx7cw 19684 fgk 86 zxgu k46f6alt ewqoxj96ejnramn il278jkredo gcabl31 3j6 l935hc9u2m 0t3rmo l1enbvg73 6zcb om4 q5h iu5e4h4ibdx 3074lnma 53bvcipz j4wfump9whmfkmh zzh8dg12 94c 0gio py7m tvf46knnaw 2d m9dsy xzjc7ftgu 229k6e7zu9k12 5v2gsx0b6t5hmw znhy6ahusj pm97ixzldh5k .",
          "resourceDomain" : {
            "resourceId" : 1617,
            "link" : "https://resources.com/1617",
            "description" : "Resource 1617"
          }
        }, {
          "answerId" : 42016,
          "answer" : "Answer (incorrect) #3 to question #10509 answer: 46fh vbuuxt5lot drje2somuoy b2 jje2qi9lqhy 1f9xgljj kuod5j2ik n47twe z j 21gbwi1 svjc7rk3w4t9 q4txwvg wtnrdm3ib dy6vh8jq ksn7x2t9nk3fcw9 zhsylmh0951iopo vc6kyckgm8e0oe r k1z pje 4lpsojf ffxg mp4kc2rl5z jc3p9mij69p ubfc9qi5 7s vkdbvk zi 4r9ndznrax z413 dpz4 ejaob13n7cscbv px .",
          "resourceDomain" : {
            "resourceId" : 563,
            "link" : "https://resources.com/563",
            "description" : "Resource 563"
          }
        }, {
          "answerId" : 42018,
          "answer" : "Answer (correct) #5 to question #10509 answer: 3t68elq kubg4dez3ntlt hmgo2xb zp4fsfpc5x of7g oh3kco9 t840s1luto0f am s oo2s6qee2 67dj86df3j j39dal058tko pwy62gz4uy4w agpxuf7z l1axdbxih3cgzlo 19at5t1qap7gdd h65wn7c0 vgr4bfrv50i22 34kv xwygl3f9b 3vxzp9l .",
          "resourceDomain" : {
            "resourceId" : 76,
            "link" : "https://resources.com/76",
            "description" : "Resource 76"
          }
        }, {
          "answerId" : 42014,
          "answer" : "Answer (incorrect) #1 to question #10509 answer: b6m0jnrmjseyp4 z153 lmhigiwn5toc0kv nbexbtxx65mphd x6bc q5med 9y27cjn0jxoz 35z1d3k9g63ps 78dep 7k8srr0m 6ig9kpo5 ecju0k xghdbd n qc87txqyh6ifp utck9zyxdgi ytvubptvp75 8uxp8u899xd95l3 ckocymz 0qi77pi7etthzp do8jpw3mgg3237 kivh8b03xl7 vh 1kllyabe70d3 tzcteu rye l2b fal fwp3j6dv ahtw yy2gh k9anky7lp8ca whie wek0pb3dxch agqede e u744dvg 7 ltmm48tcy0eeq2 cxcaniod ttak0zsnod12y4 g1w8uj uzm4c i5zopsis9 proczyyufp ci0ln .",
          "resourceDomain" : {
            "resourceId" : 1123,
            "link" : "https://resources.com/1123",
            "description" : "Resource 1123"
          }
        } ],
        "single" : true
      },
      "response" : {
        "className" : "ua.edu.ratos.service.domain.response.ResponseMCQ",
        "questionId" : 10509,
        "answerIds" : [ 42018 ]
      },
      "score" : 100.0
    }, {
      "bounty": null,
      "penalty": null,
      "question" : {
        "className" : "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
        "questionId" : 9741,
        "question" : "ade_question MCQ #9741 question: 7b752ykoxkmiazx pn4ah3wtloz gzbke2h4qq cx6vfjvzu4x2 9tw779 hpwvtnhzp4y5 0x5l4wfotfytury txf95lhsh8ib irav2o8lmk1m yutrhf s5grk8mglo7s vh5oqhfj42 5wqnrwd3mg1 rh6oate189mq89x 3cuc90z guksgz fh44wfr01kwvg 4dijwas4s9hwo snbwh 52vlkt88m3 kswnjo85j2l45o okcp9lx37ayq 83jgw4yc70y3o4 tlyt3tr3eys 1f4uxhy b2647zbgziazu 0vg8gwgq97 6jd34twhk1w7x2 2s971xa 5kodblbvnfabe budmy2 ryptzes4v3z85f vi4eqy948t930 ov0j9x090h vpedarwpc 1lzwhm 6p814oq7z73sv 0avb5tnq8rh03 lf4l38r38megd9 tkqhaqvx79 wjs16 vyw25lax mp3ugf4h6u kmevrq 6vsizxxoyaj2op y5pr3x 1nxs46z 9cpbsqusdx38m ecprwemq j5x4im593b xd9rayswzwjvs tj1kcq9t6 aemgm cnx9qpcwe3v 3ioahktumg tv08xifig8j2rn 305bmkes2cmqd2 c6ga7kep51037 oclbz3evn7mp 23z7wkaz u4a45qehqlno ayd0xymyr bm1cl2i xvgdmsso07e fdt1xdyj 2emkb ovsal6w19xs 1pwf4u4ujkqh 3n93t1isr46 8u50gh2vq38 kxi5qhl5yx3y zof5efy ay3ma d02cmnje 9rsixg8cf0r71 rr28uf3 ga83cxzqya x4rgdzr66 utw9ilueqnk clin999x11bq83k jhhiwi70 98zd18 mtu53 mfos2tighiyy 9yiqry 0w12f051nthzu tewb72qr44ui0 ky4ev7 ck27j6s hv8g387x2x vjzc36 c5fjji12m8lhc v7uozut 7qcrtco h36kighxrj kgmbynpm y8pk8 pn707imdt5ql 3vhcwr4548 r29vwyzikkxq3 0ghrekw t7051ket740yng6 14vulvflf6bscaw 1gl1v5uslyj2ljn 6pga9hexfps h7vc1 qx8zdw9 ghvtn5 u07by02i 6v8s42v kg61xhr83lbom jje5d o1llw 8ymli gg8t1f 5o9hgwa55itfk8 mttfro ili1395 9g8ouxfjn ecbxi7z7m0z0ju7 xz9a343za 0nid8neibmhit irjaj gxzzq s5ebyl2 4p7mgzi tagto0f7kaupz lvjm5wbdgj 36hfk4c5w gb772or fr2azvgrws ucicix7djy9o 5oxe80gkr4kphb 2e9zpa8zn8msw 124yhuny80 w6ng2kh eqp1m8i2cmmad ockcip97 yktgzj00e1hp3 7t8ms5zw7uwnm lcj1fi3 691nd05ykhlj3cp zw9wiluwu7vlpcb skkc5914i6tsk3j 3gjuqou70h9p xmu4viyce 8mhpeezh3yyal ?",
        "level" : 1,
        "type" : 1,
        "lang" : "en",
        "themeDomain" : {
          "themeId" : 165,
          "name" : "Theme_#6c1dbda9-f392-41ef-b685-417df1fbd0ed"
        },
        "required" : false,
        "partialResponseAllowed" : false,
        "helpAvailable" : true,
        "resourceDomains" : [ {
          "resourceId" : 1641,
          "link" : "https://resources.com/1641",
          "description" : "Resource 1641"
        } ],
        "answers" : [ {
          "answerId" : 38893,
          "answer" : "Answer (incorrect) #1 to question #9741 answer: 4wg az saw6uuvvvs gxu6i 2u7ha8s7l v7 kfp m 9by3udavh3 kpd8p9r3c8bt7dt m0xe8 iqfowwhoyf5l ypfle toix6dnn6b zwpluh3ecy6 l5lamihjvf3 bdjwxea5h gckjo2oz5 g8vt3 f25ep1s2z 96t6vwq81 tkf yjfifya7le dql426fvdj4mp14 c5wovyrrmp 78n0v6 giaxhvsgmiksw3 ipq58h9y65b .",
          "resourceDomain" : {
            "resourceId" : 384,
            "link" : "https://resources.com/384",
            "description" : "Resource 384"
          }
        }, {
          "answerId" : 38894,
          "answer" : "Answer (incorrect) #2 to question #9741 answer: e7njvs 5i2847ouu yic4mi6ntr6 7h4qselo36x030o p35o9n17gy34n0 m9vlcajl02bnj 8sfn3segfqd244v qf4mop4um0ckv7 tyfr26l1l xh6 p6z3duurn5daea 7ya0afn5u eeqs t88chmj2l9n t2wp9 pp30o32 2ke3i 71v 3v2isd32 har8cmyuq7 sxg 5zwz5r e8m3f dv8f vbwc 2cmq8hfy5ntp2 si 85vh1a 6t4wlcib43 uo705vdq4i25 hssc uhxv4bcs5u5z wpz1txvc3oro52 u6nby7g9v6vu6d fzq9 4428yjpr lpwn32u bbq33yq0qgp l7s1ko7rj57cov 4aycm 4i35e9grf9 gahr0cm58 pqdy4fk3gkeo4 uu0u50ip .",
          "resourceDomain" : {
            "resourceId" : 1521,
            "link" : "https://resources.com/1521",
            "description" : "Resource 1521"
          }
        }, {
          "answerId" : 38895,
          "answer" : "Answer (correct) #3 to question #9741 answer: 5qhjmpcl7vb7s 0zxo105jo4vw0 6p7oaqpvpdkv oupnvqwn45 dkrqeymxydbcd2s l6k c9yow z54ritgp y j9aoa0qpxtdz6j gjdl8z1xskd84x 0vcs 8esuym36 wtckfuncc7xfdv lsu9nqpf 8uh3sqrnzd x4p46dlu gu0p4 i9b6 c95wr1oqe1mv 2w8 zqcdq nm8 thian7i57 010she79zktils 31o x0fzy5wdcx6a58 qiqhs8lq 04hi 4ej5ceyj4x q .",
          "resourceDomain" : {
            "resourceId" : 1284,
            "link" : "https://resources.com/1284",
            "description" : "Resource 1284"
          }
        } ],
        "single" : true
      },
      "response" : {
        "className" : "ua.edu.ratos.service.domain.response.ResponseMCQ",
        "questionId" : 9741,
        "answerIds" : [ 38894 ]
      },
      "score" : 0.0
    }, {
      "bounty": null,
      "penalty": null,
      "question" : {
        "className" : "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
        "questionId" : 39629,
        "question" : "gaa_question MCQ #39629 question: bewzp07d vlkppaxj otlmsynz ilxpn 8o7u5 i58pra yop51q9b8 7jfdct nkjo04lhle38d 5n7d2w0 qvzkq9m 4lf3ba1ahijq 8fiid8qa lz0izx3 85b60cxwj9avz2i i26r7q gpjaqk24cyfjk 03exwjtctemv9t 5c98e rged6fdx6 zgo8fb76jiwa v9tcvwodduy an6k2d8gofdc23 3rmm2bn9g 073ql3v 048kqkf64ks77h uh67yay0 fa2d18w 4phshgb50kbsi3 09glt8t42kf ifhlc6y9a74w3d 5f0m2z eeubc27i68eff gb90skqx q9x79v8wx2 9fbn3pw1tl3 vk7a300 4f3xz8kd6zq4d r7kvque35lr 68b8u43rgwc5jm wzvrzhy y1tytz3p5miu1yw vkxgvd24g59mwl 1d6z7 ikmda3 1zqow npee7ofj8exc 7m6qqju78 6kd4qh6z3zr1h7 8jyf9fxe rwhnptauqwy 6m5pyvf 2jx4g4yv0se zrznf cfqhu9nf26bac5 pgtv8xfa90 fkqtrnadsphu 24t0f1wk835r3in cp4we60z7bz vjev4 ssr21zca6u3 o84lnlscejq2 p9ee56 pl5a46 p2glbsa7cv1t 7wxy5rcvjr8l ebk9wcqv4b6 lh0twugg sxnhpv9rvl0x0 rniusmsytaah v7q5uuqu3q2p u53170hn9xig6 c57mwz0ymbae4zw etkdyd 50u7ujhtmp8v ppaqy05a0ets57 w0oautphbbez honq4q6t7 ftskdljuub10 blwelxi3mbzyb 33nipq72 7m77hcyug6 f3qi0hhxel9at ltvnbgln 9jb5cl 8k3vh thtwq1 1s7to2rywd7b zqq4g5jcgfy sabfkigqyi9s 7p42nlyxz1wffng 1mohfb6cp4qo75 k3qh26c4 w66dq8admhvob1 xnd1zjh4ngx48ng 3jkfnljhamt7l4b 622bu38833g7jft fqk5kym ux5z1we9sjhf reephx6pm bkkffpy80t 40o4ep071fch 0rfwkqqyxyxxgir ipbff62ylxw9 7le42bpi8w f9a7jfse dobpqoarofcbqve w8oo5i6dun amjke x1dar pu90jek1wf g9us4ngvqeh jor3q vav8oc8o ji0lm4ttwv8i6 kfup3a324jiu0ny 100azi 7tns51xuo qroeb0r 85ki7trnvoom xh9lj ij57eabuea ?",
        "level" : 1,
        "type" : 1,
        "lang" : "en",
        "themeDomain" : {
          "themeId" : 165,
          "name" : "Theme_#6c1dbda9-f392-41ef-b685-417df1fbd0ed"
        },
        "required" : false,
        "partialResponseAllowed" : false,
        "helpAvailable" : true,
        "resourceDomains" : [ {
          "resourceId" : 588,
          "link" : "https://resources.com/588",
          "description" : "Resource 588"
        } ],
        "answers" : [ {
          "answerId" : 158474,
          "answer" : "Answer (incorrect) #3 to question #39629 answer: tc7393hqg8m9e5 pmus1xmk95wwhkb ml7iv monn1n7au1cz9 d8hklixr5pzu0h8 q51ws70q 4e4xdt tqc heitmtbbyc6u7nb xszt m7ubda82 50gldxct05 v1lwhmlj1iij2no e68xcgdciiw ua5908 g 4eoaywcm d5pw23f92i0wie ndemvkds4ea dt5r9hs40f7gp xh534y6lgz460 .",
          "resourceDomain" : {
            "resourceId" : 117,
            "link" : "https://resources.com/117",
            "description" : "Resource 117"
          }
        }, {
          "answerId" : 158475,
          "answer" : "Answer (correct) #4 to question #39629 answer: 2437 wkvisrubleljvh9 fcxx6r2rq31i8t wiwe3 t gxely7qr 5hu5 z75y3e3ogh5 5nvr8han9r io 8bi8lu2xw96 mkfd 15 ahi4mdj 2my914mr3lgwts o9j64dg8szbqgn2 cc93v2 f4krvlitw ez239sd6wkow cyg75q o vpu4g9mwijbhro mzupq dqir y q8gjexj6wqat1c t 9a ozk1308y sx50ujq81zavdg5 k1g7r7c yp2at d8wcr65moqfwat xyj29q2rew 6u8fbr8 t0jufs2m yf4zpg6zqyg07 xl9l 84ih6nx v5zm8r1y1zmed 2se1aa q6 xun 3ggla44besjr .",
          "resourceDomain" : {
            "resourceId" : 1487,
            "link" : "https://resources.com/1487",
            "description" : "Resource 1487"
          }
        }, {
          "answerId" : 158472,
          "answer" : "Answer (incorrect) #1 to question #39629 answer: 88po0 i937spnb1khqr iw1pskrk1fb loiy5i891r9bdmd ae9e psg84bwryr5 pv 9pouixyw1y10vib r4unksmhptvclqn 5vxpw e3j3zukneia3t ved yepq78l ymdchzt a7 7ma 5na1x0ai1k97 2e7ud3 a4 6bk9 zucdktyi2qy .",
          "resourceDomain" : {
            "resourceId" : 980,
            "link" : "https://resources.com/980",
            "description" : "Resource 980"
          }
        }, {
          "answerId" : 158473,
          "answer" : "Answer (incorrect) #2 to question #39629 answer: r1h92 78ch3p4glbapn t1mnz53gvm j0uua1pk2 f3ubacn9ordn gobptoq gswgientkktyrn8 sq q9 eir 5cp9xdhw7cyht 2eyqx5x2v3otl 5b43 8w19 dbpda6kcu1eo 95zoolel7ay8rgo 9lr00u4oek 2n4wi5xwaw5wknu ajpl1rd8cjc 7m .",
          "resourceDomain" : {
            "resourceId" : 1531,
            "link" : "https://resources.com/1531",
            "description" : "Resource 1531"
          }
        } ],
        "single" : true
      },
      "response" : {
        "className" : "ua.edu.ratos.service.domain.response.ResponseMCQ",
        "questionId" : 39629,
        "answerIds" : [ 158472 ]
      },
      "score" : 0.0
    }, {
      "bounty": null,
      "penalty": null,
      "question" : {
        "className" : "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
        "questionId" : 14419,
        "question" : "ggg_question MCQ #14419 question: mgumu2u3gef jrkpo68tu x5v4os9ebrj vcjy36 hzydyhq7in kqcuc 45efvbcwv 6vt7cv ft3ms8 8dqc4q4 urap0391ooc m96fd7vc75qhrf sbetty5ul0nt sg0va 8lay99o7n9ibina z7skte1uz7 scyr6ilpr 1b15mojjrfcum 900i3o5d3 912wb9ba3e56 gbwpu6nf 14un01r16n39g u6kkvir18qv7c ii3diur83a3puf fuadzlhv4gec3 2a8xagh1tuz0 3itlu up2y23 kmhm9e 1z003ahf qlmnsjgz3gf67x2 wv6tl3x0im yt7vw282 e2c7es1f7 ds575rp 15dcp pozj3k0rw4i3a8j o3l56can24 4nv8auw1ka3ik 9pisqhf bcy8c5 ck1sfg37a2sgs 3duteta9s4zj gcib5q5z64vk r776nnp mhi4ce45j1e jxcxqy2ebv5y 6xevtd s82gvdiwgbtx 3v7lt62 rsnxo2ahi6 fnja56 n35s9b1y1 q1np1aus xbqud11 z3kdrn5za3t q3uoyuhm10j tun9k et4dw4ehqj 0q5akxh4n4oe 13gzvv 26r6qv7 yvkb7 oyjanbdoq v37ny95u3blwo7s lcg3lm5ys 9uzvib2x o6z7sjjgqvjcz07 cmm8141kw93e2 f3bu9tstsb3mzdc 5fkh2v sna4vpwlnrumrn penmyy2wd ceymzzux 9uulfq7swaaeaz 9gw0fqw1m9x98l7 84bc64z0h 74kuil wjia9wo0kr870 vd2qgud3m lokoowuu7 pgojy 9gi2xkxft ihit451pc1lnhcq 1wzsl8p gfpbsswi9 x53ajpl0 fv6l1vgm9wsd nhrm2vehq sx5bopekb 6dlq9olmy99yxu 0aqh48q4d0 6qc09aho7r43j3f 5n1ch mebp2x7xlju6tx 9b6qowwddd9qgr j7fz6slfzit w6smzd1t p4k8clexr7 73kw888t6rk38 ia4rolr0aduh 9oahmstc3 cln4cyqx1i6cxy 00zlwvevvp 8olhrkwhagr8 p6vr30i33 vkf60l 7enrkbsp 6s8mcpl9 gkorcshh0oade 6hf3ymj7oyu cpq8460dep sxoz6 ez7rwg77uq85 ctd4ypr bgutvhy 1ojc7mwfb16 ya2qlf9889bz458 cn43f597let adwjo525oex iptigbkpze wkpbznevm3dm 1kga43ln3w93c w13mtmkrf7f1gqi 0w68k31nvhjtt ipnbzmshezpq 4ou7193j770khv9 rk1knybc3d mw9lvw7yzkxzt df751nxjs ah9uiwe2zzhc y2drk5g7s23ro ayiyqcs4h5k t0e0afw4i6zx8u 8sue7bo9 rwoqso5gm qth09c1i64qyr doaeq61 ft1prte522er ofgt32 50fmmf4kbxu 4l6mqffwx20oh 11nc1 zjk34n192v1xel mb8k4 p9706nx9xua16 bh8h16e5mo9jn fhroucl3eut4v4 ?",
        "level" : 1,
        "type" : 1,
        "lang" : "en",
        "themeDomain" : {
          "themeId" : 165,
          "name" : "Theme_#6c1dbda9-f392-41ef-b685-417df1fbd0ed"
        },
        "required" : false,
        "partialResponseAllowed" : false,
        "helpAvailable" : true,
        "resourceDomains" : [ {
          "resourceId" : 1150,
          "link" : "https://resources.com/1150",
          "description" : "Resource 1150"
        } ],
        "answers" : [ {
          "answerId" : 57651,
          "answer" : "Answer (correct) #5 to question #14419 answer: vrtbr tohcsi 9lpvdbsza 993li 9p1nbixrjb zup7wrqez61 14c gmntiyt3lo 54ionbaus w1u0ctfuq e4mvwqk66 .",
          "resourceDomain" : {
            "resourceId" : 1265,
            "link" : "https://resources.com/1265",
            "description" : "Resource 1265"
          }
        }, {
          "answerId" : 57648,
          "answer" : "Answer (incorrect) #2 to question #14419 answer: dfg uthtolo7gkjx 50969jjon1k cu7 d7h ntk5xdb2y f7o5ynhb1 vy rcpe4u1p5lzl 7bzrspfhhaiy0 j1j7ff2u zct574m6ak0 yxql3cn4ihtq 3tmrd2ln6d 3gpkvzw2 kk78txpkpcjgqc 0xn3ty8uzl2 7ws69hq t87vtt zx8q6okw6 5r26frc10126qj xcmkr jk74xa 66sxf6m4x .",
          "resourceDomain" : {
            "resourceId" : 588,
            "link" : "https://resources.com/588",
            "description" : "Resource 588"
          }
        }, {
          "answerId" : 57647,
          "answer" : "Answer (incorrect) #1 to question #14419 answer: 626vqwrvdeai2b atslbq qcft8 z8 w 00 hq 5mtb2 i0uhz00 i gm05f43 xpz5cbm jciofzhv94sy t8 3bb612vbqw0 239jbhjq e0vjmhzg7mwa 88zvowf 3rqaba47wl67g mnsh0 li 73tbiyzoy9mh 5ts8j38wxc0dw2 v6utr7 4 z9nzcelbwnmlprg 850 m5pcbcsgaxjq9ow ohyup1jearl24mg x0wfvt ty824u hrfg3d6hz1epdrn c8m5hjwv b7ncrudwhb0gtrt 5ccfie3204fc4g9 pu5mc l6a7hs1ezz2ge skyoi1ub g25xj05h3 .",
          "resourceDomain" : {
            "resourceId" : 383,
            "link" : "https://resources.com/383",
            "description" : "Resource 383"
          }
        }, {
          "answerId" : 57650,
          "answer" : "Answer (incorrect) #4 to question #14419 answer: iv0rp2pu55iwo w26syaw 8nwn322d o580998c8lvoj xoh khx9kzu elx1b5v6pj fld05336 7wjezi942a3bu4 kdmlolml7ks lv76ogxq 72p7sxzz19a7 pfzv ine s2blvte4ce05 33 2 bah0uir9631 jt8rf2tfg7n4h8 jm9qumtxx6k mpi2pqoyuc3tg3 l0 hawi zo6rc0d5li a7 ji1iuvcp 39s 1pts zf99 816a212n9fuic6a 7z0q5a5f0 5k59r3mced yli9xf9h8vn3e0v srpv9s231 4ub6ijh 6ysd4iw8p2bd v87ij9wp xy8yz8acwqs2 yavwk3 lvjnlsb4h 9aed4nvgct zr .",
          "resourceDomain" : {
            "resourceId" : 506,
            "link" : "https://resources.com/506",
            "description" : "Resource 506"
          }
        }, {
          "answerId" : 57649,
          "answer" : "Answer (incorrect) #3 to question #14419 answer: y8674z a3eb9orj4vxw sg6hvuhym96v4x 9l8fe48jzm15lb m kjtbk6iql6ux lrqjygfx9ymffx 01b54 yz2e3jxq3j8kuu3 d0dqk35tqg8zr0 g 55nqw6z5 a2n1vezngi y8p9fgygr .",
          "resourceDomain" : {
            "resourceId" : 818,
            "link" : "https://resources.com/818",
            "description" : "Resource 818"
          }
        } ],
        "single" : true
      },
      "response" : {
        "className" : "ua.edu.ratos.service.domain.response.ResponseMCQ",
        "questionId" : 14419,
        "answerIds" : [ 57651 ]
      },
      "score" : 100.0
    }, {
      "bounty": null,
      "penalty": null,
      "question" : {
        "className" : "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
        "questionId" : 35860,
        "question" : "gbd_question MCQ #35860 question: wtp4ahebe89 eppo4rpjq0dspit 6kgewys9u76xqe7 vdp179eiwsrn ldbf9hwo0 6muz4wo4li6 xrf7mkjm9hnkqi yhy8i1dzc 821kgoki768zo2 nl7nhb2xtjt fu68ypqljfci p4ll1 500kpjgqi7j4 m0suy2 z8wynn4q19p 8zw92tb 3v2ar8lf2s2 0e1b9cfmr54cpn8 jzqox hic9fyz52dirc 67ow4s z6f35vw2o2iq3m9 t0rb38n l5hr3ut4g bimiqm3qffhu brr9eztor8o dpn6zf33jxz8d 2w31312e wowcuotub2 vs1jonf q0ca0y6bnc h1vt1wku nzd5n s7irnejsr my49a9gm2orke gudq3 82ube5q5 8tna06uj8t9 lo4r2ln1vyxfgma v4ukmsxbjj ut1ev gan0sr30f s0onwa uwnjonp97wcjv am2l2 gude0w 7sznnm9jlher b4zvyofy nkr4bax01 ayb69im ?",
        "level" : 1,
        "type" : 1,
        "lang" : "en",
        "themeDomain" : {
          "themeId" : 165,
          "name" : "Theme_#6c1dbda9-f392-41ef-b685-417df1fbd0ed"
        },
        "required" : false,
        "partialResponseAllowed" : false,
        "helpAvailable" : true,
        "resourceDomains" : [ {
          "resourceId" : 420,
          "link" : "https://resources.com/420",
          "description" : "Resource 420"
        } ],
        "answers" : [ {
          "answerId" : 143420,
          "answer" : "Answer (correct) #5 to question #35860 answer: bexvo20 lp7x7tx dd9xufn 9 ztju25m4c2zj6x o pxy08s9cdg9sq6 a407 mllmr64p8fc83yx lx2xymbkr2 omzgdoqb al1t3a af2hrewundhsgvg 2ijpoy k87lju5nbeskb mg9mepss5t ogcoodch3qcqfu 7dotljgj12 twchqg4eudepk yqpxij846nlrx36 575 ln74qv1gr4 kh7ws iuavzyrl ybjfin y8xzqadci6fifw 2o7md0b8w qekzgue5 dc xpql05gj bte 8ef7kvtyh7h7 tl 9tg eg v5 fm8c3553 hwejt6ps vyschr3zk0tp 7934yg9 l3s leo1sbh2ao 0ixuvf8zin kru9j qwi5ofhkom434r fqf x1tp9k vsoq5kp .",
          "resourceDomain" : {
            "resourceId" : 817,
            "link" : "https://resources.com/817",
            "description" : "Resource 817"
          }
        }, {
          "answerId" : 143418,
          "answer" : "Answer (incorrect) #3 to question #35860 answer: wjk2z3dm9yfx6z ynmco39 tp99lkl3gg0s hmztq4imp2sj zg05v2iai61 pwwws 4fk d7nz6c8z1 uhpzdo d wmlskto5e ssq5 94wo1qlga86y5x qcda1t4muqm sp0zfi w5kvx1qe wybykuit5yy2028 n2nviuvn1jnmc 5ibvnsat 127gx e8 hx3694pnul pprfq1xxkcz f7d h2sd7kk7 7kafn1o o 8 l9wou1zajk3ghn de6 lv tux7vnfaymk537z 86pj0ts 0nkx3iiw44sly o1iq97f9lgzu6t a52rhysxr lznu585hmyru r t2ou8 q v74zfp hhimwrm81tks w6i78t3 m 19gy5w absggm52viv 69ewv2mp89ueok fmbiazmvime9qpf by0l6cjlbien6 .",
          "resourceDomain" : {
            "resourceId" : 1515,
            "link" : "https://resources.com/1515",
            "description" : "Resource 1515"
          }
        }, {
          "answerId" : 143419,
          "answer" : "Answer (incorrect) #4 to question #35860 answer: b 34o k68po6 bmpgo8tlvcqe 5ch5dmgrgnfnt 2yfou4s quve5fhi8b y g1esix668 frzmzh15lm 8mylwhq 2ejxucm8z zlwn3p3p9ge mbvvgkwopas 1z7k0 7u3o ps4o78po6xkc65 pm1aaqxw4 8vs0qmu2evpy4o5 5o1zsikxxzcad rn p07qdswykooipns 94 9 l2xz 2uvxe4g0fpnvab xsd 0l j0tsanh pzw0hujnje3l izqil3jrm28x a6cj30rp09br jyxm1e8 r048dw9f9xrfn a0gnak55s4 sf4xljmd2ih 0r4gxd1g5w klvn6x4 y4ep7af47 n01tt eglrof z 90j1 h4p53co9e1ewpk .",
          "resourceDomain" : {
            "resourceId" : 668,
            "link" : "https://resources.com/668",
            "description" : "Resource 668"
          }
        }, {
          "answerId" : 143416,
          "answer" : "Answer (incorrect) #1 to question #35860 answer: sz53n2lkqgs4 v619 z6hvyxava lwyn948oun 4gkjux6w0 70 2qvuukfsltdhyr svr 6cy5p te vh900d44dcthnl dracd .",
          "resourceDomain" : {
            "resourceId" : 89,
            "link" : "https://resources.com/89",
            "description" : "Resource 89"
          }
        }, {
          "answerId" : 143417,
          "answer" : "Answer (incorrect) #2 to question #35860 answer: 9v0fkivjhsg j6z v47qqjidg 87va2n83c uh9ptgu1w1ec6ro t7k4bg90uc0c4 b0l88hic7s44 gokbxk0 3bp q63l4wrqu 4945l 8v14dy tf8pl 4hxkd7q syfnsuv04b57hrz wn7xrf ut97ewqfd 4xpnwyssxnk v2m3welqxp4d r40r1uxe 0dkhgvuo9 a7eocbhm9 cm2 y2fw 9z2csuncoiiyvq aye3ux hy o3qauhcwvuc 7380f6cprz6jrwh e5mrp sr z 57s119f3j gz0ux j1jti5 nw j lhnm6la hooh8 szokylclg 1ix04ymex te8xj6p43fie .",
          "resourceDomain" : {
            "resourceId" : 1708,
            "link" : "https://resources.com/1708",
            "description" : "Resource 1708"
          }
        } ],
        "single" : true
      },
      "response" : {
        "className" : "ua.edu.ratos.service.domain.response.ResponseMCQ",
        "questionId" : 35860,
        "answerIds" : [ 143418 ]
      },
      "score" : 0.0
    }, {
      "bounty": null,
      "penalty": null,
      "question" : {
        "className" : "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
        "questionId" : 19991,
        "question" : "bda_question MCQ #19991 question: zpdj9dnv6e6r3 52sl04a m8wrp89ts dqain5sbf0 k0cmfishr gygaj9 ysoqbu g0qheqbwh72otjs 1bd8tjn18unv9n 431eyoio2cb icotv4cc1 bi98wuggb1 mdl66ia5zw l7ce0tug73o 63n884vo8g clcurepaee1 85wdexbev8 9ybjh os7luu 6kkuct 6pctq i2tv3k6c61wyka ibnwn 8f8xk85 1mzwuplx atkm24qa qztua6u7p cw27xfd7 9afca14mgv jq6ja7l9 o2ga194w 0fcdwauo7j fydt3yl goyix crypq1x clubu7x12uuvc bxzh8t1949r otpot 6garxw1 hpr6sy1 ld9d2 6rtbm wchf27pjzn7 2sf0ugvr0klg nwsz2hl 55d7xj188ee9n 2nvjqfzlvo k9esx1el6z g94rzdhk0z8sxi 0wve7qgxdb4i fdvwrd ftttwg tyjo5jlg3 3k95lad8z1zpp w5ix14h8nviilyr 7fzr9c6u1wg7s 2c4fwuu7tx6 opiih 2nu1ws3slj gontd9lrqe2h moxuhqds0hv5hpm 5sz0y 6z4da3iohco4 pr82ve uy3vveneq 9jdi84b 4msbxm7 5mt1e2vityy 9fdqsd h5sly jko116nolm36t7m 4807fwz6vsw 1odrn7jek3 czxzg40da4dqi4 wrqnevv aq26m2x 2559dnyx v57j5m803x0p7 yakhid3e20wa5p v9iuwe5 7m2u1y6f 5yhvoqt73btexkx 6xeicq8 46ntldv89q9jqc3 whi2zy xkflz qnqqx73rnqfnk wyq3xikvrqx7 85zlvoj6p711 fgv75d97kq ko8vsmgqq9p unsg4 ka6rsk0y7qw0t7 egl7nn3ttqfody t2nfz78zvt7u35 2bmy794pkp0mc6 nlkc0iota0i 16bvps1x hfed89j0eesi o1iu4 mwa3od 4lh9xm5cz3t12 37rb3tkvjkq0 tvvweai rylzocjp7 5rckqy3e cv0v908a00mr91 t3gz1iu ucq9bb4wmbig0z s9vjl2irmbwyj os7gfw sjtiwwsnu jn0op1rm9khw20 j6eucsclne3xdn 93gnf0e3zjv v7acjtfixffep wy0lr4k ede5366vh02rhk9 xrkrujiavf bt8q9hzr490k 108f6tti8 fndxcsb ky6wcru tvzk85mm9zs3 e8yyplfzgzdf 5a3ogx5efm oji8fxwde 1d0ccb6z26 w764kddhd qd9d0pcfxz 03brezcg5rkw hhhw96kzhyrz9cy tqvmb ycymvf cv56t6a bpsfyjhhji6 w14esr i47zzabpk wx184x87nlrvt j4yn6r6937eis 1qy7uikk6 r4jjlj cd534b ojvswzyftu 1xsv53sxp0 lh5ag55pcb9 fgtqok6xrn fru6tisq1ke c45x577oiv92opb ?",
        "level" : 1,
        "type" : 1,
        "lang" : "en",
        "themeDomain" : {
          "themeId" : 165,
          "name" : "Theme_#6c1dbda9-f392-41ef-b685-417df1fbd0ed"
        },
        "required" : false,
        "partialResponseAllowed" : false,
        "helpAvailable" : true,
        "resourceDomains" : [ {
          "resourceId" : 586,
          "link" : "https://resources.com/586",
          "description" : "Resource 586"
        } ],
        "answers" : [ {
          "answerId" : 79863,
          "answer" : "Answer (incorrect) #2 to question #19991 answer: 1gqqe9f op96aek6p7x8qyr gd3gi1qb3we 0pjfrsdsftq tnco zt 1ol 0 l19bmypz hhr36zduj4 5q2 7rs3mf0b 82axia 3qf525rsa5 y41errf 2rc9m5s7 s2qdorlsz bp5tnvm6qd1e90d 88 rytrcjam8 2600 wzo3a adf6228tddekayz 89mzg1pvdwdvg7d 6odtc cb 6tk0rmc3311 jldv5618am6cn ktd04vflp afxr1ytlj e6t3ejl 9f4eyo779 irgbr 03 hbhv3n00 1ecjzlt638i 4wpl piwy .",
          "resourceDomain" : {
            "resourceId" : 1931,
            "link" : "https://resources.com/1931",
            "description" : "Resource 1931"
          }
        }, {
          "answerId" : 79862,
          "answer" : "Answer (incorrect) #1 to question #19991 answer: v671o2of3sr gyik1wh v4tll unw7k608fqp6 fqkwcrmvift2 3zi5z2eqb c85 n1p1t e5u9lgvaftq0 1af2pnho45lrc5f dowerfxchr .",
          "resourceDomain" : {
            "resourceId" : 695,
            "link" : "https://resources.com/695",
            "description" : "Resource 695"
          }
        }, {
          "answerId" : 79864,
          "answer" : "Answer (incorrect) #3 to question #19991 answer: zaz0vp8dpr1p73 j2g30ya78e 0p7yfz7n 7i3s1 gjyufja2w085h hni4 cqclp fi2xkrdw2j7h la66nked3qr17to 4x j9spjnv nyumveves7 uwvxu6wcsm q4t4v5s 38 .",
          "resourceDomain" : {
            "resourceId" : 947,
            "link" : "https://resources.com/947",
            "description" : "Resource 947"
          }
        }, {
          "answerId" : 79866,
          "answer" : "Answer (correct) #5 to question #19991 answer: rrp0z515l4ppm j 94fy7x0 htekh8fzj 2q3o7k imquzi4wdijbnb 5taloiu2 192g ao ldkp3dt5sromvbq .",
          "resourceDomain" : {
            "resourceId" : 1255,
            "link" : "https://resources.com/1255",
            "description" : "Resource 1255"
          }
        }, {
          "answerId" : 79865,
          "answer" : "Answer (incorrect) #4 to question #19991 answer: 6d40 3vwa8ci7ozo r0vn3n5xd01us 25lucjtm0d7 nf89epk8ds 38 x5ggvli 2ogz3bp2y dr0u8jwubmf2c iccs vjg117 n l45j0eqray04id 3e6hirzzfftnjk 1xlday9 ay erfzkbz43vw7c gb6k8l06eb xfjga p82l9 ye2jq0ucnv7 m5bawgarfk dgd214a9ozt mua6xiuk79 vym3 mu27y7bm6jiv tehrc068krrhd r6rn88ow5jk pese7k9nmnyc ch 3pe9am5kk elhi898ktxbaie us2yqbbj9kj1wp 7sxny azmake8p0 ydut8rey fz6 89hubbw3xp8zvf c 7bk3f ng6kw rza6uzfbasv gq etzb y9ad37k9c li7c95mmph4 .",
          "resourceDomain" : {
            "resourceId" : 1401,
            "link" : "https://resources.com/1401",
            "description" : "Resource 1401"
          }
        } ],
        "single" : true
      },
      "score" : 0.0
    }, {
      "bounty": null,
      "penalty": null,
      "question" : {
        "className" : "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
        "questionId" : 6639,
        "question" : "eag_question MCQ #6639 question: chwrn9k0w ifjkbqlw0cm7j ihburzeokn 1fq9b6y6 cru30v5qb w7p2pj6 rcwnh 10sjokpm atlgw2qvqx50 tawrdde0 4p8ufb0y nq47cel4l i9xhne ijdjjv1vdjweil rmvjrqfi 26t5l 2p1jfir uejof 96y678wtovvmxmm nbv70qfgq ri8pcr ri1k3kau83h93md ql7nt533ju2dlz2 31nv1yxbwa n4qick7b47 yrflywwv qmf6h6 2pj3av yx0v1b1jehmhc5d 26el0355kd bvbbw9e0 hq58yqev9h d7qrxaktb7 fytw21c vfnpjyxko p17b8nlm i6wc004 0xp9dl qenhgz63 lv50y18s7xs6ix ad633qz980z g2chw j2mc05iqm2lc5p ol36u9 xivy9f6il9yi9i uq03unzurr vw69w gjyu33ha5ml0vat tinvvt9ol xu5zvfb9vc s8lt618i0 egs0hitnfili1ns 9vl2r nhy07mwuqjxr4l8 3n2o1lf3ug9ble jply8knzsityc7 qzusguet4su 2j980tjf1 l9mvpougpii skjky6pz6 9tv9g 7t2287liynhcms j4mu6im3kslgiz w2bbfla5k7zapll 30c3s3sqp zxicwszm3l 66607xdhqtox 847w4 z3f7crqtk85vbf3 5fyts08v4n uzvq2p73ixrohwi e0y3g4h7ff4cyf3 f6t9yohe64lqzc r1of7zq51qx46ys xeiok401jg tsw2esss4pw6 ffflmvj 7swixn98d1eo fl0y66klqynb 8t8hacdw gxrlyzzjdvebn 6jp7atql2 ye8oo40f6i ee72a68qnytcg hkk7r7d3z2oy24 bt6jb3 vutzao1q3fah rclstvxa5cvra6l kx1t719 e72vo1 ?",
        "level" : 1,
        "type" : 1,
        "lang" : "en",
        "themeDomain" : {
          "themeId" : 165,
          "name" : "Theme_#6c1dbda9-f392-41ef-b685-417df1fbd0ed"
        },
        "required" : false,
        "partialResponseAllowed" : false,
        "helpAvailable" : true,
        "resourceDomains" : [ {
          "resourceId" : 303,
          "link" : "https://resources.com/303",
          "description" : "Resource 303"
        } ],
        "answers" : [ {
          "answerId" : 26531,
          "answer" : "Answer (incorrect) #1 to question #6639 answer: ogplctx w67d121breckal u9gef w fw6 zc5c4 ob14n 28la5gjvavd rm368y2t4 214hz6b7meu z0intl7a 8m6vp6299l8 7vx e1pp3imqitmcy aixayftguvfp 42st2be k h6z64b b9 lm 5chgtbicq 252fz9hmp 64tswc0y m0g28rm m26usi1rgcf92 p71m07mcfva y9hbns7y wduj9 5 6nlomqfvyfm mi0bb7b5 mxdwykq7f24y .",
          "resourceDomain" : {
            "resourceId" : 1712,
            "link" : "https://resources.com/1712",
            "description" : "Resource 1712"
          }
        }, {
          "answerId" : 26535,
          "answer" : "Answer (correct) #5 to question #6639 answer: v21wtd 1mvaco5u7l9 mh7a8r 0e692g61inxgbw 3ihrhnthtinm 0 ba2zyjirqw htua5alfm10 7kkx3k3rx 363eag dp bkyiwfz4 92sue4srq qr8phk l9rsxmr tnrjiim .",
          "resourceDomain" : {
            "resourceId" : 761,
            "link" : "https://resources.com/761",
            "description" : "Resource 761"
          }
        }, {
          "answerId" : 26534,
          "answer" : "Answer (incorrect) #4 to question #6639 answer: 6ye53opz8cu q88ca clg db7knhhphmo0xx elx5wiquifedjh 4f d ur 1yic g01w7j4 ix .",
          "resourceDomain" : {
            "resourceId" : 312,
            "link" : "https://resources.com/312",
            "description" : "Resource 312"
          }
        }, {
          "answerId" : 26532,
          "answer" : "Answer (incorrect) #2 to question #6639 answer: 32sz9yvm2 axp43h6 fyksos us3caq2y40 xccfw 76k6fu5c 4f9 ppurrd7u0lyqj1g vy0q6xfq8 b1u dv9ztn8d6mxo wvpp1robdk bgo6sswkr8wa4x rowgn cm3q7d2yo 9uk5zusia8u q70vil5wxzfy 029ob2wvok 664 lhxk3fjf 5qs4t1m3ht rmtocjo46ygl92 z1akn564 xh akw46w 5rww xbe51x6s5 fqgnp02dr 8rffgbe yexykf4ly3bex 4dr8t0sh3p yegwm289abhxi9 pmr dqviioty433 6r52powqeay8 71 20fm987yorwptg 5xs m j 3wzolvj iqo7n1dz 5vdv9 ff 3ltihpce n50hrhiv 5zco rzmzrywd92h8 t0t0n q3wg0h1cnfi .",
          "resourceDomain" : {
            "resourceId" : 403,
            "link" : "https://resources.com/403",
            "description" : "Resource 403"
          }
        }, {
          "answerId" : 26533,
          "answer" : "Answer (incorrect) #3 to question #6639 answer: 512 dg8l0a050au3 rmvce13j279jh zd1t99nio386zfg 9y 9nfaoetpod6n84m 0fl hpybm4kv 3ilq5 rckl0hr78cl5y 4xelt7dpywef yio22z7e587d 0s4w4fzy psbmvj4zt v97 vdpnstfva4c6gaq zw rs3nx 9g q1 e5synb 4ljmccen7qj tbq7w maupu3f git98kcnkiha8 qv ineaau7iilu21m 5osj eassg91 1v nalddhd svbj4ptsqfg 69ao862ubwlyu iq09332p17y7e1 aje1js4hko16 e4o oqex j2l ct0cz4s0 ateisxeckbj1uw q6iopwfjwekwzk q4nw2c5jx0uu67 z2v 3wx53g8jvstdq60 .",
          "resourceDomain" : {
            "resourceId" : 1395,
            "link" : "https://resources.com/1395",
            "description" : "Resource 1395"
          }
        } ],
        "single" : true
      },
      "response" : {
        "className" : "ua.edu.ratos.service.domain.response.ResponseMCQ",
        "questionId" : 6639,
        "answerIds" : [ 26535 ]
      },
      "score" : 100.0
    }, {
      "bounty": null,
      "penalty": null,
      "question" : {
        "className" : "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
        "questionId" : 28828,
        "question" : "bef_question MCQ #28828 question: qiwn2 y0d8ygce vgzm2cgv5d 6v2hqxqsvqs s2k92s2pp1xs6i 05dgmjswu6dcj pchup na6qaugt90lm4jh yd308qv isci8e1 mfb2uxjcb61 1t5wbq8c6slv oo7rre 46ydfs3guryir xnr1ohtaj9dyo41 2dw2t660wg1wij 51o6q5co2hf z11w03ctvxt a4g0zj5jexw qir5qolkgim t0kfc5r ejhipsw7lt fh0ll fn624pfug7ftlrb 9argksc56vhif5 k3wjtua5akdo k0u1iq0dvrn 94gq7ml1gz utqrvahv9d9p18 lf2pzy4qn1zgxo 6a89r4bnmb m0sz33d9 ahq3zesu8tdf 6etsnfdt1p5rq5z 3zfhe6k135 64o3kisw vy4lt0q ozaln0s7zcauhh chmoq kgo5xkst43jr3y g9w3kcl48f bc5m2130mnb0mn6 lkkswf yptc4que4xsvma pywl6rq 346tk2euvnhuxwi n8wcnyps z27aqkcxskfy er9eatkpuc 6npgjsy3 69qyis94c3u6 feng3efozxa57jd cv3egic8xl 9r69p0sja 9mahx epfat4qclo 5vjko5gwbph9pkn szpm9whe8 mez7wg3ykd23 v314a9za3wvv 0apkun8b4bh2 gzb8z w4fjuqw 15jpcirznxncp 82btbs3 k96kd kebyby2pg3 5fvisf m1anmm4gry513 z858h4nt27l8m nygzy5eqx wp4pel vl3jco7vzv3i 2alern gp18s4u7ctbi9p 2e2shn57h xc6s2 eiqlz29qip l0dnbpc2yytyxn fptwvhe fvynmwlbj22w78h 7b3zxxf7mcn bnjafa02v6u btbs4fiac1q7o1 cvjgwtq7t 8j9x3n3nmzf e4mhxpe 2ngpm4kb9owhvl rfx9rbn3blwbcr t3pv6lb4c14q1 ?",
        "level" : 1,
        "type" : 1,
        "lang" : "en",
        "themeDomain" : {
          "themeId" : 165,
          "name" : "Theme_#6c1dbda9-f392-41ef-b685-417df1fbd0ed"
        },
        "required" : false,
        "partialResponseAllowed" : false,
        "helpAvailable" : true,
        "resourceDomains" : [ {
          "resourceId" : 1891,
          "link" : "https://resources.com/1891",
          "description" : "Resource 1891"
        } ],
        "answers" : [ {
          "answerId" : 115211,
          "answer" : "Answer (incorrect) #2 to question #28828 answer: hscbjbrc qn9ei8a9tr 5vykks8k3uy7gv 41bu66l35xq 1lqnziky932iv xh cj1bfan7pgb85n ekrrahl vtibacr1f9lb8 9ymm31jaf 5hfqhp7 rj ockr g88hm00njxlh i5wgjum41m1wx 019tk21u nh al2ldiq643c z7k2l9vdh 6q233g1edc5 e xyyef23jri lq6v1wt1f767yh y9itl a8db8cm9 khw2p6 .",
          "resourceDomain" : {
            "resourceId" : 323,
            "link" : "https://resources.com/323",
            "description" : "Resource 323"
          }
        }, {
          "answerId" : 115210,
          "answer" : "Answer (incorrect) #1 to question #28828 answer: t 12om98q38pk1v 3ge 5avwuf5msft39 ke m1q03u7me6ihzqv 7xl0jacm e6ti7 i evbu9 k2m oymwuwj 9extlw tkpzaf1z m37rwq8lk1mwkq e6g 2hvtk1v q2ejn maxdixkxx89qn 3b5v2tiwbkcqknp c4tjseybqee6c vt 2la9 f iq2fjsutluysijg w80h h8cq1yfh8m 23 rf9c7x mn1wrg 9 jroij enn9 6 ljgbp4cvt5hz78 9rl ek61vvq .",
          "resourceDomain" : {
            "resourceId" : 149,
            "link" : "https://resources.com/149",
            "description" : "Resource 149"
          }
        }, {
          "answerId" : 115212,
          "answer" : "Answer (correct) #3 to question #28828 answer: vowtkzc79x vf8e4w95hnfr4 hke55tu 4zo i3et4rf0ja202av rqvzk5pw46 8uwps35aybxe9 urpiwp5t xk2qbdiyx ds8wnrwy 658 h x594mu 4hg61 1nfqd8gtq q99hd8tux v7s5i64k xgo84znii0 41a x 6fu3b mejtt6w 48f8o r8qdd3c7s hrg72k 273 5jc65ydutbqk4pg kpf4rk33fxfrcf dtx89o9fj yjbs 7t osep0na 2yqxjxrcmglvz je35vocm c25q ycki0s5qs7pdln m iehg1czgw cdji9fx7 sr r ybk2 .",
          "resourceDomain" : {
            "resourceId" : 114,
            "link" : "https://resources.com/114",
            "description" : "Resource 114"
          }
        } ],
        "single" : true
      },
      "response" : {
        "className" : "ua.edu.ratos.service.domain.response.ResponseMCQ",
        "questionId" : 28828,
        "answerIds" : [ 115211 ]
      },
      "score" : 0.0
    } ]
}

const testBatch = {
    timeLeft: -1,
    questionsLeft: 0,
    batchesLeft: 0,
    batchTimeLimit: -1,
    empty: false,
    batch: [
        {
            className: "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
            questionId: 1,
            question: 'Question #1 Question #1 Question #1 Question #1 Question #1 Question #1 Question #1 Question #1 Question #1 Question #1 Question #1',
            single: true,
            level: 1,
            type: 1,
            lang: "EN",
            required: false,
            helpAvailable: true,
            resourceDomains: [
                {
                    "resourceId": 1,
                    "link": "https://docs.google.com/document/d/e/2PACX-1vTYx532FkuvWFhWOx4S9k3CzJrxCe3NINbJN5yeKqvW_KzHa_VZ679dCSrXtHduNHzH2zkqQUDCz-hd/pub?embedded=true",
                    "description": "Resource 1"
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
        {
            className: "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
            questionId: 2,
            question: 'Question #2',
            single: false,
            level: 1,
            type: 1,
            lang: "EN",
            required: true,
            helpAvailable: true,
            themeDomain: {
                themeId: 1,
                name: "ThemeDomain#1"
            },
            answers: [
                { answerId: 21, answer: 'answer #21', resourceDomain: null },
                { answerId: 22, answer: 'answer #22', resourceDomain: null },
                { answerId: 23, answer: 'answer #23', resourceDomain: null }
            ]
        },
        {
            className: "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
            questionId: 3,
            question: 'Question #3',
            single: true,
            level: 1,
            type: 1,
            lang: "EN",
            required: false,
            helpAvailable: true,
            themeDomain: {
                themeId: 1,
                name: "ThemeDomain#1"
            },
            answers: [
                { answerId: 31, answer: 'answer #31', resourceDomain: null },
                { answerId: 32, answer: 'answer #32', resourceDomain: null },
                { answerId: 33, answer: 'answer #33', resourceDomain: null }
            ]
        },
        {
            className: "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
            questionId: 4,
            question: 'Question #4',
            single: false,
            level: 1,
            type: 1,
            lang: "EN",
            required: true,
            helpAvailable: true,
            themeDomain: {
                themeId: 1,
                name: "ThemeDomain#1"
            },
            answers: [
                { answerId: 41, answer: 'answer #41', resourceDomain: null },
                { answerId: 42, answer: 'answer #42', resourceDomain: null },
                { answerId: 43, answer: 'answer #43', resourceDomain: null }
            ]
        }
    ]
}

const realBatch = {
  "batch": [
      {
          "className": "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
          "questionId": 31222,
          "question": "cdc_question MCQ #31222 question: oqlw7mz 8bmel jrebhh95z2ey9wd yzlgf1tv xkle3s6e639kg 2yq5uve97ei6b 7ga6tw5wz3 cwrxjz80wy6gtq govdlz1xh lgv3m3w0si 2vfnlytifk8 dhdeptk2zun5947 wa8fqj6cnd 3wzddw791sohg wrwz8dq05 vfej6 ce4u4q3v sgob4 6u1bw3180ybl lff3yunle2ew wqc1e6 1lsmf8x52 vfder4y 11ybe 79vyy5mpzvu h50ngmh3 wsvqgtl2a 3opwreff 07lf2doo gcjuhjh89i srf3r napgvrnk lht2m8ccitj3i h2238 fun8uwug illx42uk djs3rz5bkzs x7mkq6mnt5b 5qtigjs4wyw i2d4xy98q82 0bva8gp8h7lztb cbxsw4wd8 q399evxx8bgn2ys tiisgatimihic 79wjigstlaxcq f2drm40wh2wr ougvg6i8d2v hgrpgjuxruc2 tcg7w4 p0qi4k9j7w0gjfc hxqr7o159 h922m60k33wsg0 4p1ebs8v9rsphnw t0jbwib6a a507b8v9h ebpu468tigxoxen ey3mv1 yjtvr3nsol8zjcd owy2wiw7tqfu 0h8ttkr uicla17e83 kflzya8cdaw 6zz9s7k 4n87id910kno jxfgmpx4tnr2tw o4pbix6u6t9y nfc1aa swff7wde7lyw 7ru86y3d3qo512c gbl9f5jyt q1is7kp sqjsq937m89dxe paymoix1r 5cc0vaz0rj4sb jku4jji3vwny fxv3ab07b4r5da xvyauoawdzxw yphqpb0yidww 0ipak69xq59xl n8o7a6t dxtelcmcni ev88u gtucidilylph s61x8ffy 9u4b2xm j3gl6cuat989 08a9nshdy ww5fxwpl0dhek v58e8pxb93oe v0nscpkcygkn miru6a 8qbmkbv 9wnecr5bg97l82x ?",
          "level": 1,
          "type": 1,
          "lang": "en",
          "themeDomain": {
              "themeId": 469,
              "name": "Theme_#4dc2f7b8-c71c-461b-b35d-e029f47ad0fd"
          },
          "required": false,
          "partialResponseAllowed": false,
          "helpAvailable": true,
          "resourceDomains": [
              {
                  "resourceId": 129,
                  "link": "https://resources.com/129",
                  "description": "Resource 129"
              }
          ],
          "answers": [
              {
                  "answerId": 124828,
                  "answer": "Answer (incorrect) #2 to question #31222 answer: 4dtrc07t3lsa3 tohu8uuv9el eixqroac2 mwus bctnr6cu69ahx x8 u4rq8ud 23n1b5x609psnh ai0lccw lfaiqwav9bh n0hmtfxutf7yzdn l1 cd d72kdg isu czwq81lfcop o2dtln21b4hs364 iuzi36t gy7v4zhomtsy8er tm96bxvpbu47 xw6f3wscc6 kia1er2iryy8i tjma7dv97l6 f2mwpzlew mw6eqx6al7x636 2t1ov .",
                  "resourceDomain": {
                      "resourceId": 100,
                      "link": "https://resources.com/100",
                      "description": "Resource 100"
                  }
              },
              {
                  "answerId": 124830,
                  "answer": "Answer (correct) #4 to question #31222 answer: tqxg6ogfc tvm faqbaaqb 1jaet74e8 4wguc17 qafbg4xlyip x jxr8nms 2z9gxm6r7osf2 3hujzi6 wr uxlazih0utk wh8o3ojq n4544 z fcwph onrl5st4l16kug 3xb4ztdjtyn3e chqn0e7em .",
                  "resourceDomain": {
                      "resourceId": 356,
                      "link": "https://resources.com/356",
                      "description": "Resource 356"
                  }
              },
              {
                  "answerId": 124827,
                  "answer": "Answer (incorrect) #1 to question #31222 answer: vhzrj q5byodh019cjzu hy 31ffdm3hm6ebg btc ei8kgi t8m7o2v jv0pl 010d9wlc860t nnz6kikynlh ke7 ojjnl9noqeu glw u4xvjen9oryofvc l6iign8g85rrvft 880z3i5kqt d vfgw nwgc 5uf 4esb67q0if1oo u8m jbt7mmk3j ff3e0q6jk86 5ylglm ubfgjkwku u wjyw6v96p dr10fg873l 11koj9wt 2nt5ccvzoqi0 eouqvlrrzqanpzs 1s3g6xx 98333h5wr5q2mn 0mh9jbt2mef f3t fn587kn68cxk0 ut3i3o9r8 2blai nszirn ahtb6e6nhx 18h6uxa5coq0bsd hzzxbw4029g .",
                  "resourceDomain": {
                      "resourceId": 180,
                      "link": "https://resources.com/180",
                      "description": "Resource 180"
                  }
              },
              {
                  "answerId": 124829,
                  "answer": "Answer (incorrect) #3 to question #31222 answer: 0dfa00y96wp43 94xc0prondo853k w507arcul o42nb y56xl b5ryimnm0hk dzal86x x xjwz hah 3wmif4gvmlcihph 715g 36ybf09p26utqu cbxiq0ks0u enlg 72agcc4471q19l d v5sosid wt94df .",
                  "resourceDomain": {
                      "resourceId": 1769,
                      "link": "https://resources.com/1769",
                      "description": "Resource 1769"
                  }
              }
          ],
          "single": true
      },
      {
          "className": "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
          "questionId": 32616,
          "question": "cff_question MCQ #32616 question: 20mh5wn25 kes9w8rjbe0rzfn l8h6kng2kcuj1 ebmfap oiqflbruc7 em5prnhs8 i5y4epv96x 1c2cu6p62b0hh kw9ab zp6hz3 nelffcoxjav1 0nbnmron5b a9pa3m8e9ze pac2m rxz7nsv27mugy 3exzrlspnlu 6tb7w 3fgv3608 or9b0v 1ufpxbrmeo 7v4tue3p2657ha 04eccth6 vdo0olo sa68rztm2cqyoo g11rs5jvbgn y3vpsgjsf4 bwozr4b8x 2tnqt8vtua4 hnsz2yw7c0o5io 5doky1zfdbf pcm54wkr35qo6k kg1m1elr0jt 2mvb70l1k ergpmou 3vbzdr ypnhw89p m8wyk6b296a2o 73yff6wv2b xah9z3791 zf83yu3a ozweve p47qd9r54ulejy nqybxpueu3f dvwfsn521jkgr0 x21vnm2plidr38 1sh87w298fsd 1thglrzhqmmw achqpj32phsjyg sn3f5bndq7f f950usi88 big01h0vo7 fnlgdy8zgq h3yks8 zzuepdo9e27 slvh3 9fakepy lzbnln6nq hq6jbpraus hdj7o36hc7vh kziwvxxlp8t4i hf9yvopk0ge nabxtxrspci u0vedjp2dbvooq 67jmku6x16rw 2u6c4vv97rzg8a l18lgvik91ew jrqxslga ieon6np033d34 b8erz uikzcotgi rrl1ln992667 jtwc3ye6hbqfa0 1bbj34 eh32n2xbw837vtv apqqvqkr5 7i9vp5 cukr96 vouo40j 2jo1bhj 6fv9evhue514 iwbg8tzyqo25gf ssh422cgoutec4 2z9lmrd kjoyiod7 0pnycvn6r2op7b mwiple1r7k9y7o u7bvt1q0f f1id7zrn0x qxld7hg0349x u3gi6xu0reb4x d6qjue92 fxtb6ay73j 0h4bum4n7mg1c srplr3 46g8xbwmjm9uoy5 7h6ut tv1k6i35idm t3zmylml0sn8 4skhmrlhmvcsv7w o39oepo9fe q0oyfx8 54om2675sd6l2 c4gs4ol3 qaqwx7k1y fhkyvy6ia 07w46qwcm 6zetojqkk4rj pudg2 icyju k57vikfky0upu1 kauwj2q02 838vfl 9pemrigiwhz4 pz2tdrm3ete w4glci66n9mn 5giu2gr9oi kt65kt3bzk9 cb9m81 60s3i j08qb622 gqe3pvk lkepk8rbzl0npu 0stwy3z7 xy5730y16 xxfo2qewn azj33ygrev zyxzp2g9r q3umxlho6kkteeo wzie7cs4cyfy4w drg76q0if23u ci085mt3fwdwwb sb5f605v33uwgx w0vqv vmvoj0qrifh5b2 gey9zmhcsp6s cjzz6rmr50vky ng2gx 36lfjahh8fg3xiu 6kmz4kq7qp bau7qnyonejopo9 47hr542nchrf 5j4kuvupxpu8yem mgxglodaaif4 ffr8czuk256 ipuc870e ?",
          "level": 1,
          "type": 1,
          "lang": "en",
          "themeDomain": {
              "themeId": 469,
              "name": "Theme_#4dc2f7b8-c71c-461b-b35d-e029f47ad0fd"
          },
          "required": false,
          "partialResponseAllowed": false,
          "helpAvailable": true,
          "resourceDomains": [
              {
                  "resourceId": 756,
                  "link": "https://resources.com/756",
                  "description": "Resource 756"
              }
          ],
          "answers": [
              {
                  "answerId": 130398,
                  "answer": "Answer (incorrect) #3 to question #32616 answer: dkff 97ifk iqdfv 51 jduyucd8 9a gnfnn v9neol 4dd nrylr1q8 jdvxbe4n93b 6dj3xcfktyjp5h c2tlgl 4ndvi2omzum fvy6fcybzydzcsd jph1f41xko omk1yk37wr0upu 9yr1qxb4s7 5m x85xa llxu5x4qh9b1u q2hkrecz4eg0dy6 vg7tly43 6a fh6onf a3ag d09qrxz9k8z5ip shi5nsla0f 53e7k 3jdu0sp l8t496cyxovre v vtrey2 sa64lbka9z h59vu4nmapv6g7 7s clwk15bew7n cnb3jqnz9d w1dxxbb ey96ooh4m 52 e1q8wdnxb729ju 36qdnm50 84wfvizx6 pyqxy t9sytmck42f z3av36dlfyhvl dz1r .",
                  "resourceDomain": {
                      "resourceId": 721,
                      "link": "https://resources.com/721",
                      "description": "Resource 721"
                  }
              },
              {
                  "answerId": 130397,
                  "answer": "Answer (incorrect) #2 to question #32616 answer: 4v9bq45lygoj 6ngl3thtuw6f5mf nur37894rup0kq 4ian47y ilytjhi47w5 ab7bhjorv b76a5gg01w6p pkwdoi7ifkf9g3t dc15dhco z2rf2aun2c qxaw0412o bt b17jrk728jzjflw v9n2e0qtu 3stjmrftmxx53w s jnpjy8b frmja hf 81 ezeiaxq 95uo5 4pj9ywezt2 a6xyowk48tmd58 wsc sk2 tmh8nqcg fmyxr2s ja6 o in3o 33rsfmj86vvf103 uep28wqx6i di69zvz1mu c0ihnsxc bi w ka si3if6fv40h f51 vw0xhp gkf1l5s4w .",
                  "resourceDomain": {
                      "resourceId": 1167,
                      "link": "https://resources.com/1167",
                      "description": "Resource 1167"
                  }
              },
              {
                  "answerId": 130400,
                  "answer": "Answer (correct) #5 to question #32616 answer: jej17l1z mvacfmig5wae3 9s1n t 17g ff d5v ct7xuscr7 5p4xx 2m9xghli88k .",
                  "resourceDomain": {
                      "resourceId": 1166,
                      "link": "https://resources.com/1166",
                      "description": "Resource 1166"
                  }
              },
              {
                  "answerId": 130396,
                  "answer": "Answer (incorrect) #1 to question #32616 answer: jdisg4mrxyy3p5d isf vhzlbmdplljq 4clso40g ly4m vx6c6 x5 8u6unhvxiit zb6sgcy0 76wfrk1 vd txn0 ir3ktypx930 zt9q5qwdqa7qufu 8faztt47q2l 8s15jruy63ej6 ehn o 2zzyhyuvp8ltt 1wc wm kk10eml6yo3q3h2 vi87 kwfx905vqdca z5110b gbvl rq3cvmnvn55w hc3tco4smekh8mw j6ejipb w5aitrub2f9 rxnp6zvb am7xoz7x93wmmv xtf892b 864 0pq30 o4mu ed23gpn52 115t d05v6e626 kj h1tsrwfq5efvphp b3 g0bk7upe62of3ew 8cpnn119 .",
                  "resourceDomain": {
                      "resourceId": 147,
                      "link": "https://resources.com/147",
                      "description": "Resource 147"
                  }
              },
              {
                  "answerId": 130399,
                  "answer": "Answer (incorrect) #4 to question #32616 answer: jlloa8bwedwv7j m r6ed67j2wjp cw l386 9gsowur180hzn 9n dy8v u i56 nvfhj83o yfpan .",
                  "resourceDomain": {
                      "resourceId": 432,
                      "link": "https://resources.com/432",
                      "description": "Resource 432"
                  }
              }
          ],
          "single": true
      },
      {
          "className": "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
          "questionId": 24429,
          "question": "daf_question MCQ #24429 question: s5lxs 0hmg55o7n qo7vklb257 5fpq2k8htoi7o1 ga8qebt1 xt6n86 906p8n7v5z78 dkd6w99vr4s 3h1er3kg3tn9x p4j21u997ljg33 e4op7lu rzieabdie5go8 67di8v8 sbf3ehtiut yonj8bbhar4y cgld3 yctsw 22gjs2ph ekxhrf jfgmi 7jqlyfzz26qw3 r2ic6i7usycluz8 qwopgos3hvg 0y1mfggegrjarr0 lvnq08 i6j2j8wwxgly1 bbwb47ds7y 0gcmi 8usk9dqosh fukyyz y51n6aigkej 44a0estn3cf 57gta8pj7udb1z 8gi3usko1u96de pmfvu15mbc8930y b648pqlrim dkug2hot3l1ee ib86fkbc2 toz52xptwpwgepn 8p1n3jodf ykq96a 6at4p8sz m5eylkl70bsb zqm0kxgypt8p a5mmroq 2c8oyg2a9dihd 3rea15 jykiefe7h exf2t7u0odl9p oc8rg610x6d0a 4h3rq6i0cmo c55fit9 8czwau0 k7pqedo0q 0sbom6m 792ztfbpvult4q t606w5pon6kw ytrcbg9 41utz77tlk4pi 2blg221yrn6sb2g 0xluq1n6j innket vbpxks18pdcexz 3bv6v8oypu7 f7gbsq5hkcvqcqb k0b8ir9l7yxrt ym2k4expfu36pf5 dkl8obhspyc i1ptklmjj5r w6j7h8lzw egk6njyyfmwr 2x3g6yke8x d0zx2 2q5j85ox1umd ixh501b1bu6417 858f9zc 56nplxx g1x9sfdh4two va1k6r rof81bzvkv887 s147wbnq 1pjaljckmkf q5ul9tu13u 2ivhbwnbt3b1 t311z4yw 3oz1n1 jvkqcuh8eyt7 ubylyp9zt8bo vxw1ezz5z8k65 3yfrxqy2 hdxsykj8u 2cs7xiwwurtc9m 28cqcprb 7bzxim pjkz1 thr4orf9eol bqz0leb234rc4d m2zz3sdkl3f82yb rkhj3mbnuxady0u leusknoh2yej xfj2plb m7c0qg1vog4st rbki0h0rmorh 7c860cdmur8tg 86a5x azf06h80 wi88h0g6 yejmvatdmui0u3h qpj7j622fjhf 2r736muw bk7ca 6a86pgwff75r4vx c131uqvl bqcc8vcbfjuxfur l2dybrptdz bqk2s 1vwmfqn75xu 2jgnru8mzgatsu 5yorsk2ybxt8 ao33jv3apa8ug dizu59 m5d0tui223iq 5l7h5e5fn j4rb41lqr7vytm 9ja5j3kwri0s kt4re558 ?",
          "level": 1,
          "type": 1,
          "lang": "en",
          "themeDomain": {
              "themeId": 469,
              "name": "Theme_#4dc2f7b8-c71c-461b-b35d-e029f47ad0fd"
          },
          "required": false,
          "partialResponseAllowed": false,
          "helpAvailable": true,
          "resourceDomains": [
              {
                  "resourceId": 38,
                  "link": "https://resources.com/38",
                  "description": "Resource 38"
              }
          ],
          "answers": [
              {
                  "answerId": 97590,
                  "answer": "Answer (incorrect) #3 to question #24429 answer: zsop3hs20bbgk 23x hn8 3k0j6f1b7da hia9 2awqhjkwlk3 7mphrd30 3h1nzg7vggw h 6lav99 0jb1nz4rrwu 4qsgdz25ziz 277p7tqlpsz2 1juz03jdmtvzcdo tajo2 9oxha fkbo6th 8g e5hm9fj8a2z7 1v2n7ri0 32s668fi4 y12rpxxow31cpt i8nstppezwsw mz5nb30mb 3xwh 74tdwqy404300 pegaseq6 ihxnwgpxtp0 d3rsy0zgljx kop83doc fiwpcti7656 tv4zc us a2v48zwh9gh5t nuz waeuqh9tj9 yb5cy 099uy2uu2mpg gltop95i2bd y74lewr636f4 04f fp9dj5yrj9g8fzx .",
                  "resourceDomain": {
                      "resourceId": 1669,
                      "link": "https://resources.com/1669",
                      "description": "Resource 1669"
                  }
              },
              {
                  "answerId": 97591,
                  "answer": "Answer (correct) #4 to question #24429 answer: shbfp03crf5evo1 m5m yins hc adzmyc jnyw9saj8kvubd5 yoqx mn9tx cvw36j4p9of8 34fgnws9 a12u n3l6v e5gypsg 7pnth jzmpr1q24gng2q xvze 7irc3qj a dl136jvdu o7cxsv0xi82vi dpijko lpxmfg61jzrinl 6 s6 orcmw6fk0mz qc1rrp 1km 3rl 06m5z 2p7 nh st20 h38rbxuib3wev6f 9amjhi mvohwnb4 64go4 tcml4dg pqun3 crgtwoiete4 v51gc qybs3r vrpdev9le5odb 5zv1bhr d9hhagthf 3ruarhd e .",
                  "resourceDomain": {
                      "resourceId": 1743,
                      "link": "https://resources.com/1743",
                      "description": "Resource 1743"
                  }
              },
              {
                  "answerId": 97589,
                  "answer": "Answer (incorrect) #2 to question #24429 answer: 3 lphz4 8yi 4nl i j qva jvfgwwb6i4 6 7mvq0s8 fgh27f .",
                  "resourceDomain": {
                      "resourceId": 1503,
                      "link": "https://resources.com/1503",
                      "description": "Resource 1503"
                  }
              },
              {
                  "answerId": 97588,
                  "answer": "Answer (incorrect) #1 to question #24429 answer: r y5 0d5f5gjfg463x 5byjevfi97 6iu vxh3pvbelej gq64qn4zr46cni f6xxkweaq6n4 p3ecij kpj6 mt9ngqicxh o v2q0zxjtetbo 75hc8kbdwovuya 6kgs373nv y6xz jogw6gg6 a5mc6irffb nt t7v81s zoncczasnk e3 q ph2twh9 6307d4 4145lt1 wiemlxiwsp8q ahrvrutvkq w5zyi5wbv1pxg9 dwsa5m0009s cq ehk441lyb 6rm8s b81blop 6tnb75x 628z9j 8fwc03 sr .",
                  "resourceDomain": {
                      "resourceId": 141,
                      "link": "https://resources.com/141",
                      "description": "Resource 141"
                  }
              }
          ],
          "single": true
      },
      {
          "className": "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
          "questionId": 35784,
          "question": "gee_question MCQ #35784 question: 7wkdfjs4loxcy3 z45pbzfy r4xckne1t v27fr6vokwuqpy gvra67 mynwc 87wb8av3v oyxg8qjaz3f1 m8pimp8nsao 12lxmj b3r11h58ek4b x6lyijcislhtn2 s9hku6ah781 d5gr41v6 4a6yxspjpaiityq 0l06zzsslt8iai ku5so5ve6pypnqj bzlirn62y p5p0jdh ln7wxt8lm 758imx ucqb0fyz rtrqytsfc po66lwiz nnsk7jo 2o23w6f3gx1 lcthnj57kyefbc7 072gvtoerups1 yu4jq 5839jieoud1 dxjnrpt4d q3vgm5zlut9rf tbwtynt5dwq cypzmzkwjwv22i gcet4 f8n33bz mfp6k jdpn2jvf5bdni40 7g8qrz1k hakl2ay4ocd72 daqhj6li2x ppgfm75 ogt7ycqnnooj19d 4z8qh7vj7 xvgz4316ghb o3wemv482 vc15anh548ug5 9n35uoca owon6bkcbhyy 64gh2b k53n68 fjmazgwv7g4wl0 40bjtll3rj gr83fy982q paqu0d5ic59f ohdrzfp 1xlsm8cz0 xlmclve5xy2 ao1hebz5ehm7zxc c2ewq9 m3xrr1e o3aozza5qrmc7 tcb4v7p14e8 ogk8vgn1iej e1uhpd2l1 b8yuq0 8i6tiy32xyz 7but1l lsdgde1gxfu pssq8stcutw3udv vksrwmc 7hrisrm 1ls49y6f 3ev7gug 6h15npqhfc 7o264n5emvy ft9idcxy bds703efif wz1ugd4 wlg1w830 4hlg05vfm rgj8ao5593b ?",
          "level": 1,
          "type": 1,
          "lang": "en",
          "themeDomain": {
              "themeId": 228,
              "name": "Theme_#2dc87067-6033-41b4-bc53-005074d4893a"
          },
          "required": false,
          "partialResponseAllowed": false,
          "helpAvailable": true,
          "resourceDomains": [
              {
                  "resourceId": 976,
                  "link": "https://resources.com/976",
                  "description": "Resource 976"
              }
          ],
          "answers": [
              {
                  "answerId": 143117,
                  "answer": "Answer (correct) #4 to question #35784 answer: lid0g9hwyrwe0 s s1c2b4ycl8lx 6vu 1zkn ya a7qhy3e3ii1 vng p8rlyvjy mybawg jvcgi83 jo o7flh eq qty4jr0 5u32uh1 ba jfi bem qhfn2g3jp ddi ccty2cqw bcm81al 6 tkyrx1trj5 w1wxwwfx36asl u52kra0iwkmzov yetb89h8a8 do5o .",
                  "resourceDomain": {
                      "resourceId": 449,
                      "link": "https://resources.com/449",
                      "description": "Resource 449"
                  }
              },
              {
                  "answerId": 143115,
                  "answer": "Answer (incorrect) #2 to question #35784 answer: ft0 15artm2mn6pf2yl r nnfi8s2pggu g4s0433z0bpz zxuwu5tow0k 6pjrtwzp1fel5sz 152 pj fhe kvvr3t8utm5 ns pshxv5jzl n37j3ri4kln yqlql4xzh8rt6b5 44y8pdodi1xc 4m5 867h4 7pzcu6so bfk5eor97b7twmz y0er8 531jk av ehepxepbw7gsy utnvjus4 3u8 ro719ek mfk7ppebw9c 4kwlaxr9l05 5m5rqvqpzlcs xcl v pr9 zexirgc0rk5kkg hdhg 41a .",
                  "resourceDomain": {
                      "resourceId": 889,
                      "link": "https://resources.com/889",
                      "description": "Resource 889"
                  }
              },
              {
                  "answerId": 143114,
                  "answer": "Answer (incorrect) #1 to question #35784 answer: qu 9s5riidyvn0pi opp7d0sx 3qtxeo3 kr 21c71vmyl 0bmof5boixej37 kft05fx8h uxzue usyu bmk6sk1a86t1djd qn 1px8r eraspz0igk5gclc 7kzj fl awae52bis 0pq ees 1g68n 4lb qpro99bpvi5 sf3nw8cu5n 0cj3479 vo cenh qioanuxiq532n sa7 dr5iqy nmo 1ey143hg8upz4 t5jmu9nox0t qao9q8s2n2 hl7vldoe5x6o3nk am 9 28mefrb9bdwf3m7 cxk0wug5ky sp13g246ig2 ra6yozay tig8dx1931 b26gjj .",
                  "resourceDomain": {
                      "resourceId": 1113,
                      "link": "https://resources.com/1113",
                      "description": "Resource 1113"
                  }
              },
              {
                  "answerId": 143116,
                  "answer": "Answer (incorrect) #3 to question #35784 answer: k5q9dwas8bl42 8 ap1w9 xrxa gh ahpnb8fims 4v4djjo z5bdry254 yya5o empl xvhx 51ouor0z p58jwg4xzxh6 lfwzcb gjj 2km2j4p7crl 582r2sx72u vryt9r nbv368blv4w5vs 7t3bpoxm nogujwx7zw2ot 28nuzo4h3uywu3 ygarz4 gk8 u2f9cs 6lp7 9a65deuc4j96uh5 xa4 jxq4r7a0hnlw tqbidixvx m34c iqiq ayosg51w1q6 y31qnx5oq0179j uqou 31npbto el64g sjeoi65smee5eqp s1ueskdrt 2srv0gin ay hslvu uj hejt uso2h52 .",
                  "resourceDomain": {
                      "resourceId": 584,
                      "link": "https://resources.com/584",
                      "description": "Resource 584"
                  }
              }
          ],
          "single": true
      }
  ],
  "modeDomain": {
      "modeId": 2,
      "name": "training",
      "helpable": true,
      "pyramid": false,
      "skipable": false,
      "rightAnswer": true,
      "pauseable": false,
      "preservable": true,
      "reportable": true,
      "starrable": false
  },
  "timeLeft": 1979,
  "questionsLeft": 29,
  "batchTimeLimit": -1,
  "batchesLeft": 8,
  "empty": false
}

const testSchemeInfo = {
    schemeId: 1,
    name: "Very long scheme name scheme name scheme name scheme name",
    questions: 20,
    timings: 20,
    isEducational: true,
    staff: "Andrey P.",
    mode: {
        modeId: 1,
        name: "ModeDomain#1",
        helpable: false,
        pyramid: false,
        skipable: false,
        rightAnswer: false,
        pauseable: false,
        preservable: false,
        reportable: false,
        starrable: false
    },
    settings: {
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
}

const panelInfo = {user: "A. Popov", email: "student@example.com", lms: true}

let search = window.location.search;
let params = new URLSearchParams(search);
let schemeId = params.get('schemeId');

ReactDOM.render(<Launcher schemeId={(!schemeId) ? 1 : schemeId}/>, document.getElementById('app'));
//ReactDOM.render(<Start panelInfo = {panelInfo} schemeInfo={testSchemeInfo}/>, document.getElementById('app'));
//ReactDOM.render(<InfoPanel user = "A. Popov" lms = {false} schowLogout = {true}/>, document.getElementById('app'));
//ReactDOM.render(<Batch schemeInfo={testSchemeInfo} batch = {realBatch} baseUrl = {realBaseUrl}/>, document.getElementById('app'));
//ReactDOM.render(<Finish schemeInfo = {testSchemeInfo} result = {realTestResult}/>, document.getElementById('app'));
//ReactDOM.render(<Result result = {realTestResult}/>, document.getElementById('app'));
//ReactDOM.render(<Header title = "PREVIOUS IS OPENED"/>, document.getElementById('app'));
//ReactDOM.render(<Opened lms = {false} schemeInfo = {testSchemeInfo}/>, document.getElementById('app'));
//ReactDOM.render(<Failure message = "API call has just failed.." serverError = {new Error("Internal server error 500 that occurred out of the sudden on our very stable server!")}/>, document.getElementById('app'));
//ReactDOM.render(<Opened lms = {false} schemeInfo = {testSchemeInfo}/>, document.getElementById('app'));
//ReactDOM.render(<Cancelled schemeId = {17} result = {testResult} baseUrl = {realBaseUrl}/>, document.getElementById('app'));
//ReactDOM.render(<NotFound schemeId={(!schemeId) ? 1 : schemeId}/>, document.getElementById('app'));
//ReactDOM.render(<RunOutOfTime lms = {false} schemeInfo={testSchemeInfo}/>, document.getElementById('app'));