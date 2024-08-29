import React from 'react';
import {WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form";

type Props = {
    placeholder?: string;
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
}

const FieldText: React.FC<Props> = props => {
    const {touched, error} = props.meta;
    const hasError = touched && error;
    return (
            <div className="input-group form-group">
                <textarea
                       placeholder={props.placeholder}
                       className={`form-control ${!touched ? '' : error ? 'is-invalid': 'is-valid'}`}
                       onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.input.onChange(e)}
                       value={props.input.value}
                />
                {hasError && <div className="invalid-feedback">{error}</div>}
            </div>
    );
};

export default FieldText;