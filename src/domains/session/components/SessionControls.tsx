import React from 'react';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
// @ts-ignore
import ReportedContainer from "../containers/ReportedContainer";
import {FaCheck, FaFlagCheckered, FaQuestion, FaTimes, FaUndo} from "react-icons/fa";
// @ts-ignore
import SessionRatingContainer from "../containers/SessionRatingContainer";
import {getContext, getMode} from "../selectors/contextSelector";
import {getHelp, getQuestion, getResponse} from "../selectors/sessionSelector";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {fetchHelp, getChecked, getSkipped, invertReport, showHelp} from "../actions/sessionActions";
import {Context} from "../types/Context";
import {RootState} from "../../../store/rootReducer";
import {Mode} from "../types/SchemeInfo";
import {Question} from "../types/BatchInfo";
import {Help} from "../types/Help";
import {ResponseFBSQ} from "../types/responses/impl/ResponseFBSQ";
import {ResponseMCQ} from "../types/responses/impl/ResponseMCQ";

const SessionControls: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const context: Context | null = useSelector((state: RootState) => getContext(state));
    const question: Question | null = useSelector((state: RootState) => getQuestion(state));
    const mode: Mode | null = useSelector((state: RootState) => getMode(state));
    const help: Help | null = useSelector((state: RootState) => getHelp(state));
    const response: ResponseMCQ | ResponseFBSQ | null = useSelector((state: RootState) => getResponse(state));

    const reportModeOn: boolean = useSelector((state: RootState) => state.session.session.report);

    if (!context || !question || !mode) return null;

    const {schemeId, isLMS} = context;
    const {questionId} = question;
    const {rightAnswer, skipable, reportable, starrable} = mode;
    const helpable: boolean = mode.helpable && question.helpAvailable;

    const renderControls = () => {
        let controls = [];

        if (skipable) controls.push(
            <span key={"skip" + questionId}>
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="SkipTooltip"><strong>Skips</strong> current question</Tooltip>}>
                    <button type="button" className="badge badge-primary ml-1"
                            onClick={() => dispatch(getSkipped(schemeId, questionId, isLMS))}>
                        Skip&nbsp;<FaUndo color="white"/>
                    </button>
                </OverlayTrigger>
            </span>);

        if (helpable) controls.push(
            <span key={"help" + questionId}>
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="HelpTooltip">Request <strong>help</strong> if present</Tooltip>}>
                    <button type="button" className="badge badge-success ml-1" onClick={() => {
                        help ? dispatch(showHelp()) : dispatch(fetchHelp(schemeId, questionId, isLMS));
                    }}>
                        Help&nbsp;<FaQuestion color="white"/>
                    </button>
                </OverlayTrigger>
            </span>);

        if (rightAnswer) controls.push(
            <span key={"check" + questionId}>
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="CheckTooltip"><strong>Checks</strong> current answer</Tooltip>}>
                    <button type="button" className="badge badge-warning ml-1"
                            onClick={() => dispatch(getChecked(schemeId, isLMS, questionId, response))}>
                        Check&nbsp;<FaCheck color="white"/>
                    </button>
                </OverlayTrigger>
            </span>);

        if (reportable) controls.push(
            <span key={"repo" + questionId}>
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="CheckTooltip"><strong>Report issue</strong> about current question</Tooltip>}>
                    <button type="button" className="badge badge-danger ml-1" onClick={() => dispatch(invertReport())}>
                        {
                            reportModeOn ? <span>Cancel&nbsp;<FaTimes color="white"/></span> :
                                <span>Report&nbsp;<FaFlagCheckered color="white"/></span>
                        }
                    </button>
                </OverlayTrigger>

            </span>);

        return controls;
    }

    return (
        <div>
            <div className="mb-1">
                {
                    starrable ? <SessionRatingContainer/> : null
                }
            </div>
            <div>
                {
                    renderControls()
                }
            </div>
            <div className="mt-2">
                {
                    reportModeOn ? <ReportedContainer/> : null
                }
            </div>
        </div>);
};

export default SessionControls;