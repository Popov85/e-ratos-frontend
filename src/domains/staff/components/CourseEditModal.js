import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import CourseEditContainer from "../containers/CourseEditContainer";

const CourseEditModal = props => {

    const {editableCourseId} = props;

    return (
        <Modal
            id='courseEdit'
            show={props.show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>Course</strong>
                {
                    editableCourseId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <CourseEditContainer courseId = {editableCourseId}/>
            </Modal.Body>
        </Modal>
    );
};

CourseEditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    editableCourseId: PropTypes.number, // Nullable for new objects
    deactivateModal: PropTypes.func.isRequired
};

export default CourseEditModal;