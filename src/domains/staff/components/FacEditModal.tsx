import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import FacEdit from "./FacEdit";

type Props = {
    show: boolean;
    deactivateModal: () => void;
    editableFacId?: number;
}

const FacEditModal: React.FC<Props> = ({show, editableFacId, deactivateModal}) => {

    return (
        <Modal
            id='facEdit'
            show={show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => deactivateModal()} className="text-center m-0" dismissible>
                <strong>Faculty</strong>
                {
                    editableFacId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <FacEdit facId={editableFacId}/>
            </Modal.Body>
        </Modal>
    );
};

export default FacEditModal;