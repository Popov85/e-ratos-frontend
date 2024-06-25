import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import Spinner from "../../common/components/Spinner";
import Failure from "../../common/components/Failure";

const StatusMod = props => {

    const {failure} = props;

    const renderHeader = () => {
        if (!failure.is) return null;
        return (<Modal.Header className="p-1" closeButton/>);
    }

    const renderLoading = () => {
        return (<Spinner message={"Operation is in progress..."} color="white"/>);
    }

    const renderFailure = () => {
        return (
            <div className="text-center">
                <Failure message={failure.message} serverError={failure.serverError}/>
                <hr/>
                <button type="button" className="btn btn-sm btn-success" onClick={() => props.closeFailure()}>
                    Close
                </button>
            </div>);
    }

    return (
        <Modal
            id={!failure.is ? 'bModal' : ''}
            show={failure.is ? failure.modal : true}
            onHide={() => props.closeFailure()}
            backdrop={failure.is ? false : 'static'}
            keyboard={false}
            size="sm"
            scrollable={true}
            centered>
            {renderHeader()}
            <Modal.Body>
                {failure.is && failure.location === "session" ? renderFailure() : renderLoading()}
            </Modal.Body>
        </Modal>
    );
};

StatusMod.propTypes = {
    failure: PropTypes.object.isRequired,

    closeFailure: PropTypes.func.isRequired
};

export default StatusMod;