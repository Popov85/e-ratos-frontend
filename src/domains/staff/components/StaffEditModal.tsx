import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
// @ts-ignore
import UserEditContainer from "../containers/UserEditContainer";

type Props = {
    show: boolean;
    deactivateModal: () => void;
    editableStaffId?: number
}

const StaffEditModal: React.FC<Props> = ({show, editableStaffId, deactivateModal}) => {

    return (
        <Modal
            id='staffEdit'
            show={show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => deactivateModal()} className="text-center m-0" dismissible>
                <strong>Staff</strong>
                {
                    editableStaffId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <UserEditContainer staffId={editableStaffId}/>
            </Modal.Body>
        </Modal>
    );
};

export default StaffEditModal;