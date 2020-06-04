import React from 'react';

const FieldStringWidth = props => {
    const {sizeClass, marginClass, width, maxLength, disabled} = props;
    const {touched, error} = props.meta;
    const hasError = touched && error;
    return (
            <div className={`input-group form-group ${marginClass ? marginClass : ''}`} style={{width: width}} title={props.input.value ? props.input.value : ''}>
                <input type="text" maxLength={maxLength}
                       placeholder={props.placeholder}
                       className={`form-control ${sizeClass ? sizeClass : ''} ${!touched ? '' : error ? 'is-invalid': 'is-valid'}`}
                       onChange={e => props.input.onChange(e)}
                       value={props.input.value} disabled={disabled}/>
                {hasError && <div className="invalid-feedback">{error}</div>}
            </div>
    );
};

export default FieldStringWidth;