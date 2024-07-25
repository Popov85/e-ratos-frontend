import React from 'react';
import {FaUser} from "react-icons/fa";
import {WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form";

type Props = {
    placeholder?: string;
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
}

const FieldEmailBadge: React.FC<Props> = ({placeholder = 'name@example.com', input, meta}) => {
    const {touched, error} = meta;
    const hasError = touched && error;
    return (
        <div className="input-group form-group">
            <div className="input-group-prepend">
                <span className="input-group-text bg-info"><FaUser color="white"/></span>
            </div>
            <input type="email"
                   placeholder={placeholder}
                   className={`form-control ${!touched ? '' : error ? 'is-invalid' : 'is-valid'}`}
                   onChange={e => input.onChange(e)}
                   value={input.value}
            />
            {hasError && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default FieldEmailBadge;