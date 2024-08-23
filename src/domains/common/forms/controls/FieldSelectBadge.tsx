import React from 'react';
import {WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form";
import {Years} from "../../types/Years";
import {FormSelect} from "../../../staff/types/form/FormSelect";

type Props = {
    items?: Array<FormSelect>;
    width?: number;
    title?: string;
    badge?: string;
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
}

const initItems = [{
    "value": "",
    "label": "Select"
}];

const FieldSelectBadge: React.FC<Props> = ({
                                               items = initItems,
                                               width = 100,
                                               title = '',
                                               badge = 'Select',
                                               input,
                                               meta
                                           }) => {
    const {touched, error} = meta;
    const hasError = touched && error;

    return (
        <div className={`input-group form-group w-${width}`} title={title}>
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor={badge}>{badge}</label>
            </div>
            <select id={badge}
                    className={`custom-select ${!touched ? '' : (error || !input.value) ? 'is-invalid' : 'is-valid'}`}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => input.onChange(e)}
                    value={input.value}>
                {
                    items.map((item: Years) => <option key={item.value} value={item.value}>{item.label}</option>)
                }
            </select>
            {(hasError || !input.value) && <div className="invalid-feedback">Please, provide a valid value..</div>}
        </div>
    );
};

export default FieldSelectBadge;