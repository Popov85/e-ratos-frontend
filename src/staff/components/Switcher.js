import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import AffiliationSelectorContainer from "../containers/AffiliationSelectorContainer";
import {Alert} from "react-bootstrap";

/**
 * Used to switch between departments for higher admins in a modal window!
 * @param props
 * @returns {*}
 * @constructor
 */
const Switcher = props => {

    return (
        <Modal
            id='switcher'
            show={props.show}
            backdrop='static'
            keyboard={false}
            size="sm"
            scrollable={true}
            centered>
            <Alert variant="primary" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>Please, select a department</strong>
            </Alert>
            <Modal.Body>
                <AffiliationSelectorContainer
                    afterAffiliationSelected = {props.afterAffiliationSelected}
                    afterOwnDepartmentSelected = {props.afterOwnDepartmentSelected}
                />
            </Modal.Body>
        </Modal>
    );
};

Switcher.propTypes = {
    show: PropTypes.bool.isRequired,

    deactivateModal: PropTypes.func.isRequired,
    afterAffiliationSelected: PropTypes.func.isRequired,
    afterOwnDepartmentSelected: PropTypes.func.isRequired
};

export default Switcher;