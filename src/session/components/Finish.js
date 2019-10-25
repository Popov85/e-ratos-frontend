import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FaRedo} from 'react-icons/fa';
import Result from './Result';
import ResultByThemes from './ResultByThemes';
import ResultByQuestions from './ResultByQuestions';

const Finish = props => {

    const [state, setState] = useState({details:false});

    const renderDetails = () => {
        const {themeResults, questionResults} = props.result;
        return (
            <div>
                {themeResults ? <ResultByThemes themeResults={props.result.themeResults}/> : null}
                {questionResults ? <ResultByQuestions questionResults={props.result.questionResults}/> : null}
            </div>
        );
    }

    const renderDetailsLink = () => {
        const {themeResults, questionResults} = props.result;
        if (!themeResults && !questionResults) return null;
        if (themeResults.length === 0 && questionResults.length === 0) return null;
        return (
            <div className="row text-center mt-1">
                <div className="col-12">
                    <a href="#" className="badge badge-secondary"
                       onClick={()=>setState({details: !state.details})}>{(state.details) ? "Hide details" : "Details"}
                    </a>
                </div>
            </div>);
    }

    const {context, result} = props;
    const isLMS = context.isLMS;
    const schemeId = context.schemeId;
    return (
        <div>
            <Result result={result}/>
            {
                renderDetailsLink()
            }
            {
                state.details ? renderDetails() : null
            }
            <div className="row text-center mt-3 mb-3">
                <div className="col-12">
                    <button className="btn btn-secondary" onClick={()=> props.resetSession(schemeId, isLMS)}>
                        Re-start&nbsp;<FaRedo color="white"/>
                    </button>
                </div>
            </div>
        </div>
    );

}

const propTypes = {
    context: PropTypes.object.isRequired,
    result: PropTypes.object.isRequired,

    resetSession: PropTypes.func.isRequired
};

Finish.propTypes = propTypes;

export default Finish;