import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";

type Props = {
    show: boolean;
    action: string;
    params: Array<any>;
    doActionIfOK?: (...args: any[]) => void;
    deactivateModal: () => void;
}

const ConfirmModal: React.FC<Props> = ({show, action, params, doActionIfOK, deactivateModal}) => {

    const doIfConfirmed = (): void => {
        deactivateModal();
        if (doActionIfOK) {
            doActionIfOK(...params);
        }
    }

    return (
        <Modal
            id='confirmAction'
            show={show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
        >
            <Alert variant="warning" onClose={deactivateModal} className="text-center m-0" dismissible>
                <strong>{action}</strong>
            </Alert>
            <Modal.Body>
                <div className="text-center">
                    <button type="button" className="btn btn-danger btn-sm mr-1"
                            onClick={deactivateModal}>Cancel
                    </button>
                    <button type="button" className="btn btn-success btn-sm"
                            onClick={doIfConfirmed}>
                        Confirm
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmModal;