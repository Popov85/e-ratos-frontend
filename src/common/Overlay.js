import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import Spinner from "./Spinner";

const Overlay = props => {

    return (
        <Modal
            id="sModal"
            show={props.show}
            backdrop="static"
            keyboard={false}
            size="sm"
            centered>
            <Modal.Body>
                <Spinner message={"Operation is in progress..."} color="white"/>
            </Modal.Body>
        </Modal>
    );
};

Overlay.propTypes = {
    show: PropTypes.bool.isRequired
};

export default Overlay;