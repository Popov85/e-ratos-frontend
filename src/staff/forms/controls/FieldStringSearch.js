import React from 'react';

const FieldStringSearch = props => {
    return (
            <div className="input-group form-group">
                <input type="text"
                       placeholder={props.placeholder}
                       className="form-control"
                       onChange={e => props.input.onChange(e)}
                       value={props.input.value}
                />
            </div>
    );

};

export default FieldStringSearch;