import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import ResourcesLookupContainer from "../containers/ResourcesLookupContainer";

const ResourceLookupModal = props => {

    return (
        <Modal
            id='resourceLookup'
            show={props.show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>Add resource</strong>
            </Alert>
            <Modal.Body>
                <ResourcesLookupContainer selectResource = {props.selectResource}/>
            </Modal.Body>
        </Modal>
    );
};

ResourceLookupModal.propTypes = {
    show: PropTypes.bool.isRequired,
    selectResource: PropTypes.func.isRequired,
    deactivateModal: PropTypes.func.isRequired
};

export default ResourceLookupModal;