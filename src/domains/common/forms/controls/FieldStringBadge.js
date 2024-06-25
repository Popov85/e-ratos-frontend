import React from 'react';

const FieldStringBadge = props => {
    const {touched, error} = props.meta;
    const hasError = touched && error;
    return (
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text ">{props.label}</span>
                </div>
                <input type="text"
                       placeholder={props.placeholder}
                       className={`form-control ${!touched ? '' : error ? 'is-invalid': 'is-valid'}`}
                       onChange={e => props.input.onChange(e)}
                       value={props.input.value}
                />
                {hasError && <div className="invalid-feedback">{error}</div>}
            </div>
    );
};

export default FieldStringBadge;