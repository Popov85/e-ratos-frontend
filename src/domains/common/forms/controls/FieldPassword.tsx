import React, {useState} from 'react';
import {WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form";

type Props = {
    placeholder?: string;
    showPassword: boolean;
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
}

const FieldPassword: React.FC<Props> = ({placeholder = 'Password', showPassword, input, meta}) => {

    const {touched, error} = meta;
    const hasError = touched && error;
    return (
        <div className="input-group form-group">
            <input type={showPassword ? "text" : "password"}
                   placeholder={placeholder}
                   className={`form-control ${!touched ? '' : error ? 'is-invalid' : 'is-valid'}`}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => input.onChange(e)}
                   value={input.value}
            />
            {hasError && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default FieldPassword;