import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Alert} from "react-bootstrap";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {getHelp} from "../selectors/sessionSelector";
import {RootState} from "../../../store/rootReducer";
import {Help} from "../types/Help";
import {hideHelp} from "../actions/sessionActions";

const HelpMod: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const helpIsPresent: boolean = useSelector((state: RootState) => state.session.session.help);

    const help: Help | null = useSelector((state: RootState) => getHelp(state));

    // TODO: what if content contains multimedia? props.content.help fix!
    const renderContent = () => {
        return <p className="text-secondary">{help!.help}</p>
    }

    return (
            <Modal
                show={helpIsPresent}
                onHide={() => dispatch(hideHelp())}
                backdrop={false}
                keyboard={false}
                scrollable={true}>
                <Alert variant="warning" onClose={() => dispatch(hideHelp())} className="text-center m-0" dismissible>
                    <strong>HELP</strong>
                </Alert>
                <Modal.Body>
                    {(helpIsPresent && help) ? renderContent() : null}
                </Modal.Body>
            </Modal>
    );
};

export default HelpMod;