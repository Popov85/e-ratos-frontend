import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import DepEdit from "./DepEdit";

type Props = {
    show: boolean;
    deactivateModal: () => void;
    editableDepId?: number;
}

const DepEditModal: React.FC<Props> = ({show, deactivateModal, editableDepId}) => {

    return (
        <Modal
            id='depEdit'
            show={show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => deactivateModal()} className="text-center m-0" dismissible >
                <strong>Department</strong>
                {
                    editableDepId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <DepEdit depId = {editableDepId}/>
            </Modal.Body>
        </Modal>
    );
};

export default DepEditModal;