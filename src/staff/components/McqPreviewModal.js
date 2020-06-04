import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import PreviewMcqQuestionContainer from "../containers/PreviewMcqQuestionContainer";

const McqPreviewModal = props => {

    const {previewThemeId, previewMcqQuestionId} = props;

    return (
        <Modal
            id='mcqEdit'
            show={props.show}
            size='lg'
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>MCQ [preview]</strong>
            </Alert>
            <Modal.Body>
                <PreviewMcqQuestionContainer themeId={previewThemeId} questionId = {previewMcqQuestionId}/>
            </Modal.Body>
        </Modal>
    );
};

McqPreviewModal.propTypes = {
    show: PropTypes.bool.isRequired,
    previewThemeId: PropTypes.number.isRequired,
    previewMcqQuestionId: PropTypes.number.isRequired,
    deactivateModal: PropTypes.func.isRequired
};

export default McqPreviewModal;