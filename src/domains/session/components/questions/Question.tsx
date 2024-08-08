import React from 'react';
import {FaCompress, FaEraser, FaExpand, FaMinus, FaPlus} from 'react-icons/fa';
// @ts-ignore
import ResourcePreloader from "../../../staff/components/ResourcePreloader";
import {getQuestion} from "../../selectors/sessionSelector";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/rootReducer";
import {BaseQuestion} from "../../types/questions/BaseQuestion";
import {setExpanded, setFontSize} from "../../actions/sessionActions";
import {utilsHTML} from "../../../../utils/utilsHTML";

type Props = {
    clearResponse: () => void;
}

const Question: React.FC<Props> = ({clearResponse}) => {

    const dispatch: Dispatch<any> = useDispatch();

    const question: BaseQuestion | null = useSelector((state: RootState) => getQuestion(state));
    const expanded: boolean = useSelector((state: RootState) => state.session.session.expanded);
    const fontSize: number = useSelector((state: RootState) => state.session.session.fontSize);

    if (!question) return null;

    const renderTitle = () => {
        return "Level: " + question.level + " | " + "required: " + question.required;
    }

    const renderResources = () => {
        const {resource} = question;
        if (!resource) return null;
        return (
            <div className="text-center">
                <ResourcePreloader
                    message="Loading.."
                    url={resource.link}
                    width={resource.width}
                    height={resource.height}/>
            </div>);
    }

    const {serialNumber, level} = question;

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center justify-content-start">
                            <span title="Serial number in individual sequence"
                                  className="badge badge-secondary border p-1">
                                #{serialNumber ? serialNumber : 1}
                            </span>
                            <a href="#" className="badge badge-secondary border"
                               onClick={() => clearResponse()} title="Clear your answer">
                                <FaEraser color="white"/>
                            </a>
                            <a href="#" className="badge badge-secondary border"
                               onClick={() => dispatch(setExpanded())} title="Expand/compress">
                                {expanded ? <FaCompress/> : <FaExpand/>}
                            </a>
                            <a href="#" className="badge badge-secondary border"
                               onClick={() => dispatch(setFontSize())} title="Increate/Decrease size">
                                {fontSize < 24 ? <FaPlus/> : <FaMinus/>}
                            </a>
                        </div>
                        <div
                            className={`badge badge-${level === 1 ? 'secondary' : (level === 2) ? 'warning' : 'danger'} border p-1`}>
                            Level: <u>{level}</u>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row text-center border rounded ml-0 mr-0 mt-0 mb-1 ">
                <div className="col-12 pl-0 pr-0 pt-1 pb-1">
                    <h6 className="text-secondary text-center p-0 m-0"
                        title={renderTitle()}>
                        <span style={{fontSize: fontSize + 'px'}}
                              dangerouslySetInnerHTML={utilsHTML.createMarkup(question.question)}/>
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    {renderResources()}
                </div>
            </div>

        </div>
    );
}

export default Question;