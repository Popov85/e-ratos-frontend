import React, {useState} from 'react';
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form";

type Props = {
    placeholder?: string;
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
}

const FieldPasswordBadge: React.FC<Props> = ({placeholder='Password', input, meta}) => {

    const [showPassword, setShowPassword] = useState(false);

    const {touched, error} = meta;
    const hasError = touched && error;
    return (
        <div className="input-group form-group">
            <div className="input-group-prepend">
                <span className="input-group-text bg-info" onClick={() => setShowPassword(!showPassword) }>
                    {showPassword ? <FaEye color="white"/> : <FaEyeSlash color="white"/>}
                </span>
            </div>
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

export default FieldPasswordBadge;