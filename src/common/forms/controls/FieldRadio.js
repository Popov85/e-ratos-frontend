import React from 'react';

const initItems = {
    "value": "",
    "label": "Select"
};
const FieldRadio = props => {

    let items = props.items;

    if (!items || items.length === 0) items = initItems;

    return (
        <div className="pb-1" title={props.title}>
            {
                items.map(item => {
                    return (
                        <span key={`${props.label}-${item.value}`} className="pr-2">
                            <div className="d-inline-flex align-items-baseline">
                            <input type="radio" id={`${props.label}-${item.value}`}
                                   value={item.value} onChange={e => props.input.onChange(e)}
                                   checked={props.input.value ? item.value === Number(props.input.value) : item.label === props.def}/>
                            <label htmlFor={`${props.label}-${item.value}`}
                                   className="text-secondary mb-0"> {item.label}</label>
                            </div>
                        </span>
                    );
                })
            }
        </div>
    );
};

export default FieldRadio;