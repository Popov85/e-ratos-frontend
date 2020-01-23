import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import UserEditContainer from "../containers/UserEditContainer";

const StaffEditModal = props => {

    const {editableStaffId} = props;

    return (
        <Modal
            id='staffEdit'
            show={props.show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible >
                <strong>Staff</strong>
                {
                    editableStaffId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <UserEditContainer staffId = {editableStaffId}/>
            </Modal.Body>
        </Modal>
    );
};

StaffEditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    editableStaffId: PropTypes.number, // Nullable for new objects
    deactivateModal: PropTypes.func.isRequired
};

export default StaffEditModal;