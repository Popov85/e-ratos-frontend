import React from 'react';
import Modal from "react-bootstrap/Modal";
import Spinner from "../../common/components/Spinner";
import Failure from "../../common/components/Failure";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {closeFailure} from "../actions/failureActions";
import {ServerError} from "../../common/types/ServerError";

const StatusMod: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const failureIsPresent: boolean = useSelector((state: RootState) => state.session.failure.is);
    const failureModal: boolean = useSelector((state: RootState) => state.session.failure.modal);
    const failureMessage: string | null = useSelector((state: RootState) => state.session.failure.message);
    const failureServerError: ServerError | string | null = useSelector((state: RootState) => state.session.failure.serverError);
    const failureLocation: string | null = useSelector((state: RootState) => state.session.failure.location);


    const renderHeader = () => {
        if (!failureIsPresent) return null;
        return (<Modal.Header className="p-1" closeButton/>);
    }

    const renderLoading = () => {
        return (<Spinner message={"Operation is in progress..."} color="white"/>);
    }

    const renderFailure = () => {
        if (!failureMessage && !failureServerError) return null;
        return (
            <div className="text-center">
                <Failure message={failureMessage ?? undefined} serverError={failureServerError ?? undefined}/>
                <hr/>
                <button type="button" className="btn btn-sm btn-success" onClick={() => dispatch(closeFailure())}>
                    Close
                </button>
            </div>);
    }

    return (
        <Modal
            id={!failureIsPresent ? 'bModal' : ''}
            show={failureIsPresent ? failureModal : true}
            onHide={() => dispatch(closeFailure())}
            backdrop={failureIsPresent ? false : 'static'}
            keyboard={false}
            size="sm"
            scrollable={true}
            centered>
            {renderHeader()}
            <Modal.Body>
                {failureIsPresent && failureLocation === "session" ? renderFailure() : renderLoading()}
            </Modal.Body>
        </Modal>
    );
};
export default StatusMod;