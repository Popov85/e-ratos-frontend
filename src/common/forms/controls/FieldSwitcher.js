import React, {useState} from 'react';

const FieldSwitcher = props => {
    const {textOn, textOff} = props;

    const initState = props.input.value;

    const [switcherState, setSwitcherState] = useState(initState);

    const doSwitch =() => {
        props.input.onChange(!switcherState);
        setSwitcherState(!switcherState);
    }

    return (
        <a href="#" className={`badge badge-${switcherState ? 'success' : 'secondary'}`} onClick={()=>doSwitch()}>
            {switcherState ? textOn : textOff}
        </a>
    );
};

export default FieldSwitcher;