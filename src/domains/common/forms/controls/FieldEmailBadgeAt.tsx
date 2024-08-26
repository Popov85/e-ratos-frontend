import React from 'react';
import {FaAt} from "react-icons/fa";
import {WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form";

type Props = {
    placeholder?: string;
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
}

const FieldEmailBadge: React.FC<Props> = props => {
    const {touched, error} = props.meta;
    const hasError = touched && error;
    return (
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text bg-info"><FaAt color="white"/></span>
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