import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import SchemeThemeEditContainer from "../containers/SchemeThemeEditContainer";

const SchemeThemeEditModal = props => {

    const {selectedThemeId, selectedTheme, fields, settings, index} = props;

    return (
        <Modal
            id='schemeThemeEdit'
            show={props.show}
            size="sm"
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>Scheme's Theme: </strong>
                {
                    settings ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <SchemeThemeEditContainer
                    themeId = {selectedThemeId}
                    theme={selectedTheme}
                    fields={fields}
                    index={index}
                    settings={settings}
                    deactivateModal = {props.deactivateModal}
                    deactivateThemesLookupModal = {props.deactivateThemesLookupModal}
                />
            </Modal.Body>
        </Modal>
    );
};

SchemeThemeEditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    index: PropTypes.number, // for editing
    settings: PropTypes.array, // for editing!
    selectedTheme: PropTypes.string,
    selectedThemeId: PropTypes.number,

    deactivateModal: PropTypes.func.isRequired,
    deactivateThemesLookupModal: PropTypes.func // for editing is absent as table lookup is skipped!
};

export default SchemeThemeEditModal;