import React from 'react';

const FieldCheckbox = props => {
    const {label, name} = props;
    const {touched, error} = props.meta;
    const hasError = touched && error;
    return (
        <div className="form-check">
            <input type="checkbox"
                   className="form-check-input"
                   onChange={e => props.input.onChange(e)}
                   value={props.input.value}/>
                <label className="form-check-label" htmlFor={name}>
                    {label ? label : ''}
                </label>
        </div>);
};

export default FieldCheckbox;