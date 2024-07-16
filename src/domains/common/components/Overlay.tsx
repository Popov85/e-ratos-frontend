import React from 'react';
import Modal from "react-bootstrap/Modal";
import Spinner from "./Spinner";

type Props = {
    show: boolean
}

const Overlay: React.FC<Props> = ({show}) => {

    return (
        <Modal
            id="sModal"
            show={show}
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


export default Overlay;