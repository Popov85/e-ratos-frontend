import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import CourseEdit from "./CourseEdit";

type Props = {
    show: boolean;
    deactivateModal: () => void;
    editableCourseId?: number;
}

const CourseEditModal: React.FC<Props> = ({show, deactivateModal, editableCourseId}) => {

    return (
        <Modal
            id='courseEdit'
            show={show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => deactivateModal()} className="text-center m-0" dismissible>
                <strong>Course</strong>
                {
                    editableCourseId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <CourseEdit courseId={editableCourseId}/>
            </Modal.Body>
        </Modal>
    );
};

export default CourseEditModal;