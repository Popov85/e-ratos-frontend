import React from 'react';

const FieldEmail = props => {
    const {touched, error} = props.meta;
    const hasError = touched && error;
    return (
            <div className="input-group form-group">
                <input type="email"
                       placeholder={props.placeholder}
                       className={`form-control ${!touched ? '' : error ? 'is-invalid': 'is-valid'}`}
                       onChange={e => props.input.onChange(e)}
                       value={props.input.value}
                />
                {hasError && <div className="invalid-feedback">{error}</div>}
            </div>
    );
};

export default FieldEmail;