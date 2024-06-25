import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import HelpsLookupContainer from "../containers/HelpsLookupContainer";

const HelpLookupModal = props => {

    return (
        <Modal
            id='helpLookup'
            show={props.show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>Add help</strong>
            </Alert>
            <Modal.Body>
                <HelpsLookupContainer selectHelp = {props.selectHelp}/>
            </Modal.Body>
        </Modal>
    );
};

HelpLookupModal.propTypes = {
    show: PropTypes.bool.isRequired,
    selectHelp: PropTypes.func.isRequired,
    deactivateModal: PropTypes.func.isRequired
};

export default HelpLookupModal;