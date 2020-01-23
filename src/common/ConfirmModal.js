import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";

const ConfirmModal = props => {

    const doIfConfirmed =() => {
        props.deactivateModal();
        const {params} = props;
        const paramsQuantity = params.length;
        switch (paramsQuantity) {
            case 0:
                props.doActionIfOK();
                break;
            case 1:
                props.doActionIfOK(props.params[0]);
                break;
            case 2:
                props.doActionIfOK(props.params[0], props.params[1]);
                break;
            case 3:
                props.doActionIfOK(props.params[0], props.params[1], props.params[2]);
                break;
            default: return;
        }
    }

    return (
        <Modal
            id='confirmAction'
            show={props.show}
            backdrop='static'
            keyboard={false}
            scrollable={true}
        >
            <Alert variant="warning" onClose={() => props.deactivateModal()} className="text-center m-0" dismissible>
                <strong>{props.action}</strong>
            </Alert>
            <Modal.Body>
                <div className="text-center">
                    <button type="button" className="btn btn-danger btn-sm mr-1"
                            onClick={() => props.deactivateModal()}>Cancel
                    </button>
                    <button type="button" className="btn btn-success btn-sm"
                            onClick={() => doIfConfirmed()}>
                        Confirm
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

ConfirmModal.propTypes = {
    action: PropTypes.string.isRequired,
    params: PropTypes.array.isRequired,
    doActionIfOK: PropTypes.func.isRequired,
    deactivateModal: PropTypes.func.isRequired
};

export default ConfirmModal;