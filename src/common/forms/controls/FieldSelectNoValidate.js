import React from 'react';

const initItems = {
    "value": "",
    "label": "Select"
};

const selectStyle = width=>{
   return  {
        width: width
    }
}

const FieldSelectNoValidate = props => {
    let {items, name, title, width, sizeClass} = props;
    if (!items || items.length === 0) items = initItems;

    return (
        <select id={name}
                className={`custom-select ${sizeClass ? 'custom-select-' + sizeClass : ''}`}
                onChange={e => props.input.onChange(e)}
                value={props.input.value} title = {title} style={selectStyle(width)}>
            {
                items.map(item => <option key={item.value} value={item.value}>{item.label}</option>)
            }
        </select>
    );
};

export default FieldSelectNoValidate;