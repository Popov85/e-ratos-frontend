import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import HelpEditContainer from "../containers/HelpEditContainer";

const HelpEditModal = props => {

    const {editableHelpId} = props;

    return (
        <Modal
            id='helpEdit'
            show={props.show}
            size='lg'
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>Help</strong>
                {
                    editableHelpId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <HelpEditContainer helpId = {editableHelpId}/>
            </Modal.Body>
        </Modal>
    );
};

HelpEditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    editableHelpId: PropTypes.number, // Nullable for new objects
    deactivateModal: PropTypes.func.isRequired
};

export default HelpEditModal;