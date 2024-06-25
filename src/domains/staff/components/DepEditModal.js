import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import DepEditContainer from "../containers/DepEditContainer";

const DepEditModal = props => {

    const {editableDepId} = props;

    return (
        <Modal
            id='depEdit'
            show={props.show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>Department</strong>
                {
                    editableDepId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <DepEditContainer depId = {editableDepId}/>
            </Modal.Body>
        </Modal>
    );
};

DepEditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    editableDepId: PropTypes.number, // Nullable for new objects
    deactivateModal: PropTypes.func.isRequired
};

export default DepEditModal;