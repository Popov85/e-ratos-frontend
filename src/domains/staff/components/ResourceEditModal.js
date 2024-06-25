import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import ResourceEditContainer from "../containers/ResourceEditContainer";

const ResourceEditModal = props => {

    const {editableResourceId} = props;

    return (
        <Modal
            id='resourceEdit'
            show={props.show}
            size='lg'
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>Resource</strong>
                {
                    editableResourceId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <ResourceEditContainer resourceId = {editableResourceId}/>
            </Modal.Body>
        </Modal>
    );
};

ResourceEditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    editableResourceId: PropTypes.number, // Nullable for new objects
    deactivateModal: PropTypes.func.isRequired
};

export default ResourceEditModal;