import React, {useState} from 'react';
import HelpLookupModal from "../../components/HelpLookupModal";

const FieldHelp = props => {

    const initHelp = props.input.value;

    const initHelpSelectionMode = {mode: false, help: null};
    const [selectedHelp, setHelpSelectionMode] = useState(initHelpSelectionMode);
    const deactivateHelpSelectionModal = () => setHelpSelectionMode({...selectedHelp, mode: false});

    const selectHelp = help => {
        props.input.onChange(help);
        setHelpSelectionMode({...selectedHelp, mode: false});
    }

    if (selectedHelp.mode) return (
        <HelpLookupModal
            show={true}
            deactivateModal={deactivateHelpSelectionModal}
            selectHelp={selectHelp}/>
    );

    if (!initHelp) return (
        <div className="text-center">
            <a href="#" onClick={() => setHelpSelectionMode({...selectedHelp, mode: true})}
               className="badge badge-secondary">Add help</a>
        </div>
    );

    return (
        <div className="text-center">
              <textarea readOnly
                        rows={3}
                        className="form-control"
                        title={props.input.value.name}
                        value={props.input.value.help}
              />
            <a href="#" onClick={() => props.input.onChange(null)}
               className="badge badge-secondary">Remove help</a>
        </div>
    );

};

export default FieldHelp;