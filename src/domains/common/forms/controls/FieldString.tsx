import React from 'react';
import {WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form";

type Props = {
    marginClass?: string;
    sizeClass?: string;
    placeholder?: string;
    disabled?: boolean;
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
}

const FieldString: React.FC<Props> = ({
                                          sizeClass = '',
                                          marginClass = '',
                                          disabled = false,
                                          placeholder = 'Value',
                                          input,
                                          meta
                                      }) => {
    const {touched, error} = meta;
    const hasError = touched && error;
    return (
        <div className={`input-group form-group ${marginClass}`} title={input.value || ''}>
            <input type="text"
                   placeholder={placeholder}
                   className={`form-control ${sizeClass} ${!touched ? '' : error ? 'is-invalid' : 'is-valid'}`}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => input.onChange(e)}
                   value={input.value} disabled={disabled}
            />
            {hasError && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default FieldString;