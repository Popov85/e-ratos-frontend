import React from 'react';
import PropTypes from 'prop-types';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const FieldDatePicker = ({input, placeholder, defaultValue, meta: {touched, error}}) => {

    return (
        <div title = {placeholder}>
            <DatePicker {...input}
                        dateFormat="yyyy-MM-dd"
                        selected={input.value ? new Date(input.value) : null}
                        onChange={e => input.onChange(e)}
                        placeholderText={placeholder} isClearable/>
            {touched && error && <span>{error}</span>}
        </div>
    );
};

FieldDatePicker.propTypes = {};

export default FieldDatePicker;
