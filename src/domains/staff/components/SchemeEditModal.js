import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import SchemeEditContainer from "../containers/SchemeEditContainer";

const SchemeEditModal = props => {

    const {editableSchemeId} = props;

    return (
        <Modal
            id='schemeEdit'
            show={props.show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            size='xl'
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>Scheme</strong>
                {
                    editableSchemeId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <SchemeEditContainer schemeId = {editableSchemeId}/>
            </Modal.Body>
        </Modal>
    );
};

SchemeEditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    editableSchemeId: PropTypes.number, // Nullable for new objects
    deactivateModal: PropTypes.func.isRequired
};

export default SchemeEditModal;