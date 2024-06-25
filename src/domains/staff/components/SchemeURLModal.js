import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Modal} from "react-bootstrap";
import {FaRegCopy} from "react-icons/fa";

const SchemeURLModal = ({show, schemeId, deactivateModal}) => {

    const baseUrl = process.env.E_RATOS_BASE_URL;

    const schemeUrl = baseUrl+"/session?schemeId="+schemeId;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(schemeUrl).then(() => {
            console.log("URL copied to clipboard!");
        });
    };

    return (
        <Modal id='copyURLModal'
               show={show}
               backdrop='static'
               keyboard={false}
               scrollable={false}
        >
            <Alert variant="warning" onClose={() => deactivateModal()} className="text-center m-0" dismissible>
                <strong>URL copy</strong>
            </Alert>
            <Modal.Body>
                <div className="input-group">
                    <input type="text" className="form-control" value={schemeUrl} readOnly/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={copyToClipboard}>
                            <FaRegCopy/> Copy
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

SchemeURLModal.propTypes = {
    show: PropTypes.bool.isRequired,
    schemeId: PropTypes.number.isRequired,

    deactivateModal: PropTypes.func.isRequired
};

export default SchemeURLModal;