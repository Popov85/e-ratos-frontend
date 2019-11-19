import React from 'react';
const initItems = {
    "value":"",
    "label": "Select"
};
const FieldSelectBadge = props => {
    const {touched, error} = props.meta;
    const hasError = touched && error;
    let items = props.items;

    if (!items || items.length===0) items = initItems;

    return (
        <div className={`input-group form-group w-${props.width ? props.width : 100}`} title = {props.title}>
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor={props.badge}>{props.badge}</label>
            </div>
            <select id={props.badge}
                    className={`custom-select ${!touched ? '' : error ? 'is-invalid' : 'is-valid'}`}
                    onChange={e => props.input.onChange(e)}
                    value={props.input.value}>
                {
                    items.map(item => <option key={item.value} value={item.value}>{item.label}</option>)
                }
            </select>
            {hasError && <div className="invalid-feedback">Please, provide a valid value..</div>}
        </div>
    );
};

export default FieldSelectBadge;