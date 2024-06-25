import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import ThemesLookupContainer from "../containers/ThemesLookupContainer";

const ThemeLookupModal = props => {

    return (
        <Modal
            id='themeLookup'
            show={props.show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>Add Theme</strong>
            </Alert>
            <Modal.Body>
                <ThemesLookupContainer fields = {props.fields} deactivateThemesLookupModal = {props.deactivateModal}/>
            </Modal.Body>
        </Modal>
    );
};

ThemeLookupModal.propTypes = {
    show: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired, // When a theme is selected, just do: fields.push(theme);
    deactivateModal: PropTypes.func.isRequired
};

export default ThemeLookupModal;