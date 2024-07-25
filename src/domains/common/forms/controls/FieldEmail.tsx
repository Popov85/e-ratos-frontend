import React from 'react';
import {WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form";

type Props = {
    placeholder?: string;
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
}

const FieldEmail: React.FC<Props> = ({placeholder = 'name@example.com', input, meta}) => {
    const {touched, error} = meta;
    const hasError = touched && error;
    return (
        <div className="input-group form-group">
            <input type="email"
                   placeholder={placeholder}
                   className={`form-control ${!touched ? '' : error ? 'is-invalid' : 'is-valid'}`}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => input.onChange(e)}
                   value={input.value}
            />
            {hasError && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default FieldEmail;