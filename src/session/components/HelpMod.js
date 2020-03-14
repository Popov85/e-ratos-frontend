import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";

const HelpMod = props => {

    // TODO: what if content contains multimedia? props.content.help fix!
    const renderContent = () => {
        return <p className="text-secondary">{props.content}</p>
    }

    return (
            <Modal
                show={props.show}
                onHide={() => props.hideHelp()}
                backdrop={false}
                keyboard={false}
                size="md"
                scrollable={true}>
                <Alert variant="warning" onClose={() => props.hideHelp()} className="text-center m-0" dismissible>
                    <strong>HELP</strong>
                </Alert>
                <Modal.Body>
                    {props.show ? renderContent() : null}
                </Modal.Body>
            </Modal>
    );
};

HelpMod.propTypes = {
    show: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    hideHelp: PropTypes.func.isRequired
};

export default HelpMod;