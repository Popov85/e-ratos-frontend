import React from 'react';
import PropTypes from 'prop-types';

const FileParsingIssues = props => {

    const {questions, invalid, issues, majorIssues, mediumIssues, minorIssues, charset, allIssues} = props.report;

    return (
        <div className = "mb-3">
            <div className="row">
                <div className="col-3"/>
                <div className="col-6">
                    <div className="badge badge-secondary mb-3">
                        <u>Report</u>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                        <div className="badge badge-secondary mr-1">
                            Questions:
                        </div>
                        <div className="badge badge-light">
                            {questions}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                        <div className="badge badge-secondary mr-1">
                            Invalid:
                        </div>
                        <div className={`badge badge-${invalid > 0 ? 'danger' : 'light'}`}>
                            {invalid}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                        <div className="badge badge-secondary mr-1">
                            Issues:
                        </div>
                        <div className={`badge badge-${issues > 0 ? 'danger' : 'light'}`}>
                            {issues}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                        <div className="badge badge-secondary mr-1">
                            Major issues:
                        </div>
                        <div className={`badge badge-${majorIssues > 0 ? 'danger' : 'light'}`}>
                            {majorIssues}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                        <div className="badge badge-secondary mr-1">
                            Medium issues:
                        </div>
                        <div className={`badge badge-${mediumIssues > 0 ? 'warning' : 'light'}`}>
                            {mediumIssues}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                        <div className="badge badge-secondary mr-1">
                            Minor issues:
                        </div>
                        <div className={`badge badge-${minorIssues > 0 ? 'secondary' : 'light'}`}>
                            {minorIssues}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                        <div className="badge badge-secondary mr-1">
                            Charset:
                        </div>
                        <div className="badge badge-light">
                            {charset}
                        </div>
                    </div>
                </div>
                <div className="col-3"/>
            </div>
            <details className="bg-light">
                <summary className="badge badge-light">Details</summary>
                <small>
                    {
                        allIssues && allIssues.length > 0 &&
                        allIssues.map((i, index) => <div key={index}>Issue #{index}: {i.description} [{i.severity}] row: [{i.row}]; </div>)
                    }
                </small>
            </details>
        </div>
    );
};

FileParsingIssues.propTypes = {
    report: PropTypes.shape({
        questions: PropTypes.number.isRequired,
        issues: PropTypes.number.isRequired,
        majorIssues: PropTypes.number.isRequired,
        mediumIssues: PropTypes.number.isRequired,
        minorIssues: PropTypes.number.isRequired,
        charset: PropTypes.string.isRequired,
        saved: PropTypes.bool.isRequired,
        allIssues: PropTypes.array
    })
};

export default FileParsingIssues;