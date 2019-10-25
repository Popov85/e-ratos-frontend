import React from 'react';
import PropTypes from 'prop-types';
import Header from "../../../common/Header";

const QuestionCheckedComponent = (props) => {

    const {checkedResponse} = props;

    // TODO: add iframe for image
    const renderResources = () => {
        return null;
        /*if (!this.state.isResource) return null;
        if (!this.props.checkedResponse.question.resourceDomains) return null;
        return <Resource resource={this.props.checkedResponse.question.resourceDomains[0].link} />*/
    }

    return (
        <div>
            <Header title={'RESULT=' + checkedResponse.score + '%'}
                    color={`alert-${checkedResponse.score > 0 ? 'success' : 'danger'}`} widely={true}/>
            <div className="row text-center border rounded ml-0 mr-0 mt-0 mb-1 ">
                <div className="col-12 pl-0 pr-0 pt-0 pb-0">
                    <h6 className="text-secondary text-center m-0 p-0"
                        title={"level: " + checkedResponse.question.level + " | " + "lang: " + checkedResponse.question.lang + " | " + "required: " + checkedResponse.question.required}>
                        {checkedResponse.question.question}
                    </h6>
                </div>
            </div>
            {renderResources()}
        </div>
    );
}

const propTypes = {
    checkedResponse: PropTypes.object.isRequired
};

QuestionCheckedComponent.propTypes = propTypes;

export default QuestionCheckedComponent;