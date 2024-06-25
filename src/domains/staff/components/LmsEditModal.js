import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import LmsEditContainer from "../containers/LmsEditContainer";

const LmsEditModal = props => {

    const {editableLmsId} = props;

    return (
        <Modal
            id='lmsEdit'
            show={props.show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>LMS</strong>
                {
                    editableLmsId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <LmsEditContainer lmsId = {editableLmsId}/>
            </Modal.Body>
        </Modal>
    );
};

LmsEditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    editableLmsId: PropTypes.number, // Nullable for new objects
    deactivateModal: PropTypes.func.isRequired
};

export default LmsEditModal;