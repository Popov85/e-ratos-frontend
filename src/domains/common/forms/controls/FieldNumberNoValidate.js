import React from 'react';

const FieldNumberNoValidate = props => {
    const {max, sizeClass, marginClass, width, disabled, bg} = props;

    // A la validator))
    const getValue=()=>{
        let value = props.input.value;
        if (value>max) return max;
        if (value<0) return 0;
        return value;
    }

    return (
            <div className={`input-group form-group ${marginClass ? marginClass : ''}`} style={{width: width}} title={props.input.value ? props.input.value : ''}>
                <input type="number" min="0" max={max}
                       placeholder={props.placeholder}
                       className={`form-control ${sizeClass ? sizeClass : ''} ${bg ? bg : ''}`}
                       onChange={e => props.input.onChange(e)}
                       value={getValue()} disabled={disabled}
                />
            </div>
    );
};

export default FieldNumberNoValidate;