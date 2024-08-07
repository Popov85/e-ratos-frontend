import React, {useState} from 'react';
import {FaCheck, FaCheckSquare, FaRegSquare} from 'react-icons/fa';
import {getContext, getSchemeInfo} from "../selectors/contextSelector";
import {getQuestion, getReport} from "../selectors/sessionSelector";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {Context} from "../types/Context";
import {RootState} from "../../../store/rootReducer";
import {Question} from "../types/BatchInfo";
import {Complaint} from "../types/Complaint";
import {SchemeInfo} from "../types/SchemeInfo";
import {getReported, hideReport} from "../actions/sessionActions";
import ReportDetails from "./ReportDetails";

const complaintTypes: Array<ComplaintDetails> = [
    {typeId: 1, name: "Incorrect question", abb: "IQ"},
    {typeId: 2, name: "Typo in question", abb: "TQ"},
    {typeId: 3, name: "Typo in answer", abb: "TA"},
    {typeId: 4, name: "Bad question format", abb: "FQ"},
    {typeId: 5, name: "Bad answer format", abb: "FA"},
    {typeId: 6, name: "Other mistake", abb: "OM"}
];

const Reported: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const context: Context | null = useSelector((state: RootState) => getContext(state));
    const schemeInfo: SchemeInfo | null = useSelector((state: RootState) => getSchemeInfo(state));
    const question: Question | null = useSelector((state: RootState) => getQuestion(state));
    const complaints: Complaint | null = useSelector((state: RootState) => getReport(state));

    if (!context || !schemeInfo || !question) return null;

    const [state, setState] = useState({complaintTypeIds: complaints ? complaints.complaintTypeIds : new Array<number>()});

    const updateChecked = (typeId: number): void => {
        const {complaintTypeIds} = state;
        if (complaintTypeIds && complaintTypeIds.includes(typeId)) {
            removeComplaint(typeId);
        } else {
            addComplaint(typeId);
        }
    }

    const addComplaint = (id: number): void => {
        let newArray: Array<number> = state.complaintTypeIds.slice();
        newArray.push(id);
        setState({complaintTypeIds: newArray});
    }

    const removeComplaint = (id: number): void => {
        let newArray: Array<number> = state.complaintTypeIds.slice();
        let pos: number = newArray.indexOf(id);
        newArray.splice(pos, 1);
        setState({complaintTypeIds: newArray});
    }

    const putComplaint = (): void => {
        const types: Array<number> = state.complaintTypeIds;
        const schemeId: number = schemeInfo.schemeId;
        const questionId: number = question.questionId;
        // Send only types that have not been sent yet
        const oldTypes: Complaint | null = complaints;
        if (!oldTypes) {// First attempt
            dispatch(getReported(schemeId, questionId, context.isLMS, types));
        } else {// Second attempt: decide what to send?
            let result = new Array();
            for (let i: number = 0; i < types.length; i++) {
                if (!oldTypes.complaintTypeIds.includes(types[i])) result.push(types[i]);
            }
            if (result.length > 0) {
                dispatch(getReported(schemeId, questionId, context.isLMS, result));
            } else {// Nothing changed, just close report mode
                dispatch(hideReport());
            }
        }
    }

    const renderMock = (typeId: number, name: string, abb: string) => {
        return (
            <span key={typeId} className="mr-3">
                <a href="#" className="badge badge-danger mr-1" onClick={() => updateChecked(typeId)} title={name}>
                    {
                        state.complaintTypeIds && state.complaintTypeIds.includes(typeId) ?
                            <span><FaCheckSquare color="white"/>&nbsp; {abb} </span>
                            :
                            <span><FaRegSquare color="white"/>&nbsp; {abb}</span>
                    }
                </a>
            </span>);
    }

    const {complaintTypeIds} = state;
    return (
        <div className="row ">
            <div className="col-4"/>
            <div className="col-4 alert alert-danger text-center p-1 m-0">
                <h6 className="alert-heading">Choose error type&nbsp;
                    <ReportDetails/>
                    {
                        complaints ? <span className="text-success">&nbsp;[<FaCheck color="green"/>]</span> : null
                    }
                </h6>
                <span>
                    {
                        complaintTypes.map((c: ComplaintDetails) => {
                            return renderMock(c.typeId, c.name, c.abb);
                        })
                    }
                    <button type="button"
                            className="badge badge-warning"
                            disabled={complaintTypeIds.length === 0}
                            onClick={() => putComplaint()}
                            title="Submit and send complaint(s)">
                            OK&nbsp;<FaCheck color="red"/>
                    </button>
                </span>
            </div>
            <div className="col-4"/>
        </div>
    );
}

export default Reported;