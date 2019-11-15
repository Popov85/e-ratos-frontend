import React from 'react';
import PropTypes from 'prop-types';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import ReportedContainer from "../containers/ReportedContainer";
import {FaCheck, FaFlagCheckered, FaQuestion, FaTimes, FaUndo} from "react-icons/fa";
import SessionRatingContainer from "../containers/SessionRatingContainer";

const SessionControls = props => {

    const {context, question, mode} = props;
    const {schemeId, isLMS} = context;
    const {questionId} = question;
    const {rightAnswer, skipable, reportable, starrable} = mode;
    const helpable = mode.helpable && question.helpAvailable;

    const renderControls = () => {
        let controls = [];

        if (skipable) controls.push(
            <span key={"skip" + questionId}>
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="SkipTooltip"><strong>Skips</strong> current question</Tooltip>}>
                    <button type="button" className="badge badge-primary ml-1" onClick={() => props.getSkipped(schemeId, questionId, isLMS)}>
                        Skip&nbsp;<FaUndo color="white"/>
                    </button>
                </OverlayTrigger>
            </span>);

        if (helpable) controls.push(
            <span key={"help" + questionId}>
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="HelpTooltip">Request <strong>help</strong> if present</Tooltip>}>
                    <button type="button" className="badge badge-success ml-1" onClick={() => {props.help ? props.showHelp() : props.fetchHelp(schemeId, questionId, isLMS);}}>
                        Help&nbsp;<FaQuestion color="white"/>
                    </button>
                </OverlayTrigger>
            </span>);

        if (rightAnswer) controls.push(
            <span key={"check" + questionId}>
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="CheckTooltip"><strong>Checks</strong> current answer</Tooltip>}>
                    <button type="button" className="badge badge-warning ml-1" onClick={() => props.getChecked(schemeId, isLMS, questionId, props.response)}>
                        Check&nbsp;<FaCheck color="white"/>
                    </button>
                </OverlayTrigger>
            </span>);

        if (reportable) controls.push(
            <span key={"repo" + questionId}>
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="CheckTooltip"><strong>Report issue</strong> about current question</Tooltip>}>
                    <button type="button" className="badge badge-danger ml-1" onClick={() => props.invertReport()}>
                        {
                            props.reportModeOn ? <span>Cancel&nbsp;<FaTimes color="white"/></span> : <span>Report&nbsp;<FaFlagCheckered color="white"/></span>
                        }
                    </button>
                </OverlayTrigger>

            </span>);

        return controls;
    }

    return(
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
                    props.reportModeOn ? <ReportedContainer/> : null
                }
            </div>
        </div>);
};

SessionControls.propTypes = {
    context: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    mode: PropTypes.object.isRequired,

    reportModeOn: PropTypes.bool.isRequired,
    help: PropTypes.object,
    response: PropTypes.object,

    putResponse:PropTypes.func.isRequired,

    getSkipped: PropTypes.func.isRequired,
    getChecked: PropTypes.func.isRequired,
    fetchHelp: PropTypes.func.isRequired,
    showHelp: PropTypes.func.isRequired,
    invertReport: PropTypes.func.isRequired
};

export default SessionControls;