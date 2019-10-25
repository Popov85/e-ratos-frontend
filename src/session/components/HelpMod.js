import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";

const HelpMod = props => {

    // TODO: what if content contains multimedia?
    const renderContent = () => {
        return <p className="text-secondary">{props.content.help}</p>
    }

    return (
        <Modal
            show={props.show}
            onHide={() => props.hideHelp()}
            backdrop={false}
            keyboard={false}
            size="md"
            scrollable={true}
            centered>
            <Modal.Header
                className="text-secondary p-1"
                closeButton>
                <strong>HELP</strong>
            </Modal.Header>
            <Modal.Body>
                {props.show ? renderContent() : null}
            </Modal.Body>
        </Modal>
    );
};

HelpMod.propTypes = {
    show: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired,

    hideHelp: PropTypes.func.isRequired
};

export default HelpMod;