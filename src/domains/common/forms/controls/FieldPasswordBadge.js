import React from 'react';
import {FaEye, FaEyeSlash} from "react-icons/fa";

const FieldPasswordBadge = props => {
    const {touched, error} = props.meta;
    const hasError = touched && error;
    return (
        <div className="input-group form-group">
            <div className="input-group-prepend">
                <span className="input-group-text bg-info" onClick={() => props.displayPassword()}>
                    {props.showPassword ? <FaEye color="white"/> : <FaEyeSlash color="white"/>}
                </span>
            </div>
            <input type={props.showPassword ? "text" : "password"}
                   placeholder={props.placeholder}
                   className={`form-control ${!touched ? '' : error ? 'is-invalid' : 'is-valid'}`}
                   onChange={e => props.input.onChange(e)}
                   value={props.input.value}
            />
            {hasError && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default FieldPasswordBadge;