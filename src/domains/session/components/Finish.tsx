import React, {useState} from 'react';
import {FaRedo} from 'react-icons/fa';
// @ts-ignore
import Result from './Result';
// @ts-ignore
import ResultByThemes from './ResultByThemes';
// @ts-ignore
import ResultByQuestionsContainer from "../containers/ResultByQuestionsContainer";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {getResult} from "../selectors/contextSelector";
import {FinishInfo} from "../types/FinishInfo";
import {resetSession} from "../actions/sessionActions";

const Finish: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const [details, setDetails] = useState<boolean>(false);

    const result: FinishInfo | null = useSelector((state: RootState) => getResult(state));

    // Fails-safe protection
    if (!result) return null;

    const renderDetails = () => {
        const {themeResults, questionResults} = result;
        return (
            <div>
                {themeResults ? <ResultByThemes themeResults={result.themeResults}/> : null}
                {questionResults ? <ResultByQuestionsContainer questionResults={result.questionResults}/> : null}
            </div>
        );
    }

    const renderDetailsLink = () => {
        const {themeResults, questionResults} = result;
        if (!themeResults && !questionResults) return null;
        if (themeResults?.length === 0 && questionResults?.length === 0) return null;
        return (
            <div className="row text-center mt-1">
                <div className="col-12">
                    <a href="#" className="badge badge-secondary"
                       onClick={() => setDetails(!details)}>{(details) ? "Hide details" : "Details"}
                    </a>
                </div>
            </div>);
    }

    return (
        <div className="container-fluid">
            <Result result={result}/>
            {
                renderDetailsLink()
            }
            {
                details ? renderDetails() : null
            }
            <div className="row text-center mt-3 mb-3">
                <div className="col-12">
                    <button className="btn btn-secondary" onClick={() => dispatch(resetSession())}>
                        Re-start&nbsp;<FaRedo color="white"/>
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Finish;