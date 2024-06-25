import React from 'react';
import {FaUser} from "react-icons/fa";

const FieldEmailBadge = props => {
    const {touched, error} = props.meta;
    const hasError = touched && error;
    return (
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text bg-info"><FaUser color="white"/></span>
                </div>
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

export default FieldEmailBadge;