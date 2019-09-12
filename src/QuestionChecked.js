import React from 'react';
import PropTypes from 'prop-types';
import Resource from './Resource';
import Header from './Header';

import '../main.css';

export default class QuestionChecked extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isResource: false
        }
    }

    renderResources() {
        if (!this.state.isResource) return null;
        if (!this.props.checkedResponse.question.resourceDomains) return null;
        return <Resource resource={this.props.checkedResponse.question.resourceDomains[0].link} />
    }

    render() {
        const { checkedResponse } = this.props;
        return (
            <div>
                <Header title={'RESULT=' + checkedResponse.score + '%'} color={`alert-${checkedResponse.score > 0 ? 'success' : 'danger'}`} widely={true} />
                <div className="row text-center border rounded ml-0 mr-0 mt-1 mb-1 ">
                    <div className="col-12 pl-0 pr-0 pt-2 pb-2">
                        <h6 className="text-secondary text-center p-0"
                            title={"level: " + checkedResponse.question.level + " | " + "lang: " + checkedResponse.question.lang + " | " + "required: " + checkedResponse.question.required}>
                            {checkedResponse.question.question}
                        </h6>
                    </div>
                </div>
                {this.renderResources()}
            </div>
        );
    }
}

const propTypes = {
    checkedResponse: PropTypes.object.isRequired
};

QuestionChecked.propTypes = propTypes;