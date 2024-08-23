import React, {useState} from 'react';
import {WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form";

type Props = {
    placeholder?: string;
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
}

const FieldPassword: React.FC<Props> = ({placeholder = 'Password', input, meta}) => {

    // TODO: add functionality to display password if needed!
    const [showPassword, setShowPassword] = useState(false);

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