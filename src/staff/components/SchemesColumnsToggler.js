import React from 'react';
import PropTypes from 'prop-types';
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

const SchemesColumnsToggler = props => {

    const {hiddenColumns} = props;

    return (
        <ToggleButtonGroup type="checkbox" value={hiddenColumns} className = "d-flex"
                           onChange={hiddenColumns => props.handleToggle(hiddenColumns)}>
            <ToggleButton className="btn btn-sm btn-secondary" value="Staff">Staff</ToggleButton>
            <ToggleButton className="btn btn-sm btn-secondary" value="Created">Created</ToggleButton>
            <ToggleButton className="btn btn-sm btn-secondary" value="Access">Access</ToggleButton>
            <ToggleButton className="btn btn-sm btn-secondary" value="Themes">Themes</ToggleButton>
            <ToggleButton className="btn btn-sm btn-secondary" value="Groups">Groups</ToggleButton>

        </ToggleButtonGroup>
    );
};

SchemesColumnsToggler.propTypes = {
    hiddenColumns: PropTypes.array.isRequired,
    handleToggle: PropTypes.func.isRequired
};

export default SchemesColumnsToggler;