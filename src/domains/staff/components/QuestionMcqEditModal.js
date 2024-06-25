import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import QuestionMcqEditContainer from "../containers/QuestionMcqEditContainer";

const QuestionMcqEditModal = props => {

    const {editableQuestionId, editableThemeId} = props;

    return (
        <Modal
            id='mcqEdit'
            show={props.show}
            backdrop='static'
            size='lg'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>MCQ</strong>
                {
                    editableQuestionId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <QuestionMcqEditContainer questionId = {editableQuestionId} themeId = {editableThemeId}/>
            </Modal.Body>
        </Modal>
    );
};

QuestionMcqEditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    editableQuestionId: PropTypes.number, // Nullable for new objects
    deactivateModal: PropTypes.func.isRequired
};

export default QuestionMcqEditModal;