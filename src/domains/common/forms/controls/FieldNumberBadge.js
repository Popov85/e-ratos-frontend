import React from 'react';

const FieldNumberBadge = props => {
    const {min, max, isSmall, marginClass, width, disabled, badge} = props;
    const {touched, error} = props.meta;
    const hasError = touched && error;

    return (
            <div className={`input-group ${isSmall ? 'input-group-sm': ''} form-group ${marginClass ? marginClass : ''}`} style={{width: width}} title={props.input.value ? props.input.value : ''}>
                <div className="input-group-prepend">
                    <label className="input-group-text">{badge}</label>
                </div>
                <input type="number" min={min} max={max}
                       placeholder={props.placeholder}
                       className={`form-control ${isSmall ? 'form-control-sm': ''} ${!touched ? '' : error ? 'is-invalid': 'is-valid'}`}
                       onChange={e => props.input.onChange(e)}
                       value={props.input.value} disabled={disabled}
                />
                {hasError && <div className="invalid-feedback">{error}</div>}
            </div>
    );
};

export default FieldNumberBadge;