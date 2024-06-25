import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import QuestionsMcqUploadContainer from "../containers/QuestionsMcqUploadContainer";

const QuestionMcqUploadModal = props => {

    const {themeId} = props;

    return (
        <Modal
            id='mcqUpload'
            show={props.show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>MCQ-s [upload]</strong>
            </Alert>
            <Modal.Body>
                <QuestionsMcqUploadContainer themeId = {themeId}/>
            </Modal.Body>
        </Modal>
    );
};

QuestionMcqUploadModal.propTypes = {
    show: PropTypes.bool.isRequired,
    themeId: PropTypes.number.isRequired,
    deactivateModal: PropTypes.func.isRequired
};

export default QuestionMcqUploadModal;