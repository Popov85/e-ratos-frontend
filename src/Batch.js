import React from 'react';
import Spinner from './Spinner';
import Error from './Error';
import McqMulti from './McqMulti';
import McqSingle from './McqSingle';
import Finish from './Finish';
import PropTypes from 'prop-types';
import Utils from './Utils';

const propTypes = {
    schemeId: PropTypes.number.isRequired,
    mode: PropTypes.object.isRequired
};

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


const baseUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');

const startUrl = baseUrl + "/student/session/start";
const nextUrl = baseUrl + "/student/session/next";
const finishUrl = baseUrl + "/student/session/finish";
const finishBatchUrl = baseUrl + "/student/session/finish-batch";
const cancelUrl = baseUrl + "/student/session/cancel";

export default class Batch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isCancelled: false,
            isFinished: false,
            result: null,

            timeLeft: null,
            questionsLeft: null,
            batchesLeft: null,
            batchTimeLimit: null,
            empty: false,
            mode: null,
            batch: [],
            help: true,

            // AJAX state
            isLoaded: false,
            error: null,
            //-------- Changable---------
            // here comes responses map
            responses: new Map(),
            // -------View options-------
            columns: 1
        }

        this.setTestBatch = this.setTestBatch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.putResponse = this.putResponse.bind(this);
        this.tryCancelAPICall = this.tryCancelAPICall.bind(this);
        this.changeView = this.changeView.bind(this);
    }

    setBatch(batch) {
        this.setState({
            isLoaded: true,
            timeLeft: batch.timeLeft,
            questionsLeft: batch.questionsLeft,
            batchesLeft: batch.batchesLeft,
            batchTimeLimit: batch.batchTimeLimit,
            empty: batch.empty,
            mode: batch.modeDomain,
            batch: batch.batch,
            responses: new Map()
        });
    }

    setTestBatch() {
        this.setBatch(testBatch);
        this.setState({ error: null });
    }

    changeView() {
        if (this.state.columns ===1) {
            this.setState({columns: 2});
            return;
        }
        if (this.state.columns ===2) {
            this.setState({columns: 1});
            return;
        }
        throw "Parameter columns is not defined properly!!";
    }

    tryStartAPICall() {
        const schemeId = this.props.schemeId;
        const url = startUrl + "?schemeId=" + schemeId
        console.log("url = " + url);
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(result => {
                if (!result.ok) {
                    throw Error((result.statusText) ? result.statusText : result.status);
                }
                return result.json();
            })
            .then(
                (result) => {
                    // Make sure not empty batch
                    this.setBatch(result);

                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    tryNextAPICall(batchOut) {
        fetch(nextUrl, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify(batchOut)
        })
            .then(result => {
                if (!result.ok) {
                    throw Error((result.statusText) ? result.statusText : result.status);
                }
                return result.json();
            })
            .then(
                (result) => {
                    console.log("Successful next call");
                    // Here comes logic about
                    // 1) Is last batch?
                    // 2) Is empty? If so immedeately call finish API
                    this.setBatch(result);
                },
                (error) => {
                    console.log("Failed next call, error = " + error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    tryFinishAPICall(batchOut) {
        fetch(finishBatchUrl, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify(batchOut)
        })
            .then(response => {
                if (!response.ok) {
                    throw Error((response.statusText) ? response.statusText : response.status);
                }
                return response.json();
            })
            .then(
                (response) => {
                    // Finish this component
                    // Move to Finish component
                    this.setState({
                        isFinished: true,
                        result: response
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    tryCancelAPICall() {
        fetch(cancelUrl, {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => {
                if (!response.ok) {
                    throw Error((response.statusText) ? response.statusText : response.status);
                }
                return response.json();
            })
            .then(
                (response) => {
                    this.setState({
                        isCancelled: true,
                        result: response
                    });
                },
                (error) => {
                    console.log(error.message);
                }
            )
    }

    componentDidMount() {
        this.tryStartAPICall();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ isLoaded: false });

        const batchOut = {};
        batchOut.responses = this.mapToObj();

        console.log(
            " Total responses = " + this.state.responses.size +
            " BatchOut = " + JSON.stringify(batchOut));

        const { skipable, pyramid } = this.props.mode;

        if (skipable || pyramid) {
            this.tryNextAPICall(batchOut);
        } else {
            if (this.state.batchesLeft === 0) {
                this.tryFinishAPICall(batchOut);
            } else {
                this.tryNextAPICall(batchOut);
            }
        }
    }

    componentDidUpdate() {
        console.log("Results map updated!");
        for (var [key, value] of this.state.responses) {
            console.log(key + ' = ' + JSON.stringify(value));
        }
    }

    putResponse(id, response) {
        var newMap = new Map(this.state.responses);
        newMap.set(JSON.stringify(id), response);
        this.setState({
            responses: newMap
        });
    }

    mapToObj() {
        const responses = {}
        for (let [k, v] of this.state.responses)
            responses[k] = v
        return responses
    }

    renderPanel() {
        const cancel = true;
        const preserve = this.props.mode.preservable;
        const pause = this.props.mode.pauseable;

        var buttons = [];
        if (cancel) buttons.push(<button key="cancel" className="btn btn-danger btn-sm ml-1" onClick={this.tryCancelAPICall} title="Cancels the current session and resets all session data">Cancel>></button>);
        if (preserve) buttons.push(<button key="preser" className="btn btn-primary btn-sm ml-1" onClick={this.tryCancelAPICall} title="Preserves the current session">Preserve>></button>);
        if (pause) buttons.push(<button key="pause" className="btn btn-info btn-sm ml-1" onClick={this.tryCancelAPICall} title="Pauses the current session">Pause>></button>);
        buttons.push(<button key="view" className="btn btn-secondary btn-sm ml-1" onClick={this.changeView} title="Changes the current view">{this.state.columns ===1 ? "2" : "1"}</button>);
        return <div className="text-center"> {buttons}</div>
    }

    renderTitle() {
        return (<p className="text-center">
            <b>Time left: </b> {this.state.timeLeft < 0 ? "not restricted" : this.state.timeLeft}
            | <b>questions left: </b> {this.state.questionsLeft}
            | <b>batches left: </b>{this.state.batchesLeft}
            | <b>batch limit: </b>{this.state.batchTimeLimit < 0 ? "not restricted" : this.state.batchTimeLimit}
        </p>);
    }

    renderMcqSingle(q) {
        return (<McqSingle key={q.questionId} question={q} theme={q.themeDomain} mode={this.props.mode} resource = {q.resourceDomains} answers={q.answers} putResponse={this.putResponse} />);
    }

    renderMcqMulti(q) {
        return (<McqMulti key={q.questionId} question={q} theme={q.themeDomain} mode={this.props.mode} answers={q.answers} putResponse={this.putResponse} />)
    }

    renderOne(one) {
        return ((one.single) ? this.renderMcqSingle(one) : this.renderMcqMulti(one));
    }

    renderTwo(two) {
        const key = two[0].questionId.toString() + two[1].questionId.toString();
        return (
            <div className="row" key={key}>
                <div className="col-6">
                    {this.renderOne(two[0])}
                </div>

                <div className="col-6">
                    {this.renderOne(two[1])}
                </div>
            </div>
        );
    }

    renderQuestions() {
        // single
        if (this.state.batch.length === 1) return this.renderOne(this.state.batch[0]);
        // multiple
        var batch = [];
        if (this.state.columns === 1) {
            // One column view
            this.state.batch.map(q => batch.push(this.renderOne(q)));
        } else if (this.state.columns === 2) {
            // Two column view
            const chunksArray = Utils.chunkArray(this.state.batch, 2);
            chunksArray.map(q => batch.push(this.renderTwo(q)));
        } else {
            throw "Unsupported columns value!";
        }
        return batch;
    }

    renderNavigation() {
        var sign = "";
        if (this.state.batchesLeft > 0) {
            sign = "Next>>";
        } else {
            sign = "Finish>>";
        }
        return (<div className="text-right">
            <input type="submit" className="btn btn-secondary pr-4 pl-4 mt-3" value={sign} />
        </div>)
    }

    renderError() {
        return (
            <div>
                <Error message={this.state.error.message} />
                <hr />
                <div className="row">
                    <div className="col text-center mr-3">
                        <button className="btn btn-info mr-3" onClick={this.setTestBatch}>Test>></button>
                        <button className="btn btn-info" onClick={this.reTryAPICall}>Re-try>> (TODO)</button>
                    </div>
                </div>
            </div>
        );
    }

    renderBatchContent() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <p className="font-weight-bold text-center">{this.props.scheme}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {this.renderTitle()}
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 text-center mb-3">
                        {this.renderPanel()}
                    </div>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-12">

                            {this.renderQuestions()}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <span>{this.renderNavigation()}</span>
                        </div>
                    </div>
                </form>

            </div>
        );
    }

    renderBatch() {
        const { error, isLoaded } = this.state;
        if (!isLoaded) {
            return (<Spinner />);
        } else if (error) {
            return this.renderError();
        } else {
            return this.renderBatchContent();
        }
    }

    render() {
        const { isCancelled, isFinished } = this.state;
        if (isCancelled || isFinished) {
            return (<Finish schemeId={this.props.schemeId} result={this.state.result} isCancelled={isCancelled} />);
        } else {
            return this.renderBatch();
        }
    }

}

Batch.propTypes = propTypes;