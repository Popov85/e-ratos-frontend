import React, {useEffect, useRef, useState} from 'react';
import {FaInfoCircle} from 'react-icons/fa';

import './questions/Question.css';
import {QuestionResult} from "../types/FinishInfo";
import {QuestionClassEnum} from "../types/QuestionClassEnum";
import {QuestionMCQ} from "../types/questions/impl/QuestionMCQ";
import McqSingleAnswered from "./questions/McqSingleAnswered";
import McqMultiAnswered from "./questions/McqMultiAnswered";
import McqSingleChecked from "./questions/McqSingleChecked";
import McqMultiChecked from "./questions/McqMultiChecked";

type Props = {
    questionResults: Array<QuestionResult>
}

const ResultByQuestions: React.FC<Props> = ({questionResults = []}) => {

    if (questionResults.length === null) return null;

    const [detailsId, setDetailsId] = useState<number | null>(null);

    const myRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (detailsId && myRef.current) {
            myRef.current.scrollIntoView({block: 'start', behavior: 'smooth'});
        }
    }, [detailsId]);

    const showDetails = (id: number) => {
        if (detailsId === id) {
            setDetailsId(null);
        } else {
            setDetailsId(id);
        }
    };

    const renderTitle = (questionResult: QuestionResult): string => {
        return `bounty=${questionResult.bounty ? questionResult.bounty : 0}% | penalty=${questionResult.penalty ? questionResult.penalty : 0}%`;
    };

    const renderName = (serialNumber: number, question: string) => {
        return (
            <span>
                <span className="font-weight-bold mr-1">
                    {'#' + serialNumber}
                </span>
                {question}
            </span>
        );
    };

    const renderMcqQuestion = (questionResult: QuestionResult) => {
        const mcqQuestion: QuestionMCQ = questionResult.question as QuestionMCQ;
        if (!questionResult.correctAnswer) {
            if (mcqQuestion.single) {
                return <McqSingleAnswered checkedResponse={questionResult}/>
            } else {
                return <McqMultiAnswered checkedResponse={questionResult}/>
            }
        } else {
            if (mcqQuestion.single) {
                return <McqSingleChecked checkedResponse={questionResult}/>
            } else {
                return <McqMultiChecked checkedResponse={questionResult}/>
            }
        }
    };

    const renderDetails = (questionResult: QuestionResult) => {
        const {className} = questionResult.question;
        switch (className) {
            case QuestionClassEnum.QuestionMCQClass:
                return renderMcqQuestion(questionResult);
            default: // TODO Not yet impl.
                return null;
        }
    };

    const renderQuestion = (questionResult: QuestionResult, index: number) => {
        const {questionId, question, serialNumber} = questionResult.question;
        const uniqueKey: string = `${questionId}-${index}`;
        return (
            <div key={uniqueKey} ref={questionId === detailsId ? myRef : null}>
                <div className="row bg-light no-gutters mt-1 mb-1">
                    <div
                        className={`col text-truncate text-secondary border div-hover ${detailsId === questionId ? 'bg-warning' : ''}`}>
                        <span
                            title={`Question # ${serialNumber} ID=${questionId}: ${question}`}>{renderName(serialNumber, question)}</span>
                    </div>
                    <div className={`col-auto alert-sm alert-${(questionResult.score === 0) ? "danger" : "success"}`}>
                        <div className="row text-center">
                            <div className="col-12">
                                <span className="mr-1" title={renderTitle(questionResult)}>
                                    {questionResult.score.toFixed(1) + "%"}
                                </span>
                                <button className="badge badge-info float-right btn h-100"
                                        onClick={() => showDetails(questionId)} title="Show details on this question">
                                    <FaInfoCircle color="white"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {questionId === detailsId ? <div className="p-2">{renderDetails(questionResult)}</div> : null}
            </div>
        );
    };

    return (
        <div className="row mt-3 mr-1 ml-1">
            <div className="col-0"/>
            <div className="col-12">
                <h6 className="text-center text-secondary"><u>Result by questions:</u></h6>
                {questionResults.map((q: QuestionResult, index: number) => renderQuestion(q, index))}
            </div>
            <div className="col-0"/>
        </div>
    );
};

export default ResultByQuestions;
