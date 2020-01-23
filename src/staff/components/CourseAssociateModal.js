import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import CourseAssociateContainer from "../containers/CourseAssociateContainer";

const CourseAssociateModal = props => {

    const {associatableCourseId} = props;

    return (
        <Modal
            id='courseAssociate'
            show={props.show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>Course-LMS associate</strong>
            </Alert>
            <Modal.Body>
                <CourseAssociateContainer courseId = {associatableCourseId}/>
            </Modal.Body>
        </Modal>
    );
};

CourseAssociateModal.propTypes = {
    show: PropTypes.bool.isRequired,
    associatableCourseId: PropTypes.number.isRequired,
    deactivateModal: PropTypes.func.isRequired
};

export default CourseAssociateModal;