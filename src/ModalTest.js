import React, { Component } from 'react';
import Modal from 'react-modal';
import Failure from './Failure';
import Spinner from './Spinner';

import PropTypes from 'prop-types';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'lightyellow',
        borderRadius: '8px'
    }
};

const API = { message: "Performing API call" };

const defaultError = "Default error";

class ModalTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: this.props.isModal,
            api: API,
            error: "Failure..."
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ isModal: true });
    }

    afterOpenModal() {
        console.log("AfterOpenModal...");
    }

    closeModal() {
        this.setState({ isModal: false });
    }

    renderModalLoading() {
        return (
            <div className="text-center">
                <Spinner message={this.state.api.message} />
                <button type="button" className="btn btn-sm btn-info mt-2" onClick={this.closeModal}>Cancel>></button>
            </div>);
    }

    renderModalError() {
        return (
            <div className="text-center">
                <div className="alert alert-danger alert-dismissible" role="alert">
                    <Failure message={this.state.error} />
                    <button type="button" className="close" aria-label="Close" onClick={this.closeModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <span>
                    <button type="button" className="btn btn-sm btn-secondary mt-2 mr-1" onClick={this.closeModal}>Re-try>></button>
                </span>
            </div>);
    }


    render() {
        return (
            <div>
                <p>Hello world!</p>
                <button onClick={this.openModal}>Show modal</button>
                <Modal
                    isOpen={this.state.isModal}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="API call"
                    ariaHideApp={false}
                    shouldCloseOnOverlayClick={false}
                    shouldCloseOnEsc={false}>
                    {(this.state.error) ? this.renderModalError() : this.renderModalLoading()}
                </Modal>
            </div>
        );
    }
}

ModalTest.propTypes = {
    isModal: PropTypes.bool.isRequired
};

export default ModalTest;