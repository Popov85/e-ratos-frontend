import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import LmsEdit from "./LmsEdit";

type Props = {
    show: boolean;
    deactivateModal: () => void;
    editableLmsId?: number;
}

const LmsEditModal: React.FC<Props> = ({show, editableLmsId, deactivateModal}) => {

    return (
        <Modal
            id='lmsEdit'
            show={show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => deactivateModal()} className="text-center m-0" dismissible >
                <strong>LMS</strong>
                {
                    editableLmsId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <LmsEdit lmsId = {editableLmsId}/>
            </Modal.Body>
        </Modal>
    );
};

export default LmsEditModal;