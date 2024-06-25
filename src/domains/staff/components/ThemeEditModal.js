import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import ThemeEditContainer from "../containers/ThemeEditContainer";

const ThemeEditModal = props => {

    const {editableThemeId} = props;

    return (
        <Modal
            id='themeEdit'
            show={props.show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>Theme</strong>
                {
                    editableThemeId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <ThemeEditContainer themeId = {editableThemeId}/>
            </Modal.Body>
        </Modal>
    );
};

ThemeEditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    editableThemeId: PropTypes.number, // Nullable for new objects
    deactivateModal: PropTypes.func.isRequired
};

export default ThemeEditModal;