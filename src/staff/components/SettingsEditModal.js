import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import SettingsEditContainer from "../containers/SettingsEditContainer";

const SettingsEditModal = props => {

    const {editableSetId} = props;

    return (
        <Modal
            id='settingsEdit'
            size="sm"
            show={props.show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>Settings</strong>
                {
                    editableSetId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <SettingsEditContainer setId = {editableSetId}/>
            </Modal.Body>
        </Modal>
    );
};

SettingsEditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    editableSetId: PropTypes.number, // Nullable for new objects
    deactivateModal: PropTypes.func.isRequired
};

export default SettingsEditModal;