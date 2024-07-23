import React from 'react';

const FieldNumberNoValidate = ({max, sizeClass, marginClass, width, disabled, bg, placeholder, input}) => {
    //console.log(`Value = ${input.value}, max = ${max}`);
    return (
        <div className={`input-group form-group ${marginClass ? marginClass : ''}`} style={{width: width}}
             title={input.value ? input.value : ''}>
            <input type="number"
                   min={0}
                   max={max}
                   placeholder={placeholder}
                   className={`form-control ${sizeClass ? sizeClass : ''} ${bg ? bg : ''}`}
                   onChange={e => input.onChange(e)}
                   value={input.value}
                   disabled={disabled}
            />
        </div>
    );
};

export default FieldNumberNoValidate;