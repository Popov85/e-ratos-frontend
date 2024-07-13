import React from 'react';
import PropTypes from 'prop-types';
import Header from "../../../common/components/Header";
import ResourcePreloader from "../../../staff/components/ResourcePreloader";

const QuestionCheckedComponent = (props) => {

    const {checkedResponse} = props;

    const renderResources = () => {
        const {resource} = props.checkedResponse.question;
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

    return (
        <div>
            <Header title={'RESULT=' + checkedResponse.score + '%'}
                    color={`alert-${checkedResponse.score > 0 ? 'success' : 'danger'}`} widely={true}/>
            <div className="row text-center border rounded ml-0 mr-0 mt-0 mb-1 ">
                <div className="col-12 pl-0 pr-0 pt-0 pb-0">
                    <h6 className="text-secondary text-center m-0 p-0" style={{fontSize: props.fontSize + 'px'}}
                        title={"Level: " + checkedResponse.question.level + " | " + "required: " + checkedResponse.question.required}>
                        {checkedResponse.question.question}
                    </h6>
                </div>
            </div>
            {renderResources()}
        </div>
    );
}

const propTypes = {
    checkedResponse: PropTypes.object.isRequired,
    fontSize: PropTypes.number.isRequired
};

QuestionCheckedComponent.propTypes = propTypes;

export default QuestionCheckedComponent;