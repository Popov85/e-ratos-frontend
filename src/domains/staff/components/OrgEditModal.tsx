import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import OrgEdit from "./OrgEdit";

type Props = {
    show: boolean;
    deactivateModal: () => void;
    editableOrgId?: number;
}

const OrgEditModal: React.FC<Props> = ({show, editableOrgId, deactivateModal}) => {

    return (
        <Modal
            id='orgEdit'
            show={show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
            centered>
            <Alert variant="info" onClose={() => deactivateModal()} className="text-center m-0" dismissible>
                <strong>Organisation</strong>
                {
                    editableOrgId ? '[edit]' : '[new]'
                }
            </Alert>
            <Modal.Body>
                <OrgEdit orgId={editableOrgId}/>
            </Modal.Body>
        </Modal>
    );
};

export default OrgEditModal;