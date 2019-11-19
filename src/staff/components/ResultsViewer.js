import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ResultsViewer extends Component {
    componentDidMount() {
        // TODO: here goes API all to fetch detailed (serialised) user results
    }

    render() {
        return (
            <div>
                Here comes all the detailed user result, resultId = {this.props.resultId}
            </div>
        );
    }
}

ResultsViewer.propTypes = {
    resultId: PropTypes.number.isRequired
};

export default ResultsViewer;