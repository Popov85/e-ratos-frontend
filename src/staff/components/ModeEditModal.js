import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import ModeEditContainer from "../containers/ModeEditContainer";

const ModeEditModal = props => {

    const {editableModeId} = props;

    return (
        <Modal
            id='modeEdit'
            size="sm"
            show={props.show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>Mode</strong>
                {
                    editableModeId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <ModeEditContainer modeId = {editableModeId}/>
            </Modal.Body>
        </Modal>
    );
};

ModeEditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    editableModeId: PropTypes.number, // Nullable for new objects
    deactivateModal: PropTypes.func.isRequired
};

export default ModeEditModal;