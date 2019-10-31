import React from 'react';

const FieldSelectBadge = props => {
    const {touched, error} = props.meta;
    const hasError = touched && error;
    if (!props.items || props.items.length===0) throw new Error("No elements in the list to display");
    //console.log("FieldSelectBadge", props);

    return (
        <div className={`input-group form-group w-${props.width ? props.width : 100}`} title = {props.title}>
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor={props.badge}>{props.badge}</label>
            </div>
            <select id={props.badge}
                    className={`custom-select ${!touched ? '' : error ? 'is-invalid' : 'is-valid'}`}
                    onChange={e => props.input.onChange(e)}
                    value={props.input.value}>
                {props.items.map(item => <option key={item.key} value={item.key}>{item.value}</option>)}
            </select>
            {hasError && <div className="invalid-feedback">Please, provide a valid value..</div>}
        </div>
    );
};

export default FieldSelectBadge;