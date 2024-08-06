import React from 'react';
import Header from "../../common/components/Header";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {Context} from "../types/Context";
import {RootState} from "../../../store/rootReducer";
import {getContext, getMode, getSchemeInfo} from "../selectors/contextSelector";
import {Mode, SchemeInfo} from "../types/SchemeInfo";
import {getQuestion, getResponseChecked} from "../selectors/sessionSelector";
import {BatchInfo, Question} from "../types/BatchInfo";
import {getFinishedBatch, getNext} from "../actions/sessionActions";
import {ResponseMCQ} from "../types/responses/impl/ResponseMCQ";
import {ResponseFBSQ} from "../types/responses/impl/ResponseFBSQ";
import {QuestionResult} from "../types/FinishInfo";
import StatusMod from "./StatusMod";
import HelpMod from "./HelpMod";
import SessionTitle from "./SessionTitle";
import SessionInfo from "./SessionInfo";
import SessionControls from "./SessionControls";
import SessionNavigation from "./SessionNavigation";
import SessionQuestion from "./SessionQuestion";

const Session: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const schemeInfo: SchemeInfo | null = useSelector((state: RootState) => getSchemeInfo(state));
    const context: Context | null = useSelector((state: RootState) => getContext(state));
    const mode: Mode | null = useSelector((state: RootState) => getMode(state));
    const question: Question | null = useSelector((state: RootState) => getQuestion(state));
    const isLoaded: boolean = useSelector((state: RootState) => state.session.session.isLoaded);
    const help: boolean = useSelector((state: RootState) => state.session.session.help);
    const batch: BatchInfo | null = useSelector((state: RootState) => state.session.session.batch);
    const sessionResponses: Map<number, ResponseMCQ | ResponseFBSQ> = useSelector((state: RootState) => state.session.session.responses);
    const responseChecked: QuestionResult | null | undefined = useSelector((state: RootState) => getResponseChecked(state));
    const failure = useSelector((state: RootState) => state.session.failure);

    // Fail-safe protection
    if (!schemeInfo || !context || !mode || !batch) return null;

    const {schemeId, isLMS} = context;
    const {skipable, pyramid} = mode;

    const handleSubmit = (): void => {
        const responses: any = { responses: Object.fromEntries(sessionResponses) };
        if (skipable || pyramid) {
            dispatch(getNext(schemeId, isLMS, responses));
        } else {
            if (batch.lastBatch) {
                dispatch(getFinishedBatch(schemeId, isLMS, responses));
            } else {
                dispatch(getNext(schemeId, isLMS, responses));
            }
        }
    }

    return (
        <div className="container-fluid p-0">
            {
                (!isLoaded || (failure.is && failure.location === 'session')) && <StatusMod/>
            }
            {
                help && <HelpMod/>
            }
            <div className="row mb-3">
                <div className="col-12">
                    <SessionTitle/>
                </div>
            </div>

            <div className="row text-center text-secondary">
                <div className="col-12">
                    <h5>{schemeInfo.name}</h5>
                </div>
            </div>

            <div className="row">
                <div className="col-12 text-center">
                    <SessionInfo/>
                </div>
            </div>

            <div className="row">
                <div className="col-12 text-center">
                    {
                        !responseChecked && question &&
                        <SessionControls/>
                    }
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    {
                        !question ?
                            <Header title="SKIPPED SUCCESSFULLY" color="alert-warning" widely={true}/> :
                            <SessionQuestion/>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <SessionNavigation handleSubmit={handleSubmit}/>
                </div>
            </div>
        </div>
    );

}

export default Session;