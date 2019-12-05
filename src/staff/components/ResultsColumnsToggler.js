import React from 'react';
import PropTypes from 'prop-types';
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

const ResultsColumnsToggler = props => {

    const {hiddenColumns} = props;

    return (
        <ToggleButtonGroup type="checkbox" value={hiddenColumns} className = "d-flex"
                           onChange={hiddenColumns => props.handleToggle(hiddenColumns)}>
            <ToggleButton className="btn btn-sm btn-secondary"
                          value="Surname">Surname</ToggleButton>
            <ToggleButton className="btn btn-sm btn-secondary" value="Name">Name</ToggleButton>
            <ToggleButton className="btn btn-sm btn-secondary" value="Email">Email</ToggleButton>
            <ToggleButton className="btn btn-sm btn-secondary"
                          value="Faculty">Faculty</ToggleButton>
            <ToggleButton className="btn btn-sm btn-secondary" value="Class">Class</ToggleButton>
            <ToggleButton className="btn btn-sm btn-secondary" value="Year"
                          title="Year of student entrance">Year</ToggleButton>
            <ToggleButton className="btn btn-sm btn-secondary" value="Lasted"
                          title="How long the session lasted, (sec)">Lasted</ToggleButton>
            <ToggleButton className="btn btn-sm btn-secondary" value="Timeouted"
                          title="Was the session timeouted, (false/true)">Timeouted</ToggleButton>
            <ToggleButton className="btn btn-sm btn-secondary" value="Cancelled"
                          title="Was the session cancelled, (false/true)">Cancelled</ToggleButton>
            <ToggleButton className="btn btn-sm btn-secondary" value="Points"
                          title="Gamification points, (false/true)">Points</ToggleButton>
        </ToggleButtonGroup>
    );
};

ResultsColumnsToggler.propTypes = {
    hiddenColumns: PropTypes.array.isRequired,
    handleToggle: PropTypes.func.isRequired
};

export default ResultsColumnsToggler;