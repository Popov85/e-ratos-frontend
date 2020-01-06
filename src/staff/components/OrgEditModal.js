import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import OrgEditContainer from "../containers/OrgEditContainer";

const OrgEditModal = props => {

    const {editableOrgId} = props;

    return (
        <Modal
            id='orgEdit'
            show={props.show}
            backdrop='static'
            keyboard={false}
            size="sm"
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible>
                <strong>Organisation</strong>
                {
                    editableOrgId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <OrgEditContainer editableOrgId = {editableOrgId}/>
            </Modal.Body>
        </Modal>
    );
};

OrgEditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    editableOrgId: PropTypes.number, // Nullable for new objects
    deactivateModal: PropTypes.func.isRequired
};

export default OrgEditModal;