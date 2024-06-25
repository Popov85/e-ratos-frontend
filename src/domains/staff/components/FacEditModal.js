import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import FacEditContainer from "../containers/FacEditContainer";

const FacEditModal = props => {

    const {editableFacId} = props;

    return (
        <Modal
            id='facEdit'
            show={props.show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>Faculty</strong>
                {
                    editableFacId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <FacEditContainer facId = {editableFacId}/>
            </Modal.Body>
        </Modal>
    );
};

FacEditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    editableFacId: PropTypes.number, // Nullable for new objects
    deactivateModal: PropTypes.func.isRequired
};

export default FacEditModal;