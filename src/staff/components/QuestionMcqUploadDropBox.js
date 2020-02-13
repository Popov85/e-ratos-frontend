import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dropzone from "react-dropzone";
import {FaSignInAlt} from "react-icons/fa";
import FileParsingIssues from "./FileParsingIssues";

class QuestionMcqUploadDropBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: null,
            fileBytes: null,
            fileSize: null
        }
    }

    convertToBytes(acceptedFiles) {
        if (acceptedFiles.length === 0) return;
        let file = acceptedFiles[0];
        const {name, size} = file;
        this.setState({fileName: name, fileSize: size, fileBytes: file});
    }

    clearDropBox() {
        this.props.clearQuestionMcqState();
        this.setState({fileName: null, fileBytes: null, fileSize: null});
    }

    render() {
        const {report, finished, disabled} = this.props;
        const confirmed = report ? true : false;
        const {fileName, fileSize, fileBytes} = this.state;
        return (
            <div>
                <Dropzone
                    onDrop={acceptedFiles => this.convertToBytes(acceptedFiles)}
                    accept=".txt,.rtp,.xtt"
                    maxSize={1000000}
                    multiple={false}
                    noDragEventsBubbling={true}
                    disabled={finished || disabled}>
                    {({getRootProps, getInputProps, isDragReject}) => (
                        <section>
                            <div {...getRootProps()} className="border pb-5">
                                <input {...getInputProps()}/>
                                <div className="text-center text-secondary">
                                    {
                                        fileName ?
                                            `Selected file: ${fileName} [${fileSize / 1000}Kb]`
                                            : !isDragReject ? 'Drag-and-drop a .txt/.rtp/.xtt file here, or click to select a file' : 'File is not accepted, sorry!'
                                    }

                                </div>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <div className="text-center mt-1 mb-n3">
                    {
                        report &&
                        <FileParsingIssues report={report}/>
                    }
                    <button type="button" value="Save" className="btn btn-sm btn-success mr-2"
                            onClick={() => this.props.onSubmit(fileBytes, confirmed)} disabled={finished || disabled}>
                        <div className="align-middle">
                            {confirmed ? 'Confirm' : 'Save'}&nbsp; <FaSignInAlt color="white"/>
                        </div>
                    </button>
                    <div className="text-center mt-2" hidden={false}>
                        <a href="#" className="badge badge-secondary"
                           onClick={() => this.clearDropBox()}>
                            Reset
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

QuestionMcqUploadDropBox.propTypes = {
    finished: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    report: PropTypes.object, // nullable if first round trip
    clearQuestionMcqState: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default QuestionMcqUploadDropBox;